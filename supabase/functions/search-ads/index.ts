Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'false'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { query, category, location, limit = 20 } = await req.json();

    if (!query || query.trim() === '') {
      throw new Error('搜索關鍵詞不能為空');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Supabase 配置缺失');
    }

    // 廣東話關鍵詞映射
    const cantoneseMapping = {
      '食嘢': ['美食', '餐廳'],
      '食飯': ['餐廳', '食'],
      '飲嘢': ['飲品', '茶'],
      '做gym': ['健身', '運動'],
      '剪頭髮': ['髮型', '剪髮'],
      '按摩': ['按摩', 'spa'],
      '搬屋': ['搬屋', '搬運'],
      '補習': ['補習', '教育'],
      '寵物': ['寵物'],
      '甜品': ['甜品', '蛋糕'],
      '放題': ['放題', '任食'],
      '燒肉': ['燒肉', '烤肉'],
      '日本嘢': ['日本菜', '日式'],
      '韓國嘢': ['韓國菜', '韓式'],
      '茶記': ['茶餐廳', '港式']
    };

    // 處理搜索詞
    let searchTerms = [query.toLowerCase()];
    for (const cantonese in cantoneseMapping) {
      if (query.includes(cantonese)) {
        searchTerms.push(...cantoneseMapping[cantonese]);
        break;
      }
    }

    // 使用簡化的搜索查詢
    const searchTerm = searchTerms[0];
    let queryUrl = `${supabaseUrl}/rest/v1/advertisements?select=*&is_active=eq.true&or=(title.ilike.*${encodeURIComponent(searchTerm)}*,description.ilike.*${encodeURIComponent(searchTerm)}*,category.ilike.*${encodeURIComponent(searchTerm)}*)&order=created_at.desc&limit=${limit}`;

    // 執行搜索查詢
    const searchResponse = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json'
      }
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      throw new Error(`搜索失敗: ${errorText}`);
    }

    const results = await searchResponse.json();

    // 記錄搜索歷史
    try {
      await fetch(`${supabaseUrl}/rest/v1/search_history`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'apikey': serviceRoleKey,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          query: query,
          results_count: results.length,
          user_agent: req.headers.get('user-agent') || ''
        })
      });
    } catch (historyError) {
      console.error('記錄搜索歷史失敗:', historyError);
    }

    // 返回搜索結果
    return new Response(JSON.stringify({
      data: {
        results: results,
        count: results.length,
        query: query,
        searchTerms: searchTerms
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('搜索錯誤:', error);

    return new Response(JSON.stringify({
      error: {
        code: 'SEARCH_FAILED',
        message: error.message || '搜索時發生錯誤'
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
