import React, { useState } from 'react';
import api from '../api';

const RegisterPage = ({ user, onRegistered }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = name.trim() && phone.trim() && password.length >= 6;

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.post('/api/users', {
        name: name.trim(),
        phone: phone.trim(),
        password
      });
      const registeredUser = res.data.user;
      const merged = {
        ...(user || {}),
        userId: registeredUser.userId,
        phone: registeredUser.phone
      };
      localStorage.setItem('cashswapUser', JSON.stringify(merged));
      onRegistered(merged);
    } catch (e) {
      setError('Failed to register user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Register</h2>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Phone
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Password (min 6 characters)
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>

      <button
        type="button"
        onClick={handleRegister}
        disabled={!isValid || loading}
        style={{ padding: '8px 16px' }}
      >
        {loading ? 'Saving...' : 'Register'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
