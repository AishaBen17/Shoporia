import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { tokenContext } from "../../Context/Token.Context";
import { Helmet } from "react-helmet";
import bgImage from "../../assets/images/womanShop.jpg"; 

export default function Login() {
  const [formError, setFormError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(null);
  const { setToken } = useContext(tokenContext);  
  const navigate = useNavigate();

  async function submitForm(values) {
    setSubmitLoading(true);
    setFormError(null);
    let option = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      data: values,
    };
    let idToast = toast.loading("Loading...");
    axios
      .request(option)
      .then((res) => {
        if (res.data.message === "success") {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successfully");
          setTimeout(() => navigate("/"), 1000);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setFormError(err.response.data.message);
      })
      .finally(() => {
        toast.dismiss(idToast);
        setSubmitLoading(false);
      });
  }

  let validateForm = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
        "Must include uppercase, lowercase, and number (min 6 chars)"
      )
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: validateForm,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>

    
      <div
        className="min-h-screen flex items-center justify-start bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      >
      
        <div className="absolute inset-0 bg-black opacity-50"></div>

      
        <div className="ms-10 relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center z-10">
          <h2 className="text-2xl font-bold text-primary-500 mb-2"> Login <i className="text-4xl fa-solid fa-user-lock"></i></h2>
          <span className="text-sm text-secondary-600 block mb-4">
            Continue to your Store Shoporia
          </span>

        
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 text-left">
              <label className="block text-primary-700">Email:</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter Your Email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-4 text-left">
              <label className="block text-primary-700">Password:</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter Your Password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <button
              type="submit"
              disabled={submitLoading || !formik.isValid}
              className="mt-6 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-700 transition"
            >
              {submitLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Login"}
            </button>

            <Link to="/forgetpassword" className="block mt-2 text-primary-500 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/register" className="block mt-4 text-primary-400 hover:underline">
              <span className="font-mono">
                Don't have an account yet? <span className="font-bold">Sign up</span>
              </span>
            </Link>
          </form>
        </div>
      </div>
   </>
  );
}
