
export default function Page({ runtime }) {
  // Edge Runtime 会有 globalThis.EdgeRuntime
  console.log(process.env.NEXT_RUNTIME);
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  
  return (
    <div>
      <h1>Hello, Next.js!{process.env.NEXT_RUNTIME}</h1>
      {globalThis?.EdgeRuntime}
      <p>runtime:{runtime }</p>
    </div>
  );
}

export const config = { runtime: 'edge' }