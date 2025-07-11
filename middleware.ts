import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 创建响应
  const response = NextResponse.next()
  
  // 为不同的路径设置不同的缓存策略
  const pathname = request.nextUrl.pathname
  
  if (pathname.startsWith('/blog/')) {
    // 博客页面：缓存 5 分钟
    response.headers.set(
      'Cache-Control',
      'public, max-age=300, stale-while-revalidate=60'
    )
  } else if (pathname.startsWith('/api/')) {
    // API 路由：缓存 1 分钟
    response.headers.set(
      'Cache-Control',
      'public, max-age=60, stale-while-revalidate=30'
    )
  } else if (pathname === '/' || pathname.startsWith('/home')) {
    // 首页：缓存 10 分钟
    response.headers.set(
      'Cache-Control',
      'public, max-age=600, stale-while-revalidate=120'
    )
  } else {
    // 其他页面：不缓存
    response.headers.set(
      'Cache-Control',
      'no-cache, no-store, must-revalidate'
    )
  }
  
  // 添加其他自定义响应头
  response.headers.set('X-Custom-Header', 'NextJS-Cache-Control')
  
  return response
}

// 配置中间件匹配的路径
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下路径：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
