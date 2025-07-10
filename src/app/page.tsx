
export default function Page() {
  // Edge Runtime 会有 globalThis.EdgeRuntime
  console.log(process.env.NEXT_RUNTIME);
  console.log(globalThis?.EdgeRuntime); // Vercel Edge);
  
  return (
    <div>
      <h1>Hello, Next.js!</h1>
    </div>
  );
}

export const config = { runtime: 'edge' }