import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import { cartContext } from "../../Context/Cart.Context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useQuery } from "@tanstack/react-query";
import { wishlistContext } from "../../Context/wishlist.Context";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart, addLoading } = useContext(cartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch(() => toast.error("No Product Found"));
  }

  function getRelatedProducts() {
    if (!product?.category?._id) return;

    axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`)
      .then(({ data }) => {
        const products = data.data.filter((p) => p._id !== product._id);
        setRelatedProducts(products);
      })
      .catch((err) => toast.error(err.response?.data?.message || "Error fetching related products"));
  }

  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 6 * 60 * 60 * 1000,
  });

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 3, slidesToScroll: 2, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (product?.category?._id) {
      getRelatedProducts();
    }
  }, [product]);

  if (isLoading) {
    return <div className="flex justify-center items-center py-24"><Loading /></div>;
  }

  return (
    <div className="product-details-page pb-8">
     
        <Helmet>
          <title>{product?.title || "Product Details"}</title>
          <meta name="description" content={`Product Details of ${product?.title}`} />
        </Helmet>
      

      {product ? (
        <div className="product-details flex flex-col lg:flex-row gap-10 justify-center items-center">
          <div className="lg:w-1/4 w-3/4 mx-auto rounded-md shadow-lg overflow-hidden">
            <ImageGallery
              showFullscreenButton={false}
              infinite={true}
              autoPlay={true}
              showPlayButton={false}
              showNav={false}
              items={product?.images?.map((img) => ({ original: img, thumbnail: img })) || []}
            />
          </div>

          <div className="lg:w-3/4 w-full">
            <div className=" flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-primary-500 mb-3 mr-3">{product.title}</h2>
              {wishlist?.data?.some((p) => p._id === product._id) ? (
                <div className=" bg-red-600 rounded-full text-white" onClick={() => removeFromWishlist({ id })}>
                  <i className="fa-solid p-2 text-xl cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
                </div>
              ) : (
                <div className=" bg-primary-400 rounded-full text-white" onClick={() => addToWishlist({ id })}>
                  <i className="fa-solid p-2 text-xl cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
                </div>
              )}
            </div>

            <p className=" text-gray-600">{product.description}</p>
            <h3 className=" text-primary-500 text-md my-3">{product.category?.name}</h3>

            <div className=" flex justify-between items-center mb-3">
              <span className="font-semibold text-xl">{product.price} EGP</span>
              <div className=" flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-300"></i>
                <span className="text-md">{product?.ratingsAverage}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 py-3 flex justify-between items-center">
           <div>
           <h4 className="text-primary-500 text-lg font-semibold">Brand: </h4>
           {product.brand?.image && <img src={product.brand.image} loading="lazy" className="md:w-28 w-16" alt="Brand" />}
           </div>
              
              <p className="text-md font-semibold text-gray-700"><i className="text-2xl text-primary-500 mr-1 fa-solid fa-boxes-stacked"> </i>Available Quantity: <span className="text-primary-500">{product.quantity}</span></p>
            </div>

            <button className="btn w-full mt-2" disabled={addLoading} onClick={() => addToCart({ productId: product._id })}>
              {addLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : <span>Add To Cart <i className="fa-solid fa-cart-shopping"></i></span>}
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {relatedProducts.length > 0 && (
        <div className=" mt-16">
          <h1 className="text-2xl font-bold text-primary-500 mb-4">Related Products</h1>
          <Slider {...settings}>
            {relatedProducts.map((product) => (
              <div className="px-1 cursor-grab product-realted" key={product._id}>
                <ProductCard productItem={product} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {data?.data?.data?.length > 0 && (
        <div className=" mt-6">
          <h1 className="text-2xl font-bold text-primary-500 mb-4">Recent Products</h1>
          <Slider {...settings}>
            {data.data.data.map((product) => (
              <div className="px-1 cursor-grab product-realted" key={product._id}>
                <ProductCard productItem={product} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
