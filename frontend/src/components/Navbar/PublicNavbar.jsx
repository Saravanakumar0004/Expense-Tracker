import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-yellow-600/30 shadow-lg shadow-yellow-500/10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 transition-all duration-300">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {/* Logo */}
                  <SiAuthy className="h-8 w-auto text-yellow-500 animate-pulse" />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-yellow-500 px-1 pt-1 text-sm font-medium text-yellow-500 transition-all duration-300"
                  >
                    Expense Tracker
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Link
                    to="/register"
                    className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-pink-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:from-pink-700 hover:to-pink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaRegUser className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="relative ml-2 inline-flex items-center gap-x-1.5 rounded-lg bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 animate-pulse transition-all duration-300 transform hover:scale-105"
                  >
                    <RiLoginCircleLine
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-yellow-600/20">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  MasyncTracker
                </Disclosure.Button>
              </Link>

              <Link to="/register">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}