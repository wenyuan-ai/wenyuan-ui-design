import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDatabase, 
  faCheck, 
  faTimes, 
  faChevronDown, 
  faChevronRight,
  faCopy,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { mockTrainingData } from '../../mock/trainingData';
import './styles.css';

const TrainingPanel = ({ isVisible }) => {
  const [expandedDataset, setExpandedDataset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filterDatasets = (datasets) => {
    if (!searchTerm) return datasets;
    return datasets.filter(dataset => 
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className={`training-panel ${isVisible ? 'visible' : ''}`}>
      <div className="training-header">
        <h2>训练数据集</h2>
        <div className="training-stats">
          <div className="stat-item">
            <span className="stat-label">数据集总数</span>
            <span className="stat-value">{mockTrainingData.statistics.totalDatasets}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">样本总数</span>
            <span className="stat-value">{mockTrainingData.statistics.totalSamples}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">平均准确率</span>
            <span className="stat-value">{(mockTrainingData.statistics.averageAccuracy * 100).toFixed(1)}%</span>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜索数据集..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="datasets-list">
        {filterDatasets(mockTrainingData.datasets).map(dataset => (
          <div key={dataset.id} className="dataset-item">
            <div 
              className="dataset-header"
              onClick={() => setExpandedDataset(expandedDataset === dataset.id ? null : dataset.id)}
            >
              <div className="dataset-title">
                <FontAwesomeIcon 
                  icon={expandedDataset === dataset.id ? faChevronDown : faChevronRight}
                  className="expand-icon"
                />
                <FontAwesomeIcon icon={faDatabase} className="dataset-icon" />
                <span>{dataset.name}</span>
              </div>
              <div className="dataset-meta">
                <span className="sample-count">{dataset.samples.length} 样本</span>
                <span className={`dataset-status ${dataset.status}`}>
                  {dataset.status === 'active' ? '活跃' : '已归档'}
                </span>
              </div>
            </div>

            {expandedDataset === dataset.id && (
              <div className="dataset-content">
                <p className="dataset-description">{dataset.description}</p>
                <div className="samples-list">
                  {dataset.samples.map(sample => (
                    <div key={sample.id} className="sample-item">
                      <div className="sample-header">
                        <div className="sample-query">
                          <span className="query-label">查询:</span>
                          <span className="query-text">{sample.query}</span>
                        </div>
                        <div className="sample-actions">
                          <button 
                            className="action-button"
                            onClick={() => handleCopy(sample.sql)}
                            title="复制SQL"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                          <button 
                            className="action-button"
                            title="编辑"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button 
                            className="action-button delete"
                            title="删除"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="sample-sql">
                        <pre>{sample.sql}</pre>
                      </div>
                      
                      <div className="sample-meta">
                        <span className="accuracy">
                          准确率: {(sample.accuracy * 100).toFixed(1)}%
                        </span>
                        <span className="verified">
                          <FontAwesomeIcon 
                            icon={sample.verified ? faCheck : faTimes}
                            className={sample.verified ? 'verified' : 'unverified'}
                          />
                          {sample.verified ? '已验证' : '未验证'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPanel;
