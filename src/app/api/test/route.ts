import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    message: 'Hello from API',
    timestamp: new Date().toISOString()
  }
  
  // 创建响应并设置自定义缓存头
  const response = NextResponse.json(data)
  
  // 设置缓存控制
  response.headers.set(
    'Cache-Control', 
    'public, max-age=120, stale-while-revalidate=60'
  )
  
  // 添加其他响应头
  response.headers.set('X-API-Version', '1.0')
  response.headers.set('X-Cache-Tag', 'api-data')
  
  return response
}
