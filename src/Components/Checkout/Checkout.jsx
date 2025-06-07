import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { cartContext } from "../../Context/Cart.Context";
import { tokenContext } from "../../Context/Token.Context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const [order, setOrder] = useState("cash");
  const { cartData } = useContext(cartContext);
  const { token } = useContext(tokenContext);
  const navigateMe = useNavigate();
  const { getCartDetails } = useContext(cartContext);
  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingOnline, setLoadingOnline] = useState(false);

  function handleCashOrder() {
    setLoadingCash(true);
    const toastId = toast.loading("Processing your order...");
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartData.cartId}`, {}, { headers: { token } })
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success("Order Placed Successfully");
          getCartDetails();
          setTimeout(() => navigateMe("/allorders"), 1000);
        }
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => { toast.dismiss(toastId); setLoadingCash(false); });
  }

  function handleOnlinePayment(values) {
    setLoadingOnline(true);
    const toastId = toast.loading("Redirecting to payment...");
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartData.cartId}?url=${window.location.origin}`, values, { headers: { token } })
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success("Redirecting to payment page...");
          getCartDetails();
          setTimeout(() => { window.location.href = data.session.url; }, 1000);

        }console.log("Redirect URL:", `${window.location.origin}`);

      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => { toast.dismiss(toastId); setLoadingOnline(false); });
  }

  const formik = useFormik({
    initialValues: { shippingAddress: { details: "", phone: "", city: "" } },
    validationSchema: Yup.object({
      shippingAddress: Yup.object({
        details: Yup.string().required("Required").min(10).max(100),
        city: Yup.string().required("Required").min(3).max(20),
        phone: Yup.string().required("Required").matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
      }),
    }),
    onSubmit: (values) => {
      order === "cash" ? handleCashOrder() : handleOnlinePayment(values);
    },
  });

  return (
    <section className=" max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-15 mb-10">
      <Helmet>
        <title>CheckOut</title>
        <meta name="description" content="Checkout" />
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-primary-600 mb-4"><i className="fa-solid text-5xl fa-map-location-dot text-primary-400"></i> Delivery Address  </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">City:</label>
          <input
            type="text"
            name="shippingAddress.city"
            className="w-full p-2 border rounded-md form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shippingAddress.city}
          />
          {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
            <p className="text-red-500 text-sm">*{formik.errors.shippingAddress.city}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 ">Phone:</label>
          <input
            type="tel"
            name="shippingAddress.phone"
            className="w-full p-2 border rounded-md form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shippingAddress.phone}
          />
          {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
            <p className="text-red-500 text-sm">*{formik.errors.shippingAddress.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600">Details:</label>
          <textarea
            name="shippingAddress.details"
            className="w-full p-2 border rounded-md form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shippingAddress.details}
          ></textarea>
          {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
            <p className="text-red-500 text-sm">*{formik.errors.shippingAddress.details}</p>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-primary-400 text-white p-2 rounded-md font-semibold hover:bg-primary-500"
            disabled={loadingCash}
            onClick={() => setOrder("cash")}
          >
            Cash <i className="fa-solid fa-hand-holding-dollar"></i>
          </button>
          <button
            type="submit"
            className="w-full bg-secondary-600 text-white p-2 rounded-md font-semibold hover:bg-gray-600"
            disabled={loadingOnline}
            onClick={() => setOrder("online")}
          >
            Online <i className="fa-brands fa-cc-visa"></i>
          </button>
        </div>
        <span className="text-primary-600 font-mono text-sm "><i className="fa-solid fa-circle-info mr-1"></i>Please provide information about the delivery address below and make a payment.</span>
      </form>
    </section>
  );
}
