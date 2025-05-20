import { useState } from "react";
import { User, Pencil, Calendar, Phone, MapPin, Tag, History, Store, Award, LogOut } from "lucide-react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+8801712345678",
    address: {
      street: "123 Main Street",
      city: "Dhaka",
      state: "Dhaka Division",
      zipCode: "1000",
      country: "Bangladesh"
    },
    role: "customer",
    firstOrderDiscountUsed: false,
    orderHistory: [
      { _id: "ord123", date: "2025-05-15", total: 1250 },
      { _id: "ord124", date: "2025-05-01", total: 850 },
      { _id: "ord125", date: "2025-04-22", total: 1400 }
    ],
    lastLogin: "2025-05-19T14:30:00Z",
    createdAt: "2024-10-15T09:45:00Z"
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent],
          [child]: value
        }
      });
    } else {
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your backend
    setIsEditing(false);
    // Show success message
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors"
            >
              <Pencil size={18} />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - User Info */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center p-6 bg-orange-100 rounded-lg">
                <div className="bg-orange-500 text-white p-6 rounded-full mb-4">
                  <User size={64} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-orange-600 font-medium">{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</p>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={20} className="text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p>{new Date(userData.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={20} className="text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Login</p>
                      <p>{new Date(userData.lastLogin).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Tag size={20} className="text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Discount Status</p>
                      <p>{userData.firstOrderDiscountUsed ? "Used" : "Available"}</p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>

              {/* Order Summary */}
              <div className="mt-6 bg-orange-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <History size={20} className="text-orange-500" />
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-medium">{userData.orderHistory.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Order</span>
                    <span className="font-medium">{new Date(userData.orderHistory[0]?.date).toLocaleDateString()}</span>
                  </div>
                  <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    View All Orders
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="md:col-span-2">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Address Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                        <input
                          type="text"
                          name="address.street"
                          value={userData.address.street}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="address.city"
                          value={userData.address.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                        <input
                          type="text"
                          name="address.state"
                          value={userData.address.state}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          name="address.zipCode"
                          value={userData.address.zipCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          name="address.country"
                          value={userData.address.country}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <User size={20} className="text-orange-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p className="text-gray-800">{userData.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Mail size={20} className="text-orange-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-gray-800">{userData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone size={20} className="text-orange-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="text-gray-800">{userData.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Tag size={20} className="text-orange-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Account Type</p>
                          <p className="text-gray-800 capitalize">{userData.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-orange-500" />
                      Address Information
                    </h3>
                    
                    <div>
                      <p className="text-gray-800">
                        {userData.address.street}<br />
                        {userData.address.city}, {userData.address.state} {userData.address.zipCode}<br />
                        {userData.address.country}
                      </p>
                    </div>
                  </div>
                  
                  {/* Order History */}
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <History size={20} className="text-orange-500" />
                      Recent Orders
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-orange-200">
                            <th className="py-3 px-4 text-gray-600">Order ID</th>
                            <th className="py-3 px-4 text-gray-600">Date</th>
                            <th className="py-3 px-4 text-gray-600">Amount</th>
                            <th className="py-3 px-4 text-gray-600">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.orderHistory.map((order) => (
                            <tr key={order._id} className="border-b border-orange-100">
                              <td className="py-3 px-4">{order._id}</td>
                              <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                              <td className="py-3 px-4">৳{order.total}</td>
                              <td className="py-3 px-4">
                                <button className="text-orange-500 hover:text-orange-700">
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="text-orange-500 font-medium hover:text-orange-700">
                        View All Orders →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mail(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}