'use client'
import { useState } from 'react'
export default function Page() {
  console.log(123);
  
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count} CSR</button>
}