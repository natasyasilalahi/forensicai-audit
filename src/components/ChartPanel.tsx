'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend, ComposedChart
} from 'recharts';
import { TrendingUp, DollarSign, BarChart2, Activity, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { QuarterlyFinancial, HistoricalFinancial } from '@/lib/sectors';

interface ChartPanelProps {
  quarterly: QuarterlyFinancial[];
  annual: HistoricalFinancial[];
}

type TabId = 'ocf_earnings' | 'cashflow' | 'revenue' | 'debt';

function formatVal(val: number, lang: 'id' | 'en'): string {
  if (Math.abs(val) >= 1e12) return `${(val / 1e12).toFixed(1)}T`;
  if (Math.abs(val) >= 1e9) return lang === 'en' ? `${(val / 1e9).toFixed(1)}B` : `${(val / 1e9).toFixed(1)}M`;
  if (Math.abs(val) >= 1e6) return lang === 'en' ? `${(val / 1e6).toFixed(1)}M` : `${(val / 1e6).toFixed(1)}Jt`;
  return val.toFixed(0);
}

function shortDate(date: string): string {
  const d = new Date(date);
  const month = d.getMonth();
  const q = Math.ceil((month + 1) / 3);
  return `Q${q}'${String(d.getFullYear()).slice(2)}`;
}

const CHART_COLORS = {
  earnings: '#10b981',
  ocf: '#3b82f6',
  revenue: '#8b5cf6',
  fcf: '#f59e0b',
  debt: '#ef4444',
  assets: '#64748b',
  operating: '#06b6d4',
  investing: '#8b5cf6',
  financing: '#f97316',
};

const CustomTooltip = ({ active, payload, label, lang }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          fontSize: '12px',
        }}
      >
        <div style={{ color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
            <span style={{ color: p.color, fontWeight: 600 }}>{p.name}:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono, monospace)' }}>
              {p.value !== null && p.value !== undefined ? `Rp ${formatVal(p.value, lang)}` : 'N/A'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartPanel({ quarterly, annual }: ChartPanelProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('ocf_earnings');

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'ocf_earnings', label: 'Earnings vs OCF', icon: <Activity size={14} /> },
    { id: 'cashflow', label: language === 'en' ? 'Cash Flow' : 'Arus Kas', icon: <DollarSign size={14} /> },
    { id: 'revenue', label: 'Revenue & Margin', icon: <TrendingUp size={14} /> },
    { id: 'debt', label: 'Leverage', icon: <BarChart2 size={14} /> },
  ];

  const sorted = [...quarterly].sort((a, b) => a.date.localeCompare(b.date));

  const kNetIncome = language === 'en' ? 'Net Income' : 'Laba Bersih';
  const kOcf = language === 'en' ? 'Operating Cash Flow' : 'Arus Kas Operasi';
  const kOperating = language === 'en' ? 'Operating' : 'Operasi';
  const kInvesting = language === 'en' ? 'Investing' : 'Investasi';
  const kFinancing = language === 'en' ? 'Financing' : 'Pendanaan';
  const kGrossProfit = language === 'en' ? 'Gross Profit' : 'Laba Kotor';
  const kGrossMargin = language === 'en' ? 'Gross Margin (%)' : 'Margin Kotor (%)';
  const kTotalDebt = language === 'en' ? 'Total Debt' : 'Total Utang';
  const kTotalAssets = language === 'en' ? 'Total Assets' : 'Total Aset';

  // Prepare chart data
  const ocfEarningsData = sorted.map((q) => ({
    date: shortDate(q.date),
    [kNetIncome]: q.earnings,
    [kOcf]: q.operating_cash_flow,
  }));

  const cashflowData = sorted.map((q) => ({
    date: shortDate(q.date),
    [kOperating]: q.operating_cash_flow,
    [kInvesting]: q.investing_cash_flow,
    [kFinancing]: q.financing_cash_flow,
  }));

  const revenueData = sorted.map((q) => ({
    date: shortDate(q.date),
    Revenue: q.revenue,
    [kGrossProfit]: q.gross_profit,
    [kGrossMargin]:
      q.revenue && q.gross_profit !== null
        ? parseFloat(((q.gross_profit / q.revenue) * 100).toFixed(1))
        : null,
  }));

  const debtData = sorted.map((q) => ({
    date: shortDate(q.date),
    [kTotalDebt]: q.total_debt,
    [kTotalAssets]: q.total_assets,
    'DER (x)':
      q.total_equity && q.total_debt !== null && q.total_equity > 0
        ? parseFloat(((q.total_debt ?? 0) / q.total_equity).toFixed(2))
        : null,
  }));

  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        padding: '24px',
        borderRadius: '20px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'rgba(99,102,241,0.12)',
              color: 'var(--accent-1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BarChart2 size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {language === 'en' ? 'Financial Data Visualization' : 'Visualisasi Data Keuangan'}
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {language === 'en' ? 'Trailing 12-quarter trend (Sectors Financial API)' : 'Tren 12 kuartal terakhir (Sectors Financial API)'}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '20px',
          padding: '4px',
          borderRadius: '14px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: '1 1 120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '9px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isActive ? 'linear-gradient(135deg, var(--accent-1), #7c3aed)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.25)' : 'none',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas Area */}
      <div style={{ height: 320, width: '100%' }}>
        {activeTab === 'ocf_earnings' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={ocfEarningsData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatVal(v, language)} width={55} />
              <Tooltip content={<CustomTooltip lang={language} />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '10px' }} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
              <Bar dataKey={kNetIncome} fill={CHART_COLORS.earnings} radius={[4, 4, 0, 0]} opacity={0.85} />
              <Line type="monotone" dataKey={kOcf} stroke={CHART_COLORS.ocf} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'cashflow' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashflowData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatVal(v, language)} width={55} />
              <Tooltip content={<CustomTooltip lang={language} />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '10px' }} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.12)" />
              <Bar dataKey={kOperating} fill={CHART_COLORS.operating} radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey={kInvesting} fill={CHART_COLORS.investing} radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey={kFinancing} fill={CHART_COLORS.financing} radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'revenue' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatVal(v, language)} width={55} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} width={40} />
              <Tooltip content={<CustomTooltip lang={language} />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey="Revenue" fill={CHART_COLORS.revenue} radius={[4, 4, 0, 0]} opacity={0.8} />
              <Bar yAxisId="left" dataKey={kGrossProfit} fill={CHART_COLORS.earnings} radius={[4, 4, 0, 0]} opacity={0.8} />
              <Line yAxisId="right" type="monotone" dataKey={kGrossMargin} stroke={CHART_COLORS.fcf} strokeWidth={3} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'debt' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={debtData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatVal(v, language)} width={55} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}x`} width={35} />
              <Tooltip content={<CustomTooltip lang={language} />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey={kTotalDebt} fill={CHART_COLORS.debt} radius={[4, 4, 0, 0]} opacity={0.8} />
              <Line yAxisId="left" type="monotone" dataKey={kTotalAssets} stroke={CHART_COLORS.assets} strokeWidth={2.5} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="DER (x)" stroke={CHART_COLORS.fcf} strokeWidth={3} dot={false} strokeDasharray="5 3" />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
