'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Loader2, Sparkles, ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SearchResult {
  symbol: string;
  company_name: string;
}

const QUICK_PICKS = [
  { symbol: 'BBCA', name: 'BCA' },
  { symbol: 'BBRI', name: 'BRI' },
  { symbol: 'TLKM', name: 'Telkom' },
  { symbol: 'ASII', name: 'Astra' },
  { symbol: 'GOTO', name: 'GoTo' },
  { symbol: 'BMRI', name: 'Mandiri' },
  { symbol: 'BREN', name: 'BREN' },
  { symbol: 'ANTM', name: 'Antam' },
];

const ANIMATED_PROMPTS_ID = [
  'Cari kode saham: BBCA (Bank Central Asia)...',
  'Cari emiten: GOTO (GoTo Gojek Tokopedia)...',
  'Cari ticker: BUMI (Bumi Resources)...',
  'Cari saham: TLKM (Telkom Indonesia)...',
  'Cari emiten: BREN (Barito Renewables Energy)...',
  'Cari saham: ASII (Astra International)...',
  'Cari ticker: BBRI (Bank Rakyat Indonesia)...',
  'Audit red flag: BMRI, ANTM, MEDC, WSKT...',
  'Ketik nama atau kode 4 huruf emiten IDX...',
];

const ANIMATED_PROMPTS_EN = [
  'Search IDX ticker: BBCA (Bank Central Asia)...',
  'Search company: GOTO (GoTo Gojek Tokopedia)...',
  'Search ticker: BUMI (Bumi Resources)...',
  'Search stock: TLKM (Telkom Indonesia)...',
  'Search company: BREN (Barito Renewables Energy)...',
  'Search stock: ASII (Astra International)...',
  'Search ticker: BBRI (Bank Rakyat Indonesia)...',
  'Audit red flags: BMRI, ANTM, MEDC, WSKT...',
  'Enter company name or 4-letter IDX ticker...',
];

export default function SearchBar({
  onAnalyze,
  isLoading,
  compact = false,
}: {
  onAnalyze: (s: string) => void;
  isLoading: boolean;
  compact?: boolean;
}) {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Typewriter animated placeholder state
  const [animatedText, setAnimatedText] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompts = language === 'en' ? ANIMATED_PROMPTS_EN : ANIMATED_PROMPTS_ID;

  // Cursor blink
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 450);
    return () => clearInterval(blinkTimer);
  }, []);

  // Typewriter running text
  useEffect(() => {
    if (query) return;

    const currentPrompt = prompts[promptIndex % prompts.length];
    const speed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (animatedText.length < currentPrompt.length) {
          setAnimatedText(currentPrompt.slice(0, animatedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (animatedText.length > 0) {
          setAnimatedText(currentPrompt.slice(0, animatedText.length - 1));
        } else {
          setIsDeleting(false);
          setPromptIndex(prev => prev + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [animatedText, isDeleting, promptIndex, query, prompts]);

  const handleSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setResults(list);
        setIsOpen(list.length > 0);
        setSelectedIndex(-1);
      }
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleSearch(query), 120);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, handleSearch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(symbol: string) {
    setQuery(symbol);
    setIsOpen(false);
    onAnalyze(symbol);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedIndex >= 0 && results[selectedIndex]) {
      handleSelect(results[selectedIndex].symbol);
      return;
    }
    const t = query.trim().toUpperCase();
    if (t) {
      setIsOpen(false);
      onAnalyze(t);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  function handleClear() {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div style={{ width: '100%' }}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        <style>{`
          @keyframes searchContainerGlow {
            0%, 100% {
              box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 0 16px rgba(99,102,241,0.2);
              border-color: rgba(99,102,241,0.35);
            }
            50% {
              box-shadow: 0 12px 36px rgba(0,0,0,0.2), 0 0 26px rgba(236,72,153,0.3);
              border-color: rgba(236,72,153,0.5);
            }
          }
          @keyframes sparklesRotatePulse {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.15) rotate(16deg); }
          }
        `}</style>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-default)',
              borderRadius: '9999px',
              padding: compact ? '6px 10px' : '10px 12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              transition: 'all 0.3s ease',
              position: 'relative',
              animation: 'searchContainerGlow 5s ease-in-out infinite',
            }}
          >
            {/* Icon */}
            <div style={{ paddingLeft: '18px', paddingRight: '12px', color: '#a855f7', display: 'flex', alignItems: 'center' }}>
              {isSearching ? (
                <Loader2 size={compact ? 20 : 24} className="animate-spin" />
              ) : (
                <div style={{ animation: 'sparklesRotatePulse 3.5s ease-in-out infinite', display: 'flex' }}>
                  <Sparkles size={compact ? 20 : 24} style={{ color: '#c084fc' }} />
                </div>
              )}
            </div>

            {/* Input with Animated Running Typewriter Text */}
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', minHeight: compact ? '32px' : '40px' }}>
              {!query && (
                <div
                  style={{
                    position: 'absolute',
                    left: '6px',
                    right: '12px',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: compact ? '14px' : '16px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    userSelect: 'none',
                    zIndex: 1,
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)', opacity: 0.9 }}>{animatedText}</span>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: compact ? '16px' : '20px',
                      marginLeft: '3px',
                      background: '#a855f7',
                      boxShadow: '0 0 10px #c084fc',
                      opacity: cursorVisible ? 1 : 0,
                      transition: 'opacity 0.1s ease',
                      flexShrink: 0,
                    }}
                  />
                </div>
              )}

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: compact ? '15px' : '17px',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  padding: '8px 6px',
                  textTransform: 'uppercase',
                  position: 'relative',
                  zIndex: 2,
                }}
                spellCheck={false}
                autoComplete="off"
                disabled={isLoading}
              />
            </div>

            {/* Clear */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px', marginRight: '10px',
                  color: 'var(--text-muted)', display: 'flex',
                }}
              >
                <X size={20} />
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                borderRadius: '9999px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                color: 'white',
                fontWeight: 700,
                fontFamily: 'inherit',
                fontSize: compact ? '14px' : '16px',
                padding: compact ? '10px 20px' : '14px 32px',
                transition: 'all 0.2s ease',
                opacity: (!query.trim() || isLoading) ? 0.5 : 1,
              }}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {language === 'en' ? 'Audit →' : 'Audit →'}
            </button>
          </div>
        </form>

        {/* Suggestions Dropdown */}
        {isOpen && results.length > 0 && (
          <div
            style={{
              position: 'absolute', top: '100%', marginTop: '8px',
              left: 0, right: 0, zIndex: 60,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '18px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              animation: 'fadeIn 0.15s ease-out',
            }}
          >
            <div style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', background: 'var(--bg-input)', borderBottom: '1px solid var(--border-subtle)' }}>
              {language === 'en' ? 'STOCK SEARCH RESULTS' : 'HASIL PENCARIAN SAHAM'}
            </div>
            {results.map((r, i) => {
              const isSelected = selectedIndex === i;
              return (
                <button
                  key={r.symbol}
                  onClick={() => handleSelect(r.symbol)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 20px',
                    background: isSelected ? 'rgba(99,102,241,0.12)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                    borderBottom: i < results.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    transition: 'background 0.15s ease',
                    fontFamily: 'inherit',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', fontWeight: 800,
                        color: 'var(--accent-1)', background: 'rgba(99,102,241,0.12)',
                        padding: '4px 10px', borderRadius: '8px', minWidth: '65px', textAlign: 'center',
                      }}
                    >
                      {r.symbol}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {r.company_name}
                    </span>
                  </div>
                  <ArrowUpRight size={16} style={{ color: 'var(--text-muted)', opacity: isSelected ? 1 : 0.4 }} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Picks */}
      {!compact && (
        <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '8px' }}>
            {language === 'en' ? 'Quick Picks:' : 'Contoh:'}
          </span>
          {QUICK_PICKS.map(pick => (
            <button
              key={pick.symbol}
              onClick={() => handleSelect(pick.symbol)}
              disabled={isLoading}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '9999px',
                fontSize: '14px', fontWeight: 600,
                background: 'var(--bg-card)', color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                e.currentTarget.style.color = '#8b5cf6';
                e.currentTarget.style.background = 'rgba(139,92,246,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'var(--bg-card)';
              }}
            >
              <ArrowUpRight size={14} />
              {pick.symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
