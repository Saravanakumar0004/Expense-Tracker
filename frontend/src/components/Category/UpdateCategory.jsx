import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";
import Footer from "../Users/Footer";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const UpdateCategory = () => {
  //Params
  const { id } = useParams();
  console.log(id);
  //Navigate
  const navigate = useNavigate();

  // State for mutation
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setError(null);
      
      const data = {
        ...values,
        id,
      };
      
      try {
        const result = await updateCategoryAPI(data);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/categories");
        }, 2000);
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
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl space-y-6 border border-yellow-600/30 backdrop-blur-sm animate-fadeIn hover:shadow-yellow-500/20 transition-all duration-500"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2">
          Update Category
        </h2>
        <p className="text-gray-400">Fill in the details below.</p>
      </div>
      
      {/* Display alert message */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something happened please try again later"
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Category updated successfully, redirecting..."
        />
      )}
      
      {/* Category Type */}
      <div className="space-y-2 transform transition-all duration-300 hover:scale-102">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-300 font-medium"
        >
          <FaWallet className="text-yellow-500 animate-pulse" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600"
        >
          <option value="" className="bg-gray-900">Select transaction type</option>
          <option value="income" className="bg-gray-900">Income</option>
          <option value="expense" className="bg-gray-900">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-400 text-xs animate-shake">{formik.errors.type}</p>
        )}
      </div>

      {/* Category Name */}
      <div className="flex flex-col transform transition-all duration-300 hover:scale-102">
        <label htmlFor="name" className="text-gray-300 font-medium mb-2">
          <SiDatabricks className="inline mr-2 text-yellow-500 animate-pulse" />
          Name
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="Enter category name"
          id="name"
          className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-400 text-xs italic mt-1 animate-shake">{formik.errors.name}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Updating..." : "Update Category"}
      </button>
    </form>
    <footer>
      <Footer/>
    </footer>
    </>
  );
};

export default UpdateCategory;