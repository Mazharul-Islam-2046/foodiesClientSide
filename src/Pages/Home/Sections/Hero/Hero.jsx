import { useEffect, useState } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Food delivery and more',
      description:
        'Discover the best food & drinks in your area. Order online for quick delivery to your doorstep.',
      buttonText: 'Find Food',
    },
    {
      id: 2,
      title: 'Authentic Mexican Tacos',
      description:
        'Fresh ingredients, bold flavors, and traditional recipes. Experience authentic Mexican cuisine delivered hot.',
      buttonText: 'Order Tacos',
    },
    {
      id: 3,
      title: 'Gourmet Burgers',
      description:
        'Juicy, handcrafted burgers with premium ingredients. Taste the difference quality makes.',
      buttonText: 'Get Burgers',
    },
    {
      id: 4,
      title: 'Healthy Choices',
      description:
        'Fresh salads, smoothies, and healthy meals. Nourish your body with delicious wholesome food.',
      buttonText: 'Eat Healthy',
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="h-[85vh] max-h-[400px] relative overflow-hidden container mx-auto px-6">
      {/* Main carousel container */}
      <div
        className="relative h-full bg-primary rounded-b-3xl"
        style={{
          backgroundImage: 'url(/pattern.svg)',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          backgroundPosition: 'center',
        }}
      >
        {/* Remove or comment out this div that's making the pattern too transparent */}
        {/* <div className="absolute inset-0 opacity-10"></div> */}

        {/* Content container */}
        <div className="relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center h-full">
            {/* Text content - 75% width */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              {/* Animated text content */}
              <div className="relative">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform translate-y-4 absolute top-0'
                    }`}
                  >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-white mb-8 max-w-2xl">{slide.description}</p>
                  </div>
                ))}
              </div>

              {/* Search form */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl relative z-10">
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
                <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
                  {slides[currentSlide].buttonText}
                </button>
              </div>
            </div>

            {/* Food Image - 25% width */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] h-[300px] lg:h-[350px]">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 transform scale-100 rotate-0'
                        : 'opacity-0 transform scale-95 rotate-3'
                    }`}
                  >
                    <img
                      src={`/${index + 1}.png`}
                      alt={`Food item ${index + 1}`}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical pagination on the right */}
        <div className="absolute right-9 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress indicator (optional) */}
        {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-300 ease-linear"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
