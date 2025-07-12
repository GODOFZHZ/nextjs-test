import { NextRequest, NextResponse } from 'next/server'

// 健康检查端点 - 大流量场景必需
export async function GET(request: NextRequest) {
  const start = Date.now()
  
  try {
    // 基础健康检查
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      node_version: process.version,
      
      // 内存使用情况
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
      },
      
      // 环境信息
      environment: process.env.NODE_ENV || 'development',
      platform: process.platform,
      
      // 响应时间
      response_time_ms: Date.now() - start,
      
      // 负载检查
      load_average: process.platform !== 'win32' ? 
        require('os').loadavg().map(avg => Math.round(avg * 100) / 100) : 
        'N/A (Windows)',
      
      // CPU 使用率 (简单估算)
      cpu_usage: process.cpuUsage(),
    }

    // 设置缓存头 - 健康检查不应缓存太久
    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=10',
        'Content-Type': 'application/json',
        'X-Health-Check': 'ok',
        'X-Response-Time': `${Date.now() - start}ms`,
      },
    })
    
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        response_time_ms: Date.now() - start,
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
          'X-Health-Check': 'failed',
          'X-Response-Time': `${Date.now() - start}ms`,
        },
      }
    )
  }
}

// 支持 HEAD 请求用于简单的存活检查
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=30',
      'X-Health-Check': 'ok',
    },
  })
}
