import { useContext } from "react";
import { cartContext } from "../../Context/Cart.Context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  let { removeProduct, updateQuantity } = useContext(cartContext);
  const { count, product, price } = productInfo;
  const { title, imageCover, category, id } = product;

  return (
    <div className="cart-item flex flex-wrap items-center bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg sm:flex-nowrap sm:justify-between">
  
      <div className="flex items-center gap-4 sm:w-1/3 w-full justify-center sm:justify-start">
        <Link to={`/product/${id}`}>
          <img
            src={imageCover}
            loading="lazy"
            alt={title}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-200"
          />
        </Link>
      </div>
      
    
      <div className="text-center sm:text-left sm:w-1/3 w-full space-y-2">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900  w-full">{title}</h3>
        </Link>
        <h4 className="text-md text-gray-600">Price: <span className="text-primary-500 font-medium">{price} EGP</span></h4>
        <button
          onClick={() => removeProduct({ productId: id })}
          className=" bg-red-600 text-white px-3 py-1 rounded-md font-mono hover:bg-red-500 transition duration-300"
        >
          <i className="fa-solid fa-trash-arrow-up"></i> Remove
        </button>
      </div>

     
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-1/3 mt-3 sm:mt-0 space-x-4">
        <button
          onClick={() => updateQuantity({ productId: id, count: Math.max(count - 1, 1) })}
          className="w-10 h-10 flex items-center justify-center text-lg bg-primary-200 text-gray-700 rounded-full hover:bg-primary-500 hover:text-white transition duration-200"
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className="text-xl font-medium">{count}</span>
        <button
          onClick={() => updateQuantity({ productId: id, count: count + 1 })}
          className="w-10 h-10 flex items-center justify-center text-lg bg-primary-200 text-gray-700 rounded-full hover:bg-primary-500 hover:text-white transition duration-300"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
