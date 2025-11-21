'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase, type Advertisement } from '@/lib/supabase';
import AdCard from '@/components/AdCard';
import SearchBox from '@/components/SearchBox';
import { ArrowLeft, Loader2, SearchX } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('search-ads', {
        body: { 
          query: searchQuery,
          limit: 50
        },
      });

      if (functionError) {
        throw functionError;
      }

      if (data?.error) {
        throw new Error(data.error.message);
      }

      const searchResults = data?.data?.results || [];
      setResults(searchResults);
    } catch (err: any) {
      console.error('搜索錯誤:', err);
      setError(err.message || '搜索時發生錯誤，請稍後再試');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (newQuery: string) => {
    window.location.href = `/search?q=${encodeURIComponent(newQuery)}`;
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首頁
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 luxury-glow">
            搜索結果
          </h1>
          
          <SearchBox 
            onSearch={handleNewSearch}
            placeholder={query}
            loading={loading}
          />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted">正在搜索「{query}」...</p>
          </div>
        )}

        {error && (
          <div className="card border-red-500/50 bg-red-500/10 text-center py-12">
            <SearchX className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && results.length === 0 && query && (
          <div className="card text-center py-20">
            <SearchX className="w-20 h-20 text-muted mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">沒有找到相關結果</h2>
            <p className="text-muted mb-6">試試其他搜索關鍵詞，例如：</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['美食', '按摩', '健身', '補習', '燒肉', '甜品'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleNewSearch(suggestion)}
                  className="px-4 py-2 bg-border/30 text-muted rounded-full border border-border hover:border-primary/50 hover:text-primary transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted">
                找到 <span className="text-primary font-bold">{results.length}</span> 個結果
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
