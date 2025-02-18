import React from "react";
import { Link } from "react-router-dom";

export default function Order({ myorder }) {
  return (
    <section className="order p-5 border rounded-lg shadow-sm border-gray-300 bg-white">
  
      <header className="flex justify-between items-center border-b pb-3 mb-3">
        <div>
          <h2 className="text-sm text-gray-500">Order ID</h2>
          <h3 className="text-lg font-semibold text-gray-900">#{myorder.id}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              myorder?.isDelivered ? "bg-green-600" : "bg-orange-500"
            }`}
          >
            {myorder?.isDelivered ? "Delivered" : "In Transit"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              myorder?.isPaid ? "bg-green-600" : "bg-orange-500"
            }`}
          >
            {myorder?.isPaid ? "Paid" : "Pending Payment"}
          </span>
        </div>
      </header>

   
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {myorder.cartItems.map((item) => (
          <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden">
            <img
              loading="lazy"
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-3">
              <h3 className="text-md font-bold text-gray-900 ">
                <Link to={`/product/${item.product._id}`}>{item.product.title.split(' ').slice(0, 2).join(' ')}</Link>
              </h3>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
                <span>Quantity: <span className="font-semibold">{item.count}</span></span>
                <span className="font-bold text-primary-400">{item.price} EGP</span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <footer className="mt-4 pt-3 border-t text-end text-primary-600">
        <h5 className="text-lg font-bold ">
          Total Price: <span>{myorder.totalOrderPrice} EGP</span>
        </h5>
      </footer>
    </section>
  );
}
