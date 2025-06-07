import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet  } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function UpdatePassword() {
  const [formError, setFormError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  async function submitForm(values) {
    setSubmitLoading(true);
    setFormError(null);
    let option = {
      method: "PUT",
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      data: values,
    };
    let toastId = toast.loading("Updating password...");
    axios
      .request(option)
      .then((res) => {
        if (res.statusText === "OK") {
          toast.success("Password updated successfully!");
          setTimeout(() => navigate("/login"), 1000);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred");
        setFormError(err.response?.data?.message);
      })
      .finally(() => {
        toast.dismiss(toastId);
        setSubmitLoading(false);
      });
  }

  const validateForm = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: submitForm,
    validationSchema: validateForm,
  });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
        <Helmet>
          <title>Update Password</title>
          <meta name="description" content="Update your password securely" />
        </Helmet>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl  text-center text-primary-500 mb-4 relative w-fit mx-auto pb-2 ">
          Update Password
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-primary-300 outline-none"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-700 font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-primary-300 outline-none"
              placeholder="Enter new password"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
            )}
          </div>
          {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
          <button
            type="submit"
            disabled={submitLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ${submitLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600"}`}
          >
            {submitLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
