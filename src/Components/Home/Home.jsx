import MainSlider from "../../Components/Main-Slider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import RecentProducts from "../../Components/RecentProducts/RecentProducts";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";




export default function Home() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home" />
          <meta name="keywords" content="Home Shoporia ECommerce React-Project  " />
        </Helmet>
      </HelmetProvider>
      <MainSlider />
      <CategorySlider />
      <RecentProducts limit={12} />  
      <div className="text-center mt-4 ">
        <Link to="/products" className="p-2 rounded-md bg-primary-300 text-primary-700 hover:bg-primary-700 hover:text-white">
          See More Products...
        </Link>
      </div>
     
    </>
  );
}
