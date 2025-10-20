// src/components/AddNewServiceCategory.tsx

import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { addNewServiceCategoryStyles } from '@/styles/addNewServiceCategoryStyle';

interface AddNewServiceCategoryProps {
    onCancel: () => void;
    onAddCategory: (categoryName: string) => void;
}

export const AddNewServiceCategory: React.FC<AddNewServiceCategoryProps> = ({ onCancel, onAddCategory }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (categoryName.trim()) {
            onAddCategory(categoryName);
            setCategoryName(''); // Clear input after submission
        }
    };

    return (
        <div style={addNewServiceCategoryStyles.container}>
            <h2 style={addNewServiceCategoryStyles.heading}>Add New Service Category</h2>
            <hr style={addNewServiceCategoryStyles.divider} />
            <form onSubmit={handleSubmit}>
                <div style={addNewServiceCategoryStyles.formGroup}>
                    <label style={addNewServiceCategoryStyles.label} htmlFor="categoryName">Category Name</label>
                    <input
                        style={addNewServiceCategoryStyles.input}
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        placeholder="e.g., General Construction"
                        value={categoryName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={addNewServiceCategoryStyles.buttonContainer}>
                    <button
                        type="button"
                        style={addNewServiceCategoryStyles.cancelButton}
                        onClick={onCancel}
                    >
                        <FaTimes style={{ marginRight: '0.5rem' }} />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={addNewServiceCategoryStyles.addButton}
                    >
                        <FaPlus style={{ marginRight: '0.5rem' }} />
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};