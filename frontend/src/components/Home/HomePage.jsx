import React from "react";
import {
  FaMoneyBillWave,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaQuoteLeft,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Users/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const HeroSection = () => {
  return (
    <>
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#0c0f18] to-[#0e111d] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Animated Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl font-extrabold text-center text-[#f5b100] drop-shadow-md"
          >
            Track Your Expenses Effortlessly
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-center text-gray-300"
          >
            Manage your finances with a premium, modern solution.
          </motion.p>

          {/* Animated Feature Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex space-x-12 mt-12"
          >
            {/* ICON ITEM */}
            {[
              { icon: <FaMoneyBillWave />, label: "Efficient Tracking" },
              { icon: <FaFilter />, label: "Advanced Filtering" },
              { icon: <IoIosStats />, label: "Insightful Reports" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl text-[#f5b100] drop-shadow-lg">
                  {item.icon}
                </div>
                <p className="mt-3 text-gray-300">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA BUTTON WITH GLOW */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/register">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px #f5b100",
                }}
                className="mt-10 px-8 py-3 bg-[#f5b100] text-black font-semibold rounded-lg shadow-xl hover:bg-[#ffcc33] transition duration-300"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="py-20 px-4 bg-[#0b0d14] text-white">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-[#f5b100]"
        >
          How It Works
        </motion.h2>

        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <FaSignInAlt />, title: "Sign Up", desc: "Register and start instantly." },
            { icon: <FaList />, title: "Add Transactions", desc: "Track income & expenses easily." },
            { icon: <FaChartPie />, title: "View Reports", desc: "See powerful financial insights." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center bg-[#131722] p-8 rounded-xl shadow-lg border border-[#f5b100]/20"
            >
              <div className="p-4 rounded-full bg-[#f5b100] text-black mb-4 shadow-lg">
                {step.icon}
              </div>
              <h3 className="font-semibold text-[#f5b100]">{step.title}</h3>
              <p className="text-gray-300 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-[#0e111a] py-20 px-4 text-white">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-[#f5b100]"
        >
          What Our Users Say
        </motion.h2>

        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#131722] p-8 rounded-xl shadow-lg border border-[#f5b100]/20"
            >
              <FaQuoteLeft className="text-2xl text-[#f5b100]" />
              <p className="mt-4 text-gray-300">
                {i === 0
                  ? `"This app completely changed how I track my expenses!"`
                  : `"Elegant and effortless finance management!"`}
              </p>
              <p className="mt-4 font-bold text-[#f5b100]">
                {i === 0 ? "- Jane Doe" : "- John Smith"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-[#0c0f18] text-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-[#f5b100]">
            Ready to Take Control of Your Finances?
          </h2>

          <p className="mt-4 text-gray-300">
            Join us and start managing your money like a pro!
          </p>

          <Link to="/register">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px #f5b100",
              }}
              className="mt-10 px-8 py-3 bg-[#f5b100] text-black font-semibold rounded-lg shadow-xl hover:bg-[#ffcc33] transition duration-300"
            >
              Sign Up For Free
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default HeroSection;
