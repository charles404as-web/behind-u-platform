'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdCard from '@/components/AdCard'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 從 URL 參數初始化搜索詞
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    setQuery(urlQuery)
  }, [searchParams])

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true)
    setQuery(searchQuery)
    
    // 更新 URL 但不重新加載頁面
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push('/search')
    }
    
    // 模擬 API 調用延遲
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }
  
  // Mock data - 將來會連接到 Supabase
  const allAds = [
    {
      id: 1,
      title: '觀塘火鍋王 $398 兩人餐',
      shop: '火鍋王',
      district: '觀塘',
      whatsapp: '91234567',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: '尖沙咀高級理髮 $180',
      shop: 'Style Studio',
      district: '尖沙咀',
      whatsapp: '92345678',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: '中環咖啡店 買一送一',
      shop: 'Coffee Hub',
      district: '中環',
      whatsapp: '93456789',
      image: '/api/placeholder/300/200'
    }
  ]

  // 根據搜索詞過濾結果
  const filteredAds = allAds.filter(ad => 
    !query || 
    ad.title.toLowerCase().includes(query.toLowerCase()) ||
    ad.shop.toLowerCase().includes(query.toLowerCase()) ||
    ad.district.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black p-6">
      {/* 搜索輸入框 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="搜索廣告、店鋪或地區..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 搜索結果標題 */}
      <h1 className="text-3xl font-bold mb-6">
        {isLoading ? (
          <div className="animate-pulse">搜索中...</div>
        ) : (
          <>
            {query ? (
              <>
                搵到 <span className="text-blue-400">{filteredAds.length}</span> 個 "{query}" 的結果
              </>
            ) : (
              <>
                搵到 <span className="text-blue-400">{allAds.length}</span> 個最 Match!
              </>
            )}
          </>
        )}
      </h1>
      
      {/* 廣告網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // 加載狀態
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 animate-pulse">
              <div className="bg-gray-700 h-48 rounded mb-4"></div>
              <div className="bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-700 h-4 rounded w-3/4"></div>
            </div>
          ))
        ) : filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">沒有找到相關廣告</p>
            {query && (
              <button 
                onClick={() => handleSearch('')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                查看所有廣告
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}