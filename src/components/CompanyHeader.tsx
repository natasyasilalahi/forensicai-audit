'use client';

import { Building2, AlertTriangle, ShieldAlert, CheckCircle2, DollarSign, Layers, Calendar, BarChart2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { ForensicResult } from '@/lib/forensic';

function formatIDR(val: number | null | undefined): string {
  if (val === null || val === undefined) return 'N/A';
  if (Math.abs(val) >= 1e12) return `Rp ${(val / 1e12).toFixed(1)}T`;
  if (Math.abs(val) >= 1e9) return `Rp ${(val / 1e9).toFixed(1)}M`;
  return `Rp ${val.toLocaleString('id-ID')}`;
}

function RiskScoreRing({ score, level }: { score: number; level: string }) {
  const { language, t } = useLanguage();
  const size = 140;
  const sw = 10;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(Math.max(score, 0), 100) / 100) * circ;

  const normalizedLevel = level.toLowerCase() as 'low' | 'medium' | 'high' | 'critical';
  const colors: Record<string, string> = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#f97316',
    critical: '#ef4444',
  };

  const col = colors[normalizedLevel] ?? '#ef4444';
  const localizedLabel = t.companyHeader.riskLevels[normalizedLevel] || normalizedLevel.toUpperCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--border-default)"
            strokeWidth={sw}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={col}
            strokeWidth={sw}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 10px ${col}80)`,
              transition: 'stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '34px',
              fontWeight: 900,
              color: col,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            {score}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
            / 100
          </span>
        </div>
      </div>

      <span
        style={{
          background: `${col}20`,
          color: col,
          border: `1px solid ${col}40`,
          padding: '6px 18px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          boxShadow: `0 4px 12px ${col}20`,
        }}
      >
        {language === 'en' ? `${localizedLabel} RISK` : `RISIKO ${localizedLabel}`}
      </span>
    </div>
  );
}

export default function CompanyHeader({ result }: { result: ForensicResult }) {
  const { language, t } = useLanguage();
  const latestQ = result.quarterly_data?.[result.quarterly_data.length - 1];
  const totalFlags = result.red_flags.length;
  const criticalF = result.red_flags.filter((f) => f.severity === 'critical').length;
  const highF = result.red_flags.filter((f) => f.severity === 'high').length;

  const isHighRisk = criticalF > 0 || result.risk_score > 60;
  const cleanSymbol = result.symbol.replace('.JK', '');

  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        padding: '32px',
        borderRadius: '24px',
        background: 'var(--bg-card)',
        border: `1px solid ${isHighRisk ? 'rgba(239,68,68,0.3)' : 'var(--border-subtle)'}`,
        boxShadow: isHighRisk
          ? '0 12px 36px -12px rgba(239,68,68,0.15)'
          : '0 12px 36px -12px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Accent Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          left: '-60px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: isHighRisk
            ? 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '32px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Column: Company Info & Stats */}
        <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
          {/* Header Row */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {result.company_name}
              </h1>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '13px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--accent-1), #7c3aed)',
                  color: 'white',
                  letterSpacing: '0.05em',
                }}
              >
                {cleanSymbol}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                IDX
              </span>
            </div>
          </div>

          {/* Alert Banner / Summary */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '14px',
              background: isHighRisk ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
              border: `1px solid ${isHighRisk ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {isHighRisk ? (
              <ShieldAlert size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
            ) : (
              <CheckCircle2 size={20} style={{ color: '#10b981', flexShrink: 0 }} />
            )}
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
              {totalFlags > 0 ? (
                language === 'en' ? (
                  <>
                    Detected <strong style={{ color: isHighRisk ? '#ef4444' : 'var(--text-primary)' }}>{totalFlags} potential reporting anomalies</strong> ({criticalF} Critical, {highF} High Risk). Overall forensic risk score: <strong>{result.risk_score}/100</strong>.
                  </>
                ) : (
                  <>
                    Ditemukan <strong style={{ color: isHighRisk ? '#ef4444' : 'var(--text-primary)' }}>{totalFlags} potensi anomali</strong> pada laporan keuangan emiten ({criticalF} Critical, {highF} High Risk). Skor risiko keseluruhan: <strong>{result.risk_score}/100</strong>.
                  </>
                )
              ) : (
                language === 'en' ? (
                  <>
                    Financial statements appear sound. No material anomalies detected during forensic accounting verification.
                  </>
                ) : (
                  <>
                    Laporan keuangan terindikasi sehat. Tidak ditemukan anomali signifikan pada pemeriksaan indikator forensik.
                  </>
                )
              )}
            </p>
          </div>

          {/* Micro Metric Stat Cards */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div
              style={{
                flex: '1 1 140px',
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={14} /> {language === 'en' ? 'Total Assets' : 'Total Aset'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                {formatIDR(latestQ?.total_assets)}
              </div>
            </div>

            <div
              style={{
                flex: '1 1 140px',
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BarChart2 size={14} /> Revenue (Q)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                {formatIDR(latestQ?.revenue)}
              </div>
            </div>

            <div
              style={{
                flex: '1 1 140px',
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} /> {language === 'en' ? 'Quarters' : 'Data Kuartal'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                {result.quarterly_data?.length || 0} {language === 'en' ? 'Quarters' : 'Kuartal'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Gauge & Red Flags Counter */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            paddingLeft: '24px',
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          <RiskScoreRing score={result.risk_score} level={result.risk_level} />

          {/* Flag counters */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div
              style={{
                textAlign: 'center',
                padding: '10px 14px',
                borderRadius: '12px',
                minWidth: '70px',
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#ef4444', lineHeight: 1, fontFamily: 'var(--font-mono, monospace)' }}>
                {criticalF}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#ef4444', opacity: 0.9, marginTop: '4px', letterSpacing: '0.05em' }}>
                CRITICAL
              </div>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '10px 14px',
                borderRadius: '12px',
                minWidth: '70px',
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.25)',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#f59e0b', lineHeight: 1, fontFamily: 'var(--font-mono, monospace)' }}>
                {highF}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#f59e0b', opacity: 0.9, marginTop: '4px', letterSpacing: '0.05em' }}>
                HIGH
              </div>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '10px 14px',
                borderRadius: '12px',
                minWidth: '70px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'var(--font-mono, monospace)' }}>
                {totalFlags}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.05em' }}>
                TOTAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
