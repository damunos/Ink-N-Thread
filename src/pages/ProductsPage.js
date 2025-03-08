import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "T-Shirt", image: "/images/tshirt.png", price: "$15.99" },
  { id: 2, name: "Hoodie", image: "/images/hoodie.png", price: "$29.99" },
  { id: 3, name: "Cap", image: "/images/cap.png", price: "$12.99" },
  { id: 4, name: "Polo Shirt", image: "/images/polo.png", price: "$19.99" },
];

const ProductsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Our Products
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Choose from our collection and customize your own design!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2 text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.price}</p>
            <Link to={`/design/${product.id}`} className="mt-4 inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              Customize Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
