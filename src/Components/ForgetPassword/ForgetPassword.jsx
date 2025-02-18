import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter your email")
        .email("Please enter a valid email")
        .min(5, "Minimum 5 characters")
        .max(50, "Maximum 50 characters")
    }),
    onSubmit: handleForgetPassword
  });

  function handleForgetPassword(values) {
    setLoading(true);
    const toastId = toast.loading("Sending request...");
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.statusMsg === "success") {
          setTimeout(() => navigate("/verifycode"), 1000);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        toast.dismiss(toastId);
        setLoading(false);
      });
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <HelmetProvider>
        <Helmet>
          <title>Forget Password</title>
        </Helmet>
      </HelmetProvider>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
     <div className='mb-4 text-center text-5xl text-primary-500'>
     <i class="fa-solid fa-user-shield"></i>
     </div>
        <h1 className="text-lg text-primary-600 text-center mb-4 relative w-fit mx-auto pb-2 ">
          Enter your Email address to reset your password
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-400"}`}
          >
            {loading ? "Processing..." : "Verify"}
          </button>
        </form>
      </div>
    </section>
  );
}
