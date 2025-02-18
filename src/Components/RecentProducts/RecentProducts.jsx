import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function RecentProducts({ limit = 12 }) {
  const [searchQuery, setSearchQuery] = useState(""); 

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products").then(res => res.data); 
  }

  let { data, isLoading } = useQuery({ 
    queryKey: ["products"], 
    queryFn: getProducts, 
    staleTime: 6 * 60 * 60 * 1000 
  });

  if (isLoading) {
    return <Loading />;
  }


  const products = data?.data || [];


  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const displayedProducts = filteredProducts.slice(0, limit);

  return (
    <>
      <div className="my-4 px-2 text-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-1/2 p-2 border border-primary-500 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h1 className="text-xl font-bold text-primary-500 px-1 -mb-2">Shop Recent Products:</h1>

      <div className="recent-products mb-8 lg:mt-8 mt-6 px-2">
        <div className="grid grid-cols-12 gap-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} productItem={product} />
            ))
          ) : (
            <p className="col-span-12 text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
