import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, 
  faSignOutAlt, 
  faDatabase, 
  faBrain, 
  faServer, 
  faEdit,
  faComments,
  faGraduationCap,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';
import { mockConfigs } from '../../mock/data';
import ConfigPanel from '../ConfigPanel';
import './styles.css';

const Sidebar = ({ user, onLogout, onOpenTraining }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [activeConfigPanel, setActiveConfigPanel] = useState(null);

  const renderConfigStatus = (status) => {
    return (
      <span className={`status-dot ${status}`}>
        {status === 'connected' ? '已连接' : status === 'ready' ? '就绪' : '未连接'}
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
      
      <div className="sidebar-nav">
        <button className="nav-button active">
          <FontAwesomeIcon icon={faComments} />
          <span>聊天</span>
        </button>
        <button className="nav-button" onClick={onOpenTraining}>
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>训练</span>
        </button>
        <button className="nav-button">
          <FontAwesomeIcon icon={faChartBar} />
          <span>分析</span>
        </button>
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
        <div className="user-profile">
          <div className="avatar">
            <img src={user.avatar} alt="用户头像" />
          </div>
          <div className="username">{user.name}</div>
          <div className="user-role">{user.role}</div>
        </div>
        
        <div className="sidebar-actions">
          <button 
            className={`settings-button ${showConfig ? 'active' : ''}`}
            onClick={() => setShowConfig(!showConfig)}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>系统配置</span>
          </button>
          
          <button className="logout-button" onClick={onLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>退出登录</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
