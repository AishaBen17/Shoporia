import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function VerifyCode() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: ""
    },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .required("Code is required")
        .min(6, "Minimum 6 characters")
        .max(6, "Maximum 6 characters")
    }),
    onSubmit: handleVerifyCode
  });

  function handleVerifyCode(values) {
    setLoading(true);
    const toastId = toast.loading("Verifying code...");
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((res) => {
        toast.success("Code verified successfully!");
        if (res.data.status === "Success") {
          setTimeout(() => navigate("/updatepassword"), 1000);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Invalid code, please try again");
      })
      .finally(() => {
        toast.dismiss(toastId);
        setLoading(false);
      });
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <Helmet>
        <title>Verify Code</title>
        <meta name="description" content="Verify your reset code" />
      </Helmet>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl text-center text-primary-500 mb-4 relative w-fit mx-auto pb-2 ">
          Verification Code
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resetCode" className="block text-gray-700 font-medium">
              Enter Code
            </label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-primary-300 outline-none"
              placeholder="Enter verification code"
            />
            {formik.touched.resetCode && formik.errors.resetCode && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.resetCode}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600"}`}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </section>
  );
}
