'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 只在开发环境显示
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
    }

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      const loadTime = navigation.loadEventEnd - navigation.fetchStart
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime
      
      const performanceData: PerformanceMetrics = {
        loadTime: Math.round(loadTime),
        fcp: fcp ? Math.round(fcp) : undefined,
      }

      setMetrics(performanceData)

      // 发送性能数据到监控端点
      if (typeof window !== 'undefined') {
        fetch('/api/performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            ...performanceData,
          }),
        }).catch(console.error)
      }
    }

    // Core Web Vitals 监控
    const observeWebVitals = () => {
      // LCP (Largest Contentful Paint)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            setMetrics(prev => prev ? {
              ...prev,
              lcp: Math.round(lastEntry.startTime)
            } : null)
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // FID (First Input Delay)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              setMetrics(prev => prev ? {
                ...prev,
                fid: Math.round(entry.processingStart - entry.startTime)
              } : null)
            })
          })
          fidObserver.observe({ entryTypes: ['first-input'] })

          // CLS (Cumulative Layout Shift)
          let clsValue = 0
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
                setMetrics(prev => prev ? {
                  ...prev,
                  cls: Math.round(clsValue * 1000) / 1000
                } : null)
              }
            }
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })
        } catch (error) {
          console.warn('Performance monitoring not fully supported:', error)
        }
      }
    }

    // 页面加载完成后收集指标
    if (document.readyState === 'complete') {
      collectMetrics()
      observeWebVitals()
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          collectMetrics()
          observeWebVitals()
        }, 0)
      })
    }
  }, [])

  if (!isVisible || !metrics) {
    return null
  }

  const getScoreColor = (metric: string, value: number) => {
    const thresholds: Record<string, [number, number]> = {
      loadTime: [1000, 3000],
      fcp: [1000, 3000],
      lcp: [2500, 4000],
      fid: [100, 300],
      cls: [0.1, 0.25],
    }

    const [good, poor] = thresholds[metric] || [0, 0]
    
    if (value <= good) return '#10b981' // 绿色
    if (value <= poor) return '#f59e0b' // 橙色
    return '#ef4444' // 红色
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 10000,
      minWidth: '250px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{ 
        marginBottom: '10px', 
        fontWeight: 'bold',
        color: '#60a5fa'
      }}>
        ⚡ 性能监控
      </div>
      
      <div style={{ display: 'grid', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>页面加载:</span>
          <span style={{ color: getScoreColor('loadTime', metrics.loadTime) }}>
            {metrics.loadTime}ms
          </span>
        </div>
        
        {metrics.fcp && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>FCP:</span>
            <span style={{ color: getScoreColor('fcp', metrics.fcp) }}>
              {metrics.fcp}ms
            </span>
          </div>
        )}
        
        {metrics.lcp && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>LCP:</span>
            <span style={{ color: getScoreColor('lcp', metrics.lcp) }}>
              {metrics.lcp}ms
            </span>
          </div>
        )}
        
        {metrics.fid && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>FID:</span>
            <span style={{ color: getScoreColor('fid', metrics.fid) }}>
              {metrics.fid}ms
            </span>
          </div>
        )}
        
        {metrics.cls && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>CLS:</span>
            <span style={{ color: getScoreColor('cls', metrics.cls) }}>
              {metrics.cls}
            </span>
          </div>
        )}
      </div>
      
      <div style={{ 
        marginTop: '10px', 
        paddingTop: '10px', 
        borderTop: '1px solid #374151',
        fontSize: '10px',
        color: '#9ca3af'
      }}>
        💡 数据已发送至监控端点
      </div>
    </div>
  )
}
