import React, { useState } from "react";

const OrderTracker = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockOrderData = {
    "12345": { status: "In Production", estimatedDelivery: "March 12, 2025" },
    "67890": { status: "Shipped", estimatedDelivery: "March 9, 2025" },
  };

  const trackOrder = () => {
    setLoading(true);
    setTimeout(() => {
      if (mockOrderData[orderNumber]) {
        setOrderStatus(mockOrderData[orderNumber]);
      } else {
        setOrderStatus({ status: "Order Not Found", estimatedDelivery: "-" });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-black mb-4">Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Order Number"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded-md"
      />
      <button
        onClick={trackOrder}
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
        disabled={loading}
      >
        {loading ? "Tracking..." : "Track Order"}
      </button>

      {orderStatus && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="text-xl font-semibold text-black">Order Status</h3>
          <p className="text-gray-700 mt-2">Status: <span className="font-bold">{orderStatus.status}</span></p>
          <p className="text-gray-700">Estimated Delivery: <span className="font-bold">{orderStatus.estimatedDelivery}</span></p>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
