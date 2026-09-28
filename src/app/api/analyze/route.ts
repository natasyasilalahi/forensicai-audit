import { NextRequest, NextResponse } from 'next/server';
import { getCompanyReport, getQuarterlyFinancials } from '@/lib/sectors';
import { runForensicAnalysis } from '@/lib/forensic';

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol')?.toUpperCase();

  if (!symbol) {
    return NextResponse.json({ error: 'symbol is required' }, { status: 400 });
  }

  try {
    // Fetch both in parallel
    const [report, quarterly] = await Promise.all([
      getCompanyReport(symbol, ['overview', 'financials', 'management', 'valuation']),
      getQuarterlyFinancials(symbol, 12),
    ]);

    const result = runForensicAnalysis(report, quarterly);

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[analyze] Error for ${symbol}:`, message);

    if (message.includes('404') || message.includes('does not exist')) {
      return NextResponse.json({ error: `Ticker "${symbol}" tidak ditemukan di IDX.` }, { status: 404 });
    }
    if (message.includes('429')) {
      return NextResponse.json({ error: 'API rate limit tercapai. Coba lagi dalam beberapa saat.' }, { status: 429 });
    }
    if (message.includes('SECTORS_API_KEY')) {
      return NextResponse.json({ error: 'SECTORS_API_KEY belum dikonfigurasi di server.' }, { status: 500 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
