import React, { useState } from 'react';
import '../App.css'; // Make sure App.css exists and has styles

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! This is a message from the user.', sender: 'user' },
    { text: 'Hello! This is a message from the bot.', sender: 'bot' },
  ]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userInput = input;

    // Add user message to the chat
    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    setInput('');

    try {
      // Send request to your backend
      const response = await fetch('http://localhost:5000/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();

      // Add bot's reply to the chat
      setMessages(prev => [...prev, { text: data.aiPrompt, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching prompt:', error);
      setMessages(prev => [...prev, { text: 'Error: Unable to fetch reply.', sender: 'bot' }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
            data-sender={msg.sender}
          >
            <strong>{msg.sender === 'user' ? 'User' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your idea..."
          style={{ width: `${Math.min(Math.max(input.length * 10, 150), 400)}px` }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
