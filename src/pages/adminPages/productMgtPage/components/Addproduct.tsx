import React, { useState } from 'react';

export const AddProduct = () => {
 
  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Product Management
            </h1>
            
            <button
            //   onClick={handleAddNewProduct}
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
            >
              <span className="text-lg font-medium">+</span>
              <span className="font-medium">Add New Product</span>
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 
                </div>
                <input
                  type="text"
                
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Search products by name or description..."
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <select
               
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Electronics">product1</option>
                  <option value="Clothing">product2</option>
                  <option value="Home & Garden">product3</option>
                  <option value="Sports">product4</option>
                 
                </select>
                
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg 
                    className="w-4 h-4 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          
              
              
            </div>
          </div>
        </div>
    
  );
};