import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bsjgybnzmmcpyqjhnklp.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzamd5Ym56bW1jcHlxamhua2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MjY3OTYsImV4cCI6MjA3OTMwMjc5Nn0.9R8x6e6XhiVht-QOEMnCkp9tRPYXN_Fd07WJfIkI5rI";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    const { query, category, location, limit = 20 } = await request.json();

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: '搜索關鍵詞不能為空' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.functions.invoke('search-ads', {
      body: { 
        query: query.trim(),
        category,
        location,
        limit
      },
    });

    if (error) {
      console.error('Edge Function 錯誤:', error);
      return NextResponse.json(
        { error: error.message || '搜索失敗' },
        { status: 500 }
      );
    }

    if (data?.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API 錯誤:', error);
    return NextResponse.json(
      { error: error.message || '服務器錯誤' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: '缺少搜索參數' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase.functions.invoke('search-ads', {
      body: { query: query.trim() },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
