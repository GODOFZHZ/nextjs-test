
export default async function Page(props) {
  // Edge Runtime 会有 globalThis.EdgeRuntime
  console.log(process.env.NEXT_RUNTIME);
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  const data = await fetchData();
  return (
    <div>
      <h1>Hello, Next.js!{process.env.NEXT_RUNTIME}</h1>
      <p>runtime:{JSON.stringify(props) }</p>
      {JSON.stringify(globalThis)}123123
      {JSON.stringify(data)}
    </div>
  );
}
async function fetchData() {
  // 模拟从数据库或 API 获取数据
  console.log(process.env.NEXT_RUNTIME);
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  return [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
}
// const getData = async () => {
//   fetch('/')
// } 

export const runtime = 'edge';