'use client';

import { useState, useEffect } from 'react';
import {
  Search, Scan, Activity, Layers, TrendingDown, BarChart2,
  DollarSign, Shield, Zap, Sparkles, AlertCircle, FileSearch,
  CheckCircle, ArrowRight, BookOpen, ChevronRight, Eye, RefreshCw,
  Sliders, Cpu, Play
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { useLanguage } from '@/context/LanguageContext';

interface ForensicSearchViewProps {
  onAnalyze: (symbol: string) => void;
  isLoading: boolean;
}

type DetectorCategory = 'all' | 'earnings' | 'cashflow' | 'balance' | 'ai';

interface DetectorInfo {
  id: string;
  name: string;
  category: DetectorCategory;
  formula: string;
  desc: string;
  sampleStock: string;
  sampleReason: string;
  threshold: string;
  color: string;
  gradient: string;
}

function getDetectors(lang: 'id' | 'en'): DetectorInfo[] {
  const isEn = lang === 'en';
  return [
    {
      id: 'ocf_divergence',
      name: 'Earnings vs OCF Mismatch',
      category: 'earnings',
      formula: 'Net Income − Operating Cash Flow (OCF)',
      desc: isEn
        ? 'Validates whether reported net income is backed by genuine operating cash inflows rather than artificial accounting revenue recognition.'
        : 'Memvalidasi apakah laba bersih yang dilaporkan benar-benar ditopang oleh kas masuk riil operasional, bukan sekadar pengakuan pendapatan akuntansi semu.',
      sampleStock: 'BUMI',
      sampleReason: isEn
        ? 'Reported net income remains elevated while operating cash flow is constrained by royalty obligations and working capital drag.'
        : 'Laba bersih dibukukan tinggi namun kas operasional tertekan beban royalti dan modal kerja.',
      threshold: 'OCF / Net Income < 0.8×',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.05) 100%)',
    },
    {
      id: 'sloan_accrual',
      name: 'Sloan Accrual Anomaly',
      category: 'earnings',
      formula: '(Net Income − OCF) / Average Total Assets',
      desc: isEn
        ? 'Measures the proportion of non-cash accrual earnings. Ratios above normal thresholds indicate potential profit inflation via aggressive receivables or deferred expenses.'
        : 'Mengukur proporsi komponen non-kas (akrual). Rasio di atas batas normal mencerminkan kemungkinan laba dipompa lewat penundaan biaya atau piutang agresif.',
      sampleStock: 'GOTO',
      sampleReason: isEn
        ? 'High proportion of non-cash accrual expenses and goodwill amortization impacts underlying cash earnings stability.'
        : 'Porsi beban akrual non-kas dan goodwill amortisasi mempengaruhi stabilitas laba riil.',
      threshold: 'Accrual Ratio > +0.10',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(109,40,217,0.05) 100%)',
    },
    {
      id: 'beneish_mscore',
      name: 'Beneish Manipulation Model',
      category: 'earnings',
      formula: 'DSRI + GMI + AQI + SGI + DEPI + SGAI + LVGI + TATA',
      desc: isEn
        ? '8-variable empirical econometric model designed to flag systematic accounting manipulation before financial restatements occur.'
        : 'Model matematis 8 variabel berbasis probabilitas empiris untuk mendeteksi kecurangan akuntansi sistematis sebelum rilis revisi laporan keuangan.',
      sampleStock: 'WSKT',
      sampleReason: isEn
        ? 'Sharp surge in construction receivables index (DSRI) and turnaround asset accrual drag.'
        : 'Peningkatan tajam indeks piutang konstruksi (DSRI) dan aset turn around akrual.',
      threshold: isEn ? 'M-Score > -2.22 (Red Flag Zone)' : 'M-Score > -2.22 (Zona Bahaya)',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(8,145,178,0.05) 100%)',
    },
    {
      id: 'cashflow_quality',
      name: 'Free Cash Flow Integrity',
      category: 'cashflow',
      formula: 'OCF − Capex vs Reported EBITDA',
      desc: isEn
        ? 'Evaluates genuine free cash flow after deducting capital expenditures (Capex) over 12 consecutive quarters to assess structural solvency.'
        : 'Mengevaluasi daya tahan kas bebas murni setelah dikurangi belanja modal riil (Capex) selama 12 kuartal berturut-turut untuk melihat solvabilitas jangka panjang.',
      sampleStock: 'TLKM',
      sampleReason: isEn
        ? 'Robust operating cash flow reliably finances fiber-optic and data center capital expenditures.'
        : 'Kas operasional kuat mendanai ekspansi belanja modal serat optik dan data center.',
      threshold: 'FCF / EBITDA < 0.35×',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(29,78,216,0.05) 100%)',
    },
    {
      id: 'margin_erosion',
      name: 'Margin & COGS Distortion',
      category: 'cashflow',
      formula: 'Δ Gross Margin % vs Δ Revenue % Trend',
      desc: isEn
        ? 'Detects hidden cost-of-goods-sold (COGS) distortions capitalized into inventory assets to artificially smooth operating margins.'
        : 'Mendeteksi pergeseran beban pokok penjualan (COGS) tersembunyi yang sengaja dikapitalisasi ke pos aset persediaan agar laba berjalan terlihat stabil.',
      sampleStock: 'ASII',
      sampleReason: isEn
        ? 'Pricing discount cycles and imported component costs compress automotive manufacturing margins.'
        : 'Siklus diskon harga dan beban komponen impor menekan margin manufaktur otomotif.',
      threshold: isEn ? 'Gross Margin Drop > 300 bps' : 'Gross Margin Turun > 300 bps',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.05) 100%)',
    },
    {
      id: 'leverage_velocity',
      name: 'Debt Buildup Velocity',
      category: 'balance',
      formula: 'Δ Total Debt / Δ Operating Assets YoY',
      desc: isEn
        ? 'Monitors the acceleration of interest-bearing debt. Debt growth outpacing productive assets by 2x sharply elevates refinancing default risks.'
        : 'Memantau kecepatan penarikan pinjaman berbunga (bank & obligasi). Jika pertumbuhan utang 2x lebih kencang dibanding aset produktif, risiko gagal bayar melonjak.',
      sampleStock: 'BREN',
      sampleReason: isEn
        ? 'Geothermal acquisition expansion supported by highly leveraged syndicated credit facilities.'
        : 'Ekspansi akuisisi aset geotermal menggunakan struktur pembiayaan sindikasi berdaya ungkit.',
      threshold: 'Debt Growth > 2.0× Asset Growth',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.05) 100%)',
    },
    {
      id: 'dso_bloat',
      name: 'Receivables & Inventory Drift',
      category: 'balance',
      formula: 'Days Sales Outstanding (DSO) & DSI Drift',
      desc: isEn
        ? 'Detects uncollected receivables accumulation or stagnant inventories withheld from write-offs to cosmetically flatter the balance sheet.'
        : 'Menemukan anomali penumpukan piutang belum tertagih atau persediaan mandek yang sengaja tidak dihapusbukukan (write-off) demi mempercantik neraca.',
      sampleStock: 'UNVR',
      sampleReason: isEn
        ? 'Distributor channel inventory adjustments and retail trade receivables turnover optimization.'
        : 'Penyesuaian stok saluran distributor dan optimalisasi perputaran piutang ritel.',
      threshold: isEn ? 'DSO Increase > +25 Days YoY' : 'DSO Meningkat > +25 Hari YoY',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(190,24,93,0.05) 100%)',
    },
    {
      id: 'ai_forensics',
      name: 'AI Forensic Investigator',
      category: 'ai',
      formula: 'Multi-Vector Pattern Synthesis & LLM Audit',
      desc: isEn
        ? 'Artificial intelligence cross-synthesizes all detector vectors, financial statement footnotes (CALK), related-party transactions, and independent audit opinions.'
        : 'Kecerdasan buatan menyintesis silang temuan seluruh detektor, catatan atas laporan keuangan (CALK), transaksi pihak berelasi, serta opini audit independen.',
      sampleStock: 'BBCA',
      sampleReason: isEn
        ? 'Verification of credit loss provisioning (CKPN) consistency and corporate governance integrity.'
        : 'Verifikasi konsistensi pencadangan provisi kredit (CKPN) dan integritas tata kelola.',
      threshold: 'AI Anomaly Confidence > 75%',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(126,34,206,0.05) 100%)',
    },
  ];
}

const PRESET_STOCKS = [
  { symbol: 'BBCA', label: 'BCA (Financials)', risk: 'Low', score: 16, color: '#10b981' },
  { symbol: 'BBRI', label: 'BRI (Financials)', risk: 'Low', score: 22, color: '#10b981' },
  { symbol: 'TLKM', label: 'Telkom (Telecom)', risk: 'Low', score: 28, color: '#10b981' },
  { symbol: 'ASII', label: 'Astra (Conglomerate)', risk: 'Medium', score: 32, color: '#fbbf24' },
  { symbol: 'BREN', label: 'Barito Renewables (Energy)', risk: 'Medium', score: 54, color: '#fbbf24' },
  { symbol: 'GOTO', label: 'GoTo (Tech)', risk: 'High', score: 68, color: '#fb923c' },
  { symbol: 'BUMI', label: 'Bumi Resources (Energy)', risk: 'Critical', score: 78, color: '#ef4444' },
  { symbol: 'UNVR', label: 'Unilever (Consumer)', risk: 'Low', score: 24, color: '#10b981' },
];

/* ─── Animated Micro Visualizer for each detector ───────────── */

function MicroVisualizer({ id, color }: { id: string; color: string }) {
  if (id === 'ocf_divergence') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '36px', padding: '4px 0' }}>
        <div className="wave-bar-1" style={{ width: '8px', height: '28px', background: '#ef4444', borderRadius: '3px 3px 0 0', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
        <div className="wave-bar-2" style={{ width: '8px', height: '12px', background: '#38bdf8', borderRadius: '3px 3px 0 0' }} />
        <div className="wave-bar-3" style={{ width: '8px', height: '32px', background: '#ef4444', borderRadius: '3px 3px 0 0', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
        <div className="wave-bar-4" style={{ width: '8px', height: '10px', background: '#38bdf8', borderRadius: '3px 3px 0 0' }} />
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#ef4444' }}>GAP: 3.2×</span>
          <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Laba vs Kas</span>
        </div>
      </div>
    );
  }

  if (id === 'sloan_accrual') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
        <div style={{ position: 'relative', width: '70px', height: '24px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '0', width: '65%', height: '100%', background: '#8b5cf6', borderRadius: '2px' }} />
            <div className="pulse-pivot" style={{ position: 'absolute', left: '65%', top: '-5px', width: '14px', height: '14px', borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 10px #8b5cf6' }} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa' }}>+0.18</span>
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>Max: 0.10</span>
        </div>
      </div>
    );
  }

  if (id === 'beneish_mscore') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
        <div style={{ position: 'relative', width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div className="radar-sweep" style={{ position: 'absolute', inset: 0, background: 'conic-gradient(from 0deg, transparent 70%, rgba(6,182,212,0.6) 100%)', borderRadius: '50%' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 6px #06b6d4', zIndex: 1 }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#22d3ee' }}>M: -1.84</span>
          <span style={{ fontSize: '9px', color: '#f87171', display: 'block', fontWeight: 700 }}>⚠️ MANIPULATION</span>
        </div>
      </div>
    );
  }

  if (id === 'cashflow_quality') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flex: 1, marginRight: '10px' }}>
          {[60, 80, 45, 90, 75].map((val, idx) => (
            <div key={idx} style={{ flex: 1, height: '22px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
              <div className="flow-bar" style={{ width: '100%', height: `${val}%`, background: '#3b82f6', opacity: 0.8 + idx * 0.05 }} />
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#60a5fa' }}>12Q Stream</span>
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>FCF Buffer</span>
        </div>
      </div>
    );
  }

  if (id === 'margin_erosion') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
        <svg width="74" height="26" viewBox="0 0 74 26" style={{ overflow: 'visible' }}>
          <path d="M 0 5 Q 20 6, 35 15 T 70 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="70" cy="24" r="3" fill="#ef4444" />
        </svg>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#f87171' }}>-14.6%</span>
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>Gross Drop</span>
        </div>
      </div>
    );
  }

  if (id === 'leverage_velocity') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="speed-needle" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid rgba(245,158,11,0.4)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: '2px', height: '11px', background: '#f59e0b', top: '3px', transformOrigin: 'bottom center', transform: 'rotate(45deg)' }} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24' }}>+127% YoY</span>
        </div>
        <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontWeight: 700 }}>
          VELOCITY HIGH
        </span>
      </div>
    );
  }

  if (id === 'dso_bloat') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#ec4899', boxShadow: '0 0 6px #ec4899' }} />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>DSO Drift:</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '12px', fontWeight: 900, color: '#f472b6' }}>45d → 92d</span>
          <span style={{ fontSize: '9px', color: '#f87171', display: 'block' }}>Lagging Cash</span>
        </div>
      </div>
    );
  }

  // AI Investigator
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div className="ai-gemini-sparkle" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 8px #a855f7' }} />
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e879f9' }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#818cf8', boxShadow: '0 0 10px #6366f1' }} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#e879f9' }}>Multi-Vector LLM</span>
      </div>
      <div className="ai-active-pill" style={{ padding: '2px 8px', borderRadius: '9999px', background: 'rgba(168,85,247,0.18)', border: '1px solid rgba(168,85,247,0.4)', fontSize: '10px', fontWeight: 800, color: '#d8b4fe' }}>
        99.4% CONFIDENCE
      </div>
    </div>
  );
}

export default function ForensicSearchView({
  onAnalyze,
  isLoading,
}: ForensicSearchViewProps) {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const detectors = getDetectors(language);

  const [activeCategory, setActiveCategory] = useState<DetectorCategory>('all');
  const [selectedDetector, setSelectedDetector] = useState<DetectorInfo | null>(null);
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  const filteredDetectors = detectors.filter(d => {
    if (activeCategory === 'all') return true;
    return d.category === activeCategory;
  });

  const filterTabs = isEn
    ? [
        { id: 'all', label: 'All (8)' },
        { id: 'earnings', label: 'Earnings & Accruals (3)' },
        { id: 'cashflow', label: 'Cash Flow (2)' },
        { id: 'balance', label: 'Debt & Balance (2)' },
        { id: 'ai', label: 'AI LLM (1)' },
      ]
    : [
        { id: 'all', label: 'Semua (8)' },
        { id: 'earnings', label: 'Laba & Akrual (3)' },
        { id: 'cashflow', label: 'Arus Kas (2)' },
        { id: 'balance', label: 'Utang & Neraca (2)' },
        { id: 'ai', label: 'AI LLM (1)' },
      ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '10px 24px 80px', position: 'relative' }}>
      {/* ── Custom Keyframes & Dynamic Styles ── */}
      <style>{`
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatPill {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes waveOscillate1 {
          0%, 100% { height: 16px; }
          50% { height: 32px; }
        }
        @keyframes waveOscillate2 {
          0%, 100% { height: 26px; }
          50% { height: 10px; }
        }
        @keyframes pulseGlowRing {
          0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.6); }
          70% { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
        @keyframes shimmerBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spectrumLaser {
          0% { left: 4%; }
          50% { left: 88%; }
          100% { left: 4%; }
        }

        .radar-sweep {
          animation: radarSweep 2.2s linear infinite;
        }
        .wave-bar-1 { animation: waveOscillate1 1.4s ease-in-out infinite; }
        .wave-bar-2 { animation: waveOscillate2 1.8s ease-in-out infinite; }
        .wave-bar-3 { animation: waveOscillate1 1.6s ease-in-out infinite 0.2s; }
        .wave-bar-4 { animation: waveOscillate2 1.5s ease-in-out infinite 0.3s; }
        
        .detector-card {
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .detector-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), 0 0 24px var(--card-glow);
          border-color: var(--card-border) !important;
        }
        .detector-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .detector-card:hover::after {
          opacity: 1;
          animation: shimmerBorder 2s ease infinite;
        }
      `}</style>

      {/* Floating ambient glow effects in background */}
      <div
        style={{
          position: 'absolute', top: '-60px', left: '15%',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          pointerEvents: 'none', filter: 'blur(50px)', zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute', top: '180px', right: '5%',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)',
          pointerEvents: 'none', filter: 'blur(60px)', zIndex: 0
        }}
      />

      {/* ── Top Header with Futuristic Aura ── */}
      <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 20px', borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(236,72,153,0.2))',
            border: '1px solid rgba(99,102,241,0.4)',
            fontSize: '13px', fontWeight: 800, color: '#c7d2fe',
            marginBottom: '18px',
            boxShadow: '0 0 24px rgba(99,102,241,0.3)',
            animation: 'floatPill 4s ease-in-out infinite',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
          <span>{isEn ? '8 REALTIME DETECTORS ACTIVE • IDX ENGINE' : '8 DETEKTOR REALTIME AKTIF • IDX ENGINE'}</span>
          <Sparkles size={15} style={{ color: '#f472b6' }} />
        </div>

        <h1
          style={{
            fontSize: 'clamp(30px, 4.5vw, 48px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '14px',
            lineHeight: 1.15,
          }}
        >
          {isEn ? (
            <>
              Forensic Analysis &{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Issuer Scanner
              </span>
            </>
          ) : (
            <>
              Analisis Forensik &{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Scanner Emiten
              </span>
            </>
          )}
        </h1>

        <p
          style={{
            fontSize: '16.5px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            margin: '0 auto',
          }}
        >
          {isEn
            ? 'Enter any IDX stock ticker to run a 12-quarter forensic audit reconstruction, inspecting Sloan accruals, operating cash flow divergence, and Beneish M-Score manipulation risk.'
            : 'Masukkan kode saham untuk menjalankan rekonstruksi 12 kuartal, menguji anomali akrual Sloan, divergensi arus kas operasional, dan formula probabilitas manipulasi laba Beneish M-Score.'}
        </p>
      </div>

      {/* ── Search Bar Section ── */}
      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto 36px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: '28px',
            borderRadius: '24px',
            border: '1px solid var(--control-border)',
            boxShadow: 'var(--hero-shadow)',
            background: 'var(--control-bg)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <SearchBar onAnalyze={onAnalyze} isLoading={isLoading} />

          {/* Quick pick chips with risk indicators */}
          <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} style={{ color: '#fbbf24' }} /> {isEn ? 'Tested Benchmark Stocks:' : 'Preset Emiten Teruji:'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {isEn ? 'Click any ticker for an instant audit' : 'Klik ticker untuk langsung audit instan'}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              {PRESET_STOCKS.map((s) => (
                <button
                  key={s.symbol}
                  onClick={() => onAnalyze(s.symbol)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '7px 14px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${s.color}18`;
                    e.currentTarget.style.borderColor = s.color;
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
                    e.currentTarget.style.boxShadow = `0 6px 18px ${s.color}35`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ color: s.color, fontWeight: 900 }}>{s.symbol}</span>
                  <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '4px', background: `${s.color}25`, color: s.color, fontWeight: 800 }}>
                    {s.score}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 8 Detektor Pipeline Section ── */}
      <div style={{ marginTop: '54px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '22px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
                {isEn ? '8 Active Forensic Detection Algorithms' : '8 Algoritma Detektor Forensik Aktif'}
              </h2>
              <span style={{ display: 'inline-flex', width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              {isEn
                ? 'Executed in parallel to scan bookkeeping anomalies, cash generation, and balance sheet distortions.'
                : 'Dioperasikan secara paralel menyisir anomali pembukuan, perputaran kas, dan rekayasa neraca.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as DetectorCategory)}
                style={{
                  padding: '6px 14px', borderRadius: '8px',
                  fontSize: '12.5px', fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  background: activeCategory === tab.id ? 'var(--accent-1)' : 'transparent',
                  color: activeCategory === tab.id ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === tab.id ? '0 4px 14px rgba(99,102,241,0.4)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Detector Cards Grid with Rich Animations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredDetectors.map((detector, i) => {
            return (
              <div
                key={detector.id}
                className="detector-card glass-card"
                onClick={() => setSelectedDetector(detector)}
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  cursor: 'pointer',
                  // CSS variables for hover effects
                  ['--card-glow' as string]: `${detector.color}35`,
                  ['--card-border' as string]: `${detector.color}80`,
                }}
              >
                <div>
                  {/* Top Bar with Module Number & Pulse Status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: 42, height: 42, borderRadius: '12px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: `${detector.color}15`, color: detector.color,
                          border: `1px solid ${detector.color}40`,
                          boxShadow: `0 0 16px ${detector.color}25`,
                          flexShrink: 0,
                        }}
                      >
                        {detector.id === 'beneish_mscore' ? (
                          <Shield size={22} />
                        ) : detector.id === 'ai_forensics' ? (
                          <Cpu size={22} />
                        ) : (
                          <Activity size={22} />
                        )}
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                          {isEn ? 'MODULE' : 'MODUL'} 0{i + 1}
                        </span>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>
                          {detector.name}
                        </h3>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#34d399' }}>LIVE</span>
                    </div>
                  </div>

                  {/* Formula Tag with animated glow */}
                  <div
                    style={{
                      fontSize: '11px', fontFamily: 'monospace',
                      color: detector.color,
                      background: `${detector.color}10`,
                      padding: '5px 10px', borderRadius: '7px',
                      marginBottom: '14px',
                      border: `1px solid ${detector.color}25`,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      fontWeight: 600,
                    }}
                  >
                    {detector.formula}
                  </div>

                  {/* Animated Visualizer Box */}
                  <div
                    style={{
                      background: 'rgba(0,0,0,0.35)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      marginBottom: '14px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <MicroVisualizer id={detector.id} color={detector.color} />
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>
                    {detector.desc}
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <CheckCircle size={13} style={{ color: '#10b981' }} />
                    <span>{isEn ? 'Threshold' : 'Ambang'}: {detector.threshold}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 700, color: detector.color }}>
                    <span>{isEn ? 'Details' : 'Detail'}</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Standar Penilaian Skor Risiko Forensik dengan Spectrum Meter ── */}
      <div
        className="glass-card"
        style={{
          marginTop: '48px',
          padding: '28px 32px',
          borderRadius: '24px',
          background: 'var(--control-bg)',
          border: '1px solid var(--control-border)',
          boxShadow: 'var(--hero-shadow)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                {isEn
                  ? 'Forensic Risk Score Spectrum Standard (Score 0 – 100)'
                  : 'Spektrum Standar Penilaian Skor Risiko Forensik (Skor 0 – 100)'}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {isEn
                  ? 'IDX normalization algorithm aggregates weighted scores across 8 independent detectors.'
                  : 'Algoritma normalisasi IDX menghitung agregasi bobot dari 8 detektor independen.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <Sliders size={14} />
            <span>Interactive Risk Gauge</span>
          </div>
        </div>

        {/* ── Interactive Spectrum Bar with Animated Laser Needle ── */}
        <div style={{ marginBottom: '26px' }}>
          <div
            style={{
              height: '14px',
              borderRadius: '9999px',
              background: 'linear-gradient(90deg, #10b981 0%, #22c55e 30%, #fbbf24 55%, #f97316 75%, #ef4444 100%)',
              position: 'relative',
              boxShadow: '0 0 16px rgba(99,102,241,0.25)',
              overflow: 'visible',
            }}
          >
            {/* Animated Laser Scanning Marker */}
            <div
              className="spectrum-marker"
              style={{
                position: 'absolute',
                top: '-5px',
                left: hoveredScore !== null ? `${hoveredScore}%` : '42%',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '3px solid #6366f1',
                boxShadow: '0 0 16px #6366f1, 0 0 30px #ffffff',
                transform: 'translateX(-50%)',
                transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 3,
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
            </div>
          </div>

          {/* Scale labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>
            <span style={{ color: '#10b981' }}>{isEn ? '0 (Very Healthy)' : '0 (Sangat Sehat)'}</span>
            <span style={{ color: '#34d399' }}>{isEn ? '30 (Safe Bound)' : '30 (Batas Hijau)'}</span>
            <span style={{ color: '#fbbf24' }}>{isEn ? '60 (Watchlist Alert)' : '60 (Batas Waspada)'}</span>
            <span style={{ color: '#ef4444' }}>{isEn ? '100 (Critical / Red Flag)' : '100 (Kritis / Red Flag)'}</span>
          </div>
        </div>

        {/* ── 3 Neon Risk Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Low Risk */}
          <div
            onMouseEnter={() => setHoveredScore(18)}
            onMouseLeave={() => setHoveredScore(null)}
            style={{
              padding: '16px 20px', borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.03) 100%)',
              border: '1px solid rgba(16,185,129,0.3)',
              boxShadow: '0 8px 24px rgba(16,185,129,0.12)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#34d399' }}>
                {isEn ? '0 – 30 • LOW RISK' : '0 – 30 • RISIKO RENDAH'}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
                {isEn ? 'Safe Zone' : 'Zona Aman'}
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {isEn
                ? 'High earnings quality and transparency. Operating cash flows match or exceed reported net income.'
                : 'Kualitas laba tinggi dan transparan. Arus kas operasi sejalan atau melampaui laba bersih yang dibukukan.'}
            </p>
            <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
              {isEn ? 'Sample Stocks: ' : 'Contoh Emiten: '}
              <strong style={{ color: 'var(--text-primary)' }}>BBCA (16), TLKM (28)</strong>
            </div>
          </div>

          {/* Medium Risk */}
          <div
            onMouseEnter={() => setHoveredScore(48)}
            onMouseLeave={() => setHoveredScore(null)}
            style={{
              padding: '16px 20px', borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.03) 100%)',
              border: '1px solid rgba(251,191,36,0.3)',
              boxShadow: '0 8px 24px rgba(251,191,36,0.12)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24' }}>
                {isEn ? '31 – 60 • MEDIUM RISK' : '31 – 60 • RISIKO SEDANG'}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(251,191,36,0.2)', color: '#fbbf24' }}>
                {isEn ? 'Watchlist' : 'Perlu Pantauan'}
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {isEn
                ? 'Minor cash flow divergence, rising leverage, or margin compression requiring management clarification.'
                : 'Terdapat deviasi kas minor, peningkatan rasio utang, atau kompresi margin yang memerlukan klarifikasi manajemen.'}
            </p>
            <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
              {isEn ? 'Sample Stocks: ' : 'Contoh Emiten: '}
              <strong style={{ color: 'var(--text-primary)' }}>ASII (32), BREN (54)</strong>
            </div>
          </div>

          {/* Critical Risk */}
          <div
            onMouseEnter={() => setHoveredScore(82)}
            onMouseLeave={() => setHoveredScore(null)}
            style={{
              padding: '16px 20px', borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(239,68,68,0.14) 0%, rgba(239,68,68,0.03) 100%)',
              border: '1px solid rgba(239,68,68,0.35)',
              boxShadow: '0 8px 24px rgba(239,68,68,0.15)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#f87171' }}>
                {isEn ? '61 – 100 • HIGH RISK' : '61 – 100 • RISIKO TINGGI'}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(239,68,68,0.2)', color: '#f87171' }}>
                {isEn ? 'Red Flag Alert' : 'Waspada Red Flag'}
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {isEn
                ? 'Sharp multi-quarter earnings vs cash divergence, Beneish M-Score in manipulation zone, or extreme debt velocity.'
                : 'Divergensi tajam laba vs kas riil berturut-turut, skor Beneish M-Score masuk zona manipulasi, atau lonjakan utang ekstrim.'}
            </p>
            <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
              {isEn ? 'Sample Stocks: ' : 'Contoh Emiten: '}
              <strong style={{ color: 'var(--text-primary)' }}>GOTO (68), BUMI (78)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Modal for Clicked Detector ── */}
      {selectedDetector && (
        <div
          onClick={() => setSelectedDetector(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{
              maxWidth: '560px', width: '100%',
              borderRadius: '24px',
              padding: '32px',
              border: `1px solid ${selectedDetector.color}60`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.25), 0 0 40px ${selectedDetector.color}20`,
              background: 'var(--bg-card)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px', background: `${selectedDetector.color}20`, color: selectedDetector.color, border: `1px solid ${selectedDetector.color}40` }}>
                  {isEn ? 'INTEGRATED FORENSIC DETECTOR' : 'DETEKTOR FORENSIK TERPADU'}
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '8px', marginBottom: '4px' }}>
                  {selectedDetector.name}
                </h3>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: selectedDetector.color, fontWeight: 700 }}>
                  Formula: {selectedDetector.formula}
                </div>
              </div>

              <button
                onClick={() => setSelectedDetector(null)}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '18px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {isEn ? 'Audit Detection Mechanism:' : 'Mekanisme Deteksi Audit:'}
              </h4>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                {selectedDetector.desc}
              </p>
            </div>

            <div style={{ padding: '16px', borderRadius: '14px', background: `${selectedDetector.color}10`, border: `1px solid ${selectedDetector.color}30`, marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: selectedDetector.color }}>
                  {isEn ? 'SAMPLE ISSUER CASE: ' : 'CONTOH KASUS EMITEN: '}
                  {selectedDetector.sampleStock}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {isEn ? 'Threshold' : 'Ambang'}: {selectedDetector.threshold}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {selectedDetector.sampleReason}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  const sym = selectedDetector.sampleStock;
                  setSelectedDetector(null);
                  onAnalyze(sym);
                }}
                className="btn-primary"
                style={{
                  flex: 1, padding: '12px', borderRadius: '12px',
                  background: `linear-gradient(135deg, ${selectedDetector.color}, #6366f1)`,
                  boxShadow: `0 8px 24px ${selectedDetector.color}40`,
                  fontSize: '14px', fontWeight: 800, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                <Play size={16} />
                <span>
                  {isEn
                    ? `Run Direct Audit (${selectedDetector.sampleStock})`
                    : `Uji Audit Langsung (${selectedDetector.sampleStock})`}
                </span>
              </button>
              <button
                onClick={() => setSelectedDetector(null)}
                style={{
                  padding: '12px 20px', borderRadius: '12px',
                  background: 'transparent', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isEn ? 'Close' : 'Tutup'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
