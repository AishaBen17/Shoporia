import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Context/wishlist.Context'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CartEmpty from "../../assets/images/no-wish-list.png"

export default function WishlistPage() {
  const {wishlist,getWishlistDetails}=useContext(wishlistContext)

useEffect(() => {
  getWishlistDetails()
}, []);

  return (
    wishlist.data && wishlist? <section className='wishlist p-3 mb-6' id='wishlist'>
      <Helmet>
      <title>Wishlist</title>
      <meta name="description" content="Wishlist" />
      </Helmet>

    {wishlist.count>0 ? (
     <div className="py-3">
    
     <div className="flex justify-between items-center flex-col lg:flex-row">
       <h1 className="text-3xl font-bold text-primary-500">
         My Wishlist <i className="fa-solid fa-heart text-red-700"></i>
       </h1>
 
       <span className="text-lg font-semibold text-primary-600 mt-2 lg:mt-0 flex items-center">
         <i className="fa-solid fa-cart-arrow-down text-2xl mr-2"></i> 
         Number of items: {wishlist.count}
       </span>
     </div>
 
 
     <div className="grid grid-cols-12 gap-6 md:gap-8 mt-8">
       {wishlist.data.map((product) => (
         <ProductCard key={product.id} productItem={product} />
       ))}
     </div>
   </div>
 ) : (
  
   <div className="flex items-center justify-center flex-col w-full max-w-lg mx-auto text-center">
    
     <div className="w-full lg:w-full lg:mt-0 -mt-8">
       <img src={CartEmpty} alt="cart empty" />
     </div>
 
     
     <h1 className="text-xl font-bold text-gray-600 mt-4">
       Your Wishlist is Empty, Make a wish!
     </h1>
 
     <Link 
       to="/" 
       className="btn w-fit  text-md bg-primary-500 hover:bg-primary-300 hover:text-primary-700 text-white px-4 py-2 mt-5 flex items-center"
     >
        Start Shopping Now...  <i class="fa-solid fa-basket-shopping "></i>
     </Link>
   </div>
    
    )}

 </section>: <Loading />
  )
}
