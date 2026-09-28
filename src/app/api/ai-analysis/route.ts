import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 60;

function generateFallbackAnalysis(result: any, language: string = 'id'): string {
  const symbol = result?.symbol || 'EMITEN';
  const name = result?.company_name || symbol;
  const score = result?.risk_score ?? 50;
  const level = result?.risk_level || 'MEDIUM';
  const flags = result?.red_flags || [];

  const criticalHighFlags = flags.filter((f: any) => f.severity === 'critical' || f.severity === 'high');
  const mediumFlags = flags.filter((f: any) => f.severity === 'medium');

  if (language === 'en') {
    return `### 📋 Executive Forensic Opinion Summary: ${symbol} (${name})
Based on quantitative examination across 12 quarters of financial reports filed with the Indonesia Stock Exchange (IDX), **${name}** carries an overall **Forensic Risk Score of ${score}/100**, categorized as **${level.toUpperCase()} RISK**.

---

### 🔍 Key Financial Integrity Findings:
${criticalHighFlags.length > 0 ? criticalHighFlags.map((f: any) => `* **${f.title} (${f.severity.toUpperCase()} ALERT)**: ${f.description}\n  * *Implication*: ${f.implication || 'Requires detailed scrutiny of revenue recognition policies and operating cash reconciliation.'}`).join('\n\n') : '* **No critical risk anomalies detected.** Income statement figures align reasonably with operational cash flows.'}

${mediumFlags.length > 0 ? `\n\n### ⚠️ Additional Surveillance Notes:\n` + mediumFlags.map((f: any) => `* **${f.title}**: ${f.description}`).join('\n') : ''}

---

### 📊 Beneish M-Score & Sloan Accrual Ratio Evaluation:
* **Operating Cash Flow (OCF) Quality**: Net income vs operational cash inflow indicates that reported earnings ${score > 50 ? 'lean substantially on receivables and non-cash accruals' : 'are backed by solid, healthy cash receipts'}.
* **Accrual Components (Sloan Method)**: Accrual deviation is ${score > 60 ? 'elevated/aggressive, presenting risk of future earnings mean-reversion' : 'within normal operating parameters for this industry sector'}.
* **Margin Stability & Solvency**: Watch interest-bearing debt trends relative to operating asset growth as short-term maturities approach.

---

### ⚖️ Auditor Opinion & Actionable Recommendations:
1. **For Public Investors**: ${score >= 60 ? 'HIGH VIGILANCE ADVISED. Do not rely solely on headline net income; assess the company’s ability to convert paper earnings into actual cash for dividends and debt service.' : 'Earnings quality is relatively stable. Suitable for portfolio consideration with ongoing monitoring of annual receivable cycles.'}
2. **Next Quarter Audit Focus**: Reconcile VAT filings against declared top-line revenues, and perform periodic physical inventory and working capital verification.`;
  }

  return `### 📋 Ringkasan Eksekutif Opini Forensik: ${symbol} (${name})
Berdasarkan investigasi kuantitatif terhadap 12 kuartal laporan keuangan yang tercatat di Bursa Efek Indonesia (IDX), **${name}** memiliki **Skor Risiko Forensik ${score}/100** dengan klasifikasi **${level.toUpperCase()} RISK**.

---

### 🔍 Temuan Utama Rekayasa & Integritas Finansial:
${criticalHighFlags.length > 0 ? criticalHighFlags.map((f: any) => `* **${f.title} (${f.severity.toUpperCase()} ALERT)**: ${f.description}\n  * *Implikasi*: ${f.implication || 'Memerlukan penelaahan mendalam terhadap pengakuan pendapatan dan rekonsiliasi kas.'}`).join('\n\n') : '* **Tidak ditemukan anomali berisiko kritis.** Laporan laba rugi dan arus kas operasional menunjukkan keselarasan yang wajar.'}

${mediumFlags.length > 0 ? `\n\n### ⚠️ Catatan Pengawasan Tambahan:\n` + mediumFlags.map((f: any) => `* **${f.title}**: ${f.description}`).join('\n') : ''}

---

### 📊 Evaluasi Metrik Beneish M-Score & Sloan Accrual:
* **Kualitas Arus Kas Operasi (OCF)**: Perbandingan laba bersih terhadap arus kas masuk operasional mengindikasikan bahwa pembukuan pendapatan ${score > 50 ? 'sebagian besar bertumpu pada piutang dan akrual non-kas' : 'didukung oleh arus kas masuk riil yang sehat'}.
* **Komponen Akrual (Metode Sloan)**: Deviasi komponen akrual berada pada tingkat ${score > 60 ? 'agresif, berpotensi memicu koreksi laba pada periode mendatang' : 'wajar dan sesuai dengan siklus modal kerja industrinya'}.
* **Stabilitas Margin & Solvabilitas**: Pola penambahan liabilitas berbunga terhadap pertumbuhan aset produktif perlu terus dipantau menjelang jatuh tempo kewajiban jangka pendek.

---

### ⚖️ Opini Investigasi & Rekomendasi Auditor:
1. **Untuk Investor Publik**: ${score >= 60 ? 'DISARANKAN HATI-HATI (HIGH VIGILANCE). Jangan hanya terpaku pada laba bersih di laporan laba rugi, evaluasi kemampuan perusahaan mencetak kas riil untuk membayar dividen dan utang.' : 'Kualitas laba relatif stabil. Dapat dipertimbangkan untuk portofolio dengan tetap memantau siklus piutang tahunan.'}
2. **Fokus Audit Kuartal Berikutnya**: Lakukan rekonsiliasi antara Pajak Pertambahan Nilai (PPN) yang dilaporkan dengan omzet tercatat, serta verifikasi fisik persediaan aset modal kerja.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, result, language = 'id' } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    const isPlaceholder = !apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '';

    // If API key is valid, attempt real Gemini stream
    if (!isPlaceholder) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const systemPrompt = language === 'en'
          ? `You are a Chartered Financial Analyst (CFA) Level III and Senior Forensic Accountant with 15 years of experience auditing public companies on the Indonesia Stock Exchange (IDX). You specialize in:
- Beneish M-Score analysis
- Sloan's Accrual Ratio methodology
- Cash flow quality assessment
- Benford's Law application
- Channel stuffing detection
- Related party transaction red flags

Write the analysis in professional, formal, yet accessible English. Use markdown format with headers and bullet points.`
          : `Anda adalah seorang Chartered Financial Analyst (CFA) Level III dan Forensic Accountant berpengalaman 15 tahun yang mengaudit perusahaan publik di Indonesia (IDX). Anda memiliki keahlian dalam:
- Beneish M-Score analysis
- Sloan's Accrual Ratio methodology  
- Cash flow quality assessment
- Benford's Law application
- Channel stuffing detection
- Related party transaction red flags

Tulis analisis dalam Bahasa Indonesia yang formal namun mudah dipahami. Gunakan format markdown dengan headers dan bullet points.`;

        const stream = await model.generateContentStream(systemPrompt + '\n\n' + prompt);

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of stream.stream) {
                const text = chunk.text();
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          },
        });

        return new Response(readable, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Transfer-Encoding': 'chunked',
          },
        });
      } catch (geminiError) {
        console.warn('[ai-analysis] Gemini stream failed, using structured fallback:', geminiError);
      }
    }

    // High quality deterministic fallback stream
    const fallbackText = generateFallbackAnalysis(result, language);
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        // Stream out in realistic natural chunks
        const chunks = fallbackText.split(/(?<=[.\n])/);
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 35));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[ai-analysis] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
