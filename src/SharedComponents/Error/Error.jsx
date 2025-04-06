import React from 'react';

const Error = ({error}) => {
    return (
        <>
            <div className="bg-red-50 p-4 rounded-lg text-red-600 border border-red-200">
      <h3 className="font-medium text-lg mb-2">Unable to load food items</h3>
      <p>
        {error?.message ||
          "An unexpected error occurred. Please try again later."}
      </p>
      <button
        className="mt-3 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md transition-colors"
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </button>
    </div>   
        </>
    );
};

export default Error