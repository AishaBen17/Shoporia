import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; 

  async function getProducts() {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    return response.data; 
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 6 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center py-24"><Loading /></div>;
  }

  const allProducts = data?.data || [];
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);


  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Products</title>
          <meta name="description" content="Products" />
        </Helmet>
      </HelmetProvider>

      <div className=" mb-8 lg:mt-8">
      <h1 className="mb-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-200
         text-white py-3 px-6 rounded-lg shadow-lg">Shop the Best Products & Brands</h1>
        <div className="grid grid-cols-12 gap-8">
          
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} productItem={product} />
          ))}
        </div>
       
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary-500 rounded disabled:opacity-50 "
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary-500 rounded disabled:opacity-50 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
