import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";
import Footer from "../Users/Footer";

const CategoriesList = () => {
  // State for data and loading
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Navigate
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const result = await listCategoriesAPI();
      setData(result);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setIsPending(true);
      try {
        await deleteCategoryAPI(id);
        // Refresh the list
        fetchCategories();
      } catch (e) {
        console.log(e);
      } finally {
        setIsPending(false);
      }
    }
  };
  
  return (
    <>
    <div className="max-w-2xl mx-auto my-10 bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-yellow-600/30 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-6">
        Categories
      </h2>
      
      {/* Display message */}
      {isLoading && <AlertMessage type="loading" message="Loading categories..." />}
      {isError && (
        <AlertMessage type="error" message={error?.response?.data?.message || error?.message || "Failed to load categories."} />
      )}
      
      {!isLoading && !isError && data.length === 0 && (
        <div className="text-center py-8 bg-yellow-900/10 rounded-xl border border-yellow-600/30 p-6">
          <p className="text-gray-400">No categories found. Add some categories to get started!</p>
        </div>
      )}
      
      <ul className="space-y-3">
        {data?.map((category, index) => (
          <li
            key={category?._id}
            className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-yellow-500/20"
            style={{
              animation: `slideIn 0.5s ease-out ${index * 0.05}s backwards`
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-200 font-medium text-lg">{category?.name}</span>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                  category.type === "income"
                    ? "bg-green-900/50 text-green-400 border border-green-500/30"
                    : "bg-red-900/50 text-red-400 border border-red-500/30"
                }`}
              >
                {category?.type?.charAt(0).toUpperCase() +
                  category?.type?.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/update-category/${category._id}`}>
                <button className="text-yellow-500 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 p-2 hover:bg-yellow-500/10 rounded-lg">
                  <FaEdit size={18} />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(category?._id)}
                disabled={isPending}
                className="text-red-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-2 hover:bg-red-500/10 rounded-lg disabled:opacity-50"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <footer>
      <Footer />
    </footer>
    </>
  );
};

export default CategoriesList;