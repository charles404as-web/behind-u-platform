/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'edge',  // 強制 Edge 運行時，解決 SSR 衝突
  },
  output: 'export',  // 輸出靜態檔案，適合 Pages
  trailingSlash: true,
  images: {
    unoptimized: true,  // 關 Image 優化，避免建置錯誤
  },
}

export default nextConfig
