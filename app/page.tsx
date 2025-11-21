import SearchBox from '@/components/SearchBox'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-6xl w-full">
        <h1 className="text-7xl md:text-9xl font-black mb-8 luxury-glow">
          Behind U
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-400 mb-12 font-light">
          你想要的，背後都有
        </p>
        
        <SearchBox 
          onSearch={(query) => {
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
          }}
          placeholder="今晚想食啲咩？想做啲咩？直接講啦…"
        />
        
        <div className="mt-20 space-y-4">
          <p className="text-gray-600 text-sm">
            尖沙咀紋眉 · 觀塘燒肉 · 赤柱玩水 · 全部隱藏好貨
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['美食', '娛樂', '購物', '服務', '健康', '教育'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  window.location.href = `/search?q=${encodeURIComponent(tag)}`;
                }}
                className="px-4 py-2 text-sm bg-border/30 text-muted rounded-full border border-border hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
