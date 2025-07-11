// @ts-check
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    /* 配置选项写在这里 */
     basePath: "", // 应用访问路径
     
     // 临时启用 staleTimes 进行测试
     experimental: {
         staleTimes: {
             dynamic: 30, // 30秒过期，方便测试
             static: 30,
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
                 // 为缓存演示页面设置缓存
                 source: '/cache-demo',
                 headers: [
                     {
                         key: 'Cache-Control',
                         value: 'public, max-age=0', // 10分钟 HTTP 缓存
                     },
                     {
                         key: 'X-Cache-Info',
                         value: 'HTTP-Cache-600s-StaleTime-30s',
                     },
                 ],
             },
             {
                 // 为缓存流程演示页面设置缓存
                 source: '/cache-flow',
                 headers: [
                     {
                         key: 'Cache-Control',
                         value: 'public, max-age=300, stale-while-revalidate=300',
                     },
                     {
                         key: 'X-Cache-Type',
                         value: 'Strong-Cache-300s-Then-Conditional-300s',
                     },
                 ],
             },
             {
                 // 为网络演示页面设置缓存
                 source: '/network-demo',
                 headers: [
                     {
                         key: 'Cache-Control',
                         value: 'public, max-age=600',
                     },
                     {
                         key: 'X-Debug-Info',
                         value: 'HTTP-Cache-600s-VS-StaleTime-30s',
                     },
                 ],
             },
             {
                 // 为响应头检查器设置缓存
                 source: '/header-inspector',
                 headers: [
                     {
                         key: 'Cache-Control',
                         value: 'public, max-age=300, stale-while-revalidate=300',
                     },
                     {
                         key: 'X-Cache-Tag',
                         value: 'header-test',
                     },
                     {
                         key: 'X-Test-Info',
                         value: 'Browser-Refresh-vs-HTTP-Cache',
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
