import React from 'react';

const HealthyOptionFilter = ({isHealthy, onHealthyChange}) => {
    return (
        <>
            <div className="mb-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="healthy"
                        checked={isHealthy}
                        onChange={onHealthyChange}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="healthy" className="ml-2 text-gray-700">
                        Healthy Options Only
                    </label>
                </div>
            </div>
        </>
    );
};

export default HealthyOptionFilter;