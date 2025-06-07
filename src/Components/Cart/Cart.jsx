import { useContext, useEffect } from "react";
import CartItem from "../../Components/CarItem/CartItem";
import { cartContext } from "../../Context/Cart.Context";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet} from "react-helmet";
import empty from "../../assets/images/empty-cart.png";


export default function Cart() {
  let { getCartDetails, cartData, clearCart } = useContext(cartContext);

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
     
        <Helmet>
          <title>Cart</title>
          <meta name="description" content="Cart" />
        </Helmet>
      
      {cartData === null ? (
        <div className="flex justify-center items-center py-8">
          <Loading />
        </div>
      ) : cartData.numOfCartItems === 0 ? (
        <div className="flex w-full max-w-4xl mx-auto items-center justify-center flex-col lg:flex-row p-6">
          
          <div className="w-full lg:w-1/2 text-center flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold text-gray-700">
             <h3 className="text-6xl text-primary-500 mb-5"> Oops! <i className="fa-regular fa-face-frown"></i></h3 >Cart is Empty 
            </h1>
               <Link
              to="/"
              className=" bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 mt-5"
            >
              Start Shopping Now <i className="fa-brands fa-shopify text-2xl"></i>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={empty} alt="" />
          </div>
        </div>
      ) : (
        <div className=" bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
          <h1 className="text-2xl font-bold text-primary-500 flex items-center">
            <i className="fa-solid fa-cart-arrow-down text-4xl me-2 text-primary-600"></i>

            Shopping Cart
          </h1>
          <div className="text-end">
            <h3 className="text-md ms-6 font-semibold text-gray-600 mt-1">
              Total Cart Items: {cartData.numOfCartItems}
            </h3>
            <button
              type="button"
              onClick={() => clearCart()}
              className=" bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
            >
              <i className="fa-solid fa-trash me-2"></i>Clear Cart
            </button>
          </div>
          <div className="mt-5 space-y-5">
            {cartData.data.products.map((product) => (
              <CartItem key={product._id} productInfo={product} />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
           
          <div className="border bg-gray-100 shadow-md rounded-lg mt-5 p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Cart Price: <span className="text-primary-500 font-bold">{cartData.data.totalCartPrice} EGP</span>
            </h3>

          </div>
            <Link to="/checkout">
              <button
                type="button"
                className="btn bg-primary-600 text-md text-white px-6 py-3 rounded-lg hover:bg-primary-400 mt-3 sm:mt-0"
              >
                Payment <i className="fa-solid fa-angles-right"></i>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
