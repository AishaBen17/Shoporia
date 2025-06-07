import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { Helmet} from 'react-helmet'

export default function CategoryDetails() {
  const [products, setProducts] = useState(null)
  const [title, setTitle] = useState(null)


  let { id } = useParams();
  function getProducts() {
    let option = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return axios.request(option);
  }
  async function getName() {
    let option = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      method: "GET",
    };
    const res = await axios.request(option);
    setTitle(res.data.data.name)
  }


  let { data, isError, isLoading } = useQuery({ queryKey: "products", queryFn: getProducts, staleTime: 6 * 60 * 60 * 1000 });


  function filterData(data) {
    const filteredData = data.data.data.filter((item) => item.category._id === id);
    setProducts(filteredData);
  }

  useEffect(() => {
    if (data) {
      filterData(data);
    }
    getName()
  }, [id, data]);


  return (
    <section id=" py-12">
 
        <Helmet>
          <title>{products?.length === 0 ? "No Products" : `${title} Products`}</title>
          <meta name="description" content={`${title} Products`} />
        </Helmet>
    
      {products ? products.length === 0 ? <div className="flex flex-col justify-center items-center py-24 mt-3">
  <div className="md:w-1/2 w-full mx-auto bg-gray-100 rounded-xl shadow-lg p-8 text-center flex flex-col items-center">
    <i className="fa-regular fa-face-frown text-primary-500 text-7xl mb-4"></i>
    <p className="text-lg font-semibold text-gray-700">
      Oops! No products available in this category.
    </p>
    <p className="text-secondary-600 mt-2">
      Try exploring other categories for more great products!
    </p>
    <Link to="/categories" ><i className="fa-solid fa-rotate-left text-4xl text-primary-500" title="Back to Categories"></i></Link>
  </div>
      </div> : (<div className="mb-8 lg:mt-8">
        <h1 className="mb-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-200 text-white py-3 px-6 rounded-lg shadow-lg">{title} Products :</h1>

        <div className="grid grid-cols-12 gap-8 ">
          {products?.map((product) => (
            <ProductCard key={product.id} productItem={product} />
          ))}
        </div>
      </div>) : (<div className="flex justify-center items-center py-24   "><Loading /></div>)}
    </section>
  )
}
