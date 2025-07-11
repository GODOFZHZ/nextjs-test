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
     }
}

export default nextConfig
