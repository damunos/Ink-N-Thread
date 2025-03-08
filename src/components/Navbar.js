import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button"; // Ensure this file exists

const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Ink N Threadworks</Link>
      </h1>
      <div className="space-x-4">
        <Link to="/products">
          <Button variant="ghost" className="text-white">Products</Button>
        </Link>
        <Link to="/design">
          <Button variant="ghost" className="text-white">Design Tool</Button>
        </Link>
        <Link to="/track">
          <Button variant="ghost" className="text-white">Track Order</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
