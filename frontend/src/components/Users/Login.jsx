import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";
import Footer from "./Footer";

//! Validations
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Email is required"),
});

const LoginForm = () => {
  //Navigate
  const navigate = useNavigate();
  //Dispatch
  const dispatch = useDispatch();
  // State for mutation
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "ben@gmail.com",
      password: "123456",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: async (values) => {
      console.log(values);
      setIsPending(true);
      setIsError(false);
      setError(null);
      
      try {
        const data = await loginAPI(values);
        //dispatch
        dispatch(loginAction(data));
        //Save the user into localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        setIsSuccess(true);
        setIsPending(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setIsError(true);
        setIsPending(false);
      }
    },
  });
  //Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/profile");
      }
    }, 3000);
  }, [isPending, isError, error, isSuccess]);

  return (
    <>
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl space-y-6 border border-yellow-600/30 backdrop-blur-sm animate-fadeIn relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
          Login
        </h2>
        {/* Display messages */}
        {isPending && <AlertMessage type="loading" message="Login you in...." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || error?.message || "Login failed. Please try again."} />
        )}
        {isSuccess && <AlertMessage type="success" message="Login success" />}
        <p className="text-sm text-center text-gray-400 mb-8">
          Login to access your account
        </p>

        {/* Input Field - Email */}
        <div className="relative mb-6 transform transition-all duration-300 hover:scale-102">
          <FaEnvelope className="absolute top-4 left-4 text-yellow-500" />
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/50 border border-gray-700 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-400 mt-1 block animate-shake">{formik.errors.email}</span>
          )}
        </div>

        {/* Input Field - Password */}
        <div className="relative mb-6 transform transition-all duration-300 hover:scale-102">
          <FaLock className="absolute top-4 left-4 text-yellow-500" />
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
            className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/50 border border-gray-700 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-400 mt-1 block animate-shake">{formik.errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
    <footer>
      <Footer/>
    </footer>
    </>
  );
};

export default LoginForm;