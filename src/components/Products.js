import React from "react";

const products = [
  {
    id: 1,
    name: "Custom T-Shirt",
    price: "$20.00",
    image: "/images/tshirt.png",
  },
  {
    id: 2,
    name: "Embroidered Hoodie",
    price: "$40.00",
    image: "/images/hoodie.png",
  },
  {
    id: 3,
    name: "Custom Cap",
    price: "$15.00",
    image: "/images/cap.png",
  },
  {
    id: 4,
    name: "Screen Printed Tote Bag",
    price: "$18.00",
    image: "/images/tote.png",
  },
];

const Products = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-black text-center mb-8">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-black mt-4">
              {product.name}
            </h3>
            <p className="text-gray-700">{product.price}</p>
            <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg w-full">
              Customize Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
