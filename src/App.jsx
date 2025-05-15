import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import MainApp from './components/MainApp';
import { mockUser } from './mock/data';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟检查用户是否已登录
  useEffect(() => {
    // 检查本地存储中是否有登录状态
    const checkAuthState = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    // 模拟网络延迟
    const timer = setTimeout(() => {
      checkAuthState();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 处理登录成功
  const handleLoginSuccess = (userData) => {
    // 在实际应用中，这里会使用真实的用户数据
    const user = userData || mockUser;
    
    // 保存到状态和本地存储
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // 处理登出
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return (
      <div className="app loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <MainApp user={currentUser} onLogout={handleLogout} />
      ) : (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
