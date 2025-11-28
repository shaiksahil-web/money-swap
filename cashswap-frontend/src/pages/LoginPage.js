import React, { useState } from 'react';
import api from '../api';

const LoginPage = ({ onLoginSuccess, onGoToRegister }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError('');
      await api.post('/api/auth/send-otp', { phone });
      setStep('otp');
    } catch {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.post('/api/auth/verify-otp', { phone, otp });
      // backend should return: { userId, token, isNewUser }
      const { userId, token, isNewUser } = res.data;
      const userInfo = { userId, phone, token, isNewUser };

      localStorage.setItem('cashswapUser', JSON.stringify(userInfo));

      // parent App will decide: if isNewUser === true -> go Register, else Profile
      onLoginSuccess(userInfo);
    } catch {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegister = () => {
    if (!phone) {
      setError('Enter phone number first.');
      return;
    }
    // parent App will open Register page and pass this phone
    onGoToRegister({ phone });
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Login</h2>

      {step === 'phone' && (
        <>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={!phone || loading}
              style={{ padding: '8px 16px' }}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <button
              type="button"
              onClick={handleGoToRegister}
              style={{ padding: '8px 16px' }}
            >
              Register
            </button>
          </div>
        </>
      )}

      {step === 'otp' && (
        <>
          <p>Enter the OTP (demo: 123456).</p>
          <label style={{ display: 'block', marginBottom: 8 }}>
            OTP
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={!otp || loading}
              style={{ padding: '8px 16px' }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              style={{ padding: '8px 16px' }}
            >
              Back
            </button>
          </div>
        </>
      )}

      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
