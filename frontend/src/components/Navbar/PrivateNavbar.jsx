import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { SiAuthy } from "react-icons/si";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  //Dispatch
  const dispatch = useDispatch();
  //Logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //remove the user from storage
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-yellow-600/30 shadow-lg shadow-yellow-500/10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-start items-center">
              <div className="flex justify-center flex-row w-full">
                <div className="-ml-2 mr-2 flex items-left md:hidden">
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
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/add-transaction"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  >
                    Add Transaction
                  </Link>
                  <Link
                    to="/transactions"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  >
                    Transactions
                  </Link>
                  <Link
                    to="/chart"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  >
                    Chart
                  </Link>
                  <Link
                    to="/add-category"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  >
                    Add Category
                  </Link>
                  <Link
                    to="/categories"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    onClick={logoutHandler}
                    type="button"
                    className="relative m-2 inline-flex items-center gap-x-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml-1 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-yellow-500/10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 p-1 transition-all duration-300">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-gray-900 border border-yellow-600/30 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active ? "bg-yellow-500/10 text-yellow-500" : "text-gray-300",
                                "block px-4 py-2 text-sm transition-all duration-300"
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-red-500/10 text-red-500" : "text-gray-300",
                                "block w-full text-left px-4 py-2 text-sm transition-all duration-300"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs  private links*/}
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
              <Link to="/add-transaction">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Add Transaction
                </Disclosure.Button>
              </Link>
              <Link to="/transactions">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Transactions
                </Disclosure.Button>
              </Link>
              <Link to="/chart">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Chart
                </Disclosure.Button>
              </Link>
              <Link to="/add-category">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Add Category
                </Disclosure.Button>
              </Link>
              <Link to="/categories">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Categories
                </Disclosure.Button>
              </Link>
              <Link to="/profile">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  Profile
                </Disclosure.Button>
              </Link>
              <Link to="/dashboard">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 sm:pl-5 sm:pr-6 transition-all duration-300 w-full text-left"
                >
                  My Dashboard
                </Disclosure.Button>
              </Link>
            </div>
            {/* Profile links */}
            <div className="border-t border-yellow-600/20 pb-3 pt-4">
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="button"
                  onClick={logoutHandler}
                  className="block px-4 py-2 text-base font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 sm:px-6 transition-all duration-300 w-full text-left"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}