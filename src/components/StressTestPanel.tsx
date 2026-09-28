'use client';

import { useState, useMemo } from 'react';
import { Sliders, RefreshCw, AlertTriangle, ShieldCheck, Zap, Activity } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { ForensicResult } from '@/lib/forensic';

interface StressTestPanelProps {
  result: ForensicResult;
}

export default function StressTestPanel({ result }: StressTestPanelProps) {
  const { language, t } = useLanguage();
  // Baseline values
  const baseScore = result.risk_score;

  // Stress sliders
  const [ocfDelta, setOcfDelta] = useState<number>(0); // -50% to +50%
  const [receivableGrowth, setReceivableGrowth] = useState<number>(0); // 0% to +100%
  const [accrualShift, setAccrualShift] = useState<number>(0); // -0.05 to +0.20
  const [debtVelocity, setDebtVelocity] = useState<number>(0); // 0% to +150%

  // Simulated score computation
  const simulatedScore = useMemo(() => {
    let score = baseScore;

    // OCF drop increases risk score
    if (ocfDelta < 0) {
      score += Math.abs(ocfDelta) * 0.4;
    } else {
      score -= ocfDelta * 0.2;
    }

    // Receivables surge increases risk
    score += receivableGrowth * 0.25;

    // Accrual shift increases risk
    score += accrualShift * 80;

    // Debt velocity increases risk
    score += debtVelocity * 0.15;

    return Math.min(100, Math.max(5, Math.round(score)));
  }, [baseScore, ocfDelta, receivableGrowth, accrualShift, debtVelocity]);

  const simulatedBeneish = useMemo(() => {
    // Standard baseline Beneish estimation around -2.6
    let m = -2.60;
    if (baseScore > 60) m = -1.95;
    else if (baseScore > 30) m = -2.40;

    // Modifiers
    m += (receivableGrowth / 100) * 0.8;
    m += accrualShift * 2.5;
    if (ocfDelta < 0) m += (Math.abs(ocfDelta) / 100) * 0.6;

    return Number(m.toFixed(2));
  }, [baseScore, receivableGrowth, accrualShift, ocfDelta]);

  function handleReset() {
    setOcfDelta(0);
    setReceivableGrowth(0);
    setAccrualShift(0);
    setDebtVelocity(0);
  }

  const isManipulative = simulatedBeneish > -2.22;
  const isHighRisk = simulatedScore >= 60;

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px 28px',
        borderRadius: '20px',
        border: '1px solid var(--control-border)',
        background: 'var(--control-bg)',
        boxShadow: 'var(--hero-shadow)',
        marginBottom: '28px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sliders size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
              {t.stressTest.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              {language === 'en'
                ? `Test the accounting resilience of ${result.symbol} against cash flow shocks and receivables spikes.`
                : `Uji ketahanan integritas pembukuan ${result.symbol} jika terjadi guncangan arus kas dan piutang.`}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)', fontSize: '12.5px', fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={13} />
          <span>{t?.stressTest?.reset || (language === 'en' ? 'Reset' : 'Reset')}</span>
        </button>
      </div>

      {/* Reactive Simulation Result Banner */}
      <div
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px',
          padding: '16px 20px', borderRadius: '14px',
          background: isHighRisk ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.08)',
          border: isHighRisk ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(16,185,129,0.25)',
          marginBottom: '24px',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>
            {(t?.stressTest?.simulatedRisk || (language === 'en' ? 'Simulated Risk Score' : 'Skor Risiko Simulasi')).toUpperCase()}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: isHighRisk ? '#ef4444' : '#10b981' }}>
              {simulatedScore}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              (Baseline: {baseScore} • Δ {simulatedScore - baseScore >= 0 ? `+${simulatedScore - baseScore}` : simulatedScore - baseScore})
            </span>
          </div>
        </div>

        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>
            {(t?.stressTest?.simulatedBeneish || (language === 'en' ? 'Estimated Beneish M-Score' : 'Estimasi Beneish M-Score')).toUpperCase()}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: isManipulative ? '#ef4444' : '#34d399' }}>
              {simulatedBeneish}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: isManipulative ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', color: isManipulative ? '#f87171' : '#34d399' }}>
              {isManipulative ? (language === 'en' ? 'MANIPULATION ZONE' : 'ZONA MANIPULASI') : (language === 'en' ? 'SAFE ZONE (< -2.22)' : 'ZONA AMAN (< -2.22)')}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
            {isHighRisk
              ? (language === 'en'
                  ? '⚠️ Under this scenario, cash flow divergence exceeds safe thresholds and triggers serious red flags.'
                  : '⚠️ Dalam skenario ini, divergensi arus kas melampaui ambang batas sehat dan memicu indikasi red-flag serius.')
              : (language === 'en'
                  ? '✓ Financial reporting remains within healthy bounds under normal working capital fluctuations.'
                  : '✓ Pembukuan tetap berada pada koridor aman terhadap fluktuasi modal kerja normal.')}
          </p>
        </div>
      </div>

      {/* Sliders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {/* Slider 1: OCF Delta */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12.5px' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
              {language === 'en' ? 'Operating Cash Flow (OCF) Delta' : 'Fluktuasi Kas Operasi (OCF)'}
            </span>
            <strong style={{ color: ocfDelta < 0 ? '#ef4444' : ocfDelta > 0 ? '#10b981' : 'var(--text-muted)' }}>
              {ocfDelta > 0 ? `+${ocfDelta}%` : `${ocfDelta}%`}
            </strong>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="5"
            value={ocfDelta}
            onChange={(e) => setOcfDelta(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#8b5cf6', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
            <span>{language === 'en' ? '-50% (Cash Drop)' : '-50% (Kas Anjlok)'}</span>
            <span>0%</span>
            <span>{language === 'en' ? '+50% (Cash Surge)' : '+50% (Kas Naik)'}</span>
          </div>
        </div>

        {/* Slider 2: Receivable Growth */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12.5px' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
              {language === 'en' ? 'Receivables Growth (DSRI)' : 'Kenaikan Piutang (DSRI)'}
            </span>
            <strong style={{ color: receivableGrowth > 30 ? '#ef4444' : receivableGrowth > 0 ? '#fbbf24' : 'var(--text-muted)' }}>
              +{receivableGrowth}%
            </strong>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={receivableGrowth}
            onChange={(e) => setReceivableGrowth(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#ef4444', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
            <span>{language === 'en' ? '0% (Stable)' : '0% (Stabil)'}</span>
            <span>+50%</span>
            <span>{language === 'en' ? '+100% (Accumulating)' : '+100% (Piutang Menumpuk)'}</span>
          </div>
        </div>

        {/* Slider 3: Accrual Shift */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12.5px' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
              {language === 'en' ? 'Sloan Accrual Shift' : 'Pergeseran Akrual Sloan'}
            </span>
            <strong style={{ color: accrualShift > 0.08 ? '#ef4444' : accrualShift > 0 ? '#fbbf24' : 'var(--text-muted)' }}>
              {accrualShift > 0 ? `+${accrualShift.toFixed(2)}` : accrualShift.toFixed(2)}
            </strong>
          </div>
          <input
            type="range"
            min="-0.05"
            max="0.20"
            step="0.01"
            value={accrualShift}
            onChange={(e) => setAccrualShift(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
            <span>-0.05</span>
            <span>0.00</span>
            <span>{language === 'en' ? '+0.20 (Non-Cash Profit)' : '+0.20 (Laba Non-Kas)'}</span>
          </div>
        </div>

        {/* Slider 4: Debt Velocity */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12.5px' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
              {language === 'en' ? 'New Debt Velocity' : 'Kecepatan Utang Baru'}
            </span>
            <strong style={{ color: debtVelocity > 50 ? '#ef4444' : debtVelocity > 0 ? '#f59e0b' : 'var(--text-muted)' }}>
              +{debtVelocity}%
            </strong>
          </div>
          <input
            type="range"
            min="0"
            max="150"
            step="10"
            value={debtVelocity}
            onChange={(e) => setDebtVelocity(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
            <span>0%</span>
            <span>+75%</span>
            <span>{language === 'en' ? '+150% (Leverage Spike)' : '+150% (Leverage Spike)'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
