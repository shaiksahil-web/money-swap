import React from 'react';

const NavBar = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        backgroundColor: '#0f172a',
        color: '#f9fafb'
      }}
    >
      <div style={{ fontWeight: 700 }}>CashSwap</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          style={{
            padding: '6px 12px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: currentPage === 'profile' ? '#22c55e' : '#1f2937',
            color: '#f9fafb'
          }}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => onNavigate('requests')}
          style={{
            padding: '6px 12px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: currentPage === 'requests' ? '#22c55e' : '#1f2937',
            color: '#f9fafb'
          }}
        >
          Requests
        </button>
        <button
          type="button"
          onClick={() => onNavigate('chat')}
          style={{
            padding: '6px 12px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: currentPage === 'chat' ? '#22c55e' : '#1f2937',
            color: '#f9fafb'
          }}
        >
          Chat
        </button>
        <button
          type="button"
          onClick={onLogout}
          style={{
            padding: '6px 12px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#ef4444',
            color: '#f9fafb'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
