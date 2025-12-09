import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0a0c14] to-[#0c101a] text-gray-300 py-10 mt-16 border-t border-[#f5b100]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LOGO & ABOUT */}
        <div>
          <h1 className="text-2xl font-bold text-[#f5b100]">Expense Tracker</h1>
          <p className="mt-4 text-gray-400">
            A modern solution to track your expenses, visualize your spending,
            and take control of your financial life.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-xl font-semibold text-[#f5b100]">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="/" className="hover:text-[#f5b100]">Home</a></li>
            <li><a href="/dashboard" className="hover:text-[#f5b100]">Dashboard</a></li>
            <li><a href="/transactions" className="hover:text-[#f5b100]">Transactions</a></li>
            <li><a href="/profile" className="hover:text-[#f5b100]">Profile</a></li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h2 className="text-xl font-semibold text-[#f5b100]">Follow Us</h2>
          <div className="flex space-x-6 mt-4 text-[#f5b100]">
            <a href="#" className="hover:text-white transition">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT LINE */}
      <div className="text-center text-gray-500 mt-10 border-t border-[#f5b100]/10 pt-6">
        © {new Date().getFullYear()} Expense Tracker — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
