// export const revalidate = 60
// export const dynamicParams = true // or false, to 404 on unknown paths
// export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  return posts.map((post) => ({
    id: String(post.id),
  }))
  // const posts = await Promise.resolve([{id:1},{id:2},{id:3},{id:4}])
  // return posts.map((post) => ({
  //   id: String(post.id),
  // }))
}
export default async function Page({
  params,
}) {
  const { id } = await params
  const post = await fetch(`https://api.vercel.app/blog/${id}`).then(
    (res) => res.json()
  )
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}