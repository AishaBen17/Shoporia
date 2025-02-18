import { useState } from "react";
// import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";
import signup from "../../assets/images/signup.png"


export default function Register() {
  const [formError, setFormError] = useState(null);
  const [submitLoading, setsubmitLoading] = useState(null);

  const navy = useNavigate();


  async function submitForm(values) {

    setsubmitLoading(true);
    setFormError(null);
    let option = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data: values,
    };
    let idToast=toast.loading("Loading...");
    axios.request(option)
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Register Successfully");
            navy("/login");
        }
      })
      .catch((err) => {
        setFormError(err.response.data.message);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        toast.dismiss(idToast);
        setsubmitLoading(false);
      });
  }


  let validateForm = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must be at most 25 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must have Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Password does not match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(20)?01[0125][0-9]{8}$/, "Phone Must be Egyption Number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },    
    onSubmit: submitForm,
    validationSchema: validateForm,
  });


  return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>Register</title>
      <meta name="description" content="Register" />
    </Helmet>
    </HelmetProvider>
    <div className="pt-10 pb-12 bg-gray-50">
  <div className="flex flex-col md:flex-row items-center justify-center w-11/12 md:w-5/6 mx-auto gap-10">

    <div className="w-5/6 md:w-1/2 flex justify-center">
      <img src={signup} alt="Signup " className="w-full max-w-lg" />
    </div>


    <div className="md:w-1/2 w-full mt-10 ">
      <h1 className="text-2xl font-semibold text-primary-600 text-center mb-3 ">
      <i className="fa-solid fa-user-pen"></i> Create Your Account 
      </h1>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            className="form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">*{formik.errors.name}</div>
          )}
        </div>

       
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">*{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">*{formik.errors.password}</div>
          )}
        </div>

 
        <div>
          <label htmlFor="rePassword" className="block text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="Confirm Your Password"
            className="form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div className="text-red-500 text-sm mt-1">*{formik.errors.rePassword}</div>
          )}
        </div>

       
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter Your Phone"
            className="form_Control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-sm mt-1">*{formik.errors.phone}</div>
          )}
        </div>

        {/* Form Error Message */}
        {formError && <div className="text-red-500 text-sm mt-2">*{formError}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitLoading}
          className="w-full py-3 mt-4 text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition duration-200 flex justify-center items-center gap-2"
        >
          {submitLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Sign up"}
        </button>
      </form>
    </div>
  </div>
</div>

    </>
  );
}
