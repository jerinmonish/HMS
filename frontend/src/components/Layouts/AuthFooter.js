import { Link } from "react-router-dom";
const AuthFooter = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <i className="fas fa-cubes fa-lg text-purple-500"></i>
            <span className="ml-3 text-xl">Tailwind elements</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, quam?
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">First Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Second Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Third Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">First Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Second Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Third Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">First Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Second Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Third Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">First Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Second Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Third Link</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">Fourth Link</Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2021 Copyright:
            <Link to="https://www.tailwind-elements.com/" className="text-gray-600 ml-1" target="_blank">Tailwind Element</Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <Link to="/" className="text-gray-500">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="/" className="ml-3 text-gray-500">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="/" className="ml-3 text-gray-500">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link to="/" className="ml-3 text-gray-500">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link to="/" className="ml-3 text-gray-500">
              <i className="fab fa-instagram"></i>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default AuthFooter;