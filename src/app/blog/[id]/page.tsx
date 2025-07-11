// 设置页面重新验证时间为 60 秒
export const revalidate = 60;

// 如果需要强制动态渲染，取消注释下一行
// export const dynamic = 'force-dynamic';

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
  const post = await fetch(`https://api.vercel.app/blog/${id}`, {
    next: {
      revalidate: 60 // 60 秒后重新验证
    }
  }).then(
    (res) => res.json()
  )
  
  return (
    <main>
      <h1>SSR</h1>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}