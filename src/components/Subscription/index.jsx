import React, { useState } from 'react';
import './styles.css';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'basic',
      name: '基础版',
      monthlyPrice: 29,
      yearlyPrice: 299,
      features: [
        '基础AI对话功能',
        '每日100次对话限制',
        '标准响应速度',
        '基础客户支持'
      ]
    },
    {
      id: 'pro',
      name: '专业版',
      monthlyPrice: 79,
      yearlyPrice: 799,
      features: [
        '高级AI对话功能',
        '每日1000次对话限制',
        '优先响应速度',
        '24/7专属客服支持',
        '自定义AI模型'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: '企业版',
      monthlyPrice: 199,
      yearlyPrice: 1999,
      features: [
        '企业级AI对话功能',
        '无限次对话',
        '最快响应速度',
        '专属客户经理',
        '自定义AI模型',
        'API集成支持',
        '团队协作功能'
      ]
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    // TODO: 实现支付逻辑
    console.log('Subscribe to plan:', selectedPlan, isAnnual ? 'yearly' : 'monthly');
  };

  return (
    <div className="subscription-container">
      <div className="subscription-header">
        <h1>选择您的订阅计划</h1>
        <p>解锁全部AI对话功能，提升您的使用体验</p>
        <div className="billing-toggle">
          <span className={!isAnnual ? 'active' : ''}>月付</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <span className="slider"></span>
          </label>
          <span className={isAnnual ? 'active' : ''}>年付
            <span className="discount-badge">省20%</span>
          </span>
        </div>
      </div>

      <div className="plans-container">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && <div className="popular-badge">最受欢迎</div>}
            <h3>{plan.name}</h3>
            <div className="price">
              <span className="currency">¥</span>
              <span className="amount">
                {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="period">/{isAnnual ? '年' : '月'}</span>
            </div>
            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <i className="check-icon">✓</i>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={`select-button ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {selectedPlan === plan.id ? '已选择' : '选择方案'}
            </button>
          </div>
        ))}
      </div>

      <div className="subscription-footer">
        <button 
          className="subscribe-button"
          disabled={!selectedPlan}
          onClick={handleSubscribe}
        >
          立即订阅
        </button>
        <div className="payment-info">
          <p>支持支付方式</p>
          <div className="payment-methods">
            <span className="payment-method">支付宝</span>
            <span className="payment-method">微信支付</span>
            <span className="payment-method">银联</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
