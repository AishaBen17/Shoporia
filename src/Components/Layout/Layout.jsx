import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../ScrollToTop/ScrollToTop"; 
import style from "./Layout.module.css";

export default function Layout() {
  const location = useLocation();
  
  const noContainerRoutes = ["/login", "/register", "/forgetpassword", "/verifycode", "/updatepassword"];
  const isContainerNeeded = !noContainerRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className={isContainerNeeded ? "container mt-20 px-4" : "w-full"}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
