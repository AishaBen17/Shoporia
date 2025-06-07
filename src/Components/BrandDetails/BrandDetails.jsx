import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { Helmet} from 'react-helmet';

export default function BrandDetails() {
  const [products, setProducts] = useState([]); 
  const [title, setTitle] = useState("Brand");

  let { id } = useParams();

  async function getProducts() {
    try {
      let option = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };
      const response = await axios.request(option);
      console.log("All Products API Response:", response.data); 
      return response.data; 
    } catch (error) {
      console.error("Error fetching products:", error);
      return { data: [] }; 
    }
  }

  async function getName() {
    try {
      let option = {
        url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
        method: "GET",
      };
      const res = await axios.request(option);
      console.log("Brand Name API Response:", res.data);
      setTitle(res.data.data?.name || "Unknown Brand");
    } catch (error) {
      console.error("Error fetching brand name:", error);
      setTitle("Unknown Brand");
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 6 * 60 * 60 * 1000, 
  });

  function filterData(data) {
    if (!data?.data) {
      console.error("Invalid API response:", data);
      setProducts([]); 
      return;
    }

    const filteredData = data.data.filter((item) => item.brand?._id === id);
  

    setProducts(filteredData);
  }

  useEffect(() => {
    if (data) {
      console.log("Raw API Data:", data);
      filterData(data);
    }
    getName();
  }, [id, data]);

  return (
    <section id="category-details md:py-12">
      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loading />
        </div>
      ) : (
        <div className="recent-products mb-8 lg:mt-8">
          
            <Helmet>
              <title>{`${title} Products`}</title>
              <meta name="description" content="Brand Details" />
            </Helmet>
         

          <h1 className="mb-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-200 text-white py-3 px-6 rounded-lg shadow-lg">
            {title} Products
          </h1>

          {products.length > 0 ? (
            <div className="grid grid-cols-12 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} productItem={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="md:w-1/2 w-full mx-auto bg-gray-100 rounded-xl shadow-lg p-8 text-center flex flex-col items-center">
                <i className="fa-regular fa-face-frown text-primary-500 text-7xl mb-4"></i>
                <p className="text-lg font-semibold text-gray-700">
                  Oops! No products available in this Brand.
                </p>
                <p className="text-secondary-600 mt-2">
                  Try exploring other categories for more great Brands!
                </p>
               <Link to="/brands" ><i className="fa-solid fa-rotate-left text-4xl text-primary-500" title="Back to Brands"></i></Link>
              
            </div>
            </div>
      )}
    </div>
  )
}
    </section >
  );
}
