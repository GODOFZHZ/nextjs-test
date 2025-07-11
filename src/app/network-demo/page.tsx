import Link from 'next/link'

export default function NetworkDemo() {
  const timestamp = new Date().toISOString()
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>网络请求演示</h1>
      <p><strong>页面生成时间:</strong> {timestamp}</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>测试步骤:</h2>
        <ol>
          <li>打开浏览器开发者工具的 Network 面板</li>
          <li>点击下面的链接，观察网络请求</li>
          <li>等待 30 秒后（staleTimes 过期）</li>
          <li>再次点击链接，观察新的网络请求</li>
        </ol>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>导航链接:</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link 
            href="/cache-demo" 
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#0070f3', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            去缓存演示页面 (Next.js Link)
          </Link>
          
          <a 
            href="/cache-demo"
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#ff6b6b', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            去缓存演示页面 (普通链接)
          </a>
          
          <Link 
            href="/cache-flow"
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#51cf66', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            去缓存流程页面
          </Link>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h3>观察要点:</h3>
        <ul>
          <li><strong>Next.js Link</strong>: 会发起特殊的数据请求，可能绕过浏览器缓存</li>
          <li><strong>普通链接</strong>: 会触发完整的页面请求，遵循标准浏览器缓存</li>
          <li><strong>URL 模式</strong>: 观察是否有 `/_next/data/` 或查询参数</li>
          <li><strong>请求头</strong>: 查看是否有特殊的 Cache-Control 头</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>当前缓存配置:</h2>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
{`HTTP Cache-Control: max-age=600 (10分钟)
Next.js staleTimes: 30 秒
预期行为: 30秒后 Next.js 会绕过 10分钟的 HTTP 缓存`}
        </pre>
      </div>
    </div>
  )
}
