// src/components/Admin/Products/ProductDashboard.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, updateProduct, deleteProduct } from '../../../services/productApi';
import DataTable from '../Common/DataTable';
import ProductStats from './ProductStats';
import DeleteConfirmation from '../ui/DeleteConfirmation';
import {
  FaEdit,
  FaTrash,
  FaClipboardCheck
} from 'react-icons/fa';

const ProductDashboard = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState('all');
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryKey = ['products', searchTerm, currentPage, itemsPerPage, filter];

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getProducts({ search: searchTerm, page: currentPage, limit: itemsPerPage, filter }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const toggleNewStatusMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const confirmDelete = () => {
    deleteMutation.mutate(productToDelete);
    setShowDeleteDialog(false);
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowDeleteDialog(true);
  };

  const columns = [
    {
      header: 'Product',
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center">
          {row.media?.[0] && (
            <img
              src={`http://localhost:3000/${row.media[0].file_path}`}
              alt={row.name}
              className="w-10 h-10 rounded-md mr-3"
            />
          )}
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      header: 'Price',
      accessor: 'price',
      cell: (row) => {
        const base = parseFloat(row.price).toFixed(2);
        const discounted = (row.price * (1 - row.discount_rate / 100)).toFixed(2);
        return (
          <div>
            <span className={row.discount_rate > 0 ? 'line-through text-gray-400 mr-2' : ''}>
              ${base}
            </span>
            {row.discount_rate > 0 && (
              <span className="text-red-600">${discounted}</span>
            )}
          </div>
        );
      },
    },
    { header: 'Rating', accessor: 'rating', cell: (row) => `${row.rating || 0}/5` },
    { header: 'Stock', accessor: 'stock_quantity' },
    {
      header: 'Status',
      accessor: 'is_new',
      cell: (row) => (
        <button
          onClick={() => toggleNewStatusMutation.mutate({ id: row.id, is_new: !row.is_new })}
          className={`px-2 py-1 rounded-md ${row.is_new ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {row.is_new ? 'New' : 'Regular'}
        </button>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <Link to={`/admin/products/edit/${row.id}`} className="edit-btn">
            <FaEdit />
          </Link>
          <button onClick={() => handleDeleteClick(row.id)} className="delete-btn">
            <FaTrash />
          </button>
          <Link to={`/admin/products/reviews/${row.id}`} className="edit-btn">
            <FaClipboardCheck />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 p-6">
      <ProductStats />

      {showDeleteDialog && (
        <DeleteConfirmation
          itemName={productToDelete || 'Product'}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}

      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md px-3 py-2 w-full sm:w-auto"
            >
              <option value="all">All Products</option>
              <option value="new">New Arrivals</option>
              <option value="low-stock">Low Stock</option>
              <option value="discounted">Discounted</option>
              <option value="no-discounted">No Discount</option>
            </select>
          </div>

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded-md px-3 py-2 w-full sm:w-auto"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={products?.data || []}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={products?.totalPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductDashboard;
