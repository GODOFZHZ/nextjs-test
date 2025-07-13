import Client from "./components/client";
// 博客网站优化的缓存策略
export default async function Page() {
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  // 博客列表数据：30分钟缓存
  const post = await fetch('https://api.vercel.app/blog').then(
    (res) => res.json()
  )
  return (
    <main>
      <h1>博客首页 - 优化缓存策略</h1>
      <Client/>
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
 * app路由中：
 * 1.fetch不设置cache那么就是           SSG渲染    (generateStaticParams生成动态路由参数)
 * 2.如果只设置了export revalidate = 60 ISR渲染   (可以不设置export revalidate = 60; 通过api路由revaildatePath(/post) 进行按需增量更新)
 * 3.如果fetch设置了cache: 'no-store'   SSR渲染
 * 4.如果设置了 'use client'            CSR渲染
 * 5.'use server' 代表服务端组件但不代表他是 SSR渲染
 * 6.experimental: {
         staleTimes: {
             dynamic: 300,  // 5分钟客户端路由缓存   这份 RSC 300秒都有效  在你使用link组件切换路由的时候
             static: 1800,  // 30分钟静态页面缓存
         }
 * 7.export const revalidate = 60; 设置页面重新生成的时间
 * pages路由中：
 * 1. 如果使用getServerSideProps就是    SSR渲染
 * 2. 如果没有使用getServerSideProps就是 SSG渲染  (通过getStaticProps()可以动态获取数据) 还可以通过getStaticPaths获取动态路由参数为每个动态路由页面生成SSG页面
 * 3. 可以在getStaticProps函数返回revalidate参数，进行周期性的更新页面
 * 4. 可以使用路由api,使用res.revalidate('/post') 进行按需增量更新
  */