import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faDatabase, faBrain } from '@fortawesome/free-solid-svg-icons';
import Message from '../Message';
import { mockMessages } from '../../mock/data';
import './styles.css';

const Chat = () => {
  const [messages, setMessages] = useState(mockMessages);
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
      timestamp: new Date().toLocaleString(),
      status: 'success'
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        timestamp: new Date().toLocaleString(),
        content: {
          response: "我正在分析您的请求...",
          sql: `SELECT * FROM ${mode === 'query' ? 'sales' : 'training_data'} WHERE created_at > NOW() - INTERVAL 1 DAY;`
        },
        status: 'success'
      };
      setMessages(msgs => [...msgs, aiResponse]);
    }, 1000);
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map(message => (
          <Message key={message.id} message={message} />
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
