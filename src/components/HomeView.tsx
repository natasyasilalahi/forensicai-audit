'use client';

import { useState } from 'react';
import {
  Activity, Layers, TrendingDown, BarChart2, DollarSign, Shield,
  ArrowRight, Sparkles, AlertTriangle, ShieldAlert, CheckCircle2,
  TrendingUp, RotateCcw, Search, Eye, Filter, Zap, Globe
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import NewsSection from '@/components/NewsSection';

/* ─── Types & Styles ────────────────────────────────────────── */

type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

const SEV_STYLE: Record<Severity, { color: string; bg: string; border: string }> = {
  CRITICAL: { color: '#f87171', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)' },
  HIGH:     { color: '#fb923c', bg: 'rgba(251,146,60,0.15)', border: 'rgba(251,146,60,0.4)' },
  MEDIUM:   { color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)' },
  INFO:     { color: '#60a5fa', bg: 'rgba(96,165,250,0.15)', border: 'rgba(96,165,250,0.4)' },
};

/* ─── Feature Detector Cards Definition ─────────────────────── */

function getFeatures(lang: 'id' | 'en') {
  const isEn = lang === 'en';
  return [
    {
      icon: <Activity size={26} />, title: 'Earnings vs OCF', category: 'earnings_quality', color: '#ef4444',
      desc: isEn
        ? 'Detect severe divergence between net profit and operating cash flow using Beneish M-Score models.'
        : 'Deteksi divergensi antara laba bersih dan arus kas operasi — metode Beneish M-Score.',
      backTitle: isEn ? 'Red Flag Example' : 'Contoh Red Flag',
      backDesc: isEn
        ? 'Net income 3.2× higher than operating cash flow for 6 consecutive quarters. OCF/Net Income: 0.31× (healthy: ≥1.0×)'
        : 'Laba bersih 3.2× lebih tinggi dari arus kas operasi selama 6 kuartal. OCF/Net Income: 0.31× (sehat: ≥1.0×)',
      backSeverity: 'CRITICAL' as const,
      backBars: [
        { label: 'Q1', earn: 85, ocf: 28 },
        { label: 'Q2', earn: 90, ocf: 25 },
        { label: 'Q3', earn: 95, ocf: 22 },
        { label: 'Q4', earn: 100, ocf: 18 },
      ],
    },
    {
      icon: <Layers size={26} />, title: 'Accrual Analysis', category: 'accruals', color: '#8b5cf6',
      desc: isEn
        ? 'Calculate Sloan Accrual Ratio to identify aggressive non-cash accrual manipulation in earnings.'
        : 'Hitung Sloan Accrual Ratio untuk mengidentifikasi manipulasi komponen akrual agresif.',
      backTitle: isEn ? 'Red Flag Example' : 'Contoh Red Flag',
      backDesc: isEn
        ? 'Sloan Accrual Ratio: 0.19 (threshold: 0.10). Accrual component accounts for 48% of net operating assets.'
        : 'Sloan Accrual Ratio: 0.19 (ambang batas: 0.10). Komponen akrual mencapai 48% dari total aset operasi.',
      backSeverity: 'HIGH' as const,
      backBars: [
        { label: '2021', earn: 22, ocf: 55 },
        { label: '2022', earn: 35, ocf: 52 },
        { label: '2023', earn: 48, ocf: 48 },
        { label: '2024', earn: 62, ocf: 43 },
      ],
    },
    {
      icon: <TrendingDown size={26} />, title: 'Cash Flow Quality', category: 'cashflow', color: '#3b82f6',
      desc: isEn
        ? 'Analyze free cash flow conversion vs reported accounting profit across 12 quarters.'
        : 'Analisis kualitas arus kas bebas vs laba yang dilaporkan selama 12 kuartal.',
      backTitle: isEn ? 'Red Flag Example' : 'Contoh Red Flag',
      backDesc: isEn
        ? 'Revenue grew +44% YoY while OCF dropped -12%. Divergence of 56.4% indicates premature revenue recognition.'
        : 'Revenue tumbuh +44% YoY tapi OCF justru turun -12%. Divergensi 56.4% — indikasi revenue recognition agresif.',
      backSeverity: 'HIGH' as const,
      backBars: [
        { label: 'Q1', earn: 60, ocf: 55 },
        { label: 'Q2', earn: 75, ocf: 50 },
        { label: 'Q3', earn: 88, ocf: 42 },
        { label: 'Q4', earn: 100, ocf: 35 },
      ],
    },
    {
      icon: <BarChart2 size={26} />, title: 'Leverage Watch', category: 'debt', color: '#f59e0b',
      desc: isEn
        ? 'Track debt accumulation velocity that is disproportionate to tangible operating asset growth.'
        : 'Pantau akumulasi utang yang tidak proporsional terhadap pertumbuhan aset riil.',
      backTitle: isEn ? 'Red Flag Example' : 'Contoh Red Flag',
      backDesc: isEn
        ? 'Debt surged +127% vs asset growth of +41% over 3 years. Debt-to-Asset ratio: 71.4% (high risk zone).'
        : 'Utang tumbuh +127% vs aset +41% dalam 3 tahun. Debt-to-Asset ratio: 71.4% — zona risiko tinggi.',
      backSeverity: 'HIGH' as const,
      backBars: [
        { label: '2021', earn: 30, ocf: 70 },
        { label: '2022', earn: 50, ocf: 75 },
        { label: '2023', earn: 75, ocf: 82 },
        { label: '2024', earn: 100, ocf: 90 },
      ],
    },
    {
      icon: <DollarSign size={26} />, title: 'Margin Erosion', category: 'receivables', color: '#10b981',
      desc: isEn
        ? 'Detect covert gross margin deterioration and anomalies in expense capitalization policies.'
        : 'Deteksi penurunan margin bruto tersembunyi dan anomali kebijakan kapitalisasi beban.',
      backTitle: isEn ? 'Red Flag Example' : 'Contoh Red Flag',
      backDesc: isEn
        ? 'Gross margin collapsed from 38.7% → 24.1% (−14.6pp) in 8 quarters. Cost compression masked in inventory.'
        : 'Gross margin turun dari 38.7% → 24.1% (−14.6pp) dalam 8 kuartal. Penurunan tersembunyi di COGS.',
      backSeverity: 'MEDIUM' as const,
      backBars: [
        { label: 'Q1', earn: 100, ocf: 38 },
        { label: 'Q2', earn: 98, ocf: 35 },
        { label: 'Q3', earn: 95, ocf: 30 },
        { label: 'Q4', earn: 90, ocf: 24 },
      ],
    },
    {
      icon: <Shield size={26} />, title: 'Forensic Report', category: 'auditor', color: '#06b6d4',
      desc: isEn
        ? 'In-depth forensic audit memorandum with AI investigative opinion and actionable checklists.'
        : 'Laporan audit mendalam dengan opini investigatif dan rekomendasi terstruktur.',
      backTitle: isEn ? 'Report Output' : 'Contoh Output',
      backDesc: isEn
        ? 'Memorandum synthesizes 8 detectors, 12 quarters of data, 0–100 risk score, and CFA auditor opinion.'
        : 'Laporan mencakup 8 detektor, 12 kuartal data, skor risiko 0–100, red flags prioritas, dan opini auditor AI.',
      backSeverity: 'INFO' as const,
      backBars: [
        { label: 'Earnings', earn: 88, ocf: 88 },
        { label: isEn ? 'Accrual' : 'Akrual', earn: 72, ocf: 72 },
        { label: 'Leverage', earn: 65, ocf: 65 },
        { label: 'Margin', earn: 55, ocf: 55 },
      ],
    },
  ];
}

/* ─── FlipCard Component ────────────────────────────────────── */

function FlipCard({
  feature,
  onAnalyze,
  lang,
}: {
  feature: ReturnType<typeof getFeatures>[0];
  onAnalyze: () => void;
  lang: 'id' | 'en';
}) {
  const [flipped, setFlipped] = useState(false);
  const sev = SEV_STYLE[feature.backSeverity];

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        perspective: '1000px',
        cursor: 'pointer',
        height: '260px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div
          className="glass-card"
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            padding: '22px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${feature.color}15`, color: feature.color,
                boxShadow: `0 0 16px ${feature.color}25`,
                border: `1px solid ${feature.color}25`,
              }}
            >
              {feature.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Click to Simulate Red Flag' : 'Klik untuk Simulasi Red Flag'}
            </span>
            <RotateCcw size={13} style={{ color: feature.color, opacity: 0.8 }} />
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            background: `linear-gradient(145deg, rgba(16,19,38,0.97) 0%, ${feature.color}15 100%)`,
            backdropFilter: 'blur(16px)',
            border: `1px solid ${feature.color}45`,
            boxShadow: `0 12px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${feature.color}30`,
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: feature.color, boxShadow: `0 0 8px ${feature.color}` }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {feature.backTitle}
              </span>
            </div>
            <span
              style={{
                fontSize: '10px', fontWeight: 900,
                padding: '2px 8px', borderRadius: '6px',
                background: sev.bg, color: sev.color, border: `1px solid ${sev.border}`,
              }}
            >
              {feature.backSeverity}
            </span>
          </div>

          <div
            style={{
              padding: '6px 10px', borderRadius: '8px',
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: '4px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '32px' }}>
              {feature.backBars.map((bar, bi) => {
                const h1 = Math.max(5, Math.round((bar.earn / 100) * 24));
                const h2 = Math.max(5, Math.round((bar.ocf / 100) * 24));
                return (
                  <div key={bi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '24px' }}>
                      <div style={{ width: '6px', height: `${h1}px`, background: feature.color, borderRadius: '2px 2px 0 0' }} />
                      <div style={{ width: '6px', height: `${h2}px`, background: 'rgba(255,255,255,0.25)', borderRadius: '2px 2px 0 0' }} />
                    </div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>{bar.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p style={{ fontSize: '11.5px', lineHeight: 1.45, color: 'var(--text-secondary)', margin: 0 }}>
            {feature.backDesc}
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); onAnalyze(); }}
            style={{
              width: '100%', padding: '8px 12px', borderRadius: '8px',
              background: `linear-gradient(135deg, ${feature.color}35, ${feature.color}15)`,
              color: '#fff', border: `1px solid ${feature.color}60`, fontSize: '12px', fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}
          >
            <span>{lang === 'en' ? 'Open Forensic Scanner' : 'Buka Scanner Forensik'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── IDX Forensic Radar Sample List ────────────────────────── */

interface RadarStock {
  symbol: string;
  name: string;
  sector: string;
  riskScore: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  primaryIssue: string;
  metricBadge: string;
}

function getRadarStocks(lang: 'id' | 'en'): RadarStock[] {
  const isEn = lang === 'en';
  return [
    {
      symbol: 'BUMI',
      name: 'Bumi Resources Tbk',
      sector: 'Energy & Mining',
      riskScore: 78,
      riskLevel: 'CRITICAL',
      primaryIssue: isEn
        ? 'Divergence between Operating Cash Flow and Ongoing Debt Service Obligations'
        : 'Divergensi Arus Kas Operasi vs Beban Utang Berkelanjutan',
      metricBadge: 'OCF/Debt: 0.18x',
    },
    {
      symbol: 'GOTO',
      name: 'GoTo Gojek Tokopedia Tbk',
      sector: 'Technology',
      riskScore: 68,
      riskLevel: 'HIGH',
      primaryIssue: isEn
        ? 'Goodwill Amortization Burden & Material Accrual Gap'
        : 'Akumulasi Beban Amortisasi Goodwill & Gap Akrual',
      metricBadge: 'Sloan Ratio: +0.14',
    },
    {
      symbol: 'BREN',
      name: 'Barito Renewables Energy Tbk',
      sector: 'Renewable Energy',
      riskScore: 54,
      riskLevel: 'MEDIUM',
      primaryIssue: isEn
        ? 'Elevated Valuation & Rapid Capitalized Project Debt Buildup'
        : 'Valuasi Ekstrem & Pertumbuhan Utang Proyek Terkapitalisasi',
      metricBadge: 'Leverage Vel.: +42%',
    },
    {
      symbol: 'BBCA',
      name: 'Bank Central Asia Tbk',
      sector: 'Financials',
      riskScore: 16,
      riskLevel: 'LOW',
      primaryIssue: isEn
        ? 'Prudent Asset Quality & Robust Loan Loss Provisioning'
        : 'Kualitas Aset & Pembentukan Pencadangan Sangat Sehat',
      metricBadge: 'NPL Gross: 1.9%',
    },
    {
      symbol: 'TLKM',
      name: 'Telkom Indonesia Tbk',
      sector: 'Telecommunication',
      riskScore: 28,
      riskLevel: 'LOW',
      primaryIssue: isEn
        ? 'Stable Cash Flow from Operations Supporting 5G & Data Center Capex'
        : 'Arus Kas Operasi Stabil Mendukung Belanja Modal 5G & Data Center',
      metricBadge: 'OCF Margin: 41%',
    },
    {
      symbol: 'ASII',
      name: 'Astra International Tbk',
      sector: 'Consumer Discretionary',
      riskScore: 32,
      riskLevel: 'MEDIUM',
      primaryIssue: isEn
        ? 'Automotive Margin Compression & Financing Receivables Extension'
        : 'Kompresi Margin Sektor Otomotif & Siklus Piutang Pembiayaan',
      metricBadge: 'Gross Margin: -2.8pp',
    },
  ];
}

/* --- Main HomeView Component --- */

export default function HomeView({
  onAnalyze,
  onGoToSearch,
}: {
  onAnalyze: (symbol: string) => void;
  onGoToSearch: () => void;
}) {
  const { language, t } = useLanguage();
  const features = getFeatures(language);
  const radarStocks = getRadarStocks(language);
  const [activeRadarFilter, setActiveRadarFilter] = useState<'ALL' | 'HIGH' | 'LOW'>('ALL');

  const filteredRadar = radarStocks.filter(stock => {
    if (activeRadarFilter === 'HIGH') return stock.riskScore >= 60;
    if (activeRadarFilter === 'LOW') return stock.riskScore < 60;
    return true;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 60px' }}>
      {/* Top Hero / Market Banner */}
      <section
        style={{
          borderRadius: '24px',
          padding: '36px 36px 40px',
          background: 'var(--hero-bg)',
          border: '1px solid var(--hero-border)',
          boxShadow: 'var(--hero-shadow)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '36px',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: 'absolute', top: '-60px', right: '-40px',
            width: '320px', height: '320px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(30px)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'var(--hero-pill-bg)', border: '1px solid var(--hero-pill-border)', color: 'var(--hero-pill-color)', fontSize: '13px', fontWeight: 700 }}>
              <Globe size={15} />
              <span>
                {language === 'en' ? 'Indonesia Stock Exchange • Market Sentinel Dashboard' : 'Bursa Efek Indonesia • Market Sentinel Dashboard'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              {language === 'en' ? 'Live Scanner Active (924 Listed Issuers)' : 'Live Scanner Aktif (924 Emiten Terindeks)'}
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '12px' }}>
              {language === 'en' ? 'IDX Stock Market Forensic Dashboard' : 'Dashboard Forensik Pasar Saham IDX'}
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '820px' }}>
              {language === 'en'
                ? 'Financial reporting integrity surveillance center for all listed companies. Track earnings vs cash divergence, aggressive accrual anomalies, and Beneish M-Score manipulation risks in a unified view.'
                : 'Pusat pemantauan integritas laporan keuangan seluruh emiten terdaftar. Lacak divergensi laba vs kas riil, anomali akrual agresif, dan deteksi risiko manipulasi Beneish M-Score dalam satu tampilan terpadu.'}
            </p>
          </div>

          {/* Quick CTA to Forensic Scanner */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', paddingTop: '8px' }}>
            <button
              onClick={onGoToSearch}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 24px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', border: 'none',
                fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <Search size={18} />
              <span>{language === 'en' ? 'Start New Stock Forensic Audit' : 'Mulai Audit Forensik Saham Baru'}</span>
              <ArrowRight size={16} />
            </button>

            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {language === 'en' ? 'Or select an issuer from the anomaly radar below:' : 'Atau pilih emiten dari radar anomali di bawah ini:'}
            </span>
          </div>
        </div>
      </section>

      {/* Key Market Forensics Metric Cards */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {/* Metric 1 */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                {language === 'en' ? 'Total Monitored Issuers' : 'Total Emiten Terpantau'}
              </span>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(99,102,241,0.12)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={18} />
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>924</div>
            <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} /> {language === 'en' ? 'Connected to Market API' : 'Terkoneksi API Pasar Modal'}
            </div>
          </div>

          {/* Metric 2 */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(239,68,68,0.25)', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>High Risk Alert</span>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(239,68,68,0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#f87171', marginBottom: '4px' }}>
              {language === 'en' ? '38 Issuers' : '38 Emiten'}
            </div>
            <div style={{ fontSize: '12px', color: '#fb923c', fontWeight: 600 }}>
              {language === 'en' ? 'OCF vs Earnings Divergence > 200%' : 'Divergensi OCF vs Laba > 200%'}
            </div>
          </div>

          {/* Metric 3 */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                {language === 'en' ? 'Average Beneish M-Score' : 'Beneish M-Score Rata-rata'}
              </span>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(16,185,129,0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} />
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#34d399', marginBottom: '4px' }}>-2.48</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
              {language === 'en' ? 'Safe Threshold: < -2.22' : 'Ambang Batas Aman: < -2.22'}
            </div>
          </div>

          {/* Metric 4 */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                {language === 'en' ? 'Median Sloan Accrual' : 'Median Sloan Accrual'}
              </span>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} />
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#a78bfa', marginBottom: '4px' }}>+0.054</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
              {language === 'en' ? 'Healthy Category (Threshold: 0.10)' : 'Kategori Sehat (Ambang: 0.10)'}
            </div>
          </div>
        </div>
      </section>

      {/* IDX Forensic Radar / Watchlist */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {language === 'en' ? 'IDX Forensic Radar (Monitored Issuers)' : 'IDX Forensic Radar (Emiten Terpantau)'}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {language === 'en'
                ? 'Preliminary quantitative forensic audit results across major and high-cap listed companies.'
                : 'Hasil audit awal algoritma forensik terhadap emiten populer dan berkapitalisasi besar.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-card)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setActiveRadarFilter('ALL')}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: activeRadarFilter === 'ALL' ? 'var(--accent-1)' : 'transparent',
                color: activeRadarFilter === 'ALL' ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {language === 'en' ? `All (${radarStocks.length})` : `Semua (${radarStocks.length})`}
            </button>
            <button
              onClick={() => setActiveRadarFilter('HIGH')}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: activeRadarFilter === 'HIGH' ? '#ef4444' : 'transparent',
                color: activeRadarFilter === 'HIGH' ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {language === 'en' ? 'High Alert (60+)' : 'Alert Tinggi (60+)'}
            </button>
            <button
              onClick={() => setActiveRadarFilter('LOW')}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: activeRadarFilter === 'LOW' ? '#10b981' : 'transparent',
                color: activeRadarFilter === 'LOW' ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {language === 'en' ? 'Safe Zone' : 'Zona Aman'}
            </button>
          </div>
        </div>

        {/* Radar Table / Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
          {filteredRadar.map((item) => {
            const isCritical = item.riskLevel === 'CRITICAL';
            const isHigh = item.riskLevel === 'HIGH';
            const isLow = item.riskLevel === 'LOW';

            const badgeBg = isCritical ? 'rgba(239,68,68,0.15)' : isHigh ? 'rgba(251,146,60,0.15)' : isLow ? 'rgba(16,185,129,0.15)' : 'rgba(251,191,36,0.15)';
            const badgeColor = isCritical ? '#ef4444' : isHigh ? '#f97316' : isLow ? '#10b981' : '#f59e0b';
            const badgeBorder = isCritical ? 'rgba(239,68,68,0.3)' : isHigh ? 'rgba(251,146,60,0.3)' : isLow ? 'rgba(16,185,129,0.3)' : 'rgba(251,191,36,0.3)';

            return (
              <div
                key={item.symbol}
                className="glass-card"
                style={{
                  padding: '20px', borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                          {item.symbol}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: 'var(--chip-bg)', color: 'var(--chip-color)', border: '1px solid var(--border-subtle)' }}>
                          {item.sector}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                        {item.name}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: '11px', fontWeight: 800,
                          padding: '3px 10px', borderRadius: '9999px',
                          background: badgeBg, color: badgeColor, border: `1px solid ${badgeBorder}`,
                        }}
                      >
                        {language === 'en' ? `Score: ${item.riskScore}` : `Skor: ${item.riskScore}`}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--card-inner-bg)', border: '1px solid var(--card-inner-border)', marginTop: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '3px' }}>
                      {language === 'en' ? 'DETECTOR FINDINGS' : 'TEMUAN DETEKTOR'}
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {item.primaryIssue}
                    </div>
                    <div style={{ marginTop: '6px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: `${badgeColor}20`, color: badgeColor }}>
                        {item.metricBadge}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onAnalyze(item.symbol)}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: 'var(--accent-1)', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent-1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))';
                    e.currentTarget.style.color = 'var(--accent-1)';
                  }}
                >
                  <Eye size={15} />
                  <span>{language === 'en' ? 'Full Forensic Investigation' : 'Investigasi Forensik Lengkap'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6 Forensic Detector Flip Cards */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {language === 'en' ? '6 Forensic Detection Modules' : '6 Modul Deteksi Forensik'}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              {language === 'en'
                ? 'Quantitative forensic algorithms deployed to evaluate and stress-test reporting integrity.'
                : 'Algoritma audit kuantitatif yang dioperasikan untuk memvalidasi integritas pembukuan emiten.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <FlipCard
              key={i}
              feature={f}
              onAnalyze={onGoToSearch}
              lang={language}
            />
          ))}
        </div>
      </section>

      {/* News & Corporate Actions */}
      <section>
        <NewsSection onAnalyze={onAnalyze} />
      </section>
    </div>
  );
}
