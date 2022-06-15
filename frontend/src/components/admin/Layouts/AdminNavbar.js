import React, { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../actions/user";
import { useHistory } from "react-router-dom";
const AdminNavbar = () => {
  const dispatch = useDispatch();
  const history  = useHistory();
  const userDetails = useSelector(state => state.userLogin);
  let uDetailsS = JSON.parse(userDetails?.userDetails);
  let uDetailsL = JSON.parse(localStorage.getItem('userDetails'));
  const handleLogout = () => {
    dispatch(userLogout(history));
  }
  return (
    <nav id="header" className="bg-white fixed w-full z-10 top-0 shadow">
      <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
        <div className="w-1/2 pl-2 md:pl-0">
          <a className="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold" href="#">
            <i className="fa fa-sun text-pink-600 pr-3"></i> DBC Fast Food
          </a>
        </div>
        <div className="w-1/2 pr-0">
          <div className="flex relative inline-block float-right">
            <div className="relative text-sm">
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
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700">John Doe  - Profile</Link>
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
          </div>
          <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20" id="nav-content">
            <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
              <li className="mr-6 my-2 md:my-0">
                <Link to="/admin/dashboard" className="block py-1 md:py-3 pl-1 align-middle text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600">
                  <i className="fa fa-home fa-fw mr-3 text-pink-600"></i><span className="pb-1 md:pb-0 text-sm">Home</span>
                </Link>
              </li>
              <li className="mr-6 my-2 md:my-0">
                <Link to="/admin/product" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500">
                  <i className="fa fa-tasks fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Products</span>
                </Link>
              </li>
              <li className="mr-6 my-2 md:my-0">
                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500">
                  <i className="fa fa-envelope fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Messages</span>
                </a>
              </li>
              <li className="mr-6 my-2 md:my-0">
                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500">
                  <i className="fa fa-chart fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Analytics</span>
                </a>
              </li>
              <li className="mr-6 my-2 md:my-0">
                <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500">
                  <i className="fa-solid fa-wallet fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Payments</span>
                </a>
              </li>
            </ul>
          </div>
      </div>
    </nav>
  )
}
export default AdminNavbar