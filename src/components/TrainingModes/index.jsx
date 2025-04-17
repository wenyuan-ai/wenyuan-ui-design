import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faKeyboard, 
  faFileUpload, 
  faDatabase,
  faPlus,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const TrainingModes = ({ onModeChange }) => {
  const [activeMode, setActiveMode] = useState('text');
  const [file, setFile] = useState(null);
  const [sqlPair, setSqlPair] = useState({ question: '', sql: '' });
  const [sqlPairs, setSqlPairs] = useState([]);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    onModeChange?.(mode);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSqlPairAdd = () => {
    if (sqlPair.question && sqlPair.sql) {
      setSqlPairs([...sqlPairs, { ...sqlPair, id: Date.now() }]);
      setSqlPair({ question: '', sql: '' });
    }
  };

  const handleSqlPairDelete = (id) => {
    setSqlPairs(sqlPairs.filter(pair => pair.id !== id));
  };

  const renderTrainingMode = () => {
    switch (activeMode) {
      case 'text':
        return (
          <div className="training-text-mode">
            <p className="mode-description">
              输入自然语言描述，系统将学习您的查询意图和对应的SQL模式。
            </p>
          </div>
        );
      
      case 'file':
        return (
          <div className="training-file-mode">
            <div className="file-upload-area">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".csv,.json,.txt"
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-label">
                <FontAwesomeIcon icon={faFileUpload} />
                <span>
                  {file ? file.name : '选择训练文件'}
                </span>
              </label>
              {file && (
                <div className="file-info">
                  <span>{file.name}</span>
                  <button onClick={() => setFile(null)} className="remove-file">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              )}
            </div>
            <div className="file-requirements">
              <h4>支持的文件格式：</h4>
              <ul>
                <li>CSV文件：包含问题和SQL对应关系</li>
                <li>JSON文件：结构化的训练数据</li>
                <li>TXT文件：按特定格式组织的训练数据</li>
              </ul>
            </div>
          </div>
        );
      
      case 'qa':
        return (
          <div className="training-qa-mode">
            <div className="qa-input-section">
              <div className="input-group">
                <label>自然语言问题：</label>
                <textarea
                  value={sqlPair.question}
                  onChange={(e) => setSqlPair({ ...sqlPair, question: e.target.value })}
                  placeholder="例如：查询销售部门2023年的销售总额"
                />
              </div>
              <div className="input-group">
                <label>对应的SQL语句：</label>
                <textarea
                  value={sqlPair.sql}
                  onChange={(e) => setSqlPair({ ...sqlPair, sql: e.target.value })}
                  placeholder="例如：SELECT SUM(amount) FROM sales WHERE department='销售' AND YEAR(date)=2023"
                />
              </div>
              <button 
                className="add-pair-button"
                onClick={handleSqlPairAdd}
                disabled={!sqlPair.question || !sqlPair.sql}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>添加训练对</span>
              </button>
            </div>

            {sqlPairs.length > 0 && (
              <div className="qa-pairs-list">
                <h4>已添加的训练数据：</h4>
                {sqlPairs.map(pair => (
                  <div key={pair.id} className="qa-pair">
                    <div className="qa-pair-content">
                      <div className="pair-item">
                        <strong>Q:</strong> {pair.question}
                      </div>
                      <div className="pair-item">
                        <strong>SQL:</strong> {pair.sql}
                      </div>
                    </div>
                    <button 
                      className="delete-pair"
                      onClick={() => handleSqlPairDelete(pair.id)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="training-modes">
      <div className="mode-selector">
        <button
          className={`mode-button ${activeMode === 'text' ? 'active' : ''}`}
          onClick={() => handleModeChange('text')}
        >
          <FontAwesomeIcon icon={faKeyboard} />
          <span>文本训练</span>
        </button>
        <button
          className={`mode-button ${activeMode === 'file' ? 'active' : ''}`}
          onClick={() => handleModeChange('file')}
        >
          <FontAwesomeIcon icon={faFileUpload} />
          <span>文件训练</span>
        </button>
        <button
          className={`mode-button ${activeMode === 'qa' ? 'active' : ''}`}
          onClick={() => handleModeChange('qa')}
        >
          <FontAwesomeIcon icon={faDatabase} />
          <span>Q&A训练</span>
        </button>
      </div>

      <div className="mode-content">
        {renderTrainingMode()}
      </div>
    </div>
  );
};

export default TrainingModes;
