import React from 'react';

const PrepTimeFilter = ({preparationTime, onPrepTimeChange}) => {
    return (
        <>
            <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Preparation Time</h3>
                <select
                    value={preparationTime}
                    onChange={onPrepTimeChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Any Time</option>
                    <option value="quick">Quick (under 10 min)</option>
                    <option value="medium">Medium (10-20 min)</option>
                    <option value="long">Long (over 20 min)</option>
                </select>
            </div>
        </>
    );
};

export default PrepTimeFilter;