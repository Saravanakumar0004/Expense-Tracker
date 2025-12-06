import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import LoginForm from "./components/Users/Login";
import { useSelector } from "react-redux";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import TransactionList from "./components/Transactions/TransactionList";
import TransactionChart from "./components/Transactions/TransactionChart";
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UserProfile";
import AuthRoute from "./components/Auth/AuthRoute";

function App() {
  const user = useSelector((state) => state?.auth?.user);

  // Simple test component to debug
  const TestComponent = () => (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-blue-600">App is Working! 🎉</h1>
      <p className="text-xl mt-4">If you can see this, React is rendering properly.</p>
      <p className="text-lg mt-2">User state: {user ? 'Logged in' : 'Not logged in'}</p>
    </div>
  );

  return (
    <BrowserRouter>
      {/* Navbar */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      
      <Routes>
        {/* Test route first */}
        <Route path="/test" element={<TestComponent />} />
        
        {/* Main routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/add-category"
          element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AuthRoute>
              <CategoriesList />
            </AuthRoute>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AuthRoute>
              <UpdateCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <AuthRoute>
              <TransactionForm />
            </AuthRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <AuthRoute>
              <TransactionList />
            </AuthRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <AuthRoute>
              <TransactionChart />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;