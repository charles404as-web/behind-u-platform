'use client';

import { useState, useEffect } from 'react';
import { supabase, type Advertisement, type Category } from '@/lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [adsResponse, categoriesResponse] = await Promise.all([
        supabase.from('advertisements').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('sort_order'),
      ]);

      if (adsResponse.error) throw adsResponse.error;
      if (categoriesResponse.error) throw categoriesResponse.error;

      setAds(adsResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      console.error('載入數據失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('更新廣告狀態失敗:', error);
      alert('更新失敗，請稍後再試');
    }
  };

  const deleteAd = async (id: string) => {
    if (!confirm('確定要刪除這個廣告嗎？')) return;

    try {
      const { error } = await supabase
        .from('advertisements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('刪除廣告失敗:', error);
      alert('刪除失敗，請稍後再試');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-center">
            <p className="text-muted mb-2">總廣告數</p>
            <p className="text-4xl font-bold text-primary">{ads.length}</p>
          </div>
        </div>
        
        <div className="card">
          <div className="text-center">
            <p className="text-muted mb-2">活躍廣告</p>
            <p className="text-4xl font-bold text-green-500">
              {ads.filter(ad => ad.is_active).length}
            </p>
          </div>
        </div>
        
        <div className="card">
          <div className="text-center">
            <p className="text-muted mb-2">總分類數</p>
            <p className="text-4xl font-bold text-blue-500">{categories.length}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">廣告管理</h2>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            新增廣告
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted font-medium">標題</th>
                <th className="text-left py-3 px-4 text-muted font-medium">分類</th>
                <th className="text-left py-3 px-4 text-muted font-medium">地區</th>
                <th className="text-left py-3 px-4 text-muted font-medium">狀態</th>
                <th className="text-left py-3 px-4 text-muted font-medium">瀏覽次數</th>
                <th className="text-right py-3 px-4 text-muted font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-b border-border/50 hover:bg-border/10 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-medium">{ad.title}</p>
                    <p className="text-sm text-muted line-clamp-1">{ad.description}</p>
                  </td>
                  <td className="py-4 px-4 text-muted">{ad.category}</td>
                  <td className="py-4 px-4 text-muted">{ad.location}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ad.is_active 
                        ? 'bg-green-500/20 text-green-500 border border-green-500/50' 
                        : 'bg-red-500/20 text-red-500 border border-red-500/50'
                    }`}>
                      {ad.is_active ? '活躍' : '停用'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted">{ad.view_count}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleAdStatus(ad.id, ad.is_active)}
                        className="p-2 text-muted hover:text-primary transition-colors"
                        title={ad.is_active ? '停用' : '啟用'}
                      >
                        {ad.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setSelectedAd(ad)}
                        className="p-2 text-muted hover:text-blue-500 transition-colors"
                        title="編輯"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="p-2 text-muted hover:text-red-500 transition-colors"
                        title="刪除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
