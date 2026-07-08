import React, { useState } from 'react';
import './AdminUserManagement.css';

const INITIAL_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', phone: '+1 555-0192', status: 'Active' },
  { id: 2, name: 'Alice Smith', email: 'alice@nexora.com', role: 'Engineer', phone: '+1 555-0344', status: 'Active' },
  { id: 3, name: 'Robert Fox', email: 'robert.fox@example.com', role: 'Customer', phone: '+1 555-0991', status: 'Inactive' },
  { id: 4, name: 'Sarah Connor', email: 'sarah.c@nexora.com', role: 'Engineer', phone: '+1 555-1200', status: 'Active' },
];

export default function AdminUserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Customer', phone: '', status: 'Active' });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'Customer', phone: '', status: 'Active' });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: editingUser.id } : u));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to completely remove this user?")) {
      setUsers(users.filter(u => u.id !== id));
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="aum-td-name">
                  <div className="aum-avatar">{user.name.charAt(0)}</div>
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`aum-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.phone}</td>
                <td>
                  <span className={`aum-badge status-${user.status.toLowerCase()}`}>
                    {user.status}
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
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="aum-form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="aum-form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
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
