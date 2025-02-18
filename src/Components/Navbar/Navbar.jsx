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
    <nav className="Navbar bg-secondary-200 py-4 px-2 fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-13 h-10" alt="Shoporia Logo" />
          <span className="font-bold text-2xl text-primary-700">Shoporia</span>
        </Link>

        {token && (
          <ul className="navs gap-4 items-center ml-10 hidden lg:flex">
            {["/", "/products", "/categories", "/brands", "/allorders"].map(
              (path, index) => {
                const labels = ["Home", "Products", "Categories", "Brands", "Orders"];
                return (
                  <li key={index}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer text-md
                         ${isActive 
                          ? "bg-[#8A4F7D] text-white font-semibold shadow-md" 
                          : "text-gray-500 hover:bg-primary-500 hover:text-white"
                         }`
                      }
                    >
                      {labels[index]}
                    </NavLink>
                  </li>
                );
              }
            )}
          </ul>
        )}

        {token && (
          <div className="cart-icon ml-auto -mb-2">
            <Link to="/cart">
              <div className="cart-icon-count relative">
                <i className="fa-solid fa-cart-shopping sm:text-2xl text-lg text-primary-500"></i>
                <div className="count flex items-center justify-center absolute text-primary-800 bg-gray-300 rounded-full w-5 h-5 -top-4 -right-4">
                  {cartData === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    cartData.numOfCartItems
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

        {token && (
          <div className="heart-icon mr-10 -mb-2">
            <Link to="/wishlist">
              <div className=" relative">
                <i className="fa-solid fa-heart sm:text-2xl text-lg text-danger-700"></i>
                <div className=" flex items-center justify-center absolute text-primary-800 bg-gray-300 rounded-full w-5 h-5 -top-4 -right-4">
                  {wishlist.count >= 0 ? wishlist.count : <i className="fa-solid fa-spinner fa-spin"></i>}
                </div>
              </div>
            </Link>
          </div>
        )}

        {!token ? (
          <ul className={`flex gap-4 items-center ${!token ? "ml-auto" : ""}`}>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `bg-primary-500 text-white px-4 py-2 rounded-md hover:text-primary-700 hover:bg-primary-300 duration-300 transition-colors 
                   ${isActive ? "text-primary-500 " : ""}`
                }
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `bg-primary-500 text-white px-4 py-2 rounded-md hover:text-primary-700 hover:bg-primary-300 duration-300 transition-colors 
                   ${isActive ? "text-primary-500 " : ""}`
                }
              >
                <i className="fa-regular fa-user"></i> Register
              </NavLink>
            </li>
          </ul>
        ) : (
          ""
        )}

        {token && (
          <div className="menu-toggle lg:hidden transition-all duration-300">
            <i className="fa-solid fa-bars text-2xl cursor-pointer" onClick={handleToggleList} title="Menu"></i>
          </div>
        )}

        {token ? (
          <div className=" cursor-pointer flex items-center" onClick={() => logout()}>
            <i className="fa-solid fa-right-from-bracket text-sm bg-primary-500 text-white px-4 py-3 rounded-md hover:text-primary-700
             hover:bg-primary-300 duration-300 transition-colors" title="Logout"> Logout</i> 
          </div>
        ) : (
          ""
        )}
      </div>

      {toggleList && token && (
        <div className="menu-toggle lg:hidden w-full mt-4 mr-1 transition-all duration-300">
          <ul className="navs flex flex-col w-full gap-4 ml-10" onClick={handleToggleList}>
            {["/", "/products", "/categories", "/brands", "/allorders"].map(
              (path, index) => {
                const labels = ["Home", "Products", "Categories", "Brands", "Orders"];
                return (
                  <li key={index}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer text-md
                         ${isActive 
                          ? "bg-primary-500 text-white font-semibold shadow-md" 
                          : "text-gray-500 hover:bg-primary-500 hover:text-white"
                         }`
                      }
                    >
                      {labels[index]}
                    </NavLink>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
