import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listTransactionsAPI, deleteTransactionAPI } from "../../services/transactions/transactionService";
import { listCategoriesAPI } from "../../services/category/categoryService";
import Footer from "../Users/Footer";

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
    <>
    <div className="my-8 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-yellow-600/30 backdrop-blur-sm animate-fadeIn">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-8">
        Transactions
      </h2>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600"
        />
        {/* End Date */}
        <input
          value={filters.endDate}
          onChange={handleFilterChange}
          type="date"
          name="endDate"
          className="p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600"
        />
        {/* Type */}
        <div className="relative">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 appearance-none"
          >
            <option value="" className="bg-gray-900">All Types</option>
            <option value="income" className="bg-gray-900">Income</option>
            <option value="expense" className="bg-gray-900">Expense</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {/* Category */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={handleFilterChange}
            name="category"
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 hover:border-yellow-600 appearance-none"
          >
            <option value="All" className="bg-gray-900">All Categories</option>
            <option value="Uncategorized" className="bg-gray-900">Uncategorized</option>
            {categoriesData?.map((category) => {
              return (
                <option key={category?._id} value={category?.name} className="bg-gray-900">
                  {category?.name}
                </option>
              );
            })}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      {/* Transactions List */}
      <div className="bg-gradient-to-br from-black/40 to-gray-900/40 p-6 rounded-xl border border-gray-800">
        <h3 className="text-xl font-semibold mb-6 text-yellow-500">
          Filtered Transactions
        </h3>
        
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            <p className="text-gray-400 mt-4">Loading transactions...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 bg-red-900/20 rounded-xl border border-red-500/30 p-6">
            <p className="text-red-400">Error loading transactions: {error?.message}</p>
          </div>
        )}
        
        {!isLoading && !error && transactions && transactions.length === 0 && (
          <div className="text-center py-12 bg-yellow-900/10 rounded-xl border border-yellow-600/30 p-6">
            <p className="text-gray-400 text-lg">No transactions found.</p>
          </div>
        )}
        
        <ul className="space-y-3">
          {transactions?.map((transaction, index) => (
            <li
              key={transaction._id}
              className="bg-black/40 p-4 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-yellow-500/20"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.05}s backwards`
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-gray-400 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                        transaction.type === "income"
                          ? "bg-green-900/50 text-green-400 border border-green-500/30"
                          : "bg-red-900/50 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </span>
                    <span className="text-gray-300 font-medium">
                      {transaction.category}
                    </span>
                    <span className="text-yellow-500 font-bold text-lg">
                      ${transaction.amount.toLocaleString()}
                    </span>
                  </div>
                  {transaction.description && (
                    <p className="text-sm text-gray-500 italic mt-2">
                      {transaction.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-3 ml-4">
                  <button
                    onClick={() => handleUpdateTransaction(transaction._id)}
                    className="text-yellow-500 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 p-2 hover:bg-yellow-500/10 rounded-lg"
                    title="Edit transaction"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-2 hover:bg-red-500/10 rounded-lg disabled:opacity-50"
                    title="Delete transaction"
                    disabled={isDeleting}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <footer>
        <Footer />
      </footer>
    </>
  );
};

export default TransactionList;