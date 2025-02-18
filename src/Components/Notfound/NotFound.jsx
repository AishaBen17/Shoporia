import { Link } from "react-router-dom";
import Error from "../../assets/images/error.png"

import { Helmet,HelmetProvider } from "react-helmet-async";
export default function NotFound() {


  return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>Page Not Found</title>
    </Helmet>
    </HelmetProvider>
      <section className="py-5 flex justify-center items-center flex-col">
          <h2 className="text-primary-600 text-3xl font-semibold">Oops,Page Not Found...</h2>
          <img src={Error} alt="Error image" />
          <Link to="/" ><i className="fa-solid fa-circle-left text-4xl text-primary-500" title="Back to Home"></i></Link>
      </section>
    </>
  );
}
