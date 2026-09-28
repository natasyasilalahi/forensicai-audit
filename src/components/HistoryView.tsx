'use client';

import { useState, useMemo } from 'react';
import {
  Clock, Search, Trash2, ArrowRight, ShieldAlert, AlertTriangle,
  CheckCircle2, Filter, TrendingUp, Sparkles, RefreshCw, BarChart2,
  Calendar, Layers, ArrowUpDown
} from 'lucide-react';
import { useAuth, type HistoryEntry } from '@/components/AuthProvider';
import { useLanguage } from '@/context/LanguageContext';

interface HistoryViewProps {
  onSelectSymbol: (symbol: string) => void;
  onGoHome?: () => void;
}

type FilterLevel = 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';
type SortOption = 'NEWEST' | 'RISK_DESC' | 'RISK_ASC' | 'SYMBOL_ASC';

export default function HistoryView({ onSelectSymbol, onGoHome }: HistoryViewProps) {
  const { history, clearHistory, removeHistoryItem } = useAuth();
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('NEWEST');
  const [confirmClear, setConfirmClear] = useState(false);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = history.length;
    const high = history.filter(h => h.riskLevel === 'HIGH' || h.riskScore > 60).length;
    const med = history.filter(h => h.riskLevel === 'MEDIUM' || (h.riskScore > 30 && h.riskScore <= 60)).length;
    const low = history.filter(h => h.riskLevel === 'LOW' || h.riskScore <= 30).length;
    const avgRisk = total > 0 ? Math.round(history.reduce((acc, h) => acc + h.riskScore, 0) / total) : 0;
    return { total, high, med, low, avgRisk };
  }, [history]);

  // Filtered and sorted list
  const filteredHistory = useMemo(() => {
    return history
      .filter((item) => {
        // Search query
        const matchesSearch =
          item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.companyName.toLowerCase().includes(searchQuery.toLowerCase());

        // Level filter
        const isHigh = item.riskLevel === 'HIGH' || item.riskScore > 60;
        const isMed = item.riskLevel === 'MEDIUM' || (item.riskScore > 30 && item.riskScore <= 60);
        const isLow = item.riskLevel === 'LOW' || item.riskScore <= 30;

        if (filterLevel === 'HIGH') return matchesSearch && isHigh;
        if (filterLevel === 'MEDIUM') return matchesSearch && isMed;
        if (filterLevel === 'LOW') return matchesSearch && isLow;
        return matchesSearch;
      })
      .sort((a, b) => {
        if (sortOption === 'RISK_DESC') return b.riskScore - a.riskScore;
        if (sortOption === 'RISK_ASC') return a.riskScore - b.riskScore;
        if (sortOption === 'SYMBOL_ASC') return a.symbol.localeCompare(b.symbol);
        // Default NEWEST
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [history, searchQuery, filterLevel, sortOption]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px 60px 24px' }}>
      {/* ── Header Banner ── */}
      <div
        className="glass-card"
        style={{
          padding: '32px 36px',
          borderRadius: '24px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 50%, rgba(236,72,153,0.08) 100%)',
          border: '1px solid var(--border-subtle)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 24px -6px rgba(99,102,241,0.4)',
                color: 'white',
              }}
            >
              <Clock size={30} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {t.history.title}
                </h1>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(99,102,241,0.18)',
                    color: 'var(--accent-1)',
                    border: '1px solid rgba(99,102,241,0.3)',
                  }}
                >
                  {language === 'en' ? `${stats.total} Issuers Saved` : `${stats.total} Emiten Tersimpan`}
                </span>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.5 }}>
                {t.history.subtitle}
              </p>
            </div>
          </div>

          {stats.total > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {confirmClear ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.12)', padding: '6px 12px', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 600 }}>
                    {language === 'en' ? 'Delete all?' : 'Yakin hapus semua?'}
                  </span>
                  <button
                    onClick={() => {
                      clearHistory();
                      setConfirmClear(false);
                    }}
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {language === 'en' ? 'Yes, Delete' : 'Ya, Hapus'}
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {language === 'en' ? 'Cancel' : 'Batal'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    background: 'rgba(239,68,68,0.1)',
                    color: '#ef4444',
                    border: '1px solid rgba(239,68,68,0.2)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                >
                  <Trash2 size={16} /> {t.history.clearAll}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Stat Metric Cards ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {/* Stat 1: Total */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            borderRadius: '18px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              {language === 'en' ? 'Total Audits' : 'Total Audit'}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>
              {stats.total}
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(99,102,241,0.12)', color: 'var(--accent-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart2 size={22} />
          </div>
        </div>

        {/* Stat 2: High Risk */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            borderRadius: '18px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              {language === 'en' ? 'High Risk (HIGH)' : 'Risiko Tinggi (HIGH)'}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ef4444' }}>
              {stats.high}
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(239,68,68,0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={22} />
          </div>
        </div>

        {/* Stat 3: Medium Risk */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            borderRadius: '18px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              {language === 'en' ? 'Medium Risk (MED)' : 'Risiko Sedang (MED)'}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b' }}>
              {stats.med}
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(245,158,11,0.12)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={22} />
          </div>
        </div>

        {/* Stat 4: Low Risk */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            borderRadius: '18px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              {language === 'en' ? 'Low Risk / Safe' : 'Risiko Rendah / Aman'}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981' }}>
              {stats.low}
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(16,185,129,0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* ── Search, Filters & Controls Toolbar ── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px',
          background: 'var(--bg-card)',
          padding: '16px 20px',
          borderRadius: '18px',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {/* Search Input */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 300px',
            minWidth: '240px',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search stock ticker (e.g. BBCA, GOTO) or company name...' : 'Cari kode saham (cth: BBCA, GOTO) atau nama emiten...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 42px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-1)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> Filter:
          </span>
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as FilterLevel[]).map((level) => {
            const isActive = filterLevel === level;
            const labelMap: Record<FilterLevel, string> = {
              ALL: language === 'en' ? 'All' : 'Semua',
              HIGH: language === 'en' ? 'High' : 'Tinggi',
              MEDIUM: language === 'en' ? 'Medium' : 'Sedang',
              LOW: language === 'en' ? 'Low' : 'Rendah',
            };
            return (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'var(--accent-1)' : 'var(--bg-input)',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                }}
              >
                {labelMap[level]}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpDown size={14} /> {language === 'en' ? 'Sort by:' : 'Urutkan:'}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="NEWEST">{language === 'en' ? 'Most Recent' : 'Waktu Terbaru'}</option>
            <option value="RISK_DESC">{language === 'en' ? 'Highest Risk' : 'Risiko Tertinggi'}</option>
            <option value="RISK_ASC">{language === 'en' ? 'Lowest Risk' : 'Risiko Terendah'}</option>
            <option value="SYMBOL_ASC">{language === 'en' ? 'Ticker (A-Z)' : 'Kode Saham (A-Z)'}</option>
          </select>
        </div>
      </div>

      {/* ── History Cards Grid ── */}
      {filteredHistory.length === 0 ? (
        <div
          className="glass-card"
          style={{
            textAlign: 'center',
            padding: '64px 24px',
            borderRadius: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '20px',
              background: 'rgba(99,102,241,0.1)',
              color: 'var(--accent-1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Clock size={36} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {history.length === 0 ? t.history.emptyTitle : (language === 'en' ? 'No Matching Results' : 'Tidak Ada Hasil yang Cocok')}
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px' }}>
            {history.length === 0
              ? t.history.emptyDesc
              : (language === 'en' ? `Could not find any audit records matching "${searchQuery}" or selected risk filters.` : `Tidak dapat menemukan riwayat dengan pencarian "${searchQuery}" atau filter risiko yang dipilih.`)}
          </p>

          {history.length === 0 ? (
            <button
              onClick={onGoHome}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              {language === 'en' ? 'Start Stock Audit Now' : 'Mulai Audit Saham Sekarang'} <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterLevel('ALL');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {language === 'en' ? 'Reset Search Filters' : 'Reset Filter Pencarian'}
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredHistory.map((item) => {
            const isHigh = item.riskLevel === 'HIGH' || item.riskScore > 60;
            const isMed = item.riskLevel === 'MEDIUM' || (item.riskScore > 30 && item.riskScore <= 60);

            const badgeBg = isHigh ? 'rgba(239,68,68,0.15)' : isMed ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)';
            const badgeBorder = isHigh ? 'rgba(239,68,68,0.3)' : isMed ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)';
            const badgeColor = isHigh ? '#ef4444' : isMed ? '#f59e0b' : '#10b981';

            const formattedDate = new Date(item.date).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={item.id}
                className="glass-card shimmer-border"
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent-1)';
                  e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top Section */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                          {item.symbol}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500, maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.companyName}
                        </div>
                      </div>
                    </div>

                    {/* Risk Badge */}
                    <div
                      style={{
                        padding: '6px 12px',
                        borderRadius: '10px',
                        background: badgeBg,
                        border: `1px solid ${badgeBorder}`,
                        color: badgeColor,
                        textAlign: 'right',
                      }}
                    >
                      <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {item.riskLevel}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 900 }}>
                        Score {item.riskScore}
                      </div>
                    </div>
                  </div>

                  {/* Red Flags & Date Info */}
                  <div
                    style={{
                      background: 'var(--bg-input)',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isHigh ? '#ef4444' : isMed ? '#f59e0b' : 'var(--text-secondary)', fontWeight: 600 }}>
                      <AlertTriangle size={15} />
                      <span>{language === 'en' ? `${item.flagCount} Red Flags Detected` : `${item.flagCount} Red Flags Terdeteksi`}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      {formattedDate}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={() => onSelectSymbol(item.symbol)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 16px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, var(--accent-1), #7c3aed)',
                      color: 'white',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(99,102,241,0.25)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {language === 'en' ? 'Open Audit Report' : 'Buka Laporan Audit'} <ArrowRight size={16} />
                  </button>

                  {removeHistoryItem && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHistoryItem(item.id);
                      }}
                      title={language === 'en' ? 'Remove from history' : 'Hapus dari riwayat'}
                      style={{
                        padding: '11px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.06)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                        e.currentTarget.style.color = '#ef4444';
                        e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
