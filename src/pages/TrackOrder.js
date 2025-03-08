import React, { useState } from "react";

const mockOrders = {
  "12345": { status: "Processing", estimatedDelivery: "March 15, 2025" },
  "67890": { status: "Shipped", estimatedDelivery: "March 10, 2025" },
  "11121": { status: "Delivered", estimatedDelivery: "March 5, 2025" },
};

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrackOrder = () => {
    if (mockOrders[orderNumber]) {
      setOrderStatus(mockOrders[orderNumber]);
    } else {
      setOrderStatus({ status: "Order Not Found", estimatedDelivery: "N/A" });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Track Your Order
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Enter your order number below to check the status of your order.
      </p>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Enter Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-l-md w-64 focus:outline-none"
        />
        <button
          onClick={handleTrackOrder}
          className="bg-gray-700 text-white px-6 py-2 rounded-r-md hover:bg-gray-800 transition"
        >
          Track Order
        </button>
      </div>

      {orderStatus && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Order Status: {orderStatus.status}
          </h2>
          <p className="text-gray-600">
            Estimated Delivery: {orderStatus.estimatedDelivery}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
