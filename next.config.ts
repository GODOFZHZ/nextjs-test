// @ts-check
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    /* 配置选项写在这里 */
     basePath: "", // 应用访问路径
     
     // 设置全局重新验证时间
     experimental: {
         staleTimes: {
             dynamic: 60, // 动态页面的 stale time (秒)
             static: 60, // 静态页面的 stale time (秒)
         }
     },
     
     // 设置全局响应头
     async headers() {
         return [
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
                 ],
             },
             {
                 // 为静态资源设置长期缓存
                 source: '/_next/static/:path*',
                 headers: [
                     {
                         key: 'Cache-Control',
                         value: 'public, max-age=31536000, immutable',
                     },
                 ],
             },
         ]
     }
}

export default nextConfig
