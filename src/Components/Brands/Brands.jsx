import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet} from "react-helmet";

export default function Brands() {
  const [page, setPage] = useState(1);

 
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["brands", page],
    queryFn: () => getAllBrands(page),
    keepPreviousData: true, 
  });

  function getAllBrands(page) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`);
  }

  if (isLoading) {
    return (
              <Loading />
        );
  }

  return (
    <>
     
        <Helmet>
          <title>Brands</title>
          <meta name="description" content="Browse top brands" />
        </Helmet>
     

      <section id="brands" className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-200 text-white py-3 px-6 rounded-lg shadow-lg">
            Choose your favorite brand
          </h2>

       
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {data?.data?.data.map((brand) => (
              <div key={brand._id} className="relative bg-white p-3 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-primary-400">
                <img
                  loading="lazy"
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-[120px] object-contain p-3 transition-all duration-300 group-hover:opacity-75"
                />
                <h3 className="text-lg font-semibold text-center text-primary-500 mt-2">
                  {brand.name}
                </h3>
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
                  <Link
                    to={`/brands/${brand._id}`}
                    className="bg-primary-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-600 transition-all duration-300"
                  >
                    <i className="fa-solid fa-eye mr-2"></i> View Brand
                  </Link>
                </div>
              </div>
            ))}
          </div>

         
                
          {isFetching && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        </div>
      </section>
    </>
  );
}
