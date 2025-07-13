// 设置页面重新验证时间为 60 秒
// export const revalidate = 60;
export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  return posts.map((post) => ({
    id: String(post.id),
  }))
}
export default async function Page({
  params,
}) {
  const { id } = await params
  // 在 fetch 中明确设置 revalidate 时间
  const post = await fetch(`https://api.vercel.app/blog/${id}`).then(
    (res) => res.json()
  )
  return (
    <main>
      <h1>SSR</h1>
      <h1>{post.title}</h1>
         <a href="/blog/2" style={{ marginRight: '10px', color: 'blue' }}>
          去博客页面 2(客户端路由)
        </a>
      <p>{post.content}</p>
      <small>页面缓存策略: 5分钟，后台重新验证1分钟</small>
    </main>
  )
}