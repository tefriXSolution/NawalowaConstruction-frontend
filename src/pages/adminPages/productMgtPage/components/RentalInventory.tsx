import React, { useState, useEffect } from 'react';

export const RentalInventory = () => {
  const [equipment, setEquipment] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); 
 
  

  

  



  {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-16 bg-gray-300 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rental Equipment Inventory
          </h1>
          <p className="text-gray-600">
            Manage your construction and industrial rental equipment.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={selectedItems.length === equipment.length && equipment.length > 0}
                //   onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>


              

              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Product Image</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Product Name</span>
              </div>
              <div className="col-span-3">
                <span className="text-sm font-medium text-gray-700">Description</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Availability</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Actions</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {equipment.map((item) => (
            //   <div key={item.id} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                    //   checked={selectedItems.includes(item.id)}
                    //   onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Product Image */}
                  <div className="col-span-2">
                    <img
                    //   src={item.image}
                    //   alt={item.name}
                    //   className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    //   onError={(e) => {
                    //     e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMzIDQyLjY2NjdMMzIgMzJMMzguNjY2NyAzOC42NjY3TDQyLjY2NjcgMzQuNjY2N0w0Mi42NjY3IDIxLjMzMzNIMjEuMzMzM1Y0Mi42NjY3WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                    //   }}
                    />
                  </div>

                  {/* Product Name */}
                  <div className="col-span-2">
                    {/* <span className="text-sm font-medium text-gray-900">{item.name}</span> */}
                  </div>

                  {/* Description */}
                  <div className="col-span-3">
                    {/* <span className="text-sm text-gray-600">{item.description}</span> */}
                  </div>

                  {/* Availability */}
                  <div className="col-span-2">
                   
                  </div>

                  {/* Actions */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-3">
                      <button
                        // onClick={() => handleEdit(item.id)}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="ml-1 text-sm">Edit</span>
                      </button>
                      
                      <button
                        // onClick={() => handleToggleStatus(item.id)}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        title="Toggle Status"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="ml-1 text-sm">Toggle Status</span>
                      </button>
                    </div>
                  </div>
                </div>
            //   </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-700">
            {selectedItems.length} of {equipment.length} row(s) selected.
          </span>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};