// 博客网站优化的缓存策略
// export const revalidate = 1800  // 30分钟页面重新生成

export default async function Page() {
  // 博客列表数据：30分钟缓存
  const post = await fetch('https://api.vercel.app/blog', {
    next: { revalidate: 1800 }
  }).then(
    (res) => res.json()
  )
  return (
    <main>
      <h1>博客首页 - 优化缓存策略</h1>
      {JSON.stringify(post)}
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>📊 博客网站缓存配置:</p>
        <ul>
          <li>🔄 数据缓存: 30分钟 (博客内容变化不频繁)</li>
          <li>📄 页面缓存: 30分钟 (与数据缓存一致)</li>
          <li>🖥️ 客户端路由缓存: 5分钟 (保证导航体验)</li>
          <li>📡 HTTP缓存: 10分钟 (浏览器缓存)</li>
        </ul>
      </div>
    </main>
  )
}

/**
 * 
 * app路由中 如果不设置generateStaticParams 也不给fetch设置cache和revalidate，那么就是SSG渲染
 * 如果只设置了fetch的revalidate那么就是ISR
 * 如果fetch设置了cache: 'no-store'  SSR
 * 如果设置了 'use client' 就是客户端渲染
 *  experimental: {
         staleTimes: {
             dynamic: 300,  // 5分钟客户端路由缓存   这份 RSC 300秒都有效  在你使用link组件切换路由的时候
             static: 1800,  // 30分钟静态页面缓存
         }
     export const revalidate = 60; 设置页面重新生成的时间
 */