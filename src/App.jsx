import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Notfound from "./Components/Notfound/NotFound";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import TokenContextProvider from "./Context/Token.Context";
import { CartProvider } from "./Context/Cart.Context";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Checkout from "./Components/Checkout/Checkout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import { WishlistProvider } from ".//Context/wishlist.Context";
import WishlistPage from "./Components/WishlistPage/WishlistPage";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import AllOrders from "./Components/Orders/AllOrders";

const reactQuery = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><WishlistPage /></ProtectedRoute> },
      { path: "brands", element: <Brands /> },
      { path: "brands/:id", element: <BrandDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "categoryDetails/:id", element: <CategoryDetails /> },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "*", element: <Notfound /> },
     
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "verifycode", element: <VerifyCode /> },
      { path: "updatepassword", element: <UpdatePassword /> },
    ],
  },
],

);

export default function App() {
  return (
    <QueryClientProvider client={reactQuery}>
      <TokenContextProvider>
        <WishlistProvider>
          <CartProvider>
          <RouterProvider router={router} >
          <ScrollToTop />
           </RouterProvider>
          </CartProvider>
        </WishlistProvider>
      </TokenContextProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
  
}
