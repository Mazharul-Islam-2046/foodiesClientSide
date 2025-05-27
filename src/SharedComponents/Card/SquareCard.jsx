'use client';

import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SquareCard = memo(({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to category page or wherever you want to redirect
    if (item?.id) {
      navigate(`/category/${item.id}`);
    }
  };

  return (
    <div
      className="cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative mb-3 overflow-hidden rounded-lg border">
          <div className="pt-6">
            <img
              src={item?.imageUrl || '/api/placeholder/400/320'}
              alt={item?.name || 'Item'}
              className={`w-full h-24 object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={(e) => {
                e.target.src = '/api/placeholder/400/320';
              }}
            />
          </div>
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>
        </div>
        <div className="p-3">
          <h3
            className={`text-center font-medium text-gray-800 text-sm transition-colors duration-200 ${
              isHovered ? 'text-orange-600' : ''
            }`}
          >
            {item?.name || 'Unnamed Item'}
          </h3>
        </div>
      </div>
    </div>
  );
});

export default SquareCard;
