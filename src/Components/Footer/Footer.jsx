import React from 'react';
import amazon_pay from "../../assets/images/amazon.png";
import american_express from '../../assets/images/american.png';
import master_card from '../../assets/images/mastercard.png';
import paypal from "../../assets/images/payPal.png";
import andriod from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";

function Footer() {
  return (
    <div className="bg-secondary-200 mt-8 py-9 px-6 md:px-13">
  
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-primary-500 mb-2">Get the Shoporia app</h2>
        <p className="text-gray-600 mb-4">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full">
          <input
            type="email"
            placeholder="Email .."
            className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-md focus:outline-none focus:ring focus:ring-green-300"
          />
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 w-full md:w-auto">
            Share App Link
          </button>
        </div>
      </div>

     
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mt-6 px-4 gap-4">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
          <span className="text-gray-600 font-medium">Payment Partners:</span>
          <img src={amazon_pay} alt="Amazon Pay" className="h-5" />
          <img src={american_express} alt="American Express" className="h-5" />
          <img src={master_card} alt="Mastercard" className="h-10" />
          <img src={paypal} alt="PayPal" className="h-5" />
        </div>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
          <span className="text-gray-600 font-medium">Get deliveries with Shoporia:</span>
          <img src={andriod} alt="App Store" className="h-10" />
          <img src={google} alt="Google Play" className="h-10" />
        </div>
      </div>

      <hr className="border-t border-gray-300 my-3 w-11/12 mx-auto" />
<div className="mt-3 ">
  <ul className="flex justify-center items-center gap-6 text-gray-700 text-2xl mb-2">
    <li>
      <a href="#" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 hover:bg-primary-200 transition duration-300">
        <i className="fa-brands fa-instagram text-white hover:text-primary-700"></i>
      </a>
    </li>
    <li>
      <a href="#" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 hover:bg-primary-200 transition duration-300">
        <i className="fa-brands fa-facebook text-white hover:text-primary-700"></i>
      </a>
    </li>
    <li>
      <a href="#" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 hover:bg-primary-200 transition duration-300">
        <i className="fa-brands fa-twitter text-white hover:text-primary-700"></i>
      </a>
    </li>
    <li>
      <a href="#" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 hover:bg-primary-200 transition duration-300">
        <i className="fa-brands fa-linkedin text-white hover:text-primary-700"></i>
      </a>
    </li>
  </ul>
    <div>
    <p className='text-center mt-3'>
      &copy; 2025 <span className='text-primary-500 font-bold'>Shoporia</span>. All rights reserved. Made with <i className="text-danger-700 text-xl fa-solid fa-heart"></i> by
      <span className="text-primary-500 hover:text-primary-700 transition duration-300"> Aisha Ahmed</span>
    </p>
  </div>
</div>

    </div>
  );
}

export default Footer;
