import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignInAlt, faDatabase, faBrain, faServer } from '@fortawesome/free-solid-svg-icons';
import { mockUser, mockConfigs } from '../../mock/data';
import './styles.css';

const Sidebar = () => {
  const [isLoggedIn] = useState(true);
  const [showConfig, setShowConfig] = useState(false);

  const renderConfigStatus = (status) => {
    return (
      <span className={`status-dot ${status}`}>
        {status === 'connected' ? '已连接' : '未连接'}
      </span>
    );
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>问渊</h1>
        <p>AI 驱动的数据库交互</p>
      </div>
      
      {showConfig && (
        <div className="config-panel">
          <h3>系统配置</h3>
          
          <div className="config-section">
            <h4>
              <FontAwesomeIcon icon={faDatabase} />
              <span>数据库配置</span>
            </h4>
            <div className="config-item">
              <span>类型:</span>
              <span>{mockConfigs.database.type}</span>
            </div>
            <div className="config-item">
              <span>状态:</span>
              {renderConfigStatus(mockConfigs.database.status)}
            </div>
          </div>

          <div className="config-section">
            <h4>
              <FontAwesomeIcon icon={faBrain} />
              <span>模型配置</span>
            </h4>
            <div className="config-item">
              <span>类型:</span>
              <span>{mockConfigs.model.type}</span>
            </div>
            <div className="config-item">
              <span>状态:</span>
              {renderConfigStatus(mockConfigs.model.status)}
            </div>
          </div>

          <div className="config-section">
            <h4>
              <FontAwesomeIcon icon={faServer} />
              <span>向量数据库</span>
            </h4>
            <div className="config-item">
              <span>类型:</span>
              <span>{mockConfigs.vectorDb.type}</span>
            </div>
            <div className="config-item">
              <span>状态:</span>
              {renderConfigStatus(mockConfigs.vectorDb.status)}
            </div>
          </div>
        </div>
      )}
      
      <div className="sidebar-bottom">
        {isLoggedIn ? (
          <div className="user-profile">
            <div className="avatar">
              <img src={mockUser.avatar} alt="用户头像" />
            </div>
            <div className="username">{mockUser.name}</div>
            <div className="user-role">{mockUser.role}</div>
          </div>
        ) : (
          <button className="login-button">
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>登录</span>
          </button>
        )}
        
        <button 
          className={`settings-button ${showConfig ? 'active' : ''}`}
          onClick={() => setShowConfig(!showConfig)}
        >
          <FontAwesomeIcon icon={faCog} />
          <span>系统配置</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
