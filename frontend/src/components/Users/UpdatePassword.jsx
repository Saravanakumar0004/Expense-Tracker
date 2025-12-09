import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
  //Dispatch
  const dispatch = useDispatch();
  // State for mutation
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setError(null);
      
      try {
        const data = await changePasswordAPI(values.password);
        setIsSuccess(true);
        //Logout
        dispatch(logoutAction());
        //remove the user from storage
        localStorage.removeItem("userInfo");
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
    <div className="max-w-md mx-auto my-10 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-yellow-600/30 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-6">
        Change Your Password
      </h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {isPending && <AlertMessage type="loading" message="Updating...." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || error?.message || "Password update failed. Please try again."} />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Password updated successfully! Logging you out..."
          />
        )}
        
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="new-password"
          >
            New Password
          </label>
          
          <div className="relative transform transition-all duration-300 hover:scale-102">
            <AiOutlineLock className="absolute top-4 left-4 text-yellow-500 text-xl" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/50 border border-gray-700 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
              placeholder="Enter new password"
            />
          </div>
          
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-400 animate-shake block">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;