'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
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
          管理員面板
        </h1>

        <AdminDashboard />
      </div>
    </main>
  );
}
