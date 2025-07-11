export default function CacheDemo() {
  const now = new Date().toISOString()
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>缓存演示页面</h1>
      <p><strong>页面生成时间:</strong> {now}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>测试步骤:</h3>
        <ol>
          <li>记录当前时间</li>
          <li>导航到其他页面</li>
          <li>在 staleTimes 时间内返回此页面</li>
          <li>观察时间是否更新</li>
        </ol>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/blog/1" style={{ marginRight: '10px', color: 'blue' }}>
          去博客页面 (客户端路由)
        </a>
        <button 
          onClick={() => window.location.reload()} 
          style={{ marginLeft: '10px' }}
        >
          强制刷新页面
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h4>当前缓存配置:</h4>
        <ul>
          <li>Cache-Control: max-age=600 (10分钟)</li>
          <li>staleTimes: 被注释掉了</li>
          <li>预期行为: 页面应该缓存10分钟</li>
        </ul>
      </div>
    </div>
  )
}
