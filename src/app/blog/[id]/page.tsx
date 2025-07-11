// export const revalidate = 60
// export const dynamicParams = true // or false, to 404 on unknown paths
// export const dynamic = 'force-dynamic';
export const revalidate = 60
export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog', { cache: 'no-store' }).then((res) =>
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
  const post = await fetch(`https://api.vercel.app/blog/${id}`, {next: {
      revalidate: 60
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