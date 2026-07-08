import React, { useContext, useState } from 'react';
import { AppContext } from '../../app/providers/AppContext';
import ProfileCard from '../../shared/ui/components/ProfileCard/ProfileCard';
import ProfileDetails from '../../shared/ui/components/ProfileDetails/ProfileDetails';
import EditProfileModal from '../../shared/ui/components/EditProfileModal/EditProfileModal';
import Button from '../../shared/ui/Button/Button';

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveProfile = (updatedData) => {
    setCurrentUser(prev => ({
      ...prev,
      name: updatedData.name,
      phone: updatedData.phone
    }));
  };

  return (
    <div className="space-y-6 font-sans select-none max-w-4xl mx-auto flex flex-col gap-2">
      {/* Top Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-base pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-display font-bold text-text-base">Profile Management</h2>
          <p className="text-xs text-text-muted-base">Review contact data and system roles</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} className="text-xs py-2">
          Edit Profile
        </Button>
      </div>

      {/* Main layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
        <div className="lg:col-span-4">
          <ProfileCard user={currentUser} />
        </div>
        <div className="lg:col-span-8">
          <ProfileDetails user={currentUser} />
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={currentUser}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
