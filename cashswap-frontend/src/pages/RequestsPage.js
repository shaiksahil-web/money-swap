import React, { useState } from 'react';
import api from '../api';

const RequestsPage = ({ user }) => {
  const [mode, setMode] = useState('create'); // 'create' | 'list'
  const [type, setType] = useState('NEED_CASH');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [requests, setRequests] = useState([]);

  const handleCreate = async () => {
    try {
      setLoading(true);
      setStatus('');
      await api.post('/api/requests', {
        userId: user.userId,
        type,
        amount: Number(amount),
        location
      });
      setStatus('Request created.');
      setAmount('');
      setLocation('');
    } catch {
      setStatus('Failed to create request.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadRequests = async () => {
    try {
      setLoading(true);
      setStatus('');
      const res = await api.get('/api/requests', {
        params: { type }
      });
      // backend returns { success: true, requests: [...] }
      setRequests(res.data.requests || []);
      setStatus(`Loaded ${res.data.requests?.length || 0} requests.`);
    } catch {
      setStatus('Failed to load requests.');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '24px auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16
        }}
      >
        <h2>Requests</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => setMode('create')}
            style={{
              padding: '8px 16px',
              backgroundColor: mode === 'create' ? '#22c55e' : '#e5e7eb',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Create Request
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('list');
              handleLoadRequests();
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: mode === 'list' ? '#22c55e' : '#e5e7eb',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            See Available Requests
          </button>
        </div>
      </div>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Type
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        >
          <option value="NEED_CASH">Need Cash</option>
          <option value="HAVE_CASH">Have Cash</option>
        </select>
      </label>

      {mode === 'create' && (
        <>
          <label style={{ display: 'block', marginBottom: 12 }}>
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 12 }}>
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>

          <button
            type="button"
            onClick={handleCreate}
            disabled={loading || !amount || !location}
            style={{ padding: '8px 16px' }}
          >
            {loading ? 'Saving...' : 'Create Request'}
          </button>
        </>
      )}

      {mode === 'list' && (
        <div style={{ marginTop: 16 }}>
          {requests.length === 0 && !loading && <p>No requests found.</p>}
          {requests.length > 0 && (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: 8
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left', padding: 8 }}>User</th>
                  <th style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left', padding: 8 }}>Type</th>
                  <th style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left', padding: 8 }}>Amount</th>
                  <th style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left', padding: 8 }}>Location</th>
                  <th style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left', padding: 8 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.requestId}>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{r.userId}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{r.type}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{r.amount}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{r.location}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {status && <p style={{ marginTop: 16 }}>{status}</p>}
      {loading && <p style={{ marginTop: 8 }}>Loading...</p>}
    </div>
  );
};

export default RequestsPage;
