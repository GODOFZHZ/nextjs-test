export default async function Page(props) {
  console.log(1);
  const data = await fetchData();
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      {globalThis?.EdgeRuntime}123123
      {JSON.stringify(data)}
    </div>
  );
}
async function fetchData() {
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {cache: 'force-cache', next: { revalidate: 3600 }})
  console.log(res.status)
  return res.json()
}