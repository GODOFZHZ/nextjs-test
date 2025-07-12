import { NextRequest, NextResponse } from 'next/server'

// 性能监控端点
export async function POST(request: NextRequest) {
  try {
    const metrics = await request.json()
    
    // 验证必需字段
    const requiredFields = ['page', 'loadTime', 'timestamp']
    for (const field of requiredFields) {
      if (!metrics[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // 在实际应用中，这里应该发送到监控服务
    // 例如：DataDog, New Relic, CloudWatch 等
    console.log('性能监控数据:', {
      page: metrics.page,
      loadTime: metrics.loadTime,
      firstContentfulPaint: metrics.fcp,
      largestContentfulPaint: metrics.lcp,
      firstInputDelay: metrics.fid,
      cumulativeLayoutShift: metrics.cls,
      timestamp: metrics.timestamp,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
    })
    
    // 性能阈值检查
    const alerts = []
    if (metrics.loadTime > 3000) {
      alerts.push('页面加载时间超过3秒')
    }
    if (metrics.lcp > 2500) {
      alerts.push('LCP指标超过推荐值')
    }
    if (metrics.fid > 100) {
      alerts.push('FID指标超过推荐值')
    }
    if (metrics.cls > 0.1) {
      alerts.push('CLS指标超过推荐值')
    }
    
    const response = {
      status: 'received',
      timestamp: new Date().toISOString(),
      alerts: alerts.length > 0 ? alerts : null,
      recommendations: alerts.length > 0 ? [
        '考虑优化图片加载',
        '检查第三方脚本',
        '优化CSS加载顺序',
        '使用更激进的缓存策略'
      ] : null
    }
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    })
    
  } catch (error) {
    console.error('性能监控处理失败:', error)
    
    return NextResponse.json(
      { 
        error: '性能数据处理失败',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 获取性能统计信息
export async function GET() {
  try {
    // 模拟性能统计数据
    // 在实际应用中，这些数据应该从数据库或监控服务获取
    const performanceStats = {
      summary: {
        average_load_time: 1234, // ms
        p95_load_time: 2100,
        p99_load_time: 3200,
        error_rate: 0.02, // 2%
        uptime: 99.9, // %
      },
      
      recent_metrics: {
        timestamp: new Date().toISOString(),
        active_users: Math.floor(Math.random() * 1000) + 100,
        requests_per_minute: Math.floor(Math.random() * 5000) + 1000,
        cache_hit_rate: 0.85, // 85%
        memory_usage: Math.floor(Math.random() * 30) + 50, // 50-80%
      },
      
      web_vitals: {
        fcp: { average: 800, p95: 1200 }, // ms
        lcp: { average: 1500, p95: 2000 },
        fid: { average: 50, p95: 80 },
        cls: { average: 0.05, p95: 0.08 },
      },
      
      optimization_tips: [
        '当前缓存命中率良好，继续保持',
        '考虑启用 HTTP/3 提升连接性能',
        '监控 Core Web Vitals 指标',
        '定期检查第三方服务性能影响'
      ]
    }
    
    return NextResponse.json(performanceStats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
        'Content-Type': 'application/json',
      },
    })
    
  } catch (error) {
    console.error('获取性能统计失败:', error)
    
    return NextResponse.json(
      { error: '获取性能统计失败' },
      { status: 500 }
    )
  }
}
