'use client';

import { useState } from 'react';
import {
  AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp,
  TrendingDown, DollarSign, Activity, FileWarning, BarChart2, Layers,
  Calendar, Database
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeRedFlag } from '@/lib/forensic-i18n';
import type { RedFlag } from '@/lib/forensic';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  earnings_quality: <Activity size={14} />,
  receivables: <TrendingDown size={14} />,
  auditor: <FileWarning size={14} />,
  cashflow: <DollarSign size={14} />,
  debt: <BarChart2 size={14} />,
  accruals: <Layers size={14} />,
};

const SEVERITY_CONFIG = {
  critical: {
    label: 'CRITICAL',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    icon: <AlertTriangle size={18} style={{ color: '#ef4444' }} />,
  },
  high: {
    label: 'HIGH',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.12)',
    border: 'rgba(251,146,60,0.3)',
    icon: <AlertCircle size={18} style={{ color: '#fb923c' }} />,
  },
  medium: {
    label: 'MEDIUM',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.12)',
    border: 'rgba(251,191,36,0.3)',
    icon: <AlertCircle size={18} style={{ color: '#fbbf24' }} />,
  },
  low: {
    label: 'LOW',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.3)',
    icon: <Info size={18} style={{ color: '#818cf8' }} />,
  },
};

export default function RedFlagCard({ flag, index }: { flag: RedFlag; index: number }) {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState(index === 0);
  const loc = localizeRedFlag(flag, language);
  const cfg = SEVERITY_CONFIG[flag.severity] || SEVERITY_CONFIG.critical;
  const icon = CATEGORY_ICONS[flag.category] || <Activity size={14} />;
  const cat = t.redFlag.categories[flag.category] || flag.category;

  return (
    <div
      className="glass-card shimmer-border"
      style={{
        borderRadius: '18px',
        background: 'var(--bg-card)',
        border: `1px solid ${cfg.border}`,
        marginBottom: '16px',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Header Button */}
      <button
        id={`redflag-${flag.id}`}
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '20px 22px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Top Badges & Score Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Icon & Severity Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                padding: '4px 10px',
                borderRadius: '8px',
                background: cfg.bg,
                color: cfg.color,
                border: `1px solid ${cfg.border}`,
              }}
            >
              {cfg.icon} {cfg.label}
            </span>

            {/* Category Pill */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '8px',
                background: 'var(--bg-input)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {icon} {cat}
            </span>
          </div>

          {/* Right Side: Score & Expand Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: cfg.color, fontFamily: 'var(--font-mono, monospace)' }}>
                {Math.round(flag.score)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginLeft: '4px' }}>
                score
              </span>
            </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
              }}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.3 }}>
            {loc.localizedTitle}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            {loc.localizedDescription}
          </p>
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div
          style={{
            padding: '0 22px 22px 22px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '16px',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            {loc.localizedDetail}
          </p>

          {/* Quarters list */}
          {flag.quarters && flag.quarters.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={13} /> {language === 'en' ? 'DETECTED QUARTERS' : 'KUARTAL TERDETEKSI'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {flag.quarters.map((q) => (
                  <span
                    key={q}
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: cfg.bg,
                      color: cfg.color,
                      border: `1px solid ${cfg.border}`,
                    }}
                  >
                    {q.replace('*', ' ⚠️')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Data Pendukung Grid */}
          {flag.data && Object.keys(flag.data).length > 0 && (
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Database size={13} /> {language === 'en' ? 'SUPPORTING METRIC DATA' : 'DATA PENDUKUNG ANALISIS'}
              </div>
              <div
                style={{
                  background: 'var(--bg-input)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {Object.entries(flag.data).map(([key, val]) => {
                  let formattedVal = String(val);
                  if (typeof val === 'number') {
                    if (Math.abs(val) >= 1e12) {
                      formattedVal = `Rp ${(val / 1e12).toFixed(2)}T`;
                    } else if (Math.abs(val) >= 1e9) {
                      formattedVal = `Rp ${(val / 1e9).toFixed(2)}M`;
                    } else {
                      formattedVal = val.toFixed ? val.toFixed(2) : String(val);
                    }
                  }
                  return (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        borderBottom: '1px border-subtle',
                        paddingBottom: '4px',
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'capitalize' }}>
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono, monospace)' }}>
                        {formattedVal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
