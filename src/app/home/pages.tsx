export const revalidate = 60
export default async function Page() {
  const post = await fetch('https://api.vercel.app/blog').then(
    (res) => res.json()
  )
  return (
    <main>
    <h1>ISR</h1>
     {JSON.stringify(post)}
    </main>
  )
}