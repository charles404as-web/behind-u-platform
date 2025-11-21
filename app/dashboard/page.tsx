'use client';

import { useState, useEffect } from 'react';
import { supabase, type SearchHistory } from '@/lib/supabase';
import { ArrowLeft, History, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSearchHistory(data || []);
    } catch (error) {
      console.error('載入搜索歷史失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPopularSearches = () => {
    const queryCount: Record<string, number> = {};
    searchHistory.forEach(item => {
      queryCount[item.query] = (queryCount[item.query] || 0) + 1;
    });
    
    return Object.entries(queryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
  };

  const popularSearches = getPopularSearches();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首頁
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold mb-12 luxury-glow">
          用戶面板
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">熱門搜索</h2>
            </div>
            
            {loading ? (
              <p className="text-muted">載入中...</p>
            ) : popularSearches.length > 0 ? (
              <div className="space-y-3">
                {popularSearches.map((item, index) => (
                  <Link
                    key={index}
                    href={`/search?q=${encodeURIComponent(item.query)}`}
                    className="flex items-center justify-between p-4 bg-border/20 rounded-lg hover:bg-border/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold text-lg">#{index + 1}</span>
                      <span className="group-hover:text-primary transition-colors">{item.query}</span>
                    </div>
                    <span className="text-muted text-sm">{item.count} 次</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted">暫無搜索記錄</p>
            )}
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">最近搜索</h2>
            </div>
            
            {loading ? (
              <p className="text-muted">載入中...</p>
            ) : searchHistory.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {searchHistory.map((item) => (
                  <Link
                    key={item.id}
                    href={`/search?q=${encodeURIComponent(item.query)}`}
                    className="flex items-start justify-between p-4 bg-border/20 rounded-lg hover:bg-border/40 transition-colors group"
                  >
                    <div className="flex-1">
                      <p className="group-hover:text-primary transition-colors mb-1">
                        {item.query}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(item.created_at).toLocaleString('zh-HK', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">
                      {item.results_count} 個結果
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted">暫無搜索記錄</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
