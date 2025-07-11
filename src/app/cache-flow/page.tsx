export default function CacheFlow() {
  const timestamp = new Date().toISOString()
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>HTTP 缓存流程演示</h1>
      <p><strong>页面生成时间:</strong> {timestamp}</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>当前缓存配置:</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
          <code>Cache-Control: public, max-age=300, stale-while-revalidate=300</code>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>缓存流程:</h2>
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>0-300秒 (强缓存):</strong></p>
          <p style={{ marginLeft: '20px', color: 'green' }}>
            ✅ 浏览器直接使用缓存，<u>不发送 HTTP 请求</u>
          </p>
          
          <p><strong>300-600秒 (协商缓存):</strong></p>
          <p style={{ marginLeft: '20px', color: 'orange' }}>
            🔄 返回过期缓存给用户，同时后台发起新请求更新缓存
          </p>
          
          <p><strong>600秒后:</strong></p>
          <p style={{ marginLeft: '20px', color: 'red' }}>
            ❌ 缓存完全过期，必须发起新请求
          </p>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>测试方法:</h2>
        <ol>
          <li>打开浏览器开发者工具的 Network 面板</li>
          <li>刷新此页面，观察请求</li>
          <li>在 300 秒内再次刷新，应该看不到网络请求</li>
          <li>300 秒后刷新，会看到请求但可能返回 304</li>
        </ol>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <h3>注意:</h3>
        <p>由于 Next.js 的 staleTimes=30秒，客户端路由缓存会在 30 秒后过期，
           这会触发新的数据获取，可能会绕过 HTTP 缓存的 300 秒设置。</p>
      </div>
    </div>
  )
}
