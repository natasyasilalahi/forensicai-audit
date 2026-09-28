'use client';

import { useState, useRef } from 'react';
import { Brain, ChevronRight, Loader2, RefreshCw, AlertTriangle, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { ForensicResult } from '@/lib/forensic';

const AGENT_STEPS_ID = [
  'Memuat data laporan keuangan...',
  'Menganalisis Earnings vs OCF...',
  'Menghitung Accrual Ratio (Sloan)...',
  'Mendeteksi anomali arus kas...',
  'Membandingkan benchmark industri...',
  'Menyusun opini forensik...',
];

const AGENT_STEPS_EN = [
  'Loading financial statement data...',
  'Analyzing Earnings vs Operating Cash Flow...',
  'Calculating Sloan Accrual Ratio...',
  'Detecting cash flow anomalies...',
  'Evaluating industry benchmarks...',
  'Compiling forensic audit opinion...',
];

export default function AIAnalysisPanel({ result }: { result: ForensicResult }) {
  const { language, t } = useLanguage();
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps = language === 'en' ? AGENT_STEPS_EN : AGENT_STEPS_ID;

  async function runAnalysis() {
    setIsLoading(true);
    setAnalysis('');
    setIsDone(false);
    setCurrentStep(0);

    let s = 0;
    stepRef.current = setInterval(() => {
      if (s < steps.length - 1) {
        s++;
        setCurrentStep(s);
      }
    }, 700);

    try {
      const prompt = buildPrompt(result, language);
      const res = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, result, language }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'AI analysis failed');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let text = '';
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value);
          setAnalysis(text);
          if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }
      setIsDone(true);
    } catch (err) {
      setAnalysis(
        `**Error:** ${err instanceof Error ? err.message : (language === 'en' ? 'Failed to contact AI service.' : 'Gagal menghubungi AI.')}\n\n` +
          buildFallback(result, language)
      );
      setIsDone(true);
    } finally {
      if (stepRef.current) clearInterval(stepRef.current);
      setIsLoading(false);
    }
  }

  function buildFallback(r: ForensicResult, lang: 'id' | 'en'): string {
    const isEn = lang === 'en';
    const critical = r.red_flags.filter((f) => f.severity === 'critical');
    const high = r.red_flags.filter((f) => f.severity === 'high');
    let out = `### ${r.company_name} (${r.symbol})\n\n**Risk Score: ${r.risk_score}/100 — ${r.risk_level.toUpperCase()}**\n\n`;
    if (!r.red_flags.length) {
      out += isEn ? 'No significant forensic anomalies detected.\n' : 'Tidak ditemukan anomali signifikan.\n';
    } else {
      out += isEn
        ? `Identified **${r.red_flags.length} anomalies** (${critical.length} critical, ${high.length} high priority):\n\n`
        : `Ditemukan **${r.red_flags.length} anomali** (${critical.length} kritis, ${high.length} tinggi):\n\n`;
      for (const f of r.red_flags.slice(0, 5)) {
        out += `**${f.title}** [${f.severity.toUpperCase()}]\n${f.description}\n\n`;
      }
    }
    return out;
  }

  function buildPrompt(r: ForensicResult, lang: 'id' | 'en'): string {
    const flags = r.red_flags
      .map((f) => `- [${f.severity.toUpperCase()}] ${f.title}: ${f.description}\n  Detail: ${f.detail}`)
      .join('\n');
    const quarters = r.quarterly_data
      .slice(-4)
      .map(
        (q) =>
          `  ${q.date}: Rev=${q.revenue ? (q.revenue / 1e9).toFixed(0) + 'B' : 'N/A'}, NI=${
            q.earnings ? (q.earnings / 1e9).toFixed(0) + 'B' : 'N/A'
          }, OCF=${q.operating_cash_flow ? (q.operating_cash_flow / 1e9).toFixed(0) + 'B' : 'N/A'}`
      )
      .join('\n');

    if (lang === 'en') {
      return `You are a Senior Chartered Financial Analyst (CFA) and Senior Forensic Accountant auditing companies listed on IDX / global markets.

Company: ${r.company_name} (${r.symbol})
Risk Score: ${r.risk_score}/100 (${r.risk_level})
Total Red Flags: ${r.red_flags.length}

Detected Red Flags:
${flags || 'None detected'}

Recent Quarterly Financial Trend:
${quarters}

Deliver a rigorous forensic financial audit memorandum in English:
1. Executive Summary & Forensic Risk Verdict
2. Detailed Interpretation of each Red Flag and its impact on Earnings Quality
3. Cash Flow vs Net Income Divergence analysis (Accrual manipulation risks)
4. Key Follow-up Audit Procedures for Investors & Analysts
5. Quantitative Automated Analysis Disclaimer

Format: Professional markdown report with structured headings and bullet points.`;
    }

    return `Anda adalah Chartered Financial Analyst (CFA) dan Forensic Accountant senior yang mengaudit emiten IDX.\n\nPerusahaan: ${r.company_name} (${r.symbol})\nRisk Score: ${r.risk_score}/100 (${r.risk_level})\nRed Flags: ${r.red_flags.length}\n\nRed Flags:\n${flags || 'Tidak ada red flag'}\n\nData Kuartal Terbaru:\n${quarters}\n\nBuat analisis forensik komprehensif dalam Bahasa Indonesia:\n1. Interpretasi setiap red flag dan implikasinya terhadap kualitas laba\n2. Opini profesional: apakah laporan keuangan ini layak dipercaya?\n3. Rekomendasi investigasi lanjutan yang spesifik\n4. Gunakan terminologi akuntansi forensik (Beneish M-Score, Accrual Ratio, OCF-to-Earnings)\n5. Sertakan disclaimer analisis kuantitatif otomatis\n\nFormat: markdown dengan headers dan bullet points. Buat seperti laporan audit profesional.`;
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatAnalysis(text: string) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px -4px rgba(124,58,237,0.4)',
            }}
          >
            <Brain size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                Forensic Agent AI
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'rgba(124,58,237,0.15)',
                  color: '#a78bfa',
                  border: '1px solid rgba(124,58,237,0.3)',
                }}
              >
                PRO
              </span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {t.aiPanel.subtitle}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isDone && analysis && (
            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '12px',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} style={{ color: '#10b981' }} /> {language === 'en' ? 'Copied' : 'Disalin'}
                </>
              ) : (
                <>
                  <Copy size={14} /> {language === 'en' ? 'Copy Report' : 'Salin Laporan'}
                </>
              )}
            </button>
          )}

          <button
            onClick={runAnalysis}
            disabled={isLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {language === 'en' ? 'Analyzing...' : 'Menganalisis...'}
              </>
            ) : isDone ? (
              <>
                <RefreshCw size={16} /> {t.aiPanel.reanalyze}
              </>
            ) : (
              <>
                <Sparkles size={16} /> {t.aiPanel.runAgent}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Agent reasoning steps */}
      {isLoading && (
        <div
          style={{
            padding: '18px 20px',
            borderRadius: '14px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-1)', marginBottom: '12px', letterSpacing: '0.05em' }}>
            {language === 'en' ? 'AI FORENSIC INVESTIGATION PIPELINE' : 'PROSES INVESTIGASI FORENSIK AI'}
          </div>
          {steps.map((step, i) => (
            <div
              key={step}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '5px 0',
                fontSize: '13px',
                color:
                  i < currentStep
                    ? '#10b981'
                    : i === currentStep
                    ? 'var(--text-primary)'
                    : 'var(--text-muted)',
                fontWeight: i === currentStep ? 700 : 500,
                opacity: i > currentStep + 1 ? 0.4 : 1,
              }}
            >
              {i === currentStep ? (
                <Loader2 size={14} className="animate-spin" style={{ color: 'var(--accent-1)' }} />
              ) : (
                <span style={{ fontSize: '13px', fontWeight: 800 }}>{i < currentStep ? '✓' : '○'}</span>
              )}
              {step}
            </div>
          ))}
        </div>
      )}

      {/* Empty State Preview */}
      {!isLoading && !isDone && (
        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-1)' }} />
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {language === 'en' ? 'AI Forensic Agent Deep Audit Capabilities:' : 'Fitur Analisis mendalam AI Forensic Agent:'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            {(language === 'en'
              ? [
                  'Contextual red flag interpretation & severity weighting',
                  'Beneish M-Score & Sloan Accruals divergence',
                  'Professional auditor opinion on earnings sustainability',
                  'Specific forensic follow-up audit procedures',
                ]
              : [
                  'Interpretasi red flags secara kontekstual',
                  'Evaluasi Beneish M-Score & Sloan Accruals',
                  'Opini auditor profesional mengenai keterpercayaan laba',
                  'Rekomendasi investigasi lanjutan spesifik',
                ]
            ).map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <ChevronRight size={14} style={{ color: 'var(--accent-1)', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Output Container */}
      {(isLoading && analysis) || isDone ? (
        <div
          ref={outputRef}
          className="prose-ai"
          style={{
            maxHeight: '480px',
            overflowY: 'auto',
            padding: '20px 24px',
            background: 'var(--bg-input)',
            borderRadius: '14px',
            border: '1px solid var(--border-subtle)',
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'var(--text-primary)',
          }}
          dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }}
        />
      ) : null}

      {/* Disclaimer */}
      {isDone && (
        <div
          style={{
            marginTop: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <AlertTriangle size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <span>
            {t.aiPanel.disclaimer}
          </span>
        </div>
      )}
    </div>
  );
}
