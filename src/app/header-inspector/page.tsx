import { headers } from 'next/headers'

export default async function HeaderInspector() {
  const headersList = headers()
  const timestamp = new Date().toISOString()
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>HTTP 响应头检查器</h1>
      <p><strong>页面生成时间:</strong> {timestamp}</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>当前请求的响应头应该是:</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
          <pre>
{`Cache-Control: public, max-age=300, stale-while-revalidate=300
X-Cache-Tag: blog-page
Content-Type: text/html; charset=utf-8
Date: ${new Date().toUTCString()}`}
          </pre>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>测试说明:</h2>
        <ol>
          <li><strong>首次访问</strong>: 应该看到网络请求</li>
          <li><strong>300秒内刷新 (F5)</strong>: 
            <ul>
              <li>如果看到请求 → 浏览器刷新覆盖了缓存</li>
              <li>如果没看到请求 → HTTP 缓存生效</li>
            </ul>
          </li>
          <li><strong>强制刷新 (Ctrl+F5)</strong>: 一定会看到请求</li>
        </ol>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd' }}>
        <h3>重要提醒:</h3>
        <p><strong>staleTimes 只影响客户端路由导航，不影响浏览器地址栏刷新！</strong></p>
        <p>如果你在地址栏刷新还是看到请求，原因可能是:</p>
        <ul>
          <li>浏览器的刷新机制 (F5 会发送 Cache-Control: max-age=0)</li>
          <li>浏览器设置 (禁用缓存)</li>
          <li>开发者工具的设置 (Network 面板可能禁用了缓存)</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>验证 HTTP 缓存的正确方法:</h2>
        <ol>
          <li>首次访问这个页面</li>
          <li>记录页面生成时间</li>
          <li>在地址栏输入其他 URL (如 /blog/2)</li>
          <li>然后在地址栏**直接输入**这个页面的 URL 回车</li>
          <li>如果时间没变 = HTTP 缓存生效</li>
          <li>如果时间变了 = 发起了新请求</li>
        </ol>
      </div>
    </div>
  )
}
