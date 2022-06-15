import React, { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../actions/user";
import { useHistory } from "react-router-dom";

const AuthNavbar = (props) => {
  const dispatch = useDispatch();
  const history  = useHistory();
  const userDetails = useSelector(state => state.userLogin);
  let uDetailsS = JSON.parse(userDetails?.userDetails);
  let uDetailsL = JSON.parse(localStorage.getItem('userDetails'));
  const handleLogout = () => {
    dispatch(userLogout(history));
  }
  return (
    <>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className=" container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div>
              <Link className=" text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300" to="/">
                DBC Fast Food
              </Link>
            </div>


            <div className="flex md:hidden">
              <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="items-center md:flex">
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link className="my-1 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/user-dashboard">Dashboard</Link>
              <Link className="my-1 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/my-cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
            </div>

            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700">{(uDetailsS?.name) ? uDetailsS?.name : uDetailsL?.name }  - Profile</Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700">My Orders</Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700">Settings</Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button className="block px-4 py-2 text-sm text-gray-700" onClick={handleLogout}>Sign Out</button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>
    </>
  )
}
export default AuthNavbar;
