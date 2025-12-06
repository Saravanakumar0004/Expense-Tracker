import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

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
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWith: 1,
        hoverOffset: 4,
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
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Transaction Overview
        </h1>
        <button
          onClick={fetchTransactions}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading chart data...</p>
        </div>
      )}
      
      {isError && (
        <div className="text-center py-8">
          <p className="text-red-600">Error loading chart data: {error?.message}</p>
          <button
            onClick={fetchTransactions}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      )}
      
      {!isLoading && !isError && transactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No transactions found. Add some transactions to see the chart!</p>
        </div>
      )}
      
      {!isLoading && !isError && transactions.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-green-800 font-semibold">Total Income</h3>
              <p className="text-2xl font-bold text-green-600">${totals?.income?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="text-red-800 font-semibold">Total Expense</h3>
              <p className="text-2xl font-bold text-red-600">${totals?.expense?.toLocaleString() || 0}</p>
            </div>
          </div>
          <div style={{ height: "350px" }}>
            <Doughnut data={data} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionChart;