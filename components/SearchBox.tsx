'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Mic, X } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export default function SearchBox({ onSearch, placeholder, loading }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'zh-HK';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center bg-black border-2 border-border rounded-full overflow-hidden focus-within:border-primary transition-all duration-300">
          <div className="pl-6 text-muted">
            <Search className="w-6 h-6" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || '今晚想食啲咩？想做啲咩？直接講啦…'}
            className="flex-1 bg-transparent text-white text-lg px-6 py-6 focus:outline-none placeholder:text-muted"
            disabled={loading}
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 text-muted hover:text-white transition-colors"
              aria-label="清除搜索"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {typeof window !== 'undefined' && 'webkitSpeechRecognition' in window && (
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`px-6 transition-colors ${
                isListening ? 'text-primary animate-pulse' : 'text-muted hover:text-primary'
              }`}
              aria-label="語音輸入"
            >
              <Mic className="w-6 h-6" />
            </button>
          )}

          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="bg-primary text-black font-bold px-10 py-6 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>
      </div>

      {isListening && (
        <div className="mt-4 text-center text-primary animate-pulse">
          正在聆聽中...
        </div>
      )}
    </form>
  );
}
