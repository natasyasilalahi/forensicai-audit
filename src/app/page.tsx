'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  AlertTriangle, Shield, Activity, TrendingDown, Layers,
  BarChart2, DollarSign, Sun, Moon, Scan,
  ArrowRight, Sparkles, CheckCircle, XCircle, User, Zap, TrendingUp, RotateCcw,
  Clock, Search, Printer, ArrowLeftRight, Globe
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SearchBar from '@/components/SearchBar';
import CompanyHeader from '@/components/CompanyHeader';
import RedFlagCard from '@/components/RedFlagCard';
import ChartPanel from '@/components/ChartPanel';
import AIAnalysisPanel from '@/components/AIAnalysisPanel';
import Sidebar from '@/components/Sidebar';
import HistoryView from '@/components/HistoryView';
import CompanyProfilePanel from '@/components/CompanyProfilePanel';
import HomeView from '@/components/HomeView';
import ForensicSearchView from '@/components/ForensicSearchView';
import CompareView from '@/components/CompareView';
import StressTestPanel from '@/components/StressTestPanel';
import type { ForensicResult } from '@/lib/forensic';

/* ─── Theme & Language Controls ────────────────────────────── */

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setIsDark(saved === 'dark');
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function toggle() {
    const next = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        width: 36, height: 36, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--navbar-btn-bg)', color: 'var(--text-primary)',
        border: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--navbar-btn-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--navbar-btn-bg)'}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
      aria-label="Toggle language"
      title={language === 'id' ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 12px', borderRadius: '10px',
        background: 'var(--navbar-btn-bg)', color: 'var(--text-primary)',
        border: '1px solid var(--border-subtle)',
        fontSize: '12px', fontWeight: 800,
        cursor: 'pointer', transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--navbar-btn-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--navbar-btn-bg)'}
    >
      <Globe size={14} style={{ opacity: 0.8 }} />
      <span>{language === 'id' ? 'ID' : 'EN'}</span>
    </button>
  );
}

/* ── Ticker Bar ─────────────────────────────────────────── */

const TICKER_ITEMS = [
  { icon: '⚠️', label: 'BBCA', value: '+2.3%', color: '#34d399' },
  { icon: '📉', label: 'TLKM', value: '-0.8%', color: '#f87171' },
  { icon: '⚠️', label: 'GOTO', value: '+5.1%', color: '#34d399' },
  { icon: '🔥', label: 'BREN', value: '+12.4%', color: '#fbbf24' },
  { icon: '📉', label: 'UNTR', value: '-1.2%', color: '#f87171' },
  { icon: '⚠️', label: 'ASII', value: '+0.5%', color: '#34d399' },
  { icon: '🔥', label: 'BMRI', value: '+3.7%', color: '#fbbf24' },
  { icon: '📉', label: 'INDF', value: '-0.4%', color: '#f87171' },
];

function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        height: '36px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--ticker-bg, rgba(0,0,0,0.25))',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        transition: 'background 0.3s ease',
      }}
    >
      <div className="ticker-wrap" style={{ flex: 1 }}>
        <div className="ticker-inner animate-ticker">
          {items.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 24px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                borderRight: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ color: 'var(--text-primary)', opacity: 0.8 }}>{item.label}</span>
              <span style={{ color: item.color }}>{item.value}</span>
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 14px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, borderLeft: '1px solid var(--border-subtle)' }}>
        <div className="ping-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>IDX Live</span>
      </div>
    </div>
  );
}

/* ─── Loading ──────────────────────────────────────────────── */

function LoadingState({ symbol }: { symbol: string }) {
  const { t } = useLanguage();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', textAlign: 'center' }}>
      <div
        style={{
          width: 80, height: 80, borderRadius: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)',
          marginBottom: '28px',
        }}
      >
        <Scan size={36} style={{ color: '#8b5cf6' }} className="animate-pulse" />
      </div>
      <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
        {t.dashboard.loadingTitle} {symbol}...
      </h3>
      <p style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
        {t.dashboard.loadingSubtitle}
      </p>
    </div>
  );
}

/* ─── Results Dashboard ────────────────────────────────────── */

function ResultsDashboard({
  result, onReset, onAnalyze, isLoading,
}: {
  result: ForensicResult;
  onReset: () => void;
  onAnalyze: (s: string) => void;
  isLoading: boolean;
}) {
  const { t } = useLanguage();
  const criticalHighFlags = result.red_flags.filter(f => f.severity === 'critical' || f.severity === 'high');
  const mediumFlags = result.red_flags.filter(f => f.severity === 'medium');
  const lowFlags = result.red_flags.filter(f => f.severity === 'low');

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 8px 48px 8px' }}>
      {/* Top Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          flexWrap: 'wrap',
          background: 'var(--bg-card)',
          padding: '12px 18px',
          borderRadius: '18px',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-1)';
              e.currentTarget.style.color = 'var(--accent-1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            {t.dashboard.backToSearch}
          </button>

          <button
            onClick={() => window.print()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18))',
              color: 'var(--accent-1)',
              border: '1px solid rgba(99,102,241,0.4)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Export / PDF"
          >
            <Printer size={16} />
            <span>{t.dashboard.printExportPdf}</span>
          </button>
        </div>

        <div style={{ flex: '1 1 320px', maxWidth: '600px' }}>
          <SearchBar onAnalyze={onAnalyze} isLoading={isLoading} compact />
        </div>
      </div>

      {/* Main Company Header */}
      <div style={{ marginBottom: '28px' }}>
        <CompanyHeader result={result} />
      </div>

      {/* What-If Stress Test Simulation Engine */}
      <StressTestPanel result={result} />

      {/* Company Profile & Information Section */}
      <CompanyProfilePanel
        symbol={result.symbol}
        companyName={result.company_name}
        profile={result.profile}
      />

      {/* No Flags State */}
      {result.red_flags.length === 0 && (
        <div
          className="glass-card"
          style={{
            padding: '24px 28px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            borderColor: 'rgba(16,185,129,0.3)',
            background: 'rgba(16,185,129,0.06)',
            borderRadius: '18px',
          }}
        >
          <CheckCircle size={32} style={{ color: '#10b981', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '18px', marginBottom: '4px', color: '#10b981' }}>
              {t.dashboard.cleanTitle}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {t.dashboard.cleanDesc}
            </div>
          </div>
        </div>
      )}

      {/* 2-Column Main Dashboard Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 4.5fr) minmax(340px, 5.5fr)',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Red Flags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {criticalHighFlags.length > 0 && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <XCircle size={16} />
                  </div>
                  <span style={{ color: '#ef4444', fontSize: '15px', fontWeight: 800, letterSpacing: '0.02em' }}>
                    {t.dashboard.criticalHighHeader}
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>
                  {criticalHighFlags.length} {t.dashboard.flagsSuffix}
                </span>
              </div>
              <div>
                {criticalHighFlags.map((flag, i) => (
                  <RedFlagCard key={flag.id} flag={flag} index={i} />
                ))}
              </div>
            </section>
          )}

          {mediumFlags.length > 0 && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(245,158,11,0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={16} />
                  </div>
                  <span style={{ color: '#f59e0b', fontSize: '15px', fontWeight: 800, letterSpacing: '0.02em' }}>
                    {t.dashboard.mediumHeader}
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
                  {mediumFlags.length} {t.dashboard.flagsSuffix}
                </span>
              </div>
              <div>
                {mediumFlags.map((flag, i) => (
                  <RedFlagCard key={flag.id} flag={flag} index={criticalHighFlags.length + i} />
                ))}
              </div>
            </section>
          )}

          {lowFlags.length > 0 && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(99,102,241,0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={16} />
                  </div>
                  <span style={{ color: 'var(--accent-1)', fontSize: '15px', fontWeight: 800, letterSpacing: '0.02em' }}>
                    {t.dashboard.lowHeader}
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-1)', border: '1px solid rgba(99,102,241,0.3)' }}>
                  {lowFlags.length} {t.dashboard.flagsSuffix}
                </span>
              </div>
              <div>
                {lowFlags.map((flag, i) => (
                  <RedFlagCard key={flag.id} flag={flag} index={criticalHighFlags.length + mediumFlags.length + i} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Financial Chart & AI Agent Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <ChartPanel quarterly={result.quarterly_data} annual={result.annual_data} />
          <AIAnalysisPanel result={result} />
        </div>
      </div>
    </div>
  );
}

import { useAuth } from '@/components/AuthProvider';
import { AuthModal, HistoryModal, SettingsModal, ProfileModal } from '@/components/AppModals';
import { LogIn, UserPlus } from 'lucide-react';

/* ─── Main Page ────────────────────────────────────────────── */

export default function HomePage() {
  const { user, addHistory } = useAuth();
  const { t } = useLanguage();
  const [result, setResult] = useState<ForensicResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingSymbol, setLoadingSymbol] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [highlightCategory, setHighlightCategory] = useState<string | undefined>(undefined);

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleAnalyze = useCallback(async (symbol: string) => {
    setIsLoading(true); setError(null); setResult(null); setLoadingSymbol(symbol); setActiveTab('search');
    try {
      const res = await fetch(`/api/analyze?symbol=${encodeURIComponent(symbol)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      const forensicData = data as ForensicResult;
      setResult(forensicData);

      // Save to audit history
      addHistory({
        symbol: forensicData.symbol,
        companyName: forensicData.company_name,
        riskScore: forensicData.risk_score,
        riskLevel: forensicData.risk_level.toUpperCase(),
        flagCount: forensicData.red_flags.length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally { setIsLoading(false); setLoadingSymbol(''); }
  }, [addHistory]);

  function handleReset() { setResult(null); setError(null); setActiveTab('home'); }

  function handleNavigate(tab: string) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openLogin() {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  }

  function openRegister() {
    setAuthModalTab('register');
    setAuthModalOpen(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Noise texture overlay for depth */}
      <div className="noise-overlay" />

      {/* Gradient animation keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', height: '64px',
          background: 'var(--bg-navbar)', borderBottom: '1px solid var(--border-navbar)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={handleReset}>
          <div
            style={{
              width: 36, height: 36, borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)',
            }}
          >
            <AlertTriangle size={18} color="white" />
          </div>
          <span style={{ fontWeight: 900, fontSize: '19px', color: 'var(--navbar-text)', letterSpacing: '-0.02em' }}>
            Forensic<span style={{ color: '#ef4444' }}>AI</span>
          </span>
          <span
            style={{
              fontSize: '12px', padding: '4px 12px', borderRadius: '9999px',
              fontWeight: 700, background: 'var(--navbar-btn-bg)',
              color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)',
            }}
          >
            IDX Audit Agent
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="hidden md:flex" style={{ alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} className="animate-pulse" />
            {t.nav.liveData}
          </span>
          <div className="hidden md:block" style={{ width: 1, height: 20, background: 'var(--border-subtle)' }} />
          <a
            href="https://sectors.app" target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline"
            style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none' }}
          >
            Sectors.app
          </a>
          <LanguageToggle />
          <ThemeToggle />

          {/* User Auth Buttons */}
          {user ? (
            <button
              onClick={() => setProfileModalOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '6px 14px 6px 8px', borderRadius: '9999px',
                background: 'var(--navbar-btn-bg)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)', cursor: 'pointer', transition: 'background 0.2s',
              }}
            >
              <div
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 800, color: '#fff',
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={openLogin}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'var(--navbar-btn-bg)', color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <LogIn size={15} /> {t.nav.login}
              </button>
              <button
                onClick={openRegister}
                className="hidden sm:flex"
                style={{
                  alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7c3aed, #6366f1)', color: 'white',
                  border: 'none', fontSize: '14px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                }}
              >
                <UserPlus size={15} /> {t.nav.register}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Ticker Bar ── */}
      <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 49 }}>
        <TickerBar />
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flex: 1, paddingTop: '64px' }}>
        <Sidebar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onOpenHistory={() => handleNavigate('history')}
          onOpenSettings={() => setSettingsModalOpen(true)}
        />

        {/* Main scrollable area */}
        <main
          style={{
            flex: 1, overflowY: 'auto',
            height: 'calc(100vh - 64px)',
            paddingTop: '36px',
          }}
        >
          {/* Loading State */}
          {isLoading && <LoadingState symbol={loadingSymbol} />}

          {/* Error State */}
          {error && !isLoading && (
            <div style={{ maxWidth: '480px', margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
              <div className="glass-card" style={{ padding: '48px', borderColor: 'rgba(239,68,68,0.2)' }}>
                <XCircle size={48} style={{ color: '#ef4444', margin: '0 auto 20px' }} />
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>{t.dashboard.errorTitle}</h2>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>{error}</p>
                <button onClick={() => { setError(null); setActiveTab('search'); }} className="btn-primary">{t.dashboard.backBtn}</button>
              </div>
            </div>
          )}

          {/* 1. Beranda Layer */}
          {!isLoading && !error && activeTab === 'home' && (
            <HomeView
              onAnalyze={handleAnalyze}
              onGoToSearch={() => { setActiveTab('search'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          )}

          {/* 2. Analisis Forensik Layer */}
          {!isLoading && !error && activeTab === 'search' && (
            !result ? (
              <ForensicSearchView
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
            ) : (
              <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 32px' }}>
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    onClick={() => setResult(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 16px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)', fontSize: '13.5px', fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {t.dashboard.backToSearch}
                  </button>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {t.dashboard.auditResultFor} <strong style={{ color: 'var(--text-primary)' }}>{result.symbol}</strong> ({result.company_name})
                  </span>
                </div>
                <ResultsDashboard result={result} onReset={handleReset} onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            )
          )}

          {/* 3. Komparasi Head-to-Head Layer */}
          {!isLoading && !error && activeTab === 'compare' && (
            <CompareView
              onSelectSymbol={handleAnalyze}
              onGoHome={() => handleNavigate('home')}
            />
          )}


          {/* 4. Riwayat Layer */}
          {!isLoading && !error && activeTab === 'history' && (
            <HistoryView
              onSelectSymbol={handleAnalyze}
              onGoHome={() => handleNavigate('home')}
            />
          )}
        </main>
      </div>

      {/* ── Modals ── */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
      <HistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        onSelectSymbol={handleAnalyze}
      />
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        onOpenAuth={(tab) => {
          setSettingsModalOpen(false);
          setAuthModalTab(tab);
          setAuthModalOpen(true);
        }}
      />
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}
