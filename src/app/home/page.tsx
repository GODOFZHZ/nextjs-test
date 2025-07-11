export const revalidate = 60
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
export async function generateStaticParams() {
  console.log(' posts');
  const posts = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  console.log(posts, ' posts');
  
  return posts.map((post) => ({
    id: String(post.id),
  }))
}

export default async function Page({
  params,
}) {
  console.log(' posts222');
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