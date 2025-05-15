import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDatabase, 
  faBrain, 
  faServer, 
  faSave, 
  faTimes, 
  faCheck,
  faEdit,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import { mockConfigs, mockDatabases } from '../../mock/data';
import './styles.css';

const ConfigPanel = ({ onClose, activeTab = 'database' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  
  // 数据库配置状态
  const [dbConfig, setDbConfig] = useState({
    type: mockConfigs.database.type || 'MySQL',
    host: mockConfigs.database.host || '',
    port: mockConfigs.database.port || 3306,
    database: mockConfigs.database.database || '',
    username: mockConfigs.database.username || '',
    password: '',
    status: mockConfigs.database.status || 'disconnected'
  });
  
  // 向量库配置状态
  const [vectorConfig, setVectorConfig] = useState({
    type: mockConfigs.vectorDb.type || 'Milvus',
    host: mockConfigs.vectorDb.host || '',
    port: mockConfigs.vectorDb.port || 19530,
    collection: mockConfigs.vectorDb.collection || '',
    dimension: 1536,
    status: mockConfigs.vectorDb.status || 'disconnected',
    // 添加多向量库配置支持
    multipleVectors: false,
    vectors: [
      {
        id: 'default',
        name: '默认向量库',
        type: 'Milvus',
        host: mockConfigs.vectorDb.host || '',
        port: 19530,
        isActive: true
      }
    ]
  });
  
  // 模型配置状态
  const [modelConfig, setModelConfig] = useState({
    type: mockConfigs.model.type || 'GPT-4',
    apiKey: '********',
    baseUrl: mockConfigs.model.baseUrl || '',
    temperature: mockConfigs.model.temperature || 0.7,
    maxTokens: mockConfigs.model.maxTokens || 2000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    status: mockConfigs.model.status || 'disconnected',
    // 添加多模型配置支持
    multipleModels: false,
    models: [
      {
        id: 'default',
        name: '默认模型',
        type: 'GPT-4',
        apiKey: '********',
        baseUrl: '',
        temperature: 0.7,
        isActive: true
      }
    ]
  });

  // 处理数据库配置变更
  const handleDbConfigChange = (e) => {
    const { name, value } = e.target;
    setDbConfig({
      ...dbConfig,
      [name]: value
    });
  };

  // 处理向量库配置变更
  const handleVectorConfigChange = (e) => {
    const { name, value } = e.target;
    setVectorConfig({
      ...vectorConfig,
      [name]: name === 'multipleVectors' ? e.target.checked : value
    });
  };

  // 处理模型配置变更
  const handleModelConfigChange = (e) => {
    const { name, value } = e.target;
    setModelConfig({
      ...modelConfig,
      [name]: name === 'multipleModels' ? e.target.checked : value
    });
  };

  // 处理单个模型配置变更
  const handleModelItemChange = (modelId, field, value) => {
    setModelConfig({
      ...modelConfig,
      models: modelConfig.models.map(model => 
        model.id === modelId ? { ...model, [field]: value } : model
      )
    });
  };

  // 处理单个向量库配置变更
  const handleVectorItemChange = (vectorId, field, value) => {
    setVectorConfig({
      ...vectorConfig,
      vectors: vectorConfig.vectors.map(vector => 
        vector.id === vectorId ? { ...vector, [field]: value } : vector
      )
    });
  };

  // 添加新的模型配置
  const addModelConfig = () => {
    const newId = `model-${Date.now()}`;
    setModelConfig({
      ...modelConfig,
      models: [
        ...modelConfig.models,
        {
          id: newId,
          name: `模型 ${modelConfig.models.length + 1}`,
          type: 'GPT-3.5',
          apiKey: '',
          baseUrl: '',
          temperature: 0.7,
          isActive: false
        }
      ]
    });
  };

  // 添加新的向量库配置
  const addVectorConfig = () => {
    const newId = `vector-${Date.now()}`;
    setVectorConfig({
      ...vectorConfig,
      vectors: [
        ...vectorConfig.vectors,
        {
          id: newId,
          name: `向量库 ${vectorConfig.vectors.length + 1}`,
          type: 'Pinecone',
          host: '',
          port: 433,
          isActive: false
        }
      ]
    });
  };

  // 删除模型配置
  const removeModelConfig = (modelId) => {
    setModelConfig({
      ...modelConfig,
      models: modelConfig.models.filter(model => model.id !== modelId)
    });
  };

  // 删除向量库配置
  const removeVectorConfig = (vectorId) => {
    setVectorConfig({
      ...vectorConfig,
      vectors: vectorConfig.vectors.filter(vector => vector.id !== vectorId)
    });
  };

  // 设置活跃模型
  const setActiveModel = (modelId) => {
    setModelConfig({
      ...modelConfig,
      models: modelConfig.models.map(model => ({
        ...model,
        isActive: model.id === modelId
      }))
    });
  };

  // 设置活跃向量库
  const setActiveVector = (vectorId) => {
    setVectorConfig({
      ...vectorConfig,
      vectors: vectorConfig.vectors.map(vector => ({
        ...vector,
        isActive: vector.id === vectorId
      }))
    });
  };

  // 测试连接
  const testConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    
    // 模拟API调用
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70%概率成功
      setTestResult({
        success,
        message: success 
          ? '连接成功！' 
          : '连接失败，请检查配置信息。'
      });
      setIsTesting(false);
      
      // 如果成功，更新状态
      if (success) {
        if (currentTab === 'database') {
          setDbConfig({...dbConfig, status: 'connected'});
        } else if (currentTab === 'vector') {
          setVectorConfig({...vectorConfig, status: 'connected'});
        } else if (currentTab === 'model') {
          setModelConfig({...modelConfig, status: 'connected'});
        }
      }
    }, 1500);
  };

  // 保存配置
  const saveConfig = () => {
    // 这里应该调用API保存配置
    // 模拟保存成功
    alert('配置已保存');
    onClose();
  };

  // 渲染数据库配置
  const renderDatabaseConfig = () => (
    <div className="config-form">
      <div className="form-group">
        <label htmlFor="dbType">数据库类型</label>
        <select 
          id="dbType" 
          name="type" 
          value={dbConfig.type}
          onChange={handleDbConfigChange}
        >
          <option value="MySQL">MySQL</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="SQLite">SQLite</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Oracle">Oracle</option>
          <option value="SQL Server">SQL Server</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="dbHost">主机地址</label>
        <input 
          type="text" 
          id="dbHost" 
          name="host" 
          value={dbConfig.host}
          onChange={handleDbConfigChange}
          placeholder="例如: localhost 或 db.example.com"
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dbPort">端口</label>
          <input 
            type="number" 
            id="dbPort" 
            name="port" 
            value={dbConfig.port}
            onChange={handleDbConfigChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dbName">数据库名称</label>
          <input 
            type="text" 
            id="dbName" 
            name="database" 
            value={dbConfig.database}
            onChange={handleDbConfigChange}
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dbUsername">用户名</label>
          <input 
            type="text" 
            id="dbUsername" 
            name="username" 
            value={dbConfig.username}
            onChange={handleDbConfigChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dbPassword">密码</label>
          <input 
            type="password" 
            id="dbPassword" 
            name="password" 
            value={dbConfig.password}
            onChange={handleDbConfigChange}
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="database-tables">
        <h4>可用数据库</h4>
        <div className="table-list">
          {mockDatabases.map(db => (
            <div key={db.id} className={`table-item ${db.status}`}>
              <div className="table-info">
                <div className="table-name">{db.name}</div>
                <div className="table-type">{db.type}</div>
              </div>
              <div className="table-stats">
                {db.tables ? `${db.tables} 张表` : `${db.collections} 个集合`}
              </div>
              <div className="table-status">
                <span className={`status-dot ${db.status}`}></span>
                {db.status === 'connected' ? '已连接' : '未连接'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 渲染向量库配置
  const renderVectorDbConfig = () => (
    <div className="config-form">
      <div className="form-group switch-group">
        <label htmlFor="multipleVectors">启用多向量库配置</label>
        <label className="switch">
          <input
            type="checkbox"
            id="multipleVectors"
            name="multipleVectors"
            checked={vectorConfig.multipleVectors}
            onChange={handleVectorConfigChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
      
      {vectorConfig.multipleVectors ? (
        <div className="multi-vector-config">
          <div className="vectors-header">
            <h4>配置多个向量数据库</h4>
            <button 
              type="button" 
              className="add-vector-button"
              onClick={addVectorConfig}
            >
              添加向量库
            </button>
          </div>
          
          <div className="vectors-list">
            {vectorConfig.vectors.map(vector => (
              <div key={vector.id} className={`vector-item ${vector.isActive ? 'active' : ''}`}>
                <div className="vector-item-header">
                  <div className="vector-item-name">
                    <input
                      type="text"
                      value={vector.name}
                      onChange={(e) => handleVectorItemChange(vector.id, 'name', e.target.value)}
                      placeholder="向量库名称"
                    />
                  </div>
                  <div className="vector-item-actions">
                    <button 
                      type="button" 
                      className={`set-active-button ${vector.isActive ? 'active' : ''}`}
                      onClick={() => setActiveVector(vector.id)}
                      disabled={vector.isActive}
                    >
                      {vector.isActive ? '当前使用' : '设为默认'}
                    </button>
                    {vectorConfig.vectors.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-vector-button"
                        onClick={() => removeVectorConfig(vector.id)}
                      >
                        删除
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="vector-item-content">
                  <div className="form-row">
                    <div className="form-group">
                      <label>向量库类型</label>
                      <select 
                        value={vector.type}
                        onChange={(e) => handleVectorItemChange(vector.id, 'type', e.target.value)}
                      >
                        <option value="Milvus">Milvus</option>
                        <option value="Pinecone">Pinecone</option>
                        <option value="Faiss">Faiss</option>
                        <option value="Weaviate">Weaviate</option>
                        <option value="Qdrant">Qdrant</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>主机地址</label>
                      <input 
                        type="text" 
                        value={vector.host}
                        onChange={(e) => handleVectorItemChange(vector.id, 'host', e.target.value)}
                        placeholder="例如: localhost 或 vector.example.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>端口</label>
                      <input 
                        type="number" 
                        value={vector.port}
                        onChange={(e) => handleVectorItemChange(vector.id, 'port', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>集合名称</label>
                    <input 
                      type="text" 
                      value={vector.collection || ''}
                      onChange={(e) => handleVectorItemChange(vector.id, 'collection', e.target.value)}
                      placeholder="向量集合名称"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="vector-usage-info">
            <div className="info-item">
              <span className="info-label">当前使用向量库:</span>
              <span className="info-value">{vectorConfig.vectors.find(v => v.isActive)?.name || '未设置'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">向量库类型:</span>
              <span className="info-value">{vectorConfig.vectors.find(v => v.isActive)?.type || '未设置'}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="vectorType">向量库类型</label>
            <select 
              id="vectorType" 
              name="type" 
              value={vectorConfig.type}
              onChange={handleVectorConfigChange}
            >
              <option value="Milvus">Milvus</option>
              <option value="Pinecone">Pinecone</option>
              <option value="Faiss">Faiss</option>
              <option value="Weaviate">Weaviate</option>
              <option value="Qdrant">Qdrant</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="vectorHost">主机地址</label>
            <input 
              type="text" 
              id="vectorHost" 
              name="host" 
              value={vectorConfig.host}
              onChange={handleVectorConfigChange}
              placeholder="例如: localhost 或 vector.example.com"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vectorPort">端口</label>
              <input 
                type="number" 
                id="vectorPort" 
                name="port" 
                value={vectorConfig.port}
                onChange={handleVectorConfigChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="vectorCollection">集合名称</label>
              <input 
                type="text" 
                id="vectorCollection" 
                name="collection" 
                value={vectorConfig.collection}
                onChange={handleVectorConfigChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="vectorDimension">向量维度</label>
            <input 
              type="number" 
              id="vectorDimension" 
              name="dimension" 
              value={vectorConfig.dimension}
              onChange={handleVectorConfigChange}
            />
            <div className="field-hint">大多数大型语言模型使用1536维向量</div>
          </div>
        </>
      )}

      <div className="vector-info">
        <h4>向量数据库信息</h4>
        <div className="info-card">
          <div className="info-item">
            <span className="info-label">状态</span>
            <span className={`status-value ${vectorConfig.status}`}>
              {vectorConfig.status === 'connected' ? '已连接' : '未连接'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">集合</span>
            <span className="info-value">{vectorConfig.collection}</span>
          </div>
          <div className="info-item">
            <span className="info-label">向量数量</span>
            <span className="info-value">12,458</span>
          </div>
          <div className="info-item">
            <span className="info-label">索引类型</span>
            <span className="info-value">HNSW</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 渲染模型配置
  const renderModelConfig = () => (
    <div className="config-form">
      <div className="form-group switch-group">
        <label htmlFor="multipleModels">启用多模型配置</label>
        <label className="switch">
          <input
            type="checkbox"
            id="multipleModels"
            name="multipleModels"
            checked={modelConfig.multipleModels}
            onChange={handleModelConfigChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
      
      {modelConfig.multipleModels ? (
        <div className="multi-model-config">
          <div className="models-header">
            <h4>配置多个大语言模型</h4>
            <button 
              type="button" 
              className="add-model-button"
              onClick={addModelConfig}
            >
              添加模型
            </button>
          </div>
          
          <div className="models-list">
            {modelConfig.models.map(model => (
              <div key={model.id} className={`model-item ${model.isActive ? 'active' : ''}`}>
                <div className="model-item-header">
                  <div className="model-item-name">
                    <input
                      type="text"
                      value={model.name}
                      onChange={(e) => handleModelItemChange(model.id, 'name', e.target.value)}
                      placeholder="模型名称"
                    />
                  </div>
                  <div className="model-item-actions">
                    <button 
                      type="button" 
                      className={`set-active-button ${model.isActive ? 'active' : ''}`}
                      onClick={() => setActiveModel(model.id)}
                      disabled={model.isActive}
                    >
                      {model.isActive ? '当前使用' : '设为默认'}
                    </button>
                    {modelConfig.models.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-model-button"
                        onClick={() => removeModelConfig(model.id)}
                      >
                        删除
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="model-item-content">
                  <div className="form-row">
                    <div className="form-group">
                      <label>模型类型</label>
                      <select 
                        value={model.type}
                        onChange={(e) => handleModelItemChange(model.id, 'type', e.target.value)}
                      >
                        <option value="GPT-4">GPT-4</option>
                        <option value="GPT-3.5">GPT-3.5 Turbo</option>
                        <option value="Claude-2">Claude 2</option>
                        <option value="Gemini">Gemini Pro</option>
                        <option value="Llama-2">Llama 2</option>
                        <option value="Qwen">通义千问</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>API密钥</label>
                      <input 
                        type="password" 
                        value={model.apiKey}
                        onChange={(e) => handleModelItemChange(model.id, 'apiKey', e.target.value)}
                        placeholder="sk-..."
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Base URL</label>
                    <input 
                      type="text" 
                      value={model.baseUrl || ''}
                      onChange={(e) => handleModelItemChange(model.id, 'baseUrl', e.target.value)}
                      placeholder="https://api.openai.com/v1"
                    />
                    <div className="field-hint">可选，用于自定义API端点或私有部署</div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>温度 (Temperature)</label>
                      <div className="range-container">
                        <input 
                          type="range" 
                          min="0" 
                          max="2" 
                          step="0.1" 
                          value={model.temperature}
                          onChange={(e) => handleModelItemChange(model.id, 'temperature', e.target.value)}
                        />
                        <span className="range-value">{model.temperature}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="model-usage-info">
            <div className="info-item">
              <span className="info-label">当前使用模型:</span>
              <span className="info-value">{modelConfig.models.find(m => m.isActive)?.name || '未设置'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">模型类型:</span>
              <span className="info-value">{modelConfig.models.find(m => m.isActive)?.type || '未设置'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">API端点:</span>
              <span className="info-value">{modelConfig.models.find(m => m.isActive)?.baseUrl || '默认'}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="modelType">模型类型</label>
            <select 
              id="modelType" 
              name="type" 
              value={modelConfig.type}
              onChange={handleModelConfigChange}
            >
              <option value="GPT-4">GPT-4</option>
              <option value="GPT-3.5">GPT-3.5 Turbo</option>
              <option value="Claude-2">Claude 2</option>
              <option value="Gemini">Gemini Pro</option>
              <option value="Llama-2">Llama 2</option>
              <option value="Qwen">通义千问</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="apiKey">API密钥</label>
            <input 
              type="password" 
              id="apiKey" 
              name="apiKey" 
              value={modelConfig.apiKey}
              onChange={handleModelConfigChange}
              placeholder="sk-..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="baseUrl">Base URL</label>
            <input 
              type="text" 
              id="baseUrl" 
              name="baseUrl" 
              value={modelConfig.baseUrl}
              onChange={handleModelConfigChange}
              placeholder="https://api.openai.com/v1"
            />
            <div className="field-hint">可选，用于自定义API端点或私有部署</div>
          </div>
          
          <h4 className="section-title">模型参数</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="temperature">温度 (Temperature)</label>
              <div className="range-container">
                <input 
                  type="range" 
                  id="temperature" 
                  name="temperature" 
                  min="0" 
                  max="2" 
                  step="0.1" 
                  value={modelConfig.temperature}
                  onChange={handleModelConfigChange}
                />
                <span className="range-value">{modelConfig.temperature}</span>
              </div>
              <div className="field-hint">控制输出的随机性：较低值更确定，较高值更创造性</div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="maxTokens">最大令牌数 (Max Tokens)</label>
              <div className="range-container">
                <input 
                  type="range" 
                  id="maxTokens" 
                  name="maxTokens" 
                  min="100" 
                  max="8000" 
                  step="100" 
                  value={modelConfig.maxTokens}
                  onChange={handleModelConfigChange}
                />
                <span className="range-value">{modelConfig.maxTokens}</span>
              </div>
              <div className="field-hint">控制生成文本的最大长度</div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="topP">Top P</label>
              <div className="range-container">
                <input 
                  type="range" 
                  id="topP" 
                  name="topP" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={modelConfig.topP}
                  onChange={handleModelConfigChange}
                />
                <span className="range-value">{modelConfig.topP}</span>
              </div>
              <div className="field-hint">控制多样性：仅考虑累积概率达到p的tokens</div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="frequencyPenalty">频率惩罚 (Frequency Penalty)</label>
              <div className="range-container">
                <input 
                  type="range" 
                  id="frequencyPenalty" 
                  name="frequencyPenalty" 
                  min="-2" 
                  max="2" 
                  step="0.1" 
                  value={modelConfig.frequencyPenalty}
                  onChange={handleModelConfigChange}
                />
                <span className="range-value">{modelConfig.frequencyPenalty}</span>
              </div>
              <div className="field-hint">减少重复：较高值降低模型重复同一内容的可能性</div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="presencePenalty">存在惩罚 (Presence Penalty)</label>
              <div className="range-container">
                <input 
                  type="range" 
                  id="presencePenalty" 
                  name="presencePenalty" 
                  min="-2" 
                  max="2" 
                  step="0.1" 
                  value={modelConfig.presencePenalty}
                  onChange={handleModelConfigChange}
                />
                <span className="range-value">{modelConfig.presencePenalty}</span>
              </div>
              <div className="field-hint">增加多样性：较高值使模型更可能讨论新主题</div>
            </div>
          </div>
        </>
      )}
      
      <div className="model-info">
        <h4>模型性能</h4>
        <div className="model-stats">
          <div className="stat-item">
            <div className="stat-value">98.2%</div>
            <div className="stat-label">SQL生成准确率</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">1.2s</div>
            <div className="stat-label">平均响应时间</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">156</div>
            <div className="stat-label">今日请求数</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="config-panel-overlay">
      <div className="config-panel-container">
        <div className="config-panel-header">
          <h2>系统配置</h2>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="config-panel-tabs">
          <button 
            className={`tab-button ${currentTab === 'database' ? 'active' : ''}`}
            onClick={() => setCurrentTab('database')}
          >
            <FontAwesomeIcon icon={faDatabase} />
            <span>数据库配置</span>
          </button>
          
          <button 
            className={`tab-button ${currentTab === 'vector' ? 'active' : ''}`}
            onClick={() => setCurrentTab('vector')}
          >
            <FontAwesomeIcon icon={faServer} />
            <span>向量库配置</span>
          </button>
          
          <button 
            className={`tab-button ${currentTab === 'model' ? 'active' : ''}`}
            onClick={() => setCurrentTab('model')}
          >
            <FontAwesomeIcon icon={faBrain} />
            <span>模型配置</span>
          </button>
        </div>
        
        <div className="config-panel-content">
          {currentTab === 'database' && renderDatabaseConfig()}
          {currentTab === 'vector' && renderVectorDbConfig()}
          {currentTab === 'model' && renderModelConfig()}
          
          {testResult && (
            <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
              <FontAwesomeIcon icon={testResult.success ? faCheck : faTimes} />
              <span>{testResult.message}</span>
            </div>
          )}
        </div>
        
        <div className="config-panel-footer">
          <button 
            className="test-button"
            onClick={testConnection}
            disabled={isTesting}
          >
            {isTesting ? (
              <>
                <FontAwesomeIcon icon={faSync} spin />
                <span>测试中...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEdit} />
                <span>测试连接</span>
              </>
            )}
          </button>
          
          <button 
            className="save-button"
            onClick={saveConfig}
          >
            <FontAwesomeIcon icon={faSave} />
            <span>保存配置</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
