import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useState } from "react";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import Footer from "./Footer";

const UserProfile = () => {
  // State for mutation
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },

    //Submit
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setError(null);
      
      try {
        const data = await updateProfileAPI(values);
        console.log(data);
        setIsSuccess(true);
      } catch (e) {
        console.log(e);
        setError(e);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    },
  });
  
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-yellow-600/30 backdrop-blur-sm">
        <h1 className="mb-6 text-3xl text-center font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Welcome to Your Profile
        </h1>
        
        <h3 className="text-xl font-semibold text-gray-300 mb-6">
          Update Profile
        </h3>
        
        {/* Display message */}
        {isPending && <AlertMessage type="loading" message="Updating...." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || error?.message || "Update failed. Please try again."} />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Profile updated successfully!" />
        )}
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* User Name Field */}
          <div className="transform transition-all duration-300 hover:scale-102">
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-3xl text-yellow-500" />
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Username
                </label>
                <input
                  {...formik.getFieldProps("username")}
                  type="text"
                  id="username"
                  className="w-full border border-gray-700 bg-black/50 text-white rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
                  placeholder="Your username"
                />
              </div>
            </div>
            {formik.touched.username && formik.errors.username && (
              <span className="text-xs text-red-400 mt-1 block animate-shake">
                {formik.errors.username}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="transform transition-all duration-300 hover:scale-102">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-3xl text-yellow-500" />
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  className="w-full border border-gray-700 bg-black/50 text-white rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
                  placeholder="Your email"
                />
              </div>
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-400 mt-1 block animate-shake">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
      <footer>
      <Footer/>
    </footer>
    </>
  );
};

export default UserProfile;