'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBox({ placeholder }: { placeholder?: string }) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-8 py-6 text-2xl bg-gray-900 rounded-2xl border border-gray-700 focus:border-green-500 outline-none text-white"
      />
      <button type="submit" className="mt-6 w-full bg-green-500 hover:bg-green-600 py-6 rounded-2xl text-2xl font-bold">
        搵貨
      </button>
    </form>
  )
}
