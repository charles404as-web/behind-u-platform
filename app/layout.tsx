import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Behind U - 你想要的，背後都有',
  description: '香港本地 AI 廣告搜索平台，支援廣東話搜索，為你找到最合適的本地服務和優惠。',
  manifest: '/manifest.json',
  keywords: ['香港', '廣告', '搜索', '本地服務', '優惠', 'AI', '廣東話'],
  authors: [{ name: 'Behind U Team' }],
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Behind U',
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_HK',
    url: 'https://behind-u.hk',
    title: 'Behind U - 你想要的，背後都有',
    description: '香港本地 AI 廣告搜索平台',
    siteName: 'Behind U',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-HK">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker 註冊成功:', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker 註冊失敗:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
