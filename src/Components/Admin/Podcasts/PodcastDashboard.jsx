// src/components/Admin/Podcasts/PodcastDashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { getPodcasts, deletePodcast, updatePodcast } from '../../../services/podcastApi';
import DataTable from '../Common/DataTable';
import PodcastStats from './PodcastStats';
import { 
  FaBoxOpen, 
  FaClipboardCheck,
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaStar, 
  FaDollarSign,
  FaBars,
  FaWarehouse,
  FaInfoCircle,
  FaEllipsisH
} from 'react-icons/fa';



const PodcastDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Temporary static data for development
  const podcasts = {
    data: [
      {
        id: 1,
        title: 'Tech Trends',
        host: 'Jane Doe',
        duration: '45:00',
        release_date: '2024-06-01',
        views: 1200,
        is_featured: true,
        image_url: 'https://via.placeholder.com/40x40.png?text=Tech',
      },
      {
        id: 2,
        title: 'History Hour',
        host: 'John Smith',
        duration: '60:00',
        release_date: '2024-05-20',
        views: 800,
        is_featured: false,
        image_url: 'https://via.placeholder.com/40x40.png?text=History',
      },
    ],
    totalPages: 1,
  };
  const isLoading = false;
  const error = null;
  // const refetch = () => {};

  // Mutations for static data (development only)
  const deleteMutation = {
    mutate: (id) => {
      // For static data, just log the action
      console.log(`Delete podcast with id: ${id}`);
      // You could also filter out the podcast from podcasts.data if you want to simulate deletion
    },
  };

  const toggleFeaturedMutation = {
    mutate: ({ id, is_featured }) => {
      // For static data, just log the action
      console.log(`Toggle featured for podcast id: ${id} to ${is_featured}`);
      // You could also update the podcast in podcasts.data if you want to simulate update
    },
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      cell: (row) => (
        <div className="flex items-center">
          <img src={row.image_url} alt={row.title} className="w-10 h-10 rounded-md mr-3" />
          <span>{row.title}</span>
        </div>
      ),
    },
    { header: 'Host', accessor: 'host' },
    { header: 'Duration', accessor: 'duration' },
    { header: 'Release Date', accessor: 'release_date' },
    { header: 'Views', accessor: 'views' },
    {
      header: 'Featured',
      accessor: 'is_featured',
      cell: (row) => (
        <button
          onClick={() => toggleFeaturedMutation.mutate({ id: row.id, is_featured: !row.is_featured })}
          className={`px-2 py-1 rounded-md ${row.is_featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {row.is_featured ? 'Yes' : 'No'}
        </button>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
           <Link
            to={`/admin/products/edit/${row.id}`}
            className="edit-btn"
          >
            <FaEdit />
          </Link>
          <button
            onClick={() => deleteMutation.mutate(row.id)}
            className="delete-btn"
          >
             <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>


      <PodcastStats />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search podcasts..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-2.5">🔍</span>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded-md px-3 py-2"
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={podcasts?.data || []}
          isLoading={isLoading}
          error={error}
          currentPage={currentPage}
          totalPages={podcasts?.totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PodcastDashboard;