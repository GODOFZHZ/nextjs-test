export const revalidate = 60
export const dynamicParams = true // or false, to 404 on unknown paths
export const dynamic = 'force-static'
export async function generateStaticParams() {
  console.log('kkkkkk posts');
  const posts = await Promise.resolve([{id:1},{id:2},{id:3},{id:4}])
  console.log(posts, '-------------generateStaticParams');
  return posts.map((post) => ({
    id: String(post.id),
  }))
}
export default async function Page({
  params,
}) {
  console.log('posts222');
  const { id } = await params
  const post= await fetch(`https://api.vercel.app/blog/${id}`).then(
    (res) => res.json()
  )
  return (
    <main>
        123123
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}