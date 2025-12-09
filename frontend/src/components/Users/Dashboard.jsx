import React from "react";
import TransactionChart from "../Transactions/TransactionChart";
import TransactionList from "../Transactions/TransactionList";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-fadeIn">
          Dashboard
        </h1>
        <TransactionChart />
        <TransactionList />
      </div>
    </div>
    <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default Dashboard;