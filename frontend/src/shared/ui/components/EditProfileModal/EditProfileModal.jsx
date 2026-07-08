import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

export default function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ name, phone });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User Profile" size="sm">
      <form onSubmit={handleSave} className="space-y-4">
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}
