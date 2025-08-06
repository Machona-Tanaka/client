// src/components/Admin/Products/ProductStats.jsx
import { useQuery } from '@tanstack/react-query';
import { getProductStats } from '../../../services/productApi';

const ProductStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['product-stats'],
    queryFn: getProductStats,
  });

  if (isLoading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Total Products</h3>
        <p className="text-2xl font-bold">{stats?.totalProducts || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Low Stock Items</h3>
        <p className="text-2xl font-bold text-red-600">{stats?.lowStockItems || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">New Arrivals</h3>
        <p className="text-2xl font-bold">{stats?.newArrivals || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Avg. Rating</h3>
        <p className="text-2xl font-bold">{stats?.averageRating ? `${stats.averageRating}/5` : 'N/A'}</p>
      </div>
    </div>
  );
};

export default ProductStats;