
export default function Page(props) {
  // Edge Runtime 会有 globalThis.EdgeRuntime
  console.log(process.env.NEXT_RUNTIME);
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  
  return (
    <div>
      <h1>Hello, Next.js!{process.env.NEXT_RUNTIME}</h1>
      {globalThis?.EdgeRuntime}
      <p>runtime:{JSON.stringify(props) }</p>
    </div>
  );
}

export const config = { runtime: 'edge' }