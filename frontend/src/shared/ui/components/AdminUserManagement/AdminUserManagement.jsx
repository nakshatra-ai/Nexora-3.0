import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUserManagement.css';

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', role: 'Customer', is_active: true, password: '' });

  const API_URL = 'http://localhost:8000/api/admin/users/';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ email: user.email, role: user.role, is_active: user.is_active, password: '' });
    } else {
      setEditingUser(null);
      setFormData({ email: '', role: 'Customer', is_active: true, password: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`${API_URL}${editingUser.id}/`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to completely remove this user?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="admin-user-management-wrapper">
      <div className="aum-header">
        <div>
          <h2 className="aum-title">User Management</h2>
          <p className="aum-subtitle">View and manage all customer and engineer profiles</p>
        </div>
        <button className="aum-add-btn" onClick={() => handleOpenModal()}>
          + Add New User
        </button>
      </div>

      <div className="aum-table-container">
        <table className="aum-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <span className={`aum-badge role-${user.role?.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`aum-badge status-${user.is_active ? 'active' : 'inactive'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="aum-action-buttons">
                    <button className="aum-btn-edit" onClick={() => handleOpenModal(user)}>Edit</button>
                    <button className="aum-btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="aum-no-data">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="aum-modal-overlay">
          <div className="aum-modal">
            <div className="aum-modal-header">
              <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button className="aum-close-btn" onClick={handleCloseModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="aum-form">
              <div className="aum-form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="aum-form-group">
                <label>Password (Leave blank to keep existing)</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required={!editingUser} />
              </div>
              <div className="aum-form-row">
                <div className="aum-form-group">
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="Customer">Customer</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="aum-form-group">
                  <label>Status</label>
                  <select name="is_active" value={formData.is_active} onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === 'true' }))}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="aum-modal-actions">
                <button type="button" className="aum-btn-cancel" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="aum-btn-save">{editingUser ? 'Save Changes' : 'Create User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
