import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faDatabase, faBrain } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Chat = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [mode, setMode] = React.useState('query'); // 'query' or 'train'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: '这是一个模拟的AI响应...',
        sender: 'ai'
      };
      setMessages(msgs => [...msgs, aiResponse]);
    }, 1000);
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <form className="input-area" onSubmit={handleSubmit}>
        <div className="mode-selector">
          <button
            type="button"
            className={`mode-button ${mode === 'query' ? 'active' : ''}`}
            onClick={() => setMode('query')}
          >
            <FontAwesomeIcon icon={faDatabase} />
            <span>查询</span>
          </button>
          <button
            type="button"
            className={`mode-button ${mode === 'train' ? 'active' : ''}`}
            onClick={() => setMode('train')}
          >
            <FontAwesomeIcon icon={faBrain} />
            <span>训练</span>
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
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
