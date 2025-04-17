export const mockTrainingData = {
  datasets: [
    {
      id: 1,
      name: "销售查询语料",
      description: "销售数据相关的自然语言查询示例",
      created: "2023-12-01",
      samples: [
        {
          id: 1,
          query: "查询上个月销售额最高的前5个产品",
          sql: "SELECT product_name, SUM(amount) as total_sales FROM sales JOIN products ON sales.product_id = products.id WHERE MONTH(sale_date) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) GROUP BY product_name ORDER BY total_sales DESC LIMIT 5;",
          accuracy: 0.98,
          verified: true
        },
        {
          id: 2,
          query: "统计各部门今年的销售总额",
          sql: "SELECT department.name, SUM(sales.amount) as total_sales FROM sales JOIN department ON sales.dept_id = department.id WHERE YEAR(sales.sale_date) = YEAR(CURRENT_DATE) GROUP BY department.name;",
          accuracy: 0.95,
          verified: true
        }
      ],
      status: "active"
    },
    {
      id: 2,
      name: "库存查询语料",
      description: "库存管理相关的自然语言查询示例",
      created: "2023-12-05",
      samples: [
        {
          id: 3,
          query: "查找库存少于100件的产品",
          sql: "SELECT product_name, stock_quantity FROM inventory WHERE stock_quantity < 100;",
          accuracy: 0.92,
          verified: true
        }
      ],
      status: "active"
    }
  ],
  statistics: {
    totalDatasets: 2,
    totalSamples: 3,
    averageAccuracy: 0.95,
    lastUpdated: "2023-12-10 15:30:00"
  }
};
