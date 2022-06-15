import React, { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
const AdminFooter = () => {
  return (
    <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
      <div className="text-center p-6 bg-gray-200">
        <span>© 2021 Copyright:</span>
        <a className="text-gray-600 font-semibold" href="https://tailwind-elements.com/">Tailwind Elements</a>
      </div>
    </footer>
  )
}
export default AdminFooter