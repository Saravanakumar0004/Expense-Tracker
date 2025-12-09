import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";
import Footer from "../Users/Footer";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await listTransactionsAPI();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching chart data:", err);
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount and refresh every 30 seconds
  useEffect(() => {
    fetchTransactions();
    
    // Set up periodic refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTransactions();
    }, 30000); // 30 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  //! calculate total income and expense
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += Number(transaction?.amount) || 0;
      } else {
        acc.expense += Number(transaction?.amount) || 0;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  

  //! Data structure for the chart
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.income, totals?.expense],
        backgroundColor: ["#10b981", "#ef4444"],
        borderColor: ["#059669", "#dc2626"],
        borderWith: 2,
        hoverOffset: 8,
      },
    ],
  };
  
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 15,
          font: {
            size: 14,
          },
          color: "#d1d5db",
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#fbbf24",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };
  
  return (
    <>
    <div className="my-8 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-yellow-600/30 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Transaction Overview
        </h1>
        <button
          onClick={fetchTransactions}
          disabled={isLoading}
          className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          <p className="text-gray-400 mt-4">Loading chart data...</p>
        </div>
      )}
      
      {isError && (
        <div className="text-center py-8 bg-red-900/20 rounded-xl border border-red-500/30 p-6">
          <p className="text-red-400 mb-4">Error loading chart data: {error?.message}</p>
          <button
            onClick={fetchTransactions}
            className="mt-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      )}
      
      {!isLoading && !isError && transactions.length === 0 && (
        <div className="text-center py-12 bg-yellow-900/10 rounded-xl border border-yellow-600/30 p-6">
          <p className="text-gray-400 text-lg">No transactions found. Add some transactions to see the chart!</p>
        </div>
      )}
      
      {!isLoading && !isError && transactions.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-6 rounded-xl border border-green-500/30 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
              <h3 className="text-green-400 font-semibold text-lg mb-2">Total Income</h3>
              <p className="text-3xl font-bold text-green-500">${totals?.income?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 p-6 rounded-xl border border-red-500/30 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
              <h3 className="text-red-400 font-semibold text-lg mb-2">Total Expense</h3>
              <p className="text-3xl font-bold text-red-500">${totals?.expense?.toLocaleString() || 0}</p>
            </div>
          </div>
          <div style={{ height: "400px" }} className="bg-black/30 p-6 rounded-xl border border-gray-800">
            <Doughnut data={data} options={options} />
          </div>

        </>
      )}
    </div>
    <footer>
        <Footer />
      </footer>
      </>
  );
};

export default TransactionChart;