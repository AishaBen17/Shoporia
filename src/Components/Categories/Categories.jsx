import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/CategoryDetails/${id}`);
  };

  return <>
   
    <Helmet>
      <title>Categories</title>
      <meta name="description" content="Most popular categories" />
    </Helmet>
  

    <div className="px-4 py-4">
        <h1 className="mb-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-200
         text-white py-3 px-6 rounded-lg shadow-lg">Most popular online shopping categories:</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loading/>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  {categories.map((category) => (
    <div
      key={category._id}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg border border-gray-300"
      onClick={() => handleCategoryClick(category._id)}
    >
     
      <div className="w-full h-[260px]">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={category.image}
          alt={category.name}
        />
      </div>

    
      <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-90">
        <h3 className="text-primary-700 text-lg font-semibold w-full text-center bg-secondary-200 py-2 rounded-lg">
          {category.name}
        </h3>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  </>
}

export default Categories;
