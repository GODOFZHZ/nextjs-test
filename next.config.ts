// @ts-check
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    /* 大流量优化配置 */
    basePath: "", // 应用访问路径
    // 性能优化
    compress: true, // 启用 gzip 压缩
    poweredByHeader: false, // 移除 X-Powered-By 头
    // 图片优化
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1年
        dangerouslyAllowSVG: false,
    },
    // 大流量缓存策略
    experimental: {
        staleTimes: {
            dynamic: 300,    // 5分钟客户端路由缓存
            static: 1800,    // 30分钟静态页面缓存
        },
    },
    // 输出配置 - Docker 部署时启用
    // output: 'standalone',
    
    // 设置全局响应头 - 大流量优化
    async headers() {
        return [
            {
                // 静态资源长期缓存
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // API 路由缓存策略
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=300, stale-while-revalidate=300',
                    },
                ],
            },
            {
                // 为博客页面设置缓存
                source: '/blog/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=300, stale-while-revalidate=300',
                    },
                    {
                        key: 'X-Cache-Tag',
                        value: 'blog-page',
                    },
                ],
            },
            {
                // 为首页设置缓存
                source: '/',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=600, stale-while-revalidate=300',
                    },
                    {
                        key: 'X-Cache-Strategy',
                        value: 'Homepage-Optimized',
                    },
                ],
            },
            {
                // 为 home 页面设置缓存
                source: '/home',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=600, stale-while-revalidate=300',
                    },
                    {
                        key: 'X-Cache-Strategy',
                        value: 'Blog-Optimized',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
