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
    <div className="min-h-screen bg-gray-50">
      <div className="relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Overview</h1>
              <p className="text-gray-500 mt-1">Manage your profile and account settings</p>
            </div>
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-orange-100"
            >
              <Pencil size={16} />
              {isEditing ? "Discard Changes" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <User size={40} className="text-orange-600" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full mt-2">
                  {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                </span>

                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={18} className="text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-400">Member Since</p>
                      <p className="text-sm">{new Date(userData.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Tag size={18} className="text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-400">Discount Status</p>
                      <p className="text-sm">{userData.firstOrderDiscountUsed ? "Used" : "Available"}</p>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <History size={20} className="text-gray-700" />
                Order Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total Orders</span>
                  <span className="font-medium text-gray-700">{userData.orderHistory.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Last Order</span>
                  <span className="font-medium text-gray-700">
                    {new Date(userData.orderHistory[0]?.date).toLocaleDateString()}
                  </span>
                </div>
                <button className="w-full mt-4 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-4 py-2.5 rounded-lg transition-colors">
                  View Order History
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Address Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Street Address</label>
                      <input
                        type="text"
                        name="address.street"
                        value={userData.address.street}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="address.city"
                        value={userData.address.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">State/Province</label>
                      <input
                        type="text"
                        name="address.state"
                        value={userData.address.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                      <input
                        type="text"
                        name="address.zipCode"
                        value={userData.address.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        name="address.country"
                        value={userData.address.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Personal Info Display */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <User size={18} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">Full Name</p>
                        <p className="text-gray-900">{userData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <User size={18} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">Full Name</p>
                        <p className="text-gray-900">{userData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <User size={18} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">Full Name</p>
                        <p className="text-gray-900">{userData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <User size={18} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">Full Name</p>
                        <p className="text-gray-900">{userData.name}</p>
                      </div>
                    </div>
                    {/* ... other personal info fields with similar structure */}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Orders</h3>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {userData.orderHistory.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{order._id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">৳{order.total}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}