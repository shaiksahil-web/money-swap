import React, { useEffect, useState } from 'react';
import api from '../api';

const ProfilePage = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userId = user?.userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/api/users/${userId}`);
        setProfile(res.data.user);
      } catch (e) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setMessage('');
      const { name, phone } = profile;
      const res = await api.put(`/api/users/${userId}`, { name, phone });
      setProfile(res.data.user);
      setMessage('Profile updated.');
    } catch (e) {
      setError('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Loading profile...</p>;
  }

  if (!profile) {
    return <p style={{ padding: 20 }}>Profile not found.</p>;
  }

  return (
    <div style={{ maxWidth: 480, margin: '24px auto' }}>
      <h2>Profile</h2>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Name
        <input
          type="text"
          value={profile.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Phone
        <input
          type="tel"
          value={profile.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>

      <p>
        Rating: <strong>{profile.rating}</strong> ({profile.ratingCount} ratings)
      </p>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        style={{ padding: '8px 16px' }}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>

      {message && <p style={{ color: 'green', marginTop: 16 }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
    </div>
  );
};

export default ProfilePage;
