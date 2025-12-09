import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import Footer from "./Footer";

//Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const RegistrationForm = () => {
  //Navigate
  const navigate = useNavigate();
  // State for mutation
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
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
        const data = await registerAPI(values);
        console.log(data);
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
        navigate("/login");
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
          Sign Up
        </h2>
        
        {/* Display messages */}
        {isPending && <AlertMessage type="loading" message="Creating your account...." />}
        {isError && (
          <AlertMessage 
            type="error" 
            message={error?.response?.data?.message || error?.message || "Registration failed. Please try again."} 
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Registration success! Redirecting to login..." />
        )}
        
        <p className="text-sm text-center text-gray-400 mb-8">
          Join our community now!
        </p>

        {/* Input Field - Username */}
        <div className="relative mb-6 transform transition-all duration-300 hover:scale-102">
          <FaUser className="absolute top-4 left-4 text-yellow-500" />
          <input
            id="username"
            type="text"
            {...formik.getFieldProps("username")}
            placeholder="Username"
            className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/50 border border-gray-700 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
          />
          {formik.touched.username && formik.errors.username && (
            <span className="text-xs text-red-400 mt-1 block animate-shake">{formik.errors.username}</span>
          )}
        </div>

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

        {/* Input Field - Confirm Password */}
        <div className="relative mb-6 transform transition-all duration-300 hover:scale-102">
          <FaLock className="absolute top-4 left-4 text-yellow-500" />
          <input
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            placeholder="Confirm Password"
            className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/50 border border-gray-700 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-xs text-red-400 mt-1 block animate-shake">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating Account..." : "Register"}
        </button>
      </div>
    </form>
    <footer>
      <Footer/>
    </footer>
    </>
  );
};

export default RegistrationForm;