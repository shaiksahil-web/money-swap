import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RequestsPage from './pages/RequestsPage';
import ChatPage from './pages/ChatPage';
import NavBar from './components/NavBar';

const App = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login'); // login | register | profile | requests | chat

  useEffect(() => {
    const saved = localStorage.getItem('cashswapUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setPage(parsed.userId ? 'profile' : 'register');
    }
  }, []);

  const handleLoginSuccess = (info) => {
    setUser(info);
    setPage(info.isNewUser ? 'register' : 'profile');
  };

  const handleGoToRegister = (data) => {
    setUser((prev) => ({ ...(prev || {}), phone: data.phone }));
    setPage('register');
  };

  const handleRegistered = (info) => {
    setUser(info);
    setPage('profile');
  };

  const handleNavigate = (target) => {
    setPage(target);
  };

  const handleLogout = () => {
    localStorage.removeItem('cashswapUser');
    setUser(null);
    setPage('login');
  };

  if (!user && page === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGoToRegister={handleGoToRegister}
      />
    );
  }

  if (user && !user.userId && page === 'register') {
    return <RegisterPage user={user} onRegistered={handleRegistered} />;
  }

  return (
    <div>
      <NavBar
        currentPage={page}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {page === 'profile' && <ProfilePage user={user} />}
      {page === 'requests' && <RequestsPage user={user} />}
      {page === 'chat' && <ChatPage user={user} />}
    </div>
  );
};

export default App;
