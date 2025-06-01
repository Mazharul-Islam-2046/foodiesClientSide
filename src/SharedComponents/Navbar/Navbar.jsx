import { Loader, MapPin } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SignIn from '../../Pages/Auth_Pages/SignIn/SignIn';
import { AuthContext } from '../../providers/AuthProvider/AuthContext';

export default function Navbar() {
  const { user, location, setLocation } = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // For demo purposes - toggle this to see different states
  // const user = isLoggedIn
  //   ? { name: "John Doe", avatar: "/api/placeholder/40/40" }
  //   : null;

  useEffect(() => {
    // Function to get user's location
    const getUserLocation = () => {
      setIsLoading(true);

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          async (position) => {
            try {
              // Using reverse geocoding to get a readable address
              const { latitude, longitude } = position.coords;
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              );

              if (response.ok) {
                const data = await response.json();
                const city =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  data.address.suburb;
                const state = data.address.state || '';
                const formattedLocation = state ? `${city}, ${state}` : city;
                setLocation(formattedLocation || 'Location not found');
              } else {
                setLocation('San Francisco, CA'); // Fallback
              }
            } catch (error) {
              console.error('Error fetching location:', error);
              setLocation('San Francisco, CA'); // Fallback
            } finally {
              setIsLoading(false);
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            alert('please allow location access to get your current location');
            if (error.code === 1) {
              // User denied access to location
              setLocation('Please allow location access to get your current location');
            } else {
              setLocation('Location not found');
            }
            setIsLoading(false);
          },
          { timeout: 50000 },
        );
      } else {
        // Geolocation not supported
        setLocation('Allow location access'); // Fallback
        setIsLoading(false);
      }
    };

    getUserLocation();
  }, []);

  return (
    <>
      <header className="bg-white shadow-md py-4">
        <div className="flex items-center justify-between relative container w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {/* Logo on the left */}
          <NavLink to="/" className="flex-1">
            <img src="/foodieslogo.png" alt="Foodies Logo" className="w-32 h-auto" />
          </NavLink>

          {/* Location in the middle */}
          <div className="flex-1 flex justify-center">
            <button className="flex items-center text-gray-700 hover:text-orange-500 transition text-[13px] font-semibold">
              <MapPin size={18} className="mr-1" />
              {isLoading ? (
                <div className="flex items-center">
                  <Loader size={16} className="animate-spin mr-2" />
                  <span>Getting location...</span>
                </div>
              ) : (
                <>
                  <span className="mr-1">{location}</span>
                  {/* <ChevronDown size={16} /> */}
                </>
              )}
            </button>
          </div>

          {/* Navigation on the right */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {!user && (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="flex items-center gap-2 bg-primary text-white py-2 px-5 text-sm rounded-md hover:bg-orange-600 transition"
              >
                Sign In
              </button>
            )}
            {user && (
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700">{user.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sign In Modal */}
      <SignIn isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
    </>
  );
}
