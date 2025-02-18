import { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart.Context";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../Context/wishlist.Context";

export default function ProductCard({ productItem }) {
  const { category, title, price, imageCover, ratingsAverage, priceAfterDiscount, id } = productItem;
  const { addToCart, addLoading } = useContext(cartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext);
  const [currId, setCurrId] = useState(null);

  const isInWishlist = wishlist.data?.some((item) => item.id === id);

  return (
    <div className="card relative p-2 pb-10 rounded-lg overflow-hidden col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2 group/card transition-transform duration-300 hover:shadow-primary-300 hover:shadow-lg hover:scale-[1.02]">
      <Link to={`/product/${id}`} className="block">
        <div className="relative mb-1 w-[200px] h-[250px] overflow-hidden">
          <img src={imageCover} className="block w-full h-full object-cover" alt={title} />
          {priceAfterDiscount && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="flex justify-between items-center">
        <h3 className="text-primary-500 text-sm" data-category={category._id}>
          {category.name}
        </h3>
        <div
          className={`cursor-pointer text-xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${isInWishlist ? "text-danger-600" : "text-primary-300"}`}
          onClick={(e) => {
            e.stopPropagation();
            isInWishlist ? removeFromWishlist({ id }) : addToWishlist({ id });
          }}
        >
          <i className="fa-solid p-2 text-xl cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
        </div>
      </div>

      <h2 className="mb-1 font-semibold">{title.split(' ').slice(0, 2).join(' ')}</h2>

      <div className="flex justify-between items-center mb-3">
        <div className="font-mono">
          {priceAfterDiscount ? (
            <>
              <span className="text-red-500 line-through">{price}EGP</span>
              <span className="ml-1 font-semibold">{priceAfterDiscount}EGP</span>
            </>
          ) : (
            <span className="font-semibold">{price}EGP</span>
          )}
        </div>
        <span className="text-gray-500 flex items-center font-medium text-sm">
          <i className="fa-solid fa-star  text-yellow-400 "></i>
          {ratingsAverage}
        </span>
      </div>

      <button
        className="btn p-1 absolute w-40 bottom-3 left-1/2 -translate-x-1/2 transition-all duration-500"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setCurrId(id);
          addToCart({ productId: id });
        }}
        disabled={addLoading}
      >
        {addLoading && currId === id ? (
          <i className="fa-solid fa-spinner animate-spin"></i>
        ) : (
          <span className="text-sm">Add To Cart <i className="fa-solid fa-cart-shopping"></i></span>
        )}
      </button>
    </div>
  );
}
