import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listTransactionsAPI, deleteTransactionAPI } from "../../services/transactions/transactionService";
import { listCategoriesAPI } from "../../services/category/categoryService";

const TransactionList = () => {
  //!Filtering state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });
  //!Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // State for data and loading
  const [categoriesData, setCategoriesData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryErr, setCategoryErr] = useState(null);
  const [error, setError] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    setCategoryLoading(true);
    try {
      const data = await listCategoriesAPI();
      setCategoriesData(data);
    } catch (err) {
      setCategoryErr(err);
    } finally {
      setCategoryLoading(false);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await listTransactionsAPI(filters);
      setTransactions(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [filters]);

  // Handle delete transaction
  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setIsDeleting(true);
      try {
        await deleteTransactionAPI(transactionId);
        // Refresh the list
        fetchTransactions();
        toast.success("Transaction deleted successfully!");
      } catch (error) {
        console.error("Error deleting transaction:", error);
        toast.error("Failed to delete transaction");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Handle update transaction (navigate to update form)
  const handleUpdateTransaction = (transactionId) => {
    // For now, just log the ID. You can implement navigation to an update form later
    console.log("Update transaction:", transactionId);
  };

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* End Date */}
        <input
          value={filters.endDate}
          onChange={handleFilterChange}
          type="date"
          name="endDate"
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* Type */}
        <div className="relative">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {/* Category */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={handleFilterChange}
            name="category"
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="All">All Categories</option>
            <option value="Uncategorized">Uncategorized</option>
            {categoriesData?.map((category) => {
              return (
                <option key={category?._id} value={category?.name}>
                  {category?.name}
                </option>
              );
            })}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
        {/* Inputs and selects for filtering (unchanged) */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Filtered Transactions
          </h3>
          {isLoading && <p className="text-gray-600">Loading transactions...</p>}
          {error && <p className="text-red-600">Error loading transactions: {error?.message}</p>}
          {transactions && transactions.length === 0 && (
            <p className="text-gray-600">No transactions found.</p>
          )}
          <ul className="list-disc pl-5 space-y-2">
            {transactions?.map((transaction) => (
              <li
                key={transaction._id}
                className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-800">
                    {transaction.category} - $
                    {transaction.amount.toLocaleString()}
                  </span>
                  {transaction.description && (
                    <span className="text-sm text-gray-600 italic ml-2">
                      {transaction.description}
                    </span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdateTransaction(transaction._id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit transaction"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete transaction"
                    disabled={isDeleting}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;