// src/components/ServiceManagement.tsx

import React, { useState } from 'react';
import { addNewServiceStyles } from '@/styles/addNewServiceStyle';
import { FaPlusCircle, FaSave } from 'react-icons/fa';

interface ServiceData {
  serviceName: string;
  description: string;
  price: string;
  category: string;
}

export const AddNewService: React.FC = () => {
  const [formData, setFormData] = useState<ServiceData>({
    serviceName: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Service data submitted:', formData);
    // You can add your API call to submit the service data here
  };

  const handleAddCategory = () => {
    // Logic to open a modal or navigate to a new page to add a new category
    console.log('Add new service category clicked');
  };

  return (
    <div style={addNewServiceStyles.pageContainer}>

      <div style={addNewServiceStyles.formCard}>
        <div style={addNewServiceStyles.header}>
          <h2 style={addNewServiceStyles.subHeading}>Add New Service</h2>
        </div>
        <hr style={addNewServiceStyles.divider} />
        <form onSubmit={handleSubmit}>

          <div style={addNewServiceStyles.formGroup}>
            <label style={addNewServiceStyles.label} htmlFor="serviceName">Service Name</label>
            <input
              style={addNewServiceStyles.input}
              type="text"
              id="serviceName"
              name="serviceName"
              placeholder="e.g., House Painting - Interior"
              value={formData.serviceName}
              onChange={handleChange}
              required
            />
          </div>

          <div style={addNewServiceStyles.formGroup}>
            <label style={addNewServiceStyles.label} htmlFor="description">Description</label>
            <textarea
              style={addNewServiceStyles.textarea}
              id="description"
              name="description"
              rows={4}
              placeholder="Provide a detailed description of the service..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div style={addNewServiceStyles.formGroup}>
            <label style={addNewServiceStyles.label} htmlFor="price">Price</label>
            <input
              style={addNewServiceStyles.input}
              type="text"
              id="price"
              name="price"
              placeholder="$ 0.00"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div style={addNewServiceStyles.formGroup}>
            <label style={addNewServiceStyles.label} htmlFor="category">Category</label>
            <select
              style={addNewServiceStyles.select}
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="House Painting">House Painting</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          <div style={addNewServiceStyles.buttonContainer}>
            <button
              type="button"
              style={addNewServiceStyles.addCategoryButton}
              onClick={handleAddCategory}
            >
              <FaPlusCircle style={{ marginRight: '0.5rem' }} />
              Add New Category
            </button>
            <button
              type="submit"
              style={addNewServiceStyles.submitButton}
            >
              <FaSave style={{ marginRight: '0.5rem' }} />
              Add Service
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};