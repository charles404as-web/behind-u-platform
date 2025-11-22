import SearchBox from '@/components/SearchBox'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-black">
      <h1 className="text-7xl md:text-9xl font-black mb-8 text-white">Behind U</h1>
      <p className="text-2xl md:text-3xl text-gray-400 mb-12">你想要的，背後都有</p>
      <SearchBox placeholder="今晚想食啲咩？想做啲咩？直接講啦…" />
      <p className="mt-20 text-gray-600 text-sm">尖沙咀紋眉｜觀塘燒肉｜赤柱玩水｜全部隱藏好貨</p>
    </main>
  )
}
