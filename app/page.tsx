import SearchBox from '@/components/SearchBox'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <h1 className="text-7xl md:text-9xl font-black mb-8 text-white drop-shadow-2xl">
          Behind U
        </h1>
        <p className="text-2xl md:text-3xl text-gray-400 mb-12 font-light">
          你想要的，背後都有
        </p>
        <div className="text-lg md:text-xl text-gray-500 mb-16">
          <span className="inline-block mx-2">尖沙咀紋眉</span>
          <span className="text-gray-600">|</span>
          <span className="inline-block mx-2">觀塘燒肉</span>
          <span className="text-gray-600">|</span>
          <span className="inline-block mx-2">赤柱玩水</span>
          <span className="text-gray-600">|</span>
          <span className="inline-block mx-2">全部隱藏好貨</span>
        </div>
      </div>
      
      <div className="w-full max-w-4xl">
        <SearchBox placeholder="今晚想食啲咩?想做啲咩?直接講啦…" />
      </div>
      
      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-gray-600 text-sm">
          © 2024 Behind U - 香港 AI 搵貨神器
        </p>
      </footer>
    </main>
  )
}
