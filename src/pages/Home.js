import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button"; // Ensure the Button component is properly linked

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-700 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Ink N Threadworks</h1>
        <div>
          <Link to="/products">
            <Button variant="ghost" className="text-white mx-2">Products</Button>
          </Link>
          <Link to="/design-tool">
            <Button variant="ghost" className="text-white mx-2">Design Tool</Button>
          </Link>
          <Link to="/order-tracker">
            <Button variant="ghost" className="text-white mx-2">Track Order</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 bg-white">
        <h2 className="text-4xl font-bold text-black">Create Custom Apparel with Ease</h2>
        <p className="text-gray-700 mt-2">
          Upload your design, customize, and place your order in minutes!
        </p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Link to="/design-tool">
            <Button className="bg-gray-700 text-white px-6 py-3 rounded-lg">Start Designing</Button>
          </Link>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="p-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-200 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-black">Custom Screen Printing</h3>
            <p className="text-gray-700 mt-2">High-quality prints on t-shirts, hoodies, and more.</p>
          </div>
          <div className="p-6 bg-gray-200 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-black">Embroidery</h3>
            <p className="text-gray-700 mt-2">Personalized embroidery for professional and casual wear.</p>
          </div>
          <div className="p-6 bg-gray-200 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-black">Fast Turnaround</h3>
            <p className="text-gray-700 mt-2">Quick production times to meet your deadlines.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-10 bg-gray-300">
        <h2 className="text-3xl font-bold text-black">Get Started Today!</h2>
        <p className="text-gray-700 mt-2">Design your own custom apparel in just a few clicks.</p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Link to="/design-tool">
            <Button className="bg-gray-700 text-white px-6 py-3 rounded-lg">Start Designing</Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 text-white text-center p-4 mt-10">
        <p>&copy; {new Date().getFullYear()} Ink N Threadworks - All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
