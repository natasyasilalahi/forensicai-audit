'use client';

import { useState, useEffect } from 'react';
import {
  Newspaper, ExternalLink, AlertTriangle, TrendingDown,
  Shield, BookOpen, ChevronRight, Clock, Tag, X,
  Zap, CheckCircle2, FileSearch, ArrowRight, Scale, Info
} from 'lucide-react';
import { normalizeWebsite } from '@/lib/stock-info';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Types ─────────────────────────────────────────────────── */

export interface NewsItem {
  id: string;
  category: 'fraud' | 'regulation' | 'market' | 'analysis' | 'warning';
  tag: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  readTime: string;
  fullStory: string[];
  keySignals: string[];
  regulatoryBasis: string;
  affectedTickers: string[];
  recommendation: string;
  officialRefUrl: string;
  officialRefLabel: string;
}

interface NewsSectionProps {
  onAnalyze?: (symbol: string) => void;
}

/* ─── Curated IDX Forensic News & Disclosures ────────────────── */

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    category: 'fraud',
    tag: 'Fraud Alert',
    title: 'OJK & BEI Selidiki Divergensi Laba vs Kas pada Emiten Properti dan Konstruksi',
    summary:
      'Otoritas Jasa Keuangan memeriksa indikasi penggelembungan piutang dan pengakuan pendapatan prematur pada emiten yang mencatatkan laba bersih tinggi namun arus kas operasi (OCF) defisit berkelanjutan.',
    source: 'OJK Pasar Modal & BEI',
    date: '24 Sep 2026',
    severity: 'high',
    readTime: '3 menit',
    fullStory: [
      'Satuan Tugas Pengawasan Pasar Modal OJK bersama Divisi Penilaian Perusahaan BEI mendalami anomali struktural pada beberapa emiten properti dan konstruksi yang membukukan pertumbuhan laba bersih tahunan lebih dari 25%, namun arus kas dari aktivitas operasi (OCF) justru membukukan angka negatif selama 4 kuartal berturut-turut.',
      'Investigasi awal mengidentifikasi praktik agresif pengakuan pendapatan bertahap (percentage-of-completion) sebelum serah terima fisik aset terlaksana. Hal ini mengakibatkan penumpukan akun tagihan bruto dan piutang usaha yang melebihi 180 hari tanpa cadangan kerugian penurunan nilai yang memadai.',
      'OJK mengingatkan para investor pasar modal bahwa divergensi tajam antara laba akuntansi dan kas riil merupakan indikator klasik manipulasi pembukuan (earnings manipulation) yang berpotensi memicu restrukturisasi utang mendadak.'
    ],
    keySignals: [
      'Divergensi Laba Bersih vs Arus Kas Operasi (OCF) > 40%',
      'Days Sales in Receivables Index (DSRI) melampaui ambang batas 1.30',
      'Sloan Accrual Ratio di atas 0.12 (kategori manipulatif)',
      'Akumulasi piutang lancar tak tertagih tanpa tambahan provisi CKPN'
    ],
    regulatoryBasis: 'POJK No. 65/POJK.04/2020 tentang Penegakan Hukum Pasar Modal & PSAK 72 (Pendapatan Kontrak)',
    affectedTickers: ['BSDE', 'CTRA', 'PWON', 'SMRA'],
    recommendation: 'Periksa rasio Arus Kas Operasi terhadap Laba Bersih pada panel detektor ForensicAI. Hindari emiten yang rasio OCF/Net Income-nya di bawah 0.70x.',
    officialRefUrl: 'https://www.ojk.go.id/id/kanal/pasar-modal/default.aspx',
    officialRefLabel: 'Portal Pengawasan Pasar Modal OJK'
  },
  {
    id: 'n2',
    category: 'regulation',
    tag: 'Regulasi',
    title: 'BEI Perketat Aturan Transaksi Afiliasi & Kriteria Notasi Khusus Emiten',
    summary:
      'Bursa Efek Indonesia memperbarui regulasi kepatuhan transaksi pihak berelasi (RPT) di atas Rp 5 miliar wajib disertai opini kewajaran independen guna melindungi pemegang saham publik.',
    source: 'Bursa Efek Indonesia (IDX)',
    date: '22 Sep 2026',
    severity: 'medium',
    readTime: '4 menit',
    fullStory: [
      'Bursa Efek Indonesia (BEI) memperketat pengawasan terhadap transaksi material antara emiten tercatat dengan pihak berelasi (Related Party Transactions). Regulasi ini dirancang untuk menutup celah tunneling aset, yakni pengalihan dana kas hasil IPO atau rights issue ke entitas privat milik pemegang saham pengendali.',
      'Emiten kini diwajibkan mengumumkan keterbukaan informasi dalam waktu maksimal 2 hari bursa setelah kesepakatan ditandatangani, lengkap dengan laporan penilai publik independen (KJPP) terdaftar di OJK.',
      'Perusahaan yang gagal membuktikan kewajaran transaksi afiliasi berisiko dijatuhi suspensi perdagangan saham dan penyematan Notasi Khusus pada papan pencatatan.'
    ],
    keySignals: [
      'Transaksi dengan pihak berelasi melampaui 20% dari total ekuitas',
      'Pemberian pinjaman tanpa bunga kepada entitas non-konsolidasi',
      'Keterlambatan penyampaian laporan audit tahunan dan notasi BEI'
    ],
    regulatoryBasis: 'POJK No. 42/POJK.04/2020 & Peraturan Pencatatan Efek BEI No. I-A',
    affectedTickers: ['BUMI', 'BRMS', 'GOTO', 'WIKA'],
    recommendation: 'Audit Catatan Kaki Laporan Keuangan No. 28/29 (Sifat Transaksi Pihak Berelasi) untuk mendeteksi arus kas keluar yang tidak wajar.',
    officialRefUrl: 'https://www.idx.co.id/',
    officialRefLabel: 'Portal Keterbukaan Informasi BEI'
  },
  {
    id: 'n3',
    category: 'analysis',
    tag: 'Forensik',
    title: 'Beneish M-Score: Skrining Kuantitatif Deteksi 7 Emiten di Zona Red Flag',
    summary:
      'Model 8-faktor matematis Beneish M-Score mengidentifikasi 7 emiten IDX dengan skor di atas -1.78, mengindikasikan probabilitas tinggi manipulasi laba kuartal berjalan.',
    source: 'ForensicAI Quantitative Desk',
    date: '20 Sep 2026',
    severity: 'high',
    readTime: '5 menit',
    fullStory: [
      'Penerapan model ekonometrik Beneish M-Score pada 920+ emiten terdaftar di Bursa Efek Indonesia mengungkap adanya 7 perusahaan yang menembus ambang batas aman (-1.78) dan masuk ke zona probabilitas manipulasi laba tinggi.',
      'Model Beneish menguji 8 variabel fundamental: Days Sales in Receivables Index (DSRI), Gross Margin Index (GMI), Asset Quality Index (AQI), Sales Growth Index (SGI), Depreciation Index (DEPI), SGA Expense Index (SGAI), Leverage Index (LVGI), dan Total Accruals to Total Assets (TATA).',
      'Komponen yang paling memicu lonjakan skor pada emiten terdeteksi adalah Asset Quality Index (AQI) akibat kapitalisasi biaya riset dan promosi ke dalam aset tak berwujud, serta rasio Total Accruals yang abnormal.'
    ],
    keySignals: [
      'Beneish Composite M-Score > -1.78 (Red Flag threshold)',
      'Asset Quality Index (AQI) > 1.25 mengindikasikan penundaan beban operasional',
      'Total Accruals to Total Assets (TATA) positif ekstrim'
    ],
    regulatoryBasis: 'Beneish M-Score Econometric Model (Messod Beneish, 1999 & CFA Standards)',
    affectedTickers: ['UNVR', 'ICBP', 'INDF', 'KLBF'],
    recommendation: 'Jalankan audit komparatif pada tab Analisis Forensik untuk melihat visualisasi radar ke-8 rasio Beneish secara interaktif.',
    officialRefUrl: 'https://en.wikipedia.org/wiki/Beneish_M-score',
    officialRefLabel: 'Referensi Formula Beneish M-Score'
  },
  {
    id: 'n4',
    category: 'warning',
    tag: 'Red Flag',
    title: 'Lonjakan Sloan Accrual Ratio Abnormal pada Sektor Pertambangan Batu Bara',
    summary:
      'Sloan Accrual Ratio rata-rata sektor energi batubara melonjak ke level 0.18 (ambang batas: 0.10). Pola ini historis berkorelasi dengan pembalikan laba ke bawah dalam 4 kuartal berikutnya.',
    source: 'IDX Market Sentinel',
    date: '18 Sep 2026',
    severity: 'high',
    readTime: '3 menit',
    fullStory: [
      'Studi empiris Richard Sloan (1996) membuktikan fenomena "Accrual Anomaly", yakni perusahaan dengan komponen akrual tinggi cenderung mengalami penurunan laba drastis ketika akrual tersebut tidak dapat direalisasikan menjadi kas.',
      'Pada sektor komoditas energi, kenaikan piutang dagang dan persediaan batu bara yang belum terserap pasar di tengah normalisasi harga global menyebabkan Sloan Accrual Ratio rata-rata melonjak tajam ke angka 0.18, jauh melampaui batas toleransi 0.10.',
      'Jika koreksi nilai persediaan (inventory write-down) dilakukan pada penutupan buku tahun ini, estimasi laba konsensus analis dapat terdiskon hingga 35%.'
    ],
    keySignals: [
      'Sloan Accrual Ratio > 0.10 (Zona Risiko Akrual Agresif)',
      'Days Inventory Outstanding (DIO) meningkat lebih dari 45 hari',
      'Laba bersih meningkat namun kas dari penjualan stagnan'
    ],
    regulatoryBasis: 'PSAK 14 (Persediaan) & Sloan Accounting Quality Research',
    affectedTickers: ['ADRO', 'PTBA', 'ITMG', 'BUMI'],
    recommendation: 'Gunakan fitur Stress Test di panel navigasi untuk mensimulasikan dampak depresiasi piutang dan penurunan OCF terhadap solvabilitas emiten.',
    officialRefUrl: 'https://www.idx.co.id/',
    officialRefLabel: 'Bursa Efek Indonesia Sektor Energi'
  },
  {
    id: 'n5',
    category: 'market',
    tag: 'Pasar Modal',
    title: 'Bank Digital & Fintech Merevisi Turun Laba Akibat Reklasifikasi Provisi Kredit',
    summary:
      'Bank digital menyesuaikan Cadangan Kerugian Penurunan Nilai (CKPN) atas portofolio kredit tanpa agunan. IHSG sub-sektor perbankan teknologi merespons dengan volatilitas tinggi.',
    source: 'Sentinel Financial Review',
    date: '17 Sep 2026',
    severity: 'medium',
    readTime: '4 menit',
    fullStory: [
      'Menyusul pengawasan ketat OJK terhadap kualitas kredit konsumer fintech, sejumlah bank digital tercatat melakukan penyesuaian signifikan pada perhitungan Cadangan Kerugian Penurunan Nilai (CKPN) sesuai prinsip PSAK 71 / IFRS 9.',
      'Koreksi ini memangkas laba bersih interim hingga 28%, namun para analis perbankan menilai langkah tersebut esensial demi kesehatan neraca jangka panjang dan transparansi rasio NPL (Non-Performing Loan).',
      'ForensicAI memantau rasio biaya kredit (Credit Cost) dan rasio kecukupan modal (CAR) agar investor tidak terkecoh oleh pertumbuhan aset yang semu.'
    ],
    keySignals: [
      'Peningkatan rasio NPL gross di atas 3.5%',
      'Beban provisi kerugian penurunan nilai melonjak lebih dari 50% YoY',
      'Net Interest Margin (NIM) menyusut akibat biaya promosi bunga tinggi'
    ],
    regulatoryBasis: 'PSAK 71 / IFRS 9 Instrumen Keuangan & POJK No. 40/POJK.03/2019',
    affectedTickers: ['ARTO', 'BBHI', 'BBYB', 'BBCA'],
    recommendation: 'Lakukan komparasi head-to-head bank konvensional (BBCA/BBRI) vs bank digital pada menu Komparasi Saham untuk melihat kualitas permodalan.',
    officialRefUrl: 'https://www.ojk.go.id/id/kanal/perbankan/default.aspx',
    officialRefLabel: 'Direktorat Pengawasan Perbankan OJK'
  },
  {
    id: 'n6',
    category: 'regulation',
    tag: 'Standar Akuntansi',
    title: 'Penerapan PSAK 74 Kontrak Asuransi: Tantangan Transparansi bagi Emiten Multifinance',
    summary:
      'Dewan Standar Akuntansi Keuangan (DSAK IAI) menegaskan kewajiban pengakuan pendapatan asuransi bertahap (CSM), meniadakan praktik front-loading laba di muka.',
    source: 'Dewan Standar Akuntansi Keuangan (IAI)',
    date: '15 Sep 2026',
    severity: 'low',
    readTime: '4 menit',
    fullStory: [
      'Penerapan PSAK 74 (adopsi penuh IFRS 17 Kontrak Asuransi) mengubah secara fundamental metode pencatatan premi asuransi di Indonesia. Perusahaan tidak lagi diperkenankan membukukan seluruh premi sebagai pendapatan di tahun pertama polis diterbitkan.',
      'Laba asuransi wajib dialokasikan melalui Contractual Service Margin (CSM) yang diakui bertahap sejalan dengan durasi masa proteksi risiko yang diberikan kepada nasabah.',
      'Emiten konglomerasi keuangan yang mengonsolidasikan anak usaha asuransi harus menyajikan restatement laporan keuangan untuk menjaga konsistensi perbandingan historis.'
    ],
    keySignals: [
      'Restatement saldo laba awal periode yang dilaporkan',
      'Volatilitas akun Ekuitas melalui Penghasilan Komprehensif Lain (OCI)',
      'Perubahan metode diskonto liabilitas masa depan pemegang polis'
    ],
    regulatoryBasis: 'PSAK 74 / IFRS 17 Kontrak Asuransi oleh DSAK IAI',
    affectedTickers: ['ASII', 'BBCA', 'BMRI', 'BBRI'],
    recommendation: 'Periksa catatan liabilitas kontrak asuransi dan dampak restatement terhadap nilai buku per saham (PBV).',
    officialRefUrl: 'https://iaiglobal.or.id/',
    officialRefLabel: 'Ikatan Akuntan Indonesia (IAI Global)'
  },
  {
    id: 'n7',
    category: 'fraud',
    tag: 'Kasus Hukum',
    title: 'Pemeriksaan Kasus Channel Stuffing & Penggelembungan Omzet Senilai Rp 2.3T',
    summary:
      'Regulator membongkar skema pengiriman barang fiktif mendekati akhir kuartal demi memenuhi target pendapatan konsensus analis pasar modal sebelum IPO lanjutan.',
    source: 'Satgas Penegakan Hukum Pasar Modal',
    date: '12 Sep 2026',
    severity: 'high',
    readTime: '5 menit',
    fullStory: [
      'Penyelidikan mendalam pasar modal mengungkap taktik "Channel Stuffing", yaitu praktik memaksa jaringan distributor menerima pasokan barang jauh melampaui kapasitas serap pasar mendekati penutupan kuartal, dengan perjanjian rahasia hak pengembalian penuh tanpa penalti di kuartal berikutnya.',
      'Manipulasi ini sengaja dilakukan oleh oknum manajemen untuk memoles pertumbuhan pendapatan (revenue growth) agar emiten dapat memenuhi target kinerja dan menjaga valuasi saham di bursa.',
      'ForensicAI mendeteksi anomali ini melalui kombinasi lonjakan mendadak pada rasio Days Sales Outstanding (DSO) dan divergensi ekstrim antara omzet faktur penjualan dengan penerimaan kas riil dari pelanggan.'
    ],
    keySignals: [
      'Lonjakan omzet penjualan > 30% hanya terjadi pada 10 hari terakhir kuartal',
      'Penerimaan kas riil dari pelanggan (Cash from Customers) stagnan',
      'Peningkatan retur penjualan abnormal pada awal kuartal berikutnya'
    ],
    regulatoryBasis: 'UU No. 8 Tahun 1995 tentang Pasar Modal Pasal 90 & 93 (Larangan Penipuan & Manipulasi)',
    affectedTickers: ['GOTO', 'BUKA', 'TLKM', 'EMTK'],
    recommendation: 'Lacak riwayat 12 kuartal arus kas penerimaan pelanggan pada modul Cash Flow Quality untuk memvalidasi integritas penjualan.',
    officialRefUrl: 'https://www.ojk.go.id/',
    officialRefLabel: 'Penegakan Hukum Pasar Modal OJK'
  },
  {
    id: 'n8',
    category: 'analysis',
    tag: 'Due Diligence',
    title: 'Free Cash Flow Yield Negatif: Jebakan Valuasi yang Kerap Menjebak Investor Ritel',
    summary:
      'Studi komprehensif atas 180 emiten IDX menunjukkan bahwa FCF negatif selama 4 kuartal berturut-turut memprediksi risiko rights issue dilutif sebesar 71%.',
    source: 'Forensic Institute & CFA Society',
    date: '10 Sep 2026',
    severity: 'medium',
    readTime: '4 menit',
    fullStory: [
      'Banyak investor ritel kerap terpikat oleh rasio Price-to-Earnings (P/E) yang tampak "murah", tanpa menyadari bahwa laba bersih yang tercatat tidak menghasilkan uang tunai karena terserap seluruhnya oleh belanja modal (Capex) yang tidak produktif atau modal kerja yang membengkak.',
      'Analisis arus kas bebas (Free Cash Flow = Arus Kas Operasi minus Belanja Modal) merupakan ujian paling obyektif terhadap kesehatan likuiditas perusahaan. Perusahaan dengan FCF defisit kronis tidak dapat membagikan dividen kas nyata tanpa menambah pinjaman utang baru.',
      'Metodologi ForensicAI menempatkan FCF Yield sebagai filter utama dalam menyaring integritas laporan keuangan seluruh emiten di Bursa Efek Indonesia.'
    ],
    keySignals: [
      'Free Cash Flow (FCF) konsisten negatif meski laba bersih dilaporkan positif',
      'Belanja modal (Capex) membengkak tanpa kenaikan kapasitas produksi riil',
      'Pembayaran dividen didanai dari penarikan pinjaman bank baru'
    ],
    regulatoryBasis: 'Standar Audit Forensik & Analisis Arus Kas CFA Institute',
    affectedTickers: ['TLKM', 'ASII', 'ADRO', 'ANTM'],
    recommendation: 'Selalu verifikasi rasio FCF Yield pada panel ringkasan eksekutif sebelum memutuskan investasi jangka panjang.',
    officialRefUrl: 'https://www.idx.co.id/',
    officialRefLabel: 'Bursa Efek Indonesia Riset Pasar'
  },
];

/* ─── Category Visual Styling ───────────────────────────────── */

const CAT_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  fraud: {
    color: '#f87171',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    icon: <AlertTriangle size={13} />,
  },
  regulation: {
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.12)',
    border: 'rgba(96,165,250,0.3)',
    icon: <Shield size={13} />,
  },
  market: {
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.12)',
    border: 'rgba(251,191,36,0.3)',
    icon: <TrendingDown size={13} />,
  },
  analysis: {
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.12)',
    border: 'rgba(167,139,250,0.3)',
    icon: <BookOpen size={13} />,
  },
  warning: {
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.12)',
    border: 'rgba(251,146,60,0.3)',
    icon: <AlertTriangle size={13} />,
  },
};

const FILTER_TABS = [
  { id: 'all', label: 'Semua Berita' },
  { id: 'fraud', label: 'Fraud Alert' },
  { id: 'regulation', label: 'Regulasi' },
  { id: 'analysis', label: 'Analisis' },
  { id: 'market', label: 'Pasar Modal' },
  { id: 'warning', label: 'Red Flag' },
];

/* ─── Interactive Forensic News Dossier Modal ───────────────── */

interface NewsModalProps {
  item: NewsItem | null;
  onClose: () => void;
  onAnalyze?: (symbol: string) => void;
}

function ForensicNewsModal({ item, onClose, onAnalyze }: NewsModalProps) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const cat = CAT_CONFIG[item.category] || CAT_CONFIG.analysis;
  const safeOfficialUrl = normalizeWebsite(item.officialRefUrl);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-card animate-fade-in-up"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          background: 'var(--bg-card, #111827)',
          border: `1px solid ${cat.border}`,
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px ${cat.bg}`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: '24px 28px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            background: 'var(--bg-card, #111827)',
            zIndex: 10,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 800,
                color: cat.color,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
              }}
            >
              {cat.icon}
              {item.tag.toUpperCase()}
            </span>

            {item.severity === 'high' && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#f87171',
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
                RISIKO TINGGI
              </span>
            )}

            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              {item.date} • {item.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              borderRadius: '12px',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            title="Tutup (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Headline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: 700, color: 'var(--accent-1)' }}>{item.source}</span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
                <CheckCircle2 size={13} /> {isEn ? 'Verified by Forensic Sentinel' : 'Terverifikasi Forensic Sentinel'}
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1.35, color: 'var(--text-primary)', margin: 0 }}>
              {item.title}
            </h2>
          </div>

          {/* Highlight Summary Box */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)',
              border: '1px solid rgba(99,102,241,0.25)',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
            }}
          >
            <Info size={20} style={{ color: 'var(--accent-1)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{isEn ? 'Forensic Summary: ' : 'Intisari Forensik: '}</strong>
              {item.summary}
            </div>
          </div>

          {/* 1. Full Story & Case Timeline */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileSearch size={16} style={{ color: 'var(--accent-1)' }} /> {isEn ? 'Case Analysis & Investigation Timeline' : 'Analisis Kasus & Kronologi Investigasi'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {item.fullStory.map((para, i) => (
                <p key={i} style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* 2. Triggered Red Flag Signals */}
          <div
            style={{
              padding: '20px',
              borderRadius: '18px',
              background: 'var(--bg-input, rgba(255,255,255,0.03))',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f87171', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={16} /> {isEn ? 'Triggered Red Flags & Quantitative Indicators:' : 'Sinyal Bahaya & Indikator Kuantitatif Terdeteksi:'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
              {item.keySignals.map((signal, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(239,68,68,0.06)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: '#ef4444', fontWeight: 900 }}>•</span>
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Regulatory Basis & Investor Guidance */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'rgba(99,102,241,0.05)',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-1)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scale size={14} /> {isEn ? 'Regulatory Framework (OJK / IDX / IAI)' : 'Landasan Regulasi OJK / BEI / IAI'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>
                {item.regulatoryBasis}
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'rgba(16,185,129,0.05)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} /> {isEn ? 'Investor Forensic Audit Guidance' : 'Rekomendasi Audit Investor'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {item.recommendation}
              </div>
            </div>
          </div>

          {/* 4. Action Area: Audit Related Stocks in ForensicAI */}
          <div
            style={{
              padding: '22px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.15) 100%)',
              border: '1px solid rgba(99,102,241,0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} style={{ color: '#fbbf24' }} /> {isEn ? 'Run Forensic Audit on Related Issuers' : 'Uji Forensik Emiten Terkait Kasus Ini'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                  {isEn
                    ? 'Select any ticker to execute the 8-detector financial statement integrity scanner:'
                    : 'Pilih salah satu saham untuk langsung menjalankan scanner 8 detektor integritas laporan keuangan:'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {item.affectedTickers.map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => {
                    onClose();
                    onAnalyze?.(ticker);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--accent-1)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <span>{ticker}</span>
                  <ArrowRight size={13} />
                </button>
              ))}

              {item.affectedTickers[0] && (
                <button
                  onClick={() => {
                    onClose();
                    onAnalyze?.(item.affectedTickers[0]);
                  }}
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginLeft: 'auto',
                  }}
                >
                  <Zap size={14} /> {isEn ? `Audit ${item.affectedTickers[0]} Now` : `Audit ${item.affectedTickers[0]} Sekarang`}
                </button>
              )}
            </div>
          </div>

          {/* 5. Verified Source Link (Canonical & Safe) */}
          <div
            style={{
              paddingTop: '10px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {isEn ? `Official Regulatory & Data Source: ${item.source}` : `Sumber Resmi Regulasi & Data: ${item.source}`}
            </span>

            <a
              href={safeOfficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--accent-1)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.25)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
              }}
            >
              <span>{isEn ? `Open ${item.officialRefLabel}` : `Buka ${item.officialRefLabel}`}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Single News Card Component ────────────────────────────── */

function NewsCard({
  item,
  index,
  onClick,
}: {
  item: NewsItem;
  index: number;
  onClick: () => void;
}) {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [hovered, setHovered] = useState(false);
  const cat = CAT_CONFIG[item.category] || CAT_CONFIG.analysis;

  const severityGlow =
    item.severity === 'high'
      ? 'rgba(239,68,68,0.12)'
      : item.severity === 'medium'
      ? 'rgba(251,191,36,0.08)'
      : 'transparent';

  return (
    <div
      onClick={onClick}
      id={`news-card-${item.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: '16px',
        border: `1px solid ${hovered ? cat.border : 'var(--border-subtle)'}`,
        background: hovered ? 'rgba(255,255,255,0.05)' : 'var(--bg-card)',
        padding: '20px',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 10px 32px ${severityGlow}, 0 0 0 1px ${cat.border}`
          : '0 2px 12px rgba(0,0,0,0.3)',
        animationDelay: `${index * 0.05}s`,
        opacity: 0,
        animation: `newsCardIn 0.4s ease ${index * 0.05}s forwards`,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', gap: '8px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              color: cat.color,
              background: cat.bg,
              border: `1px solid ${cat.border}`,
            }}
          >
            {cat.icon}
            {item.tag.toUpperCase()}
          </span>

          {item.severity === 'high' && (
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#ef4444',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(239,68,68,0.8)',
                flexShrink: 0,
              }}
              title="Risiko Tinggi"
            />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <Clock size={11} />
            {item.date}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {item.source}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: 1.45,
          color: 'var(--text-primary)',
          marginBottom: '8px',
          transition: 'color 0.2s',
        }}
      >
        {item.title}
      </h3>

      {/* Summary */}
      <p
        style={{
          fontSize: '13px',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          marginBottom: '14px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {item.summary}
      </p>

      {/* Footer CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          fontWeight: 700,
          color: hovered ? cat.color : 'var(--text-muted)',
          transition: 'color 0.2s',
          paddingTop: '6px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          {isEn ? 'Run Forensic Audit' : 'Buka Analisis Forensik'} <Zap size={12} style={{ color: '#fbbf24' }} />
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
          {isEn ? 'Case Details' : 'Detail Kasus'} <ChevronRight size={13} />
        </span>
      </div>
    </div>
  );
}

/* ─── Featured (Wide) News Card ─────────────────────────────── */

function FeaturedCard({
  item,
  onClick,
}: {
  item: NewsItem;
  onClick: () => void;
}) {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [hovered, setHovered] = useState(false);
  const cat = CAT_CONFIG[item.category] || CAT_CONFIG.analysis;

  return (
    <div
      onClick={onClick}
      id={`news-featured-${item.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: '20px',
        border: `1px solid ${hovered ? cat.border : 'rgba(99,102,241,0.25)'}`,
        background: hovered
          ? 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)'
          : 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 100%)',
        padding: '28px',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 48px rgba(99,102,241,0.2), 0 0 0 1px rgba(99,102,241,0.4)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        animation: 'newsCardIn 0.5s ease forwards',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
        {/* Left icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: cat.bg,
            border: `1px solid ${cat.border}`,
            color: cat.color,
            boxShadow: `0 8px 20px ${cat.bg}`,
          }}
        >
          <Newspaper size={26} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: cat.color,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
              }}
            >
              {cat.icon}
              {item.tag.toUpperCase()}
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.05em',
                background: 'rgba(99,102,241,0.15)',
                color: '#a5b4fc',
                border: '1px solid rgba(99,102,241,0.3)',
              }}
            >
              INVESTIGASI UTAMA
            </span>
            {item.severity === 'high' && (
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  background: 'rgba(239,68,68,0.15)',
                  color: '#f87171',
                  border: '1px solid rgba(239,68,68,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
                HIGH ALERT
              </span>
            )}
          </div>

          <h3
            style={{
              fontSize: '20px',
              fontWeight: 800,
              lineHeight: 1.4,
              color: 'var(--text-primary)',
              marginBottom: '10px',
            }}
          >
            {item.title}
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '18px' }}>
            {item.summary}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Clock size={13} />
                {item.date} • {item.readTime}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Sumber: {item.source}
              </span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                background: hovered ? 'var(--accent-1)' : 'rgba(99,102,241,0.15)',
                color: hovered ? '#fff' : 'var(--accent-1)',
                border: '1px solid rgba(99,102,241,0.3)',
                transition: 'all 0.2s',
                boxShadow: hovered ? '0 6px 20px rgba(99,102,241,0.35)' : 'none',
              }}
            >
              <span>{isEn ? 'Open Investigation Dossier' : 'Buka Berkas Investigasi'}</span>
              <ChevronRight size={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main NewsSection Component ────────────────────────────── */

export default function NewsSection({ onAnalyze }: NewsSectionProps) {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filterTabs = isEn
    ? [
        { id: 'all', label: 'All Disclosures' },
        { id: 'fraud', label: 'Fraud Alerts' },
        { id: 'regulation', label: 'Regulations' },
        { id: 'analysis', label: 'Analyses' },
        { id: 'market', label: 'Capital Market' },
        { id: 'warning', label: 'Red Flags' },
      ]
    : [
        { id: 'all', label: 'Semua Berita' },
        { id: 'fraud', label: 'Fraud Alert' },
        { id: 'regulation', label: 'Regulasi' },
        { id: 'analysis', label: 'Analisis' },
        { id: 'market', label: 'Pasar Modal' },
        { id: 'warning', label: 'Red Flag' },
      ];

  const featured = NEWS_ITEMS[0];
  const rest = NEWS_ITEMS.slice(1);
  const filtered = activeFilter === 'all'
    ? rest
    : rest.filter((n) => n.category === activeFilter);

  return (
    <section id="news-section" style={{ width: '100%', paddingBottom: '80px' }}>
      <style>{`
        @keyframes newsCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes newsPing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(251,146,60,0.12)',
              border: '1px solid rgba(251,146,60,0.25)',
              color: '#fb923c',
            }}
          >
            <Newspaper size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {isEn ? 'IDX Intelligence Center & Forensic Disclosures' : 'Pusat Intelijen & Berita Forensik IDX'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              {isEn
                ? 'Curated accounting manipulation cases, OJK & IDX regulatory updates, and forensic disclosures'
                : 'Kurasi kasus manipulasi laporan keuangan, pembaruan regulasi OJK/BEI, dan analisis akuntansi forensik'}
            </p>
          </div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              background: 'rgba(52,211,153,0.12)',
              color: '#34d399',
              border: '1px solid rgba(52,211,153,0.3)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                animation: 'newsPing 1.4s ease-in-out infinite',
              }}
            />
            LIVE INTEL
          </span>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            padding: '4px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              id={`news-filter-${tab.id}`}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s',
                background: activeFilter === tab.id
                  ? 'rgba(99,102,241,0.2)'
                  : 'transparent',
                color: activeFilter === tab.id
                  ? '#a5b4fc'
                  : 'var(--text-muted)',
                boxShadow: activeFilter === tab.id
                  ? '0 0 0 1px rgba(99,102,241,0.4)'
                  : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {activeFilter === 'all' && (
          <FeaturedCard
            item={featured}
            onClick={() => setSelectedNews(featured)}
          />
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '18px',
          }}
        >
          {filtered.map((item, i) => (
            <NewsCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setSelectedNews(item)}
            />
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '48px 24px',
                color: 'var(--text-muted)',
                fontSize: '15px',
              }}
            >
              <Tag size={32} style={{ margin: '0 auto 12px', opacity: 0.4, display: 'block' }} />
              <p>{isEn ? 'No disclosures in this category at this time.' : 'Tidak ada berita dalam kategori ini saat ini.'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Dossier Modal */}
      {selectedNews && (
        <ForensicNewsModal
          item={selectedNews}
          onClose={() => setSelectedNews(null)}
          onAnalyze={onAnalyze}
        />
      )}

      {/* Footer disclaimer */}
      <div
        style={{
          marginTop: '28px',
          padding: '16px 22px',
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          color: 'var(--text-muted)',
        }}
      >
        <Shield size={16} style={{ flexShrink: 0, color: 'var(--accent-1)' }} />
        <span>
          {isEn
            ? 'All investigation dossiers are presented interactively within ForensicAI for capital market transparency and investor education. Click any disclosure to review case breakdowns, inspect regulatory frameworks, and run audits on affected tickers.'
            : 'Seluruh berkas investigasi disajikan secara interaktif di dalam aplikasi ForensicAI untuk edukasi transparansi pasar modal. Klik berita apapun untuk membaca bedah kasus, memeriksa regulasi, dan langsung menguji emiten terkait.'}
        </span>
      </div>
    </section>
  );
}
