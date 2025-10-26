import React, { useState, useEffect } from 'react';
import {RentalItem} from "@/types";

interface RentalInventoryProps {
    rentalItems: RentalItem[];
    onUpdateItem: (item: RentalItem) => void;
    onDeleteItem: (itemId: string) => void;
    categories: string[];
    refreshTrigger?: number;
}

export const RentalInventory: React.FC<RentalInventoryProps> = ({
                                                                    rentalItems,
                                                                    onUpdateItem,
                                                                    onDeleteItem,
                                                                    categories,
                                                                    refreshTrigger = 0
                                                                }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState<RentalItem | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

    // Filter states
    const [searchFilter, setSearchFilter] = useState({
        searchTerm: '',
        selectedCategory: 'All'
    });

    // Calculate total pages
    const totalPages = Math.ceil(rentalItems.length / itemsPerPage);

    // Filter items based on search and category
    const filteredItems = rentalItems?.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchFilter.searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchFilter.searchTerm.toLowerCase());
        const matchesCategory = searchFilter.selectedCategory === 'All' ||
            item.category === searchFilter.selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get current items for pagination
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to first page when items change
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredItems.length, refreshTrigger]);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(prev => ({
            ...prev,
            searchTerm: e.target.value
        }));
    };

    // Handle category filter change
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter(prev => ({
            ...prev,
            selectedCategory: e.target.value
        }));
    };

    // Handle select all
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedItems(currentItems.map(item => item?._id ?? ""));
        } else {
            setSelectedItems([]);
        }
    };

    // Handle select individual item
    const handleSelectItem = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    // Handle status toggle
    const handleToggleStatus = (itemId: string) => {
        const item = rentalItems.find(item => item._id??"" === itemId);
        if (item) {
            const newStatus = item.status === 'available' ? 'rented' :
                item.status === 'rented' ? 'maintenance' : 'available';
            onUpdateItem({ ...item, status: newStatus });
        }
    };

    // Handle edit
    const handleEdit = (item: RentalItem) => {
        setEditingItem(item);
    };

    // Handle save edit
    const handleSaveEdit = () => {
        if (editingItem) {
            onUpdateItem(editingItem);
            setEditingItem(null);
        }
    };

    // Handle delete
    const handleDelete = (itemId: string) => {
        onDeleteItem(itemId);
        setDeleteConfirm(null);
    };

    // Handle bulk delete
    const handleBulkDelete = () => {
        if (selectedItems.length > 0 && window.confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) {
            selectedItems.forEach(itemId => onDeleteItem(itemId));
            setSelectedItems([]);
        }
    };

    // Status badge component
    const StatusBadge = ({ status }: { status: string }) => {
        const statusConfig = {
            available: { color: 'bg-green-100 text-green-800', label: 'Available' },
            rented: { color: 'bg-blue-100 text-blue-800', label: 'Rented' },
            maintenance: { color: 'bg-yellow-100 text-yellow-800', label: 'Maintenance' }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    if (loading) {
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
                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchFilter.searchTerm}
                                onChange={handleSearchChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                placeholder="Search rental items by name or description..."
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <select
                                value={searchFilter.selectedCategory}
                                onChange={handleCategoryChange}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 cursor-pointer"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
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

                {/* Bulk Actions */}
                {selectedItems.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                        <span className="text-blue-800">
                            {selectedItems.length} item(s) selected
                        </span>
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleBulkDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                                >
                                    Delete Selected
                                </button>
                                <button
                                    onClick={() => setSelectedItems([])}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <span className="text-sm font-medium text-gray-700">Item Image</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-sm font-medium text-gray-700">Item Name</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-sm font-medium text-gray-700">Category</span>
                            </div>
                            <div className="col-span-1">
                                <span className="text-sm font-medium text-gray-700">Price</span>
                            </div>
                            <div className="col-span-1">
                                <span className="text-sm font-medium text-gray-700">Stock</span>
                            </div>
                            <div className="col-span-1">
                                <span className="text-sm font-medium text-gray-700">Status</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-sm font-medium text-gray-700">Actions</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <div key={item?._id ?? ""} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* Checkbox */}
                                        <div className="col-span-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item._id??"")}
                                                onChange={() => handleSelectItem(item._id??"")}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </div>

                                        {/* Item Image */}
                                        <div className="col-span-2">
                                            {item.images && item.images.length > 0 ? (
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg border border-gray-200 text-gray-500 text-xs">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Item Name */}
                                        <div className="col-span-2">
                                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                        </div>

                                        {/* Category */}
                                        <div className="col-span-2">
                                            <span className="text-sm text-gray-600">{item.category}</span>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-1">
                                        <span className="text-sm font-medium text-gray-900">
                                            ${item.price.toFixed(2)}
                                        </span>
                                        </div>

                                        {/* Stock */}
                                        <div className="col-span-1">
                                            <span className="text-sm text-gray-600">{item.stock}</span>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-1">
                                            <StatusBadge status={item.status} />
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-2">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-600 hover:text-blue-900 focus:outline-none transition-colors duration-200"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => handleToggleStatus(item._id??"")}
                                                    className="text-green-600 hover:text-green-900 focus:outline-none transition-colors duration-200"
                                                    title="Toggle Status"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => setDeleteConfirm(item._id??"")}
                                                    className="text-red-600 hover:text-red-900 focus:outline-none transition-colors duration-200"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                                </svg>
                                <p className="text-gray-500">No rental items found. Add your first rental item to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <div key={item._id??""} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item._id??"")}
                                        onChange={() => handleSelectItem(item._id??"")}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <StatusBadge status={item.status} />
                                </div>

                                {/* Clickable Item Name - Opens Details Modal */}
                                <button
                                    onClick={() => setSelectedItem(item)}
                                    className="w-full text-left mb-3"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center space-x-3 mb-3">
                                        {item.images && item.images.length > 0 ? (
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg border border-gray-200 text-gray-500 text-xs">
                                                No Image
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Category:</span> {item.category}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Price:</span> ${item.price.toFixed(2)}/day
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Stock:</span> {item.stock} available
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                {/* Actions */}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span className="text-sm">Edit</span>
                                    </button>

                                    <button
                                        onClick={() => handleToggleStatus(item._id??"")}
                                        className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="text-sm">Status</span>
                                    </button>

                                    <button
                                        onClick={() => setDeleteConfirm(item._id??"")}
                                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span className="text-sm">Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-lg p-8 text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                            </svg>
                            <p className="text-gray-500">No rental items found. Add your first rental item to get started.</p>
                        </div>
                    )}
                </div>

                {/* Item Details Modal for Mobile */}
                {selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:hidden">
                        <div className="bg-white rounded-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Item Image */}
                                    <div className="flex justify-center">
                                        {selectedItem.images && selectedItem.images.length > 0 ? (
                                            <img
                                                src={selectedItem.images[0]}
                                                alt={selectedItem.name}
                                                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg border border-gray-200 text-gray-500 text-sm">
                                                No Image Available
                                            </div>
                                        )}
                                    </div>

                                    {/* Item Details */}
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <p className="text-sm text-gray-900">{selectedItem.name}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <p className="text-sm text-gray-600">{selectedItem.description || "No description available"}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                <p className="text-sm text-gray-600">{selectedItem.category}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                <StatusBadge status={selectedItem.status} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Price</label>
                                                <p className="text-sm text-gray-900">${selectedItem.price.toFixed(2)}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                                <p className="text-sm text-gray-600">{selectedItem.stock} available</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => {
                                                handleEdit(selectedItem);
                                                setSelectedItem(null);
                                            }}
                                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleToggleStatus(selectedItem._id??"");
                                                setSelectedItem(null);
                                            }}
                                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                                        >
                                            Change Status
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {editingItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Edit Rental Item</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.name}
                                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            value={editingItem.price}
                                            onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            value={editingItem.stock}
                                            onChange={(e) => setEditingItem({ ...editingItem, stock: Number(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={() => setEditingItem(null)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-sm w-full">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
                                <p className="text-gray-600 mb-4">Are you sure you want to delete this rental item? This action cannot be undone.</p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deleteConfirm)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} items
                    </span>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};