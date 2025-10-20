import React, { useState, useRef } from 'react';
import {RentalItem} from "@/types";

interface AddRentalItemProps {
    onRentalItemAdd?: (item: Omit<RentalItem, 'id' | 'status'>) => void;
    categories: string[];
    rentalItems: RentalItem[];
    onCategoriesUpdate: (categories: string[]) => void;
}

interface ImageFile {
    file: File;
    preview: string;
}

export const AddRentalItem: React.FC<AddRentalItemProps> = ({
                                                                onRentalItemAdd,
                                                                categories,
                                                                rentalItems,
                                                                onCategoriesUpdate
                                                            }) => {
    const [showModal, setShowModal] = useState(false);
    const [newRentalItem, setNewRentalItem] = useState<Omit<RentalItem, 'id' | 'status'>>({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        images: []
    });

    const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
    const [uploadError, setUploadError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [categoryError, setCategoryError] = useState('');

    // Handle delete category
    const handleDeleteCategory = (category: string) => {
        if (category === 'All') return;

        const updatedCategories = categories.filter(cat => cat !== category);
        onCategoriesUpdate(updatedCategories);
    };

    // Handle add new category
    const handleAddCategory = () => {
        if (!newCategory.trim()) {
            setCategoryError('Category name is required');
            return;
        }

        if (categories.includes(newCategory.trim())) {
            setCategoryError('Category already exists');
            return;
        }

        const updatedCategories = [...categories.filter(cat => cat !== 'All'), newCategory.trim()];
        onCategoriesUpdate(['All', ...updatedCategories]);
        setNewCategory('');
        setCategoryError('');
        setShowCategoryModal(false);
    };

    // Check if category is in use
    const isCategoryInUse = (category: string) => {
        return rentalItems.some(item => item.category === category);
    };

    // Handle adding a new rental item
    const handleAddNewRentalItem = async () => {
        if (!newRentalItem.name.trim() || !newRentalItem.category || newRentalItem.price <= 0) {
            alert('Please fill in all required fields (Name, Category, Price)');
            return;
        }

        setIsSubmitting(true);

        try {
            // Convert images to base64 and add to rental item
            const processImages = async () => {
                const imagePromises = imageFiles.map(imageFile => {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result as string);
                        };
                        reader.readAsDataURL(imageFile.file);
                    });
                });

                const base64Images = await Promise.all(imagePromises);

                const rentalItemWithImages = {
                    ...newRentalItem,
                    images: base64Images
                };

                if (onRentalItemAdd) {
                    onRentalItemAdd(rentalItemWithImages);
                }

                // Reset form and close modal
                resetForm();
                setShowModal(false);
                alert('Rental item added successfully!');
            };

            await processImages();
        } catch (error) {
            console.error('Error adding rental item:', error);
            alert('Error adding rental item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploadError('');

        // Check if adding new files would exceed maximum
        if (imageFiles.length + files.length > 4) {
            setUploadError('Maximum 4 images allowed');
            return;
        }

        const newImageFiles: ImageFile[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Check file type
            if (!file.type.startsWith('image/')) {
                setUploadError('Only image files are allowed (PNG, JPG, JPEG, GIF)');
                continue;
            }

            // Check file size (2MB = 2 * 1024 * 1024 bytes)
            if (file.size > 2 * 1024 * 1024) {
                setUploadError(`Image "${file.name}" exceeds 2MB limit`);
                continue;
            }

            // Create preview
            const preview = URL.createObjectURL(file);
            newImageFiles.push({ file, preview });
        }

        // Add new images to existing ones
        setImageFiles(prev => [...prev, ...newImageFiles].slice(0, 4)); // Ensure max 4 images

        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle drag and drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.accept = 'image/*';
            fileInput.files = files;

            const event = new Event('change', { bubbles: true });
            Object.defineProperty(event, 'target', { value: { files } });
            handleImageUpload(event as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    // Remove image from preview
    const handleRemoveImage = (index: number) => {
        setImageFiles(prev => {
            const newImages = [...prev];
            // Revoke object URL to prevent memory leaks
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    // Reset form
    const resetForm = () => {
        setNewRentalItem({
            name: '',
            description: '',
            price: 0,
            category: '',
            stock: 0,
            images: []
        });
        // Clean up object URLs
        imageFiles.forEach(image => URL.revokeObjectURL(image.preview));
        setImageFiles([]);
        setUploadError('');
    };

    // Handle rental item input changes
    const handleRentalItemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewRentalItem(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    // Open modal and reset form
    const openModal = () => {
        resetForm();
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="h-fit bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center sm:text-left">
                        Rental Item Management
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={openModal}
                            className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="font-medium">Add Rental Item</span>
                        </button>
                        {/* Manage Categories Button */}
                        <button
                            onClick={() => setShowCategoryModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            <span>Manage Categories</span>
                        </button>
                    </div>
                </div>

                {/* Modal for Add Rental Item */}
                {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto mx-2">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Add New Rental Item</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-4 md:p-6">
                                <div className="grid grid-cols-1 gap-4 md:gap-6">
                                    {/* Rental Item Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Rental Item Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={newRentalItem.name}
                                            onChange={handleRentalItemInputChange}
                                            className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                                            placeholder="Enter rental item name"
                                            required
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={newRentalItem.category}
                                            onChange={handleRentalItemInputChange}
                                            className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.filter(cat => cat !== 'All').map(category => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price and Stock Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        {/* Price */}
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                                Daily Price ($) *
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={newRentalItem.price}
                                                onChange={handleRentalItemInputChange}
                                                min="0"
                                                step="0.01"
                                                className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>

                                        {/* Stock Quantity */}
                                        <div>
                                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                                                Available Quantity *
                                            </label>
                                            <input
                                                type="number"
                                                id="stock"
                                                name="stock"
                                                value={newRentalItem.stock}
                                                onChange={handleRentalItemInputChange}
                                                min="0"
                                                className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Images (Max 4, 2MB each)
                                        </label>
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-gray-400 transition-colors duration-200"
                                            onDrop={handleDrop}
                                            onDragOver={(e) => e.preventDefault()}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                            />
                                            <div className="space-y-3 md:space-y-4">
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-sm md:text-base text-gray-600 text-center">
                                                        Drag and drop images here or click to upload
                                                    </p>
                                                    <p className="text-xs md:text-sm text-gray-500 text-center">
                                                        PNG, JPG, JPEG, GIF up to 2MB each (Max 4 images)
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                                                    >
                                                        Select Images
                                                    </button>
                                                </div>

                                                {/* Upload Error */}
                                                {uploadError && (
                                                    <p className="text-red-600 text-sm bg-red-50 p-2 rounded text-center">{uploadError}</p>
                                                )}

                                                {/* Image Previews */}
                                                {imageFiles.length > 0 && (
                                                    <div className="mt-3 md:mt-4">
                                                        <p className="text-sm text-gray-600 mb-3 text-center">
                                                            {imageFiles.length}/4 images selected
                                                        </p>
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                                                            {imageFiles.map((image, index) => (
                                                                <div key={index} className="relative group">
                                                                    <img
                                                                        src={image.preview}
                                                                        alt={`Preview ${index + 1}`}
                                                                        className="w-full h-24 md:h-32 object-cover rounded-lg border border-gray-200"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveImage(index)}
                                                                        className="absolute top-1 right-1 md:top-2 md:right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                                    >
                                                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg text-center">
                                                                        {(image.file.size / 1024 / 1024).toFixed(2)} MB
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={newRentalItem.description}
                                            onChange={handleRentalItemInputChange}
                                            rows={4}
                                            className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                                            placeholder="Enter rental item description..."
                                        />
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:opacity-50 text-base"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddNewRentalItem}
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                                    >
                                        {isSubmitting ? 'Adding...' : 'Add Rental Item'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Management Modal */}
                {showCategoryModal && (
                    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50">
                        <div className="bg-white rounded-lg w-full max-w-md max-h-[95vh] md:max-h-[80vh] overflow-y-auto mx-2">
                            <div className="p-4 md:p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg md:text-xl font-semibold">Manage Categories</h3>
                                    <button
                                        onClick={() => {
                                            setShowCategoryModal(false);
                                            setNewCategory('');
                                            setCategoryError('');
                                        }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Add New Category */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Add New Category
                                    </label>
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                        <input
                                            type="text"
                                            value={newCategory}
                                            onChange={(e) => {
                                                setNewCategory(e.target.value);
                                                setCategoryError('');
                                            }}
                                            className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                            placeholder="Enter category name"
                                        />
                                        <button
                                            onClick={handleAddCategory}
                                            className="bg-blue-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-base"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    {categoryError && (
                                        <p className="text-red-600 text-sm mt-2 text-center sm:text-left">{categoryError}</p>
                                    )}
                                </div>

                                {/* Existing Categories */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Existing Categories
                                    </label>
                                    <div className="space-y-2 max-h-48 md:max-h-60 overflow-y-auto">
                                        {categories.filter(cat => cat !== 'All').map((category, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm text-gray-700 truncate">{category}</span>
                                                <button
                                                    onClick={() => handleDeleteCategory(category)}
                                                    disabled={isCategoryInUse(category)}
                                                    className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 p-1 ml-2"
                                                    title={isCategoryInUse(category) ? 'Category is in use' : 'Delete category'}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                        {categories.filter(cat => cat !== 'All').length === 0 && (
                                            <p className="text-gray-500 text-sm text-center py-4">No categories added yet</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};