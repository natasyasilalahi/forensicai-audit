'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeftRight, ShieldCheck, AlertTriangle, CheckCircle2,
  TrendingDown, TrendingUp, Activity, Layers, BarChart2,
  ArrowRight, Sparkles, Scale, Search, Loader2, Trophy, Swords
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeRedFlag } from '@/lib/forensic-i18n';
import type { ForensicResult } from '@/lib/forensic';

interface CompareViewProps {
  onSelectSymbol: (symbol: string) => void;
  onGoHome?: () => void;
}

function getPresetBattles(lang: 'id' | 'en') {
  const isEn = lang === 'en';
  return [
    { a: 'BBCA', b: 'BBRI', label: isEn ? 'BCA vs BRI (Banking Giants)' : 'BCA vs BRI (Perbankan Raksasa)' },
    { a: 'GOTO', b: 'BUKA', label: 'GoTo vs Bukalapak (Tech Giants)' },
    { a: 'BUMI', b: 'ADRO', label: isEn ? 'Bumi Resources vs Adaro (Energy)' : 'Bumi Resources vs Adaro (Energi)' },
    { a: 'TLKM', b: 'ISAT', label: isEn ? 'Telkom vs Indosat (Telecom)' : 'Telkom vs Indosat (Telekomunikasi)' },
    { a: 'UNVR', b: 'ICBP', label: 'Unilever vs Indofood CBP (Consumer)' },
  ];
}

export default function CompareView({ onSelectSymbol, onGoHome }: CompareViewProps) {
  const { language, t } = useLanguage();
  const [symbolA, setSymbolA] = useState('BBCA');
  const [symbolB, setSymbolB] = useState('BBRI');
  const [dataA, setDataA] = useState<ForensicResult | null>(null);
  const [dataB, setDataB] = useState<ForensicResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presetBattles = getPresetBattles(language);

  async function runComparison(a: string, b: string) {
    if (!a.trim() || !b.trim()) return;
    const cleanA = a.trim().toUpperCase();
    const cleanB = b.trim().toUpperCase();
    setSymbolA(cleanA);
    setSymbolB(cleanB);
    setIsLoading(true);
    setError(null);

    try {
      const [resA, resB] = await Promise.all([
        fetch(`/api/analyze?symbol=${encodeURIComponent(cleanA)}`),
        fetch(`/api/analyze?symbol=${encodeURIComponent(cleanB)}`),
      ]);

      if (!resA.ok) {
        const errA = await resA.json();
        throw new Error(`Emiten ${cleanA}: ${errA.error || (language === 'en' ? 'Failed to load' : 'Gagal memuat')}`);
      }
      if (!resB.ok) {
        const errB = await resB.json();
        throw new Error(`Emiten ${cleanB}: ${errB.error || (language === 'en' ? 'Failed to load' : 'Gagal memuat')}`);
      }

      const jsonA = await resA.json();
      const jsonB = await resB.json();

      setDataA(jsonA);
      setDataB(jsonB);
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'An error occurred while comparing the two issuers.' : 'Terjadi kesalahan saat membandingkan kedua emiten.'));
    } finally {
      setIsLoading(false);
    }
  }

  // Initial load
  useEffect(() => {
    runComparison('BBCA', 'BBRI');
  }, []);

  const isHighRiskBoth = Boolean(dataA && dataB && dataA.risk_score >= 50 && dataB.risk_score >= 50);
  const isBothHealthy = Boolean(dataA && dataB && dataA.risk_score <= 30 && dataB.risk_score <= 30);
  const scoreDiff = dataA && dataB ? Math.abs(dataA.risk_score - dataB.risk_score) : 0;
  const isCloseMatch = scoreDiff <= 6;

  const winner = dataA && dataB
    ? (dataA.risk_score < dataB.risk_score ? 'A' : dataA.risk_score > dataB.risk_score ? 'B' : 'TIE')
    : null;

  const winnerObj = winner === 'A' ? dataA : winner === 'B' ? dataB : null;
  const loserObj = winner === 'A' ? dataB : winner === 'B' ? dataA : null;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '10px 24px 80px' }}>
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 18px', borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(236,72,153,0.2))',
            border: '1px solid rgba(99,102,241,0.4)',
            fontSize: '13px', fontWeight: 800, color: '#c7d2fe',
            marginBottom: '16px',
            boxShadow: '0 0 20px rgba(99,102,241,0.25)',
          }}
        >
          <Swords size={15} style={{ color: '#ec4899' }} />
          <span>HEAD-TO-HEAD FORENSIC COMPARISON</span>
          <Scale size={15} style={{ color: '#a855f7' }} />
        </div>

        <h1
          style={{
            fontSize: 'clamp(28px, 4.5vw, 44px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}
        >
          {t.compare.title}
        </h1>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          {t.compare.subtitle}
        </p>
      </div>

      {/* ── Stock Selectors & Presets ── */}
      <div
        className="glass-card"
        style={{
          padding: '24px 28px',
          borderRadius: '20px',
          border: '1px solid var(--control-border)',
          background: 'var(--control-bg)',
          boxShadow: 'var(--hero-shadow)',
          marginBottom: '36px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
          {/* Input A */}
          <div style={{ flex: '1 1 200px', maxWidth: '280px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--accent-1)', marginBottom: '6px', textTransform: 'uppercase' }}>
              {t.compare.stockA}
            </label>
            <input
              type="text"
              value={symbolA}
              onChange={(e) => setSymbolA(e.target.value.toUpperCase())}
              placeholder={language === 'en' ? 'e.g. BBCA' : 'Misal: BBCA'}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                color: 'var(--text-primary)', fontSize: '16px', fontWeight: 800,
                textTransform: 'uppercase', outline: 'none',
              }}
            />
          </div>

          {/* VS Badge */}
          <div
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, color: '#fff', fontSize: '15px',
              boxShadow: '0 0 16px rgba(99,102,241,0.5)',
              marginTop: '18px', flexShrink: 0,
            }}
          >
            VS
          </div>

          {/* Input B */}
          <div style={{ flex: '1 1 200px', maxWidth: '280px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#ec4899', marginBottom: '6px', textTransform: 'uppercase' }}>
              {t.compare.stockB}
            </label>
            <input
              type="text"
              value={symbolB}
              onChange={(e) => setSymbolB(e.target.value.toUpperCase())}
              placeholder={language === 'en' ? 'e.g. BBRI' : 'Misal: BBRI'}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                color: 'var(--text-primary)', fontSize: '16px', fontWeight: 800,
                textTransform: 'uppercase', outline: 'none',
              }}
            />
          </div>

          {/* Compare Button */}
          <div style={{ marginTop: '18px' }}>
            <button
              onClick={() => runComparison(symbolA, symbolB)}
              disabled={isLoading || !symbolA || !symbolB}
              className="btn-primary"
              style={{
                padding: '12px 28px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                fontSize: '15px', fontWeight: 800, cursor: 'pointer',
              }}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <ArrowLeftRight size={18} />}
              <span>{t.compare.compareBtn}</span>
            </button>
          </div>
        </div>

        {/* Preset quick battles */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, marginRight: '4px' }}>
            {t.compare.popularPresets}
          </span>
          {presetBattles.map((b) => (
            <button
              key={`${b.a}-${b.b}`}
              onClick={() => runComparison(b.a, b.b)}
              disabled={isLoading}
              style={{
                padding: '5px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.15)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div style={{ padding: '16px 20px', borderRadius: '14px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', marginBottom: '28px', textAlign: 'center', fontWeight: 600 }}>
          {error}
        </div>
      )}

      {/* ── Loading Spinner ── */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent-1)', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {language === 'en' ? `Auditing ${symbolA} & ${symbolB}...` : `Mengaudit ${symbolA} & ${symbolB}...`}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {language === 'en'
              ? 'Fetching 12 quarters of financial data and mapping forensic metric divergence.'
              : 'Menarik 12 kuartal data laporan keuangan dan memetakan perbandingan metrik forensik.'}
          </p>
        </div>
      )}

      {/* ── Comparison Results ── */}
      {!isLoading && dataA && dataB && (
        <div>
            {/* Verdict Banner */}
            {isHighRiskBoth ? (
              <div
                style={{
                  padding: '24px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.16) 0%, rgba(245,158,11,0.12) 100%)',
                  border: '1px solid rgba(239,68,68,0.4)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
                  marginBottom: '32px',
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
                    <AlertTriangle size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#f87171', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {t.compare.bothHighRiskTitle}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                      {language === 'en'
                        ? `Both Issuers Exhibit Elevated Forensic Risk (${dataA.symbol}: ${dataA.risk_score} vs ${dataB.symbol}: ${dataB.risk_score})`
                        : `Kedua Emiten Berada di Zona Risiko Tinggi (${dataA.symbol}: ${dataA.risk_score} vs ${dataB.symbol}: ${dataB.risk_score})`}
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.5 }}>
                  {t.compare.bothHighRiskDesc}
                </div>
              </div>
            ) : isBothHealthy && isCloseMatch ? (
              <div
                style={{
                  padding: '24px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(59,130,246,0.12) 100%)',
                  border: '1px solid rgba(16,185,129,0.4)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
                  marginBottom: '32px',
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16,185,129,0.5)' }}>
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {t.compare.bothHealthyTitle}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                      {winnerObj && loserObj ? (
                        <span>
                          <strong>{winnerObj.symbol}</strong> ({winnerObj.risk_score}/100){' '}
                          {language === 'en' ? 'holds a slight edge over' : 'unggul tipis atas'}{' '}
                          <strong>{loserObj.symbol}</strong> ({loserObj.risk_score}/100)
                        </span>
                      ) : (
                        <span>
                          {language === 'en'
                            ? `Both Issuers Share Outstanding Forensic Health (${dataA.risk_score} vs ${dataB.risk_score})`
                            : `Kedua Emiten Sangat Sehat & Rendah Risiko (${dataA.risk_score} vs ${dataB.risk_score})`}
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.5 }}>
                  {t.compare.bothHealthyDesc}
                </div>
              </div>
            ) : winnerObj && loserObj ? (
              <div
                style={{
                  padding: '24px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(99,102,241,0.14) 100%)',
                  border: '1px solid rgba(16,185,129,0.35)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
                  marginBottom: '32px',
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16,185,129,0.5)' }}>
                    <Trophy size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {t.compare.verdictTitle}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                      <span>
                        <strong>{winnerObj.symbol}</strong> ({winnerObj.company_name}){' '}
                        {language === 'en' ? 'is Healthier with Lower Manipulation Risk' : 'Lebih Sehat & Rendah Risiko Manipulasi'}
                      </span>
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.5 }}>
                  {language === 'en'
                    ? `${winnerObj.symbol} scores ${winnerObj.risk_score}/100 vs ${loserObj.symbol}'s ${loserObj.risk_score}/100, displaying higher earnings reliability and reporting integrity.`
                    : `${winnerObj.symbol} mencatat skor risiko ${winnerObj.risk_score}/100 dibandingkan ${loserObj.symbol} (${loserObj.risk_score}/100), dengan kualitas pembukuan yang lebih transparan.`}
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: '24px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.16) 0%, rgba(168,85,247,0.14) 100%)',
                  border: '1px solid rgba(99,102,241,0.4)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
                  marginBottom: '32px',
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.5)' }}>
                    <Scale size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#a5b4fc', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {t.compare.verdictTitle}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                      {language === 'en'
                        ? `Both Issuers Share Balanced Forensic Profiles (${dataA.risk_score} vs ${dataB.risk_score})`
                        : `Keduanya Memiliki Profil Risiko Forensik Seimbang (${dataA.risk_score} vs ${dataB.risk_score})`}
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.5 }}>
                  {t.compare.tieVerdict}
                </div>
              </div>
            )}

            {/* Side by Side Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>
              {/* Emiten A Card */}
              <div
                className="glass-card"
                style={{
                  padding: '28px', borderRadius: '20px',
                  border: winner === 'A' ? (isHighRiskBoth ? '2px solid #f59e0b' : '2px solid #10b981') : '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  boxShadow: winner === 'A' ? (isHighRiskBoth ? '0 0 30px rgba(245,158,11,0.2)' : '0 0 30px rgba(16,185,129,0.2)') : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {winner === 'A' && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    padding: '4px 12px', borderRadius: '9999px',
                    background: isHighRiskBoth ? '#f59e0b' : '#10b981',
                    color: '#fff', fontSize: '11px', fontWeight: 900,
                    display: 'flex', alignItems: 'center', gap: '4px',
                    boxShadow: isHighRiskBoth ? '0 0 12px rgba(245,158,11,0.5)' : '0 0 12px rgba(16,185,129,0.5)'
                  }}>
                    {isHighRiskBoth ? (
                      <><AlertTriangle size={12} /> {language === 'en' ? 'Relatively Lower Risk' : 'Risiko Relatif Lebih Rendah'}</>
                    ) : isBothHealthy ? (
                      <><ShieldCheck size={12} /> {language === 'en' ? 'Top Integrity' : 'Integritas Unggul'}</>
                    ) : (
                      <><Trophy size={12} /> {t.compare.cleaner}</>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent-1)' }}>{dataA.symbol}</span>
                  <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '6px', background: 'var(--chip-bg)', color: 'var(--chip-color)', border: '1px solid var(--border-subtle)' }}>
                    {dataA.company_name}
                  </span>
                </div>

                {/* Risk Score */}
                <div style={{ margin: '20px 0', padding: '16px', borderRadius: '14px', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>{t.compare.riskScore}</span>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: dataA.risk_score <= 30 ? '#10b981' : dataA.risk_score <= 60 ? '#fbbf24' : '#ef4444' }}>
                      {dataA.risk_score}<span style={{ fontSize: '14px', opacity: 0.5 }}>/100</span>
                    </span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'var(--border-subtle)', overflow: 'hidden' }}>
                    <div style={{ width: `${dataA.risk_score}%`, height: '100%', background: dataA.risk_score <= 30 ? '#10b981' : dataA.risk_score <= 60 ? '#fbbf24' : '#ef4444' }} />
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.compare.riskLevel}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{dataA.risk_level.toUpperCase()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.compare.redFlagsCount}</span>
                    <strong style={{ color: dataA.red_flags.length > 2 ? '#ef4444' : '#10b981' }}>
                      {language === 'en' ? `${dataA.red_flags.length} Detected` : `${dataA.red_flags.length} Terdeteksi`}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.compare.quartersAnalyzed}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {dataA.quarterly_data?.length || 12} {language === 'en' ? 'Quarters' : 'Kuartal'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => onSelectSymbol(dataA.symbol)}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '24px', padding: '12px', borderRadius: '12px', justifyContent: 'center' }}
                >
                  <span>{language === 'en' ? `Open Full Audit for ${dataA.symbol}` : `Buka Audit Lengkap ${dataA.symbol}`}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Emiten B Card */}
              <div
                className="glass-card"
                style={{
                  padding: '28px', borderRadius: '20px',
                  border: winner === 'B' ? (isHighRiskBoth ? '2px solid #f59e0b' : '2px solid #10b981') : '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  boxShadow: winner === 'B' ? (isHighRiskBoth ? '0 0 30px rgba(245,158,11,0.2)' : '0 0 30px rgba(16,185,129,0.2)') : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {winner === 'B' && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    padding: '4px 12px', borderRadius: '9999px',
                    background: isHighRiskBoth ? '#f59e0b' : '#10b981',
                    color: '#fff', fontSize: '11px', fontWeight: 900,
                    display: 'flex', alignItems: 'center', gap: '4px',
                    boxShadow: isHighRiskBoth ? '0 0 12px rgba(245,158,11,0.5)' : '0 0 12px rgba(16,185,129,0.5)'
                  }}>
                    {isHighRiskBoth ? (
                      <><AlertTriangle size={12} /> {language === 'en' ? 'Relatively Lower Risk' : 'Risiko Relatif Lebih Rendah'}</>
                    ) : isBothHealthy ? (
                      <><ShieldCheck size={12} /> {language === 'en' ? 'Top Integrity' : 'Integritas Unggul'}</>
                    ) : (
                      <><Trophy size={12} /> {t.compare.cleaner}</>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 900, color: '#ec4899' }}>{dataB.symbol}</span>
                  <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '6px', background: 'var(--chip-bg)', color: 'var(--chip-color)', border: '1px solid var(--border-subtle)' }}>
                    {dataB.company_name}
                  </span>
                </div>

                {/* Risk Score */}
                <div style={{ margin: '20px 0', padding: '16px', borderRadius: '14px', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>{t.compare.riskScore}</span>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: dataB.risk_score <= 30 ? '#10b981' : dataB.risk_score <= 60 ? '#fbbf24' : '#ef4444' }}>
                      {dataB.risk_score}<span style={{ fontSize: '14px', opacity: 0.5 }}>/100</span>
                    </span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'var(--border-subtle)', overflow: 'hidden' }}>
                    <div style={{ width: `${dataB.risk_score}%`, height: '100%', background: dataB.risk_score <= 30 ? '#10b981' : dataB.risk_score <= 60 ? '#fbbf24' : '#ef4444' }} />
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.compare.riskLevel}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{dataB.risk_level.toUpperCase()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.compare.redFlagsCount}</span>
                    <strong style={{ color: dataB.red_flags.length > 2 ? '#ef4444' : '#10b981' }}>
                      {language === 'en' ? `${dataB.red_flags.length} Detected` : `${dataB.red_flags.length} Terdeteksi`}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.compare.quartersAnalyzed}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {dataB.quarterly_data?.length || 12} {language === 'en' ? 'Quarters' : 'Kuartal'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => onSelectSymbol(dataB.symbol)}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '24px', padding: '12px', borderRadius: '12px', justifyContent: 'center', background: 'linear-gradient(135deg, #ec4899, #f97316)' }}
                >
                  <span>{language === 'en' ? `Open Full Audit for ${dataB.symbol}` : `Buka Audit Lengkap ${dataB.symbol}`}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          {/* Side-by-Side Red Flag Breakdown Table */}
          <div
            className="glass-card"
            style={{
              padding: '24px 28px',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-card)',
            }}
          >
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
              {t.compare.anomaliesComparison}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Flags A */}
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-1)', marginBottom: '10px' }}>
                  {language === 'en' ? `${dataA.symbol} Red Flag Findings (${dataA.red_flags.length}):` : `Temuan Red Flag ${dataA.symbol} (${dataA.red_flags.length}):`}
                </div>
                {dataA.red_flags.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#10b981' }}>{t.compare.noRedFlags}</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {dataA.red_flags.map((f, i) => {
                      const locF = localizeRedFlag(f, language);
                      return (
                        <div key={i} style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)', fontSize: '12.5px' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{locF.title}</strong>
                          <p style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '11.5px' }}>{locF.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Flags B */}
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ec4899', marginBottom: '10px' }}>
                  {language === 'en' ? `${dataB.symbol} Red Flag Findings (${dataB.red_flags.length}):` : `Temuan Red Flag ${dataB.symbol} (${dataB.red_flags.length}):`}
                </div>
                {dataB.red_flags.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#10b981' }}>{t.compare.noRedFlags}</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {dataB.red_flags.map((f, i) => {
                      const locF = localizeRedFlag(f, language);
                      return (
                        <div key={i} style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)', fontSize: '12.5px' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{locF.title}</strong>
                          <p style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '11.5px' }}>{locF.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
