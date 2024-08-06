// components/shared/SkeletonLoader.tsx

import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-md p-5 border-b border-gray-700 animate-pulse">
      {/* Rating */}
      <div className="flex items-center mt-2 gap-3">
        <div className="h-8 w-8 bg-gray-700 rounded-full mr-1.5"></div>
        <div className="h-8 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
