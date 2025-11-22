export const dynamic = 'force-dynamic'

import AdCard from '@/components/AdCard'

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ''

  // Mock data - 將來會連接到 Supabase
  const ads = [
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
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">搵到 {ads.length} 個最 Match!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  )
}