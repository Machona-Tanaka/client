import React, { useState, useEffect } from 'react';
import DynamicFileUpload from './imageUploader';
import ProductImagePopup from './ProductImagesPopup';
import ImageUploadPopup from './ImageUploadPopup';
import api from '../../../services/api';

const ProductForm = ({ product, isEditing, error, success, handleChange, handleSubmit }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);

    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
    if (product?.media && Array.isArray(product.media)) {
        setProductImages(product.media);
    }
    }, [product]);

    const handleDeleteImage = async (imageId) => {
        try {

            await api.deleteProductImage(product.id, imageId);
            setProductImages(prev => prev.filter(img => img.id !== imageId));
            alert('Image deleted successfully');
            
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting image', error.message);
        }
    };



    return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-5xl bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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

                {/* Images */}
                {!isEditing && 
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Podmerch Image Samples</label>
                                <DynamicFileUpload
                                    product={product}
                                    label="Upload Image"
                                    onChange={(image_file) => handleChange('image_file', image_file)}
                                />
                            </div> }

                {/* Error and Success Messages */}
                {error && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-2 text-center">
                        {success}
                    </div>
                )}
               
                {/* View Thumbnails Button */}
                <div style={{ display: 'flex', gap: '10px'}}>
                    {isEditing &&
                            <div className="pt-4">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                                    onClick={() => setShowPopup(true)}
                                >
                                    View Thumbnails
                                </button>
                            </div>
                    }
                    {isEditing&&
                            <div className="pt-4">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                                    onClick={() => setShowAddPopup(true)}
                                >
                                    Add More Thumbnails
                                </button>
                            </div> 
                    }

                    
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                        >
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </div>
            </form>
            {showPopup &&
                    <ProductImagePopup
                        images={productImages}
                        onDelete={handleDeleteImage}
                        onClose={() => setShowPopup(false)}
                        isOpen={showPopup}
                    /> 
            }
            {showAddPopup &&
           
                <ImageUploadPopup
                    onClose={() => setShowAddPopup(false)}
                    product={product}
                />
            }


        </div>
    </div>
);
};

export default ProductForm;
