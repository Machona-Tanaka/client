import React from 'react';
import DynamicFileUpload from './fileUploaderField';

const ProductForm = ({ product, isEditing, handleChange, handleSubmit }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Reuse input fields from earlier code */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                </div>

                {/* Description */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={product.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                />
                </div>

                {/* Price & Discount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Rate (%)</label>
                    <input
                    type="number"
                    step="0.01"
                    value={product.discount_rate}
                    onChange={(e) => handleChange('discount_rate', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                </div>

                {/* Category */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    value={product.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                >
                    <option value="">Select Category</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home</option>
                    {/* Add more categories as needed */}
                </select>
                </div>

                {/* Stock & Is New */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                    <input
                    type="number"
                    value={product.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div className="flex items-center space-x-3 mt-6 sm:mt-0">
                    <label className="text-sm font-medium text-gray-700">New Arrival</label>
                    <input
                    type="checkbox"
                    checked={product.is_new}
                    onChange={(e) => handleChange('is_new', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                </div>
                </div>

                {/* Image URL */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="url"
                    value={product.image_url}
                    onChange={(e) => handleChange('image_url', e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                />
                </div>
                <DynamicFileUpload
                    label="Upload Image"
                    onChange={(file) => handleChange('image_file', file)}
                />

                {/* Submit Button */}
                <div className="pt-4">
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                    {isEditing ? 'Update Product' : 'Add Product'}
                </button>
                </div>
            </form>
            </div>

      </form>
    </div>
  );
};

export default ProductForm;
