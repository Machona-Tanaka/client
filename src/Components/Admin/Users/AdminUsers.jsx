import React, { useState, useEffect } from 'react';
import UsersTable from './UsersTable';
import '../../../assets/css/AuthPages.css'
import api from '../../../services/api';
import DeleteConfirmation from '../ui/DeleteConfirmation';


const AdminUsersPage = () => {
 const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    // Perform delete operation
    console.log('Deleting:', userToDelete[0]);
    const userId =  userToDelete[0].id;
     try {
        await api.deleteUser(userToDelete[0].id);
        alert('User deleted successfully');
        setUsers(users.filter(user => user.id !== userId));
        // You can refresh your user list or remove the user from state manually
      } catch (error) {
        console.error('Delete error:', error.response?.data?.message || error.message);
  }
    setShowDeleteDialog(false);
  };

const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.getUsers();
       // Debugging
        const formattedUsers = response.data.map(user => ({
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
              isActive: user.isActive == '1'? true: false,
            }));
              console.log(formattedUsers);
        setUsers(formattedUsers);    // Update state
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    }

    fetchUsers(); // Trigger the data fetch on mount
  }, []);

  const handleEdit = (user) => {
    // Open edit modal or navigate to edit page
    console.log('Editing user:', user);
  };

  const handleDelete = (userId) => {
    // Confirm and delete user
    handleDeleteClick(users.filter(user => user.id == userId));
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isActive: newStatus } : user
    ));
  };

  return (
    <>
    {/* Create New User -- Back Buttons */}
    <div className="admin-page">

      {/* Your table component */}
      
      {showDeleteDialog && (
        <DeleteConfirmation
          itemName={userToDelete?.name || 'this user'}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}


      <UsersTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
    </>
  );
};

export default AdminUsersPage;