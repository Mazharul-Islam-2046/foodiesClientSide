const Hero = () => {
    return (
      <div className="h-[85vh] max-h-[600px] relative overflow-hidden">
        
  
      <div className="relative h-full bg-gradient-to-r from-[#000] to-[#3333337a]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80"
            alt="Food background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Food delivery and more
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl">
              Discover the best food & drinks in your area. Order online for quick delivery to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <input
                type="text"
                placeholder="Enter your delivery address"
                className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
                Find Food
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
  
    )}
  
  
  export default Hero;
  