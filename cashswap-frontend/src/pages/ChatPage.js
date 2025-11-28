import React, { useState } from 'react';

const ChatPage = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: user.phone, text: text.trim() }
    ]);
    setText('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '24px auto' }}>
      <h2>Chat (demo)</h2>
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 4,
          minHeight: 200,
          padding: 8,
          marginBottom: 12
        }}
      >
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 6 }}>
            <strong>{m.from}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: 8 }}
          placeholder="Type a message..."
        />
        <button type="button" onClick={handleSend} style={{ padding: '8px 16px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
