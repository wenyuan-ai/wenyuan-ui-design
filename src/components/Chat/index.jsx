import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faDatabase, faBrain } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('query');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      status: 'success'
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: '正在分析您的请求，请稍候...',
        sender: 'ai',
        status: 'success'
      };
      setMessages(msgs => [...msgs, aiResponse]);
    }, 500);
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
            <div className={`status-indicator ${message.status}`}></div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="input-area" onSubmit={handleSubmit}>
        <div className="mode-selector">
          <button
            type="button"
            className={`mode-button ${mode === 'query' ? 'active' : ''}`}
            onClick={() => setMode('query')}
          >
            <FontAwesomeIcon icon={faDatabase} />
            <span>查询数据</span>
          </button>
          <button
            type="button"
            className={`mode-button ${mode === 'train' ? 'active' : ''}`}
            onClick={() => setMode('train')}
          >
            <FontAwesomeIcon icon={faBrain} />
            <span>模型训练</span>
          </button>
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'query' ? "输入自然语言查询..." : "输入训练指令..."}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>发送</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
