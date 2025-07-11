'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BackButtonTest() {
  const [pageLoadTime, setPageLoadTime] = useState('')
  const [renderTime, setRenderTime] = useState('')
  const [counter, setCounter] = useState(0)
  
  useEffect(() => {
    // 页面加载时间
    setPageLoadTime(new Date().toISOString())
    
    // 监听页面显示事件
    const handlePageShow = (event) => {
      console.log('页面显示事件:', {
        persisted: event.persisted, // true = 从 bfcache 恢复
        timeStamp: new Date().toISOString()
      })
      
      if (event.persisted) {
        console.log('页面从 Back/Forward Cache 恢复')
      } else {
        console.log('页面重新加载')
      }
    }
    
    window.addEventListener('pageshow', handlePageShow)
    
    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])
  
  useEffect(() => {
    // 组件渲染时间
    setRenderTime(new Date().toISOString())
  })
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>浏览器后退按钮测试</h1>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
        <h3>时间戳信息:</h3>
        <p><strong>页面加载时间:</strong> {pageLoadTime}</p>
        <p><strong>组件渲染时间:</strong> {renderTime}</p>
        <p><strong>用户交互计数:</strong> {counter}</p>
        <button 
          onClick={() => setCounter(c => c + 1)}
          style={{ padding: '5px 10px', marginTop: '10px' }}
        >
          点击计数 (+1)
        </button>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>测试步骤:</h3>
        <ol>
          <li>点击几次计数按钮</li>
          <li>点击下面的链接跳转</li>
          <li>使用浏览器后退按钮返回</li>
          <li>观察时间戳和计数是否保持</li>
        </ol>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>导航链接:</h3>
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
            去缓存演示页面
          </Link>
          
          <Link 
            href="/blog/1"
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            去博客页面
          </Link>
          
          <a 
            href="https://www.google.com"
            target="_blank"
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            外部链接 (新标签页)
          </a>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd' }}>
        <h3>预期行为:</h3>
        <ul>
          <li><strong>bfcache 生效</strong>: 时间戳不变，计数保持，无网络请求</li>
          <li><strong>HTTP 缓存</strong>: 页面重新加载但使用缓存，时间戳更新，计数重置</li>
          <li><strong>重新请求</strong>: 完全重新加载，时间戳更新，计数重置，有网络请求</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#d4edda' }}>
        <h3>影响 bfcache 的因素:</h3>
        <ul>
          <li>页面是否有 unload/beforeunload 事件监听器</li>
          <li>页面是否有未关闭的网络连接</li>
          <li>页面是否使用了某些不兼容的 API</li>
          <li>浏览器的内存压力</li>
          <li>Next.js 的配置</li>
        </ul>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          console.log('页面脚本执行时间:', new Date().toISOString());
          
          // 监听页面隐藏事件
          window.addEventListener('pagehide', function(event) {
            console.log('页面隐藏事件:', {
              persisted: event.persisted,
              timeStamp: new Date().toISOString()
            });
          });
        `
      }} />
    </div>
  )
}
