import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignInAlt, faDatabase, faBrain, faServer, faEdit } from '@fortawesome/free-solid-svg-icons';
import { mockUser, mockConfigs } from '../../mock/data';
import ConfigPanel from '../ConfigPanel';
import './styles.css';

const Sidebar = () => {
  const [isLoggedIn] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [activeConfigPanel, setActiveConfigPanel] = useState(null);

  const renderConfigStatus = (status) => {
    return (
      <span className={`status-dot ${status}`}>
        {status === 'connected' ? '已连接' : '未连接'}
      </span>
    );
  };

  const handleConfigClick = (configType) => {
    setActiveConfigPanel(configType);
  };

  const handleCloseConfigPanel = () => {
    setActiveConfigPanel(null);
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
              <button 
                className="edit-config-button" 
                onClick={() => handleConfigClick('database')}
                title="编辑数据库配置"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
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
              <button 
                className="edit-config-button" 
                onClick={() => handleConfigClick('model')}
                title="编辑模型配置"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
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
              <button 
                className="edit-config-button" 
                onClick={() => handleConfigClick('vector')}
                title="编辑向量库配置"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
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

      {activeConfigPanel && (
        <ConfigPanel 
          onClose={handleCloseConfigPanel} 
          activeTab={activeConfigPanel === 'database' ? 'database' : activeConfigPanel === 'vector' ? 'vector' : 'model'} 
        />
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
