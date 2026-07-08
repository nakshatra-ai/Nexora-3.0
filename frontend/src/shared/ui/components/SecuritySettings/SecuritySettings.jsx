import React, { useState } from 'react';
import Card from '../../Card/Card';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

export default function SecuritySettings() {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [updated, setUpdated] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdated(true);
    setTimeout(() => {
      setOldPass('');
      setNewPass('');
      setUpdated(false);
    }, 2000);
  };

  return (
    <Card className="flex flex-col gap-4 font-sans select-none">
      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base">Security Checkpoints</h4>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input
          label="Current Password"
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Input
          label="New Password"
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button type="submit" variant="primary" className="w-full py-2 text-xs">
          {updated ? 'Security Saved!' : 'Save Password'}
        </Button>
      </form>
    </Card>
  );
}
