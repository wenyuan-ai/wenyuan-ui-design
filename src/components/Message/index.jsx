import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Message = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (message.sender === 'user') {
      return <p>{message.text}</p>;
    }

    const { content } = message;
    return (
      <div className="ai-message-content">
        <p>{content.response}</p>
        
        {content.sql && (
          <div className="sql-block">
            <div className="sql-header">
              <span>SQL 查询</span>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(content.sql)}
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              </button>
            </div>
            <pre>{content.sql}</pre>
          </div>
        )}
        
        {content.result && content.result.data && (
          <div className="result-block">
            <div className="result-header">
              <span>查询结果</span>
              <span className="total">总计: ¥{content.result.total_sales.toLocaleString()}</span>
            </div>
            <div className="chart">
              {content.result.data.map((item, index) => (
                <div 
                  key={index} 
                  className="chart-bar"
                  style={{ height: `${(item.sales / 200000) * 100}%` }}
                >
                  <span className="chart-value">¥{(item.sales/10000).toFixed(1)}万</span>
                  <span className="chart-label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {content.analysis && (
          <div className="analysis-block">
            <h4>分析建议</h4>
            <ul>
              {content.analysis.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`message ${message.sender}`}>
      <div className="message-header">
        <div className="message-avatar">
          <FontAwesomeIcon icon={message.sender === 'user' ? faUser : faRobot} />
        </div>
        <span className="message-time">{message.timestamp}</span>
      </div>
      <div className="message-content">
        {renderContent()}
      </div>
      <div className={`status-indicator ${message.status}`}></div>
    </div>
  );
};

export default Message;
