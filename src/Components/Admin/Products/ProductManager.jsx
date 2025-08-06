import React, { useState,useEffect } from 'react';
import ProductForm from '../Common/DataCapture';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

const ProductManager = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount_rate: '',
    category: '',
    stock: '',
    is_new: false,
    image_url: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const isEditMode = window.location.href.includes('edit')? true:false;
    const params = useParams();
    const { id } = params;

    useEffect(() => {
    if (isEditMode && id) {
        console.log('You are in edit mode!');
        setIsEditing(true);

        const formProduct = async () => {
        try {
            const response = await api.get(`products/${id}`);
            const product = response.product;
            console.log(product);
            setProduct(product);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
        };

        formProduct();
    }
}, [isEditMode, id]);

  const handleChange = (key, value) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // 🔁 Update logic here (e.g., API PUT call)
      console.log('Updating Product:', product);
    } else {
      // ➕ Add logic here (e.g., API POST call)
      console.log('Adding Product:', product);
    }
  };

  return (
    <ProductForm
      product={product}
      isEditing={isEditing}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProductManager;
