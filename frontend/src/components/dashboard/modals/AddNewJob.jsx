'use client';
import React, { useState } from 'react';

const AddNewJob = ({ isOpen, onClose, onAddJob }) => {
  const [formData, setFormData] = useState({
    roleTitle: '',
    roleCategory: '',
    description: '',
    state: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      title: formData.roleTitle,
      description: formData.description,
      status: formData.state, // Kirim status ke backend (Active/Closed)
      category: formData.roleCategory // Kirim category juga
    };

    // Pastikan deskripsi lebih dari 10 karakter sesuai aturan BE
    if (payload.description.length < 10) {
      alert("Deskripsi harus minimal 10 karakter ya!");
      return;
    }

    console.log("📤 Sending job with status:", payload.status);
    onAddJob(payload); // Kirim payload yang sudah 'benar' ini ke JobOpening

    // Reset form
    setFormData({
      roleTitle: '',
      roleCategory: '',
      description: '',
      state: 'Active'
    });

    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Job</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Title
            </label>
            <input
              type="text"
              name="roleTitle"
              value={formData.roleTitle}
              onChange={handleChange}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Senior Frontend Developer"
            />
          </div>

          {/* Role Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Category
            </label>
            <input
            type="text"
              name="roleCategory"
              value={formData.roleCategory}
              onChange={handleChange}
              required
              placeholder="e.g., HR, Design, Engineering"
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              
            </input>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Job description..."
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewJob; 
