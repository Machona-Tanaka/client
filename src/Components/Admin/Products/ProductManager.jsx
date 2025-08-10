import React, { useState, useEffect } from 'react';
import ProductForm from '../Common/DataCapture';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

const ProductManager = () => {
  const [data, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount_rate: '',
    category: '',
    stock: '',
    is_new: false,
    media: null, // Single file or array for multiple uploads
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (window.location.href.includes('edit') && id) {
      setIsEditing(true);

      const fetchProduct = async () => {
        try {
          const response = await api.findProduct(id);
          // console.log("Fetched Product:", response);
          const productRecord = response.data.product;
          productRecord.stock = productRecord.stock_quantity; // Adjusting stock field name if necessary
          console.log('list of a product', productRecord);
          setProduct(productRecord);
        } catch (err) {
          console.error('Failed to fetch product:', err);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleChange = (key, value) => {
    setProduct(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData();
    try{
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image_file' && value) {
          if (Array.isArray(value)) {
            value.forEach(file => formData.append('image_file', file));
          } else {
            formData.append('image_file', value);
          }
        } else {
          formData.append(key, value);
        }
      });

      let response;

      if (isEditing) {
          response = await api.updateProduct(id, formData);
          setSuccess('Product updated successfully.');
          console.log('Product updated successfully:', response);
      } else {
          response = await api.createProduct(formData);
          console.log('Product created successfully:', response);
          setSuccess('Product created successfully!');

      }
    } catch (err) {
      console.error('Failed to submit product:', err);
      setError(err.message || 'An error occurred while submitting the product.');
    } 

    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  return (
    <ProductForm
      product={data}
      isEditing={isEditing}
      error={error}
      success={success}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProductManager;
