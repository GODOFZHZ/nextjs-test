export default async function Page(props) {
  const data = await fetchData();
  return (
    <div>
      <h1>Hello, Next.js!{process.env.NEXT_RUNTIME}</h1>
      {globalThis?.EdgeRuntime}123123
      {JSON.stringify(data)}
    </div>
  );
}
async function fetchData() {
  console.log(process.env.NEXT_RUNTIME);
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {cache: 'force-cache'})
  console.log(res)
  return res.json()
}
export const runtime = 'edge';