import React, { useState } from 'react';
import './styles.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 实现实际的登录/注册逻辑
    console.log('Form submitted:', formData);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      password: '',
      email: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>{isLogin ? '登录' : '注册'}</h2>
          <p>欢迎来到我们的平台</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="用户名"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="电子邮箱"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="密码"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? '登录' : '注册'}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button className="toggle-button" onClick={toggleMode}>
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
