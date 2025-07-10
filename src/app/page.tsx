
export default function Page() {
  // Edge Runtime 会有 globalThis.EdgeRuntime
  const isEdge = typeof EdgeRuntime !== "undefined";
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      {isEdge ? "Edge Runtime" : "Node.js Runtime"}
    </div>
  );
}

export const config = { runtime: 'edge' }