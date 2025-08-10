// src/components/common/DataTable.jsx


const DataTable = ({ columns, data, isLoading, error, currentPage, totalPages, onPageChange }) => {
  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  console.log('DataTable rendered with data:', data);
  return (
    <div>
      <div className="overflow-x-auto">


          <div className="overflow-x-auto">
            <table className="hidden md:table w-full users-table">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column) => (
                        
                        
                        <td key={`${rowIndex}-${column.accessor}`} className="px-6 py-4 whitespace-nowrap">
                          {column.cell ? column.cell(row) : row[column.accessor]}
                        </td>


                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Mobile View as Cards */}
            <div className="md:hidden space-y-4">
              {data.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
              ) : (
                data.map((row, rowIndex) => (
                  <div key={rowIndex} className="bg-white shadow rounded-lg p-5 pl-10">
                    {columns.map((column) => (
                      <div key={`${rowIndex}-${column.accessor}`} className="mb-2">
                        <div className="text-l text-gray-500 uppercase font-semibold">
                          {column.header}
                        </div>
                        <div className="pl-5 text-sm text-gray-700">
                          {column.cell ? column.cell(row) : row[column.accessor]}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>

      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;