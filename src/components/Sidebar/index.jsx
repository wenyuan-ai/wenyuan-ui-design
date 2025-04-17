import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>问渊</h1>
        <p>自然语言数据库交互</p>
      </div>
      
      <div className="sidebar-bottom">
        {isLoggedIn ? (
          <div className="user-profile">
            <div className="avatar">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="用户头像" />
            </div>
            <span className="username">用户名</span>
          </div>
        ) : (
          <button className="login-button">
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>登录</span>
          </button>
        )}
        
        <button className="settings-button">
          <FontAwesomeIcon icon={faCog} />
          <span>配置</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
