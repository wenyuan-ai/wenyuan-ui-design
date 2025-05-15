import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faWeixin } from '@fortawesome/free-brands-svg-icons';
import { faMobile, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password', 'phone', 'social'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    verificationCode: ''
  });
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // 模拟登录过程
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // 调用登录成功回调，传递用户数据
      onLoginSuccess({
        id: 1,
        name: formData.username || formData.phone || 'User',
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        role: "用户"
      });
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginMethod('password');
    setFormData({
      username: '',
      password: '',
      email: '',
      phone: '',
      verificationCode: ''
    });
  };

  const handleSocialLogin = (platform) => {
    console.log(`Login with ${platform}`);
    
    // 模拟社交媒体登录
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // 调用登录成功回调
      onLoginSuccess({
        id: 2,
        name: platform === 'github' ? 'GitHub User' : 'WeChat User',
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        role: "用户"
      });
    }, 1000);
  };

  const sendVerificationCode = () => {
    if (!formData.phone || countdown > 0) return;
    // TODO: 实现发送验证码逻辑
    console.log('Sending verification code to:', formData.phone);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>{isLogin ? '登录' : '注册'}</h2>
          <p>欢迎来到我们的平台</p>
        </div>

        {isLogin && (
          <div className="login-methods">
            <button
              className={`method-button ${loginMethod === 'password' ? 'active' : ''}`}
              onClick={() => setLoginMethod('password')}
              type="button"
            >
              密码登录
            </button>
            <button
              className={`method-button ${loginMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setLoginMethod('phone')}
              type="button"
            >
              手机验证码
            </button>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {loginMethod === 'password' && (
            <>
              <div className="form-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
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
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
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
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="密码"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {loginMethod === 'phone' && (
            <>
              <div className="form-group">
                <FontAwesomeIcon icon={faMobile} className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="手机号码"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group verification-group">
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="验证码"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="verification-button"
                  onClick={sendVerificationCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                </button>
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              isLogin ? '登录' : '注册'
            )}
          </button>
        </form>

        <div className="social-login">
          <p>社交账号登录</p>
          <div className="social-buttons">
            <button
              type="button"
              className="social-button github"
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faGithub} />
            </button>
            <button
              type="button"
              className="social-button wechat"
              onClick={() => handleSocialLogin('wechat')}
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faWeixin} />
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button 
              type="button" 
              className="toggle-button" 
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
