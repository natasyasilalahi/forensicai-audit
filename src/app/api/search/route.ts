import { NextRequest, NextResponse } from 'next/server';
import { searchLocalStocks } from '@/lib/stocks-db';
import { searchCompanies } from '@/lib/sectors';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || q.trim().length < 1) {
    return NextResponse.json([]);
  }

  const queryStr = q.trim();

  try {
    // 1. First, search local high-speed fuzzy database
    const localMatches = searchLocalStocks(queryStr);
    const formattedLocal = localMatches.map(s => ({
      symbol: s.symbol,
      company_name: s.name,
    }));

    // If local results are sufficient, return them immediately
    if (formattedLocal.length >= 3) {
      return NextResponse.json(formattedLocal);
    }

    // 2. If fewer than 3 local matches, attempt Sectors API search to discover new symbols
    try {
      const apiResults = await searchCompanies(queryStr);
      if (Array.isArray(apiResults) && apiResults.length > 0) {
        // Merge without duplicates
        const existingSymbols = new Set(formattedLocal.map(l => l.symbol));
        for (const item of apiResults) {
          if (item?.symbol && !existingSymbols.has(item.symbol.toUpperCase())) {
            formattedLocal.push({
              symbol: item.symbol.toUpperCase(),
              company_name: item.company_name || item.symbol,
            });
          }
        }
      }
    } catch {
      // Ignore Sectors API error if fallback fails
    }

    return NextResponse.json(formattedLocal.slice(0, 8));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
