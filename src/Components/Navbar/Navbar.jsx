import Logo from "../../assets/images/favicon.png";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/Token.Context";
import { cartContext } from "../../Context/Cart.Context";
import { wishlistContext } from "../../Context/wishlist.Context";

export default function Navbar() {
  const { token, logout } = useContext(tokenContext);
  const { cartData, getCartDetails } = useContext(cartContext);
  const { wishlist, getWishlistDetails } = useContext(wishlistContext);
  const [toggleList, setToggleList] = useState(false);

  function handleToggleList() {
    setToggleList(!toggleList);
  }

  useEffect(() => {
    if (token) {
      getCartDetails();
      getWishlistDetails();
    }
  }, []);

  return (
    <nav className="Navbar bg-secondary-200 py-4 px-4 fixed top-0 left-0 right-0 z-50 shadow-md">
    <div className="container mx-auto flex items-center justify-between">
                 <Link to="/" className="flex items-center gap-2">
        <img src={Logo} className="w-12 h-10" alt="Shoporia Logo" />
        <span className="font-bold text-2xl text-primary-700">Shoporia</span>
      </Link>
     
      {token && (
        <ul className="hidden lg:flex gap-6 items-center ml-10">
          {["/", "/products", "/categories", "/brands", "/allorders"].map((path, index) => {
            const labels = ["Home", "Products", "Categories", "Brands", "Orders"];
            return (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer text-md 
                     ${isActive ? "bg-[#8A4F7D] text-white font-semibold shadow-md" 
                     : "text-gray-500 hover:bg-primary-500 hover:text-white"}`
                  }
                >
                  {labels[index]}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}

    
      {token && (
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative">
            <i className="fa-solid fa-cart-shopping text-xl text-primary-500"></i>
            <div className="absolute -top-2 -right-2 bg-gray-300 text-primary-800  flex items-center justify-center text-sm">
              {cartData?.numOfCartItems ?? <i className="fa-solid "></i>}
            </div>
          </Link>

          <Link to="/wishlist" className="relative">
            <i className="fa-solid fa-heart text-xl text-danger-700"></i>
            <div className="absolute -top-2 -right-2 bg-gray-300 text-primary-800  flex items-center justify-center text-sm">
              {wishlist.count >= 0 ? wishlist.count : <i className="fa-solid "></i>}
            </div>
          </Link>

        
          <button onClick={logout} className="hidden lg:flex items-center bg-primary-500 text-white px-4 py-2 rounded-md hover:text-primary-700 hover:bg-primary-300 transition-colors duration-300">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>

        
          <button className="lg:hidden text-2xl" onClick={handleToggleList}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      )}

      {!token && (
        <div className="flex gap-4 items-center ml-auto">
          <NavLink
            to="/login"
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:text-primary-700 hover:bg-primary-300 duration-300 transition-colors"
          >
            <i className="fa-solid fa-right-to-bracket"></i> Login
          </NavLink>
          <NavLink
            to="/register"
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:text-primary-700 hover:bg-primary-300 duration-300 transition-colors"
          >
            <i className="fa-regular fa-user"></i> Register
          </NavLink>
        </div>
      )}
    </div>

    {toggleList && token && (
      <div className="lg:hidden bg-white w-full mt-4 shadow-md rounded-md">
        <ul className="flex flex-col items-start p-4 gap-4">
          {["/", "/products", "/categories", "/brands", "/allorders"].map((path, index) => {
            const labels = ["Home", "Products", "Categories", "Brands", "Orders"];
            return (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer text-md 
                     ${isActive ? "bg-primary-500 text-white font-semibold shadow-md" 
                     : "text-gray-500 hover:bg-primary-500 hover:text-white"}`
                  }
                  onClick={handleToggleList} 
                >
                  {labels[index]}
                </NavLink>
              </li>
            );
          })}

       
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 bg-primary-500 text-white rounded-md hover:text-primary-700 hover:bg-primary-300 transition-colors duration-300"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </ul>
      </div>
    )}
  </nav>
  );
}
