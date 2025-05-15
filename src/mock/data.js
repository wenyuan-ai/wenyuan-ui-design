export const mockMessages = [
  {
    id: 1,
    text: "查询销售部门2023年的销售额",
    sender: 'user',
    timestamp: '2023-12-10 14:23:45',
    status: 'success'
  },
  {
    id: 2,
    sender: 'ai',
    timestamp: '2023-12-10 14:23:46',
    content: {
      response: "根据您的查询，我为您生成了以下SQL语句：",
      sql: `SELECT 
  department.name, 
  SUM(sales.amount) as total_sales
FROM sales 
JOIN department ON sales.dept_id = department.id
WHERE department.name = '销售部'
  AND YEAR(sales.sale_date) = 2023
GROUP BY department.name;`,
      result: {
        total_sales: 1458932.5,
        chart_type: 'line',
        data: [
          { month: '1月', sales: 98234 },
          { month: '2月', sales: 112534 },
          { month: '3月', sales: 156734 },
          { month: '4月', sales: 132845 },
          { month: '5月', sales: 142534 },
          { month: '6月', sales: 128956 },
          { month: '7月', sales: 138453 },
          { month: '8月', sales: 145234 },
          { month: '9月', sales: 132453 },
          { month: '10月', sales: 128945 },
          { month: '11月', sales: 134534 },
          { month: '12月', sales: 89476 }
        ]
      }
    },
    status: 'success'
  },
  {
    id: 3,
    text: "帮我分析一下销售趋势",
    sender: 'user',
    timestamp: '2023-12-10 14:24:30',
    status: 'success'
  },
  {
    id: 4,
    sender: 'ai',
    timestamp: '2023-12-10 14:24:31',
    content: {
      response: "根据销售数据分析，我发现以下趋势：\n\n1. 销售高峰期出现在3月份，达到156,734元\n2. 全年销售整体呈现波动上升趋势\n3. 12月份出现明显下滑，建议关注原因\n4. 第一季度表现最好，平均销售额122,500元",
      analysis: {
        trend: 'upward',
        peak: { month: '3月', value: 156734 },
        valley: { month: '12月', value: 89476 },
        suggestions: [
          "关注12月份销售下滑原因",
          "建议复制第一季度的成功经验",
          "可以考虑在淡季增加促销活动"
        ]
      }
    },
    status: 'success'
  }
];

export const mockUser = {
  id: 1,
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  role: "管理员",
  lastLogin: "2023-12-10 14:20:30"
};

export const mockConfigs = {
  database: {
    type: "MySQL",
    host: "db.example.com",
    port: 3306,
    database: "sales_db",
    username: "******",
    password: "********",
    connectionTimeout: 10000,
    maxConnections: 10,
    ssl: true,
    status: "connected",
    lastConnected: "2023-12-10 13:45:22",
    availableTypes: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle"],
    supportedFeatures: ["事务", "存储过程", "触发器", "视图"]
  },
  model: {
    type: "GPT-4",
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    systemPrompt: "你是一个专业的数据分析助手，能够将自然语言转换为SQL查询并分析结果。",
    apiKey: "sk-***********************************",
    status: "ready",
    availableModels: ["GPT-4", "GPT-3.5-Turbo", "Claude 2", "LLaMA 2", "Qwen"],
    supportedFeatures: ["SQL生成", "自然语言分析", "图表推荐", "数据解释"]
  },
  vectorDb: {
    type: "Milvus",
    host: "vector.example.com",
    port: 19530,
    collection: "sales_embeddings",
    dimension: 1536,
    metric: "COSINE",
    indexType: "HNSW",
    replicaNumber: 2,
    shardNumber: 3,
    status: "connected",
    lastSyncTime: "2023-12-10 12:30:15",
    availableTypes: ["Milvus", "Faiss", "Pinecone", "Weaviate", "Qdrant"],
    supportedFeatures: ["相似度搜索", "向量检索", "语义匹配", "多模态索引"]
  }
};

export const mockDatabases = [
  { id: 1, name: "销售数据库", type: "MySQL", tables: 24, status: "connected" },
  { id: 2, name: "用户数据库", type: "PostgreSQL", tables: 15, status: "connected" },
  { id: 3, name: "产品数据库", type: "MongoDB", collections: 8, status: "disconnected" }
];

export const mockModelOptions = [
  { id: 'gpt4', name: 'GPT-4', provider: 'OpenAI', maxTokens: 8192 },
  { id: 'gpt35', name: 'GPT-3.5 Turbo', provider: 'OpenAI', maxTokens: 4096 },
  { id: 'claude2', name: 'Claude 2', provider: 'Anthropic', maxTokens: 100000 },
  { id: 'gemini', name: 'Gemini Pro', provider: 'Google', maxTokens: 32768 },
  { id: 'llama2', name: 'Llama 2', provider: 'Meta', maxTokens: 4096 },
  { id: 'qwen', name: '通义千问', provider: '阿里巴巴', maxTokens: 8192 }
];

export const mockVectorDbOptions = [
  { id: 'milvus', name: 'Milvus', type: '向量数据库', supportedDimensions: [128, 256, 512, 768, 1024, 1536, 2048] },
  { id: 'pinecone', name: 'Pinecone', type: '向量搜索', supportedDimensions: [768, 1024, 1536] },
  { id: 'faiss', name: 'Faiss', type: '向量索引库', supportedDimensions: [32, 64, 128, 256, 512, 768, 1024, 1536, 2048] },
  { id: 'weaviate', name: 'Weaviate', type: '向量搜索引擎', supportedDimensions: [768, 1024, 1536] },
  { id: 'qdrant', name: 'Qdrant', type: '向量数据库', supportedDimensions: [128, 256, 512, 768, 1024, 1536] }
];
