// // src/components/Admin/Products/ProductReviews.jsx
// import { useParams } from 'react-router-dom';
// import { useQuery, useMutation } from '@tanstack/react-query';
// // import { getProductReviews, deleteReview, toggleReviewVerification } from '../../../../services/reviewApi';
// import DataTable from '../Common/DataTable';
// import React, { useState} from 'react';

// const ProductReviews = () => {
//   const { id } = useParams();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const { data: reviews, isLoading, error, refetch } = useQuery({
//     queryKey: ['product-reviews', id, currentPage, itemsPerPage],
//     queryFn: () => getProductReviews(id, { page: currentPage, limit: itemsPerPage }),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteReview,
//     onSuccess: () => refetch(),
//   });

//   const verificationMutation = useMutation({
//     mutationFn: toggleReviewVerification,
//     onSuccess: () => refetch(),
//   });

//   const columns = [
//     { header: 'User', accessor: 'user_id' },
//     {
//       header: 'Rating',
//       accessor: 'rating',
//       cell: (row) => (
//         <div className="flex items-center">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <span key={i} className={i < row.rating ? 'text-yellow-400' : 'text-gray-300'}>
//               ★
//             </span>
//           ))}
//         </div>
//       ),
//     },
//     { header: 'Review', accessor: 'review_text', cell: (row) => <div className="line-clamp-2">{row.review_text}</div> },
//     {
//       header: 'Verified',
//       accessor: 'verified_purchase',
//       cell: (row) => (
//         <button
//           onClick={() => verificationMutation.mutate({ id: row.id, verified: !row.verified_purchase })}
//           className={`px-2 py-1 rounded-md ${
//             row.verified_purchase ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//           }`}
//         >
//           {row.verified_purchase ? 'Verified' : 'Unverified'}
//         </button>
//       ),
//     },
//     {
//       header: 'Actions',
//       cell: (row) => (
//         <button
//           onClick={() => deleteMutation.mutate(row.id)}
//           className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
//         >
//           Delete
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Product Reviews</h2>
//         <Link to={`/admin/products/edit/${id}`} className="text-indigo-600 hover:text-indigo-800">
//           ← Back to Product
//         </Link>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <div className="flex justify-end items-center mb-4">
//           <select
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="border rounded-md px-3 py-2"
//           >
//             <option value="10">10 per page</option>
//             <option value="25">25 per page</option>
//             <option value="50">50 per page</option>
//           </select>
//         </div>

//         <DataTable
//           columns={columns}
//           data={reviews?.data || []}
//           isLoading={isLoading}
//           error={error}
//           currentPage={currentPage}
//           totalPages={reviews?.totalPages || 1}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductReviews;
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

// import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import DataTable from '../Common/DataTable'; // Assumes you have a custom DataTable component
import { Link } from 'react-router-dom';

const mockReviews = [
  {
    id: 1,
    user_id: 'user123',
    rating: 4,
    review_text: 'Excellent product. Highly recommend!',
    verified_purchase: true,
  },
  {
    id: 2,
    user_id: 'user456',
    rating: 2,
    review_text: 'It didn’t meet expectations.',
    verified_purchase: false,
  },
  {
    id: 3,
    user_id: 'user789',
    rating: 5,
    review_text: 'Absolutely fantastic!',
    verified_purchase: true,
  },
  // Add more mock items as needed
];

const ProductReviews = () => {
  // const { id } = useParams();
  const [reviews, setReviews] = useState(mockReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const paginatedData = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
  };

  const toggleVerification = (reviewId) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, verified_purchase: !review.verified_purchase }
          : review
      )
    );
  };

  const columns = [
    { header: 'User', accessor: 'user_id' },
    {
      header: 'Rating',
      accessor: 'rating',
      cell: (row) => (
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < row.rating ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Review',
      accessor: 'review_text',
      cell: (row) => <div className="line-clamp-2">{row.review_text}</div>,
    },
    {
      header: 'Verified',
      accessor: 'verified_purchase',
      cell: (row) => (
        <button
          onClick={() => toggleVerification(row.id)}
          className={`px-2 py-1 rounded-md ${
            row.verified_purchase ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.verified_purchase ? 'Verified' : 'Unverified'}
        </button>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (

        <button
                        onClick={() => handleDelete(row.id)}
                        className="delete-btn"
                        aria-label={`Delete ${row.id}`}
                      >
                        <FaTrash />
                      </button>
      )},
  ];

  return (
    <div>
      {/* <div className="flex justify-between items-center mb-6 p-6">
        <h2 className="text-2xl font-bold">Product Reviews</h2>
        <Link to={`/admin/products`} className="text-indigo-600 hover:text-indigo-800">
          ← Back to Product
        </Link>
      </div> */}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-end items-center mb-4">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setCurrentPage(1); // Reset to first page on change
              setItemsPerPage(Number(e.target.value));
            }}
            className="border rounded-md px-3 py-2"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          data={paginatedData}
          isLoading={false}
          error={null}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductReviews;
