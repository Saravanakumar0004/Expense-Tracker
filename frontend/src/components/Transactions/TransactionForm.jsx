import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";
import Footer from "../Users/Footer";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

const TransactionForm = () => {
  //Navigate
  const navigate = useNavigate();

  // State for mutation and data
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const result = await listCategoriesAPI();
      setData(result);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      setIsError(false);
      setError(null);
      
      try {
        const result = await addTransactionAPI(values);
        console.log(result);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/transactions");
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
      className="max-w-lg mx-auto my-10 bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl space-y-6 border border-yellow-600/30 backdrop-blur-sm animate-fadeIn"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2">
          Transaction Details
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
        <AlertMessage type="success" message="Transaction added successfully! Redirecting..." />
      )}
      
      {/* Transaction Type Field */}
      <div className="space-y-2 transform transition-all duration-300 hover:scale-102">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-300 font-medium"
        >
          <FaWallet className="text-yellow-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="block w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600"
        >
          <option value="" className="bg-gray-900">Select transaction type</option>
          <option value="income" className="bg-gray-900">Income</option>
          <option value="expense" className="bg-gray-900">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-400 text-xs animate-shake">{formik.errors.type}</p>
        )}
      </div>

      {/* Amount Field */}
      <div className="flex flex-col space-y-2 transform transition-all duration-300 hover:scale-102">
        <label htmlFor="amount" className="text-gray-300 font-medium flex items-center gap-2">
          <FaDollarSign className="text-yellow-500" />
          Amount
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Enter amount"
          className="w-full border border-gray-700 bg-black/50 text-white rounded-lg shadow-sm py-3 px-4 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-400 text-xs italic animate-shake">{formik.errors.amount}</p>
        )}
      </div>

      {/* Category Field */}
      <div className="flex flex-col space-y-2 transform transition-all duration-300 hover:scale-102">
        <label htmlFor="category" className="text-gray-300 font-medium flex items-center gap-2">
          <FaRegCommentDots className="text-yellow-500" />
          Category
        </label>
        <select
          {...formik.getFieldProps("category")}
          id="category"
          className="w-full border border-gray-700 bg-black/50 text-white rounded-lg shadow-sm py-3 px-4 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600"
        >
          <option value="" className="bg-gray-900">Select a category</option>
          {data?.map((category) => {
            return (
              <option key={category?._id} value={category?.name} className="bg-gray-900">
                {category?.name}
              </option>
            );
          })}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-400 text-xs italic animate-shake">
            {formik.errors.category}
          </p>
        )}
      </div>

      {/* Date Field */}
      <div className="flex flex-col space-y-2 transform transition-all duration-300 hover:scale-102">
        <label htmlFor="date" className="text-gray-300 font-medium flex items-center gap-2">
          <FaCalendarAlt className="text-yellow-500" />
          Date
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="w-full border border-gray-700 bg-black/50 text-white rounded-lg shadow-sm py-3 px-4 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-red-400 text-xs italic animate-shake">{formik.errors.date}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="flex flex-col space-y-2 transform transition-all duration-300 hover:scale-102">
        <label htmlFor="description" className="text-gray-300 font-medium flex items-center gap-2">
          <FaRegCommentDots className="text-yellow-500" />
          Description (Optional)
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Enter description"
          rows="3"
          className="w-full border border-gray-700 bg-black/50 text-white rounded-lg shadow-sm py-3 px-4 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 placeholder-gray-500"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-400 text-xs italic animate-shake">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting..." : "Submit Transaction"}
      </button>
    </form>
    <footer>
      <Footer/>
    </footer>
    </>
  );
};

export default TransactionForm;