'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBoxProps {
  placeholder?: string
}

export default function SearchBox({ placeholder = '搜尋...' }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-8 py-6 text-2xl bg-gray-900 rounded-2xl border border-gray-700 focus:border-green-500 focus:outline-none text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            搵貨
          </button>
        </div>
      </div>
    </form>
  )
}