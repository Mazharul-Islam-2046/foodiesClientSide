import { useState } from "react";
import { ArrowLeft, Search, Filter, Calendar, Package, Clock, CheckCircle, XCircle, Truck, Eye, Star, RotateCcw } from "lucide-react";

export default function ViewAllOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Sample orders data
  const [orders] = useState([
    {
      _id: "ORD-2025-001",
      date: "2025-05-20T14:30:00Z",
      status: "delivered",
      total: 1850,
      items: [
        { name: "Chicken Biryani", quantity: 2, price: 450 },
        { name: "Beef Curry", quantity: 1, price: 380 },
        { name: "Naan Bread", quantity: 3, price: 80 },
        { name: "Mango Lassi", quantity: 2, price: 120 }
      ],
      restaurant: {
        name: "Spice Palace",
        address: "123 Food Street, Dhaka"
      },
      deliveryAddress: "456 Home Avenue, Dhaka 1207",
      paymentMethod: "Cash on Delivery",
      deliveryTime: "45 minutes",
      rating: 4.5,
      deliveryFee: 60
    },
    {
      _id: "ORD-2025-002",
      date: "2025-05-18T19:15:00Z",
      status: "on_the_way",
      total: 1200,
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 650 },
        { name: "Chicken Wings", quantity: 1, price: 350 },
        { name: "Coca Cola", quantity: 2, price: 80 }
      ],
      restaurant: {
        name: "Pizza Corner",
        address: "789 Main Road, Dhaka"
      },
      deliveryAddress: "456 Home Avenue, Dhaka 1207",
      paymentMethod: "Online Payment",
      deliveryTime: "30 minutes",
      estimatedDelivery: "2025-05-18T20:00:00Z",
      deliveryFee: 50
    },
    {
      _id: "ORD-2025-003",
      date: "2025-05-15T13:20:00Z",
      status: "cancelled",
      total: 980,
      items: [
        { name: "Fried Rice", quantity: 2, price: 280 },
        { name: "Sweet & Sour Chicken", quantity: 1, price: 420 }
      ],
      restaurant: {
        name: "Golden Dragon",
        address: "321 China Town, Dhaka"
      },
      deliveryAddress: "456 Home Avenue, Dhaka 1207",
      paymentMethod: "Cash on Delivery",
      cancelReason: "Restaurant unavailable",
      deliveryFee: 40
    },
    {
      _id: "ORD-2025-004",
      date: "2025-05-12T12:45:00Z",
      status: "delivered",
      total: 1450,
      items: [
        { name: "Burger Combo", quantity: 2, price: 550 },
        { name: "French Fries", quantity: 1, price: 150 },
        { name: "Chocolate Shake", quantity: 2, price: 200 }
      ],
      restaurant: {
        name: "Burger House",
        address: "555 Fast Food Lane, Dhaka"
      },
      deliveryAddress: "456 Home Avenue, Dhaka 1207",
      paymentMethod: "Online Payment",
      deliveryTime: "25 minutes",
      rating: 4.0,
      deliveryFee: 45
    },
    {
      _id: "ORD-2025-005",
      date: "2025-05-10T20:30:00Z",
      status: "preparing",
      total: 2100,
      items: [
        { name: "Mutton Biryani", quantity: 1, price: 550 },
        { name: "Chicken Karahi", quantity: 1, price: 480 },
        { name: "Garlic Naan", quantity: 4, price: 120 },
        { name: "Raita", quantity: 2, price: 60 }
      ],
      restaurant: {
        name: "Royal Kitchen",
        address: "777 Heritage Street, Dhaka"
      },
      deliveryAddress: "456 Home Avenue, Dhaka 1207",
      paymentMethod: "Cash on Delivery",
      estimatedDelivery: "2025-05-10T21:30:00Z",
      deliveryFee: 70
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle size={20} className="text-green-500" />;
      case "on_the_way":
        return <Truck size={20} className="text-blue-500" />;
      case "preparing":
        return <Clock size={20} className="text-orange-500" />;
      case "cancelled":
        return <XCircle size={20} className="text-red-500" />;
      default:
        return <Package size={20} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "on_the_way":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "on_the_way":
        return "On the Way";
      case "preparing":
        return "Preparing";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const orderCounts = {
    all: orders.length,
    delivered: orders.filter(o => o.status === "delivered").length,
    on_the_way: orders.filter(o => o.status === "on_the_way").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    cancelled: orders.filter(o => o.status === "cancelled").length
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleReorder = (order) => {
    alert(`Reordering from ${order.restaurant.name}...`);
  };

  const handleRateOrder = (order) => {
    alert(`Rating order ${order._id}...`);
  };

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Orders
              </button>
              <div>
                <h1 className="text-2xl font-bold">Order Details</h1>
                <p className="text-orange-100">Order ID: {selectedOrder._id}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-b-lg shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Order Info */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Order Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedOrder.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {getStatusText(selectedOrder.status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{selectedOrder.paymentMethod}</span>
                    </div>
                    {selectedOrder.deliveryTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Time:</span>
                        <span className="font-medium">{selectedOrder.deliveryTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Restaurant</h3>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">{selectedOrder.restaurant.name}</p>
                    <p className="text-gray-600">{selectedOrder.restaurant.address}</p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Address</h3>
                  <p className="text-gray-800">{selectedOrder.deliveryAddress}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Order Items */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-800">৳{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">৳{selectedOrder.total - selectedOrder.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="font-medium">৳{selectedOrder.deliveryFee}</span>
                    </div>
                    <div className="border-t border-orange-200 pt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-lg font-bold text-orange-600">৳{selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button 
                    onClick={() => handleReorder(selectedOrder)}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    <RotateCcw size={18} />
                    Reorder
                  </button>
                  
                  {selectedOrder.status === "delivered" && !selectedOrder.rating && (
                    <button 
                      onClick={() => handleRateOrder(selectedOrder)}
                      className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                    >
                      <Star size={18} />
                      Rate Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-orange-100 mt-1">Track and manage your orders</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors">
              <ArrowLeft size={18} />
              Back to Profile
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or restaurant name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "All", count: orderCounts.all },
                { key: "delivered", label: "Delivered", count: orderCounts.delivered },
                { key: "on_the_way", label: "On the Way", count: orderCounts.on_the_way },
                { key: "preparing", label: "Preparing", count: orderCounts.preparing },
                { key: "cancelled", label: "Cancelled", count: orderCounts.cancelled }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === filter.key
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedFilter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't placed any orders yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order._id} className="border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Left Side */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{order._id}</h3>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Restaurant:</strong> {order.restaurant.name}</p>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
                        <p><strong>Items:</strong> {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                        {order.rating && (
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-500 fill-current" />
                            <span>{order.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col md:items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">৳{order.total}</p>
                        <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-1 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        
                        {order.status === "delivered" && (
                          <button
                            onClick={() => handleReorder(order)}
                            className="flex items-center gap-1 bg-gray-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                          >
                            <RotateCcw size={16} />
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}