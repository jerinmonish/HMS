import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/helper";
const Home = () => {
  var footerDate = new Date();
  const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_960_720.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://cdn.pixabay.com/photo/2016/03/05/20/07/grilled-1238668_960_720.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-700 text-white">
      <nav className="flex items-center justify-between flex-wrap bg-red-600 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
          <span className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">DBC</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            About Us
            </Link>
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Our Mission
            </Link>
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Contact Us
            </Link>
          </div>
          <div>

            {(() => {
        if (isLoggedIn()) {
          return (
            <>
              <Link to="user-dashboard" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-4">Dashboard</Link>
            </>
          )
        } else {
          return (
            <>
              <Link to="register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-4">Sign Up</Link>
              <Link to="login" className="bg-yellow-400 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign In</Link>
            </>
          )
        }
      })()}
          </div>
        </div>
      </nav>
      </header>
      <main className="flex-1 overflow-y-auto p-5">
        <div className="py-20" style={{ 'background': 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 text-white">
            DBC Street Food
          </h2>
          <h3 className="text-2xl mb-8 text-gray-200">
            A Food with Good Nutriets which boosts Strength & Energy
          </h3>
          {/* <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
            Pre Order
          </button> */}
        </div>
      </div>
      <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 text-center">Our Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to="/">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        <section className="bg-gray-100">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Reviews
            </h2>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">Very Good Food.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">John Doe</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">Chappthi and Curry are Delicious, especially that Channa.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">Jane Doe</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">I don't regret buying this wearble gadget. One of the best gadgets I own!.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">James Doe</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ 'backgroundImage': `url("https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_960_720.jpg")`,'backgroundSize':'cover','overflow':'hidden' }}>
          <div className="container mx-auto px-6 text-center py-20">
            <h2 className="mb-6 text-4xl font-bold text-center text-white">
              Limited in Stock
            </h2>
            <h3 className="my-4 text-2xl text-white">
              Get yourself the Order Now
            </h3>
            <button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
              Pre Order
            </button>
          </div>
        </section>
      </main>
      <footer className="py-5 bg-red-600 text-center text-white">
        {footerDate.toLocaleDateString()} &copy; DBC. All Rights Received
      </footer>
    </div>
  )
}
export default Home