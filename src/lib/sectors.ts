const BASE_URL = 'https://api.sectors.app/v2';

function getApiKey(): string {
  const key = process.env.SECTORS_API_KEY;
  if (!key) throw new Error('SECTORS_API_KEY is not set');
  return key;
}

async function sectorsGet<T>(path: string): Promise<T> {
  const apiKey = getApiKey();
  const url = `${BASE_URL}${path}`;
  
  const res = await fetch(url, {
    headers: { Authorization: apiKey },
    next: { revalidate: 300 }, // cache 5 minutes
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sectors API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CompanyOverview {
  listing_board: string;
  industry: string;
  sub_industry: string;
  sector: string;
  sub_sector: string;
  market_cap: number;
  market_cap_rank: number;
  address: string;
  employee_num: number;
  listing_date: string;
  website: string;
  last_close_price: number;
  latest_close_date: string;
  daily_close_change: number;
  esg_score: number | null;
  tags: string[];
  indices: string[];
}

export interface HistoricalFinancial {
  year: number;
  revenue: number | null;
  earnings: number | null;
  total_assets: number | null;
  total_equity: number | null;
  operating_cash_flow: number | null;
  free_cash_flow: number | null;
  total_liabilities: number | null;
  net_debt: number | null;
}

export interface HistoricalFinancialRatio {
  year: string;
  profitability: {
    roa: number | null;
    roe: number | null;
    net_profit_margin: number | null;
    operating_profit_margin: number | null;
    operating_cash_flow_margin: number | null;
  };
  leverage: {
    debt_to_asset_ratio: number | null;
    debt_to_equity_ratio: number | null;
  };
}

export interface CompanyFinancials {
  eps: number;
  historical_financials: HistoricalFinancial[];
  historical_financial_ratio: HistoricalFinancialRatio[];
  yoy_quarter_earnings_growth: number | null;
  yoy_quarter_revenue_growth: number | null;
}

export interface CompanyManagement {
  key_executives: Array<{ name: string; position: string }>;
  executives_shareholdings: Array<{ name: string; position: string; share_amount: number; share_percentage: number }>;
}

export interface CompanyReport {
  symbol: string;
  company_name: string;
  overview?: CompanyOverview;
  financials?: CompanyFinancials;
  management?: CompanyManagement;
  valuation?: {
    historical_valuation: Array<{
      year: number;
      pb: number | null;
      pe: number | null;
      ps: number | null;
    }>;
  };
}

export interface QuarterlyFinancial {
  symbol: string;
  date: string;
  revenue: number | null;
  earnings: number | null;
  operating_cash_flow: number | null;
  investing_cash_flow: number | null;
  financing_cash_flow: number | null;
  net_cash_flow: number | null;
  free_cash_flow: number | null;
  total_assets: number | null;
  total_equity: number | null;
  total_liabilities: number | null;
  total_debt: number | null;
  cost_of_revenue: number | null;
  gross_profit: number | null;
  operating_expense: number | null;
  ebit: number | null;
  ebitda: number | null;
  earnings_before_tax: number | null;
  tax: number | null;
  cash_only: number | null;
  financials_sector_metrics?: FinancialsSectorMetrics | null;
}

export interface FinancialsSectorMetrics {
  interest_income?: number | null;
  interest_expense?: number | null;
  net_interest_income?: number | null;
  gross_loan?: number | null;
  allowance_for_loans?: number | null;
  net_loan?: number | null;
  total_deposit?: number | null;
  current_account?: number | null;
  savings_account?: number | null;
  time_deposit?: number | null;
  total_cash_and_due_from_banks?: number | null;
  [key: string]: any;
}

export interface QuarterlyDates {
  [year: string]: string[];
}

// ─── API Functions ───────────────────────────────────────────────────────────

export async function getCompanyReport(
  symbol: string,
  sections: string[] = ['overview', 'financials', 'management', 'valuation']
): Promise<CompanyReport> {
  const sectionParam = sections.join(',');
  return sectorsGet<CompanyReport>(
    `/company/report/${symbol.toUpperCase()}/?sections=${sectionParam}`
  );
}

export async function getQuarterlyFinancials(
  symbol: string,
  nQuarters: number = 12
): Promise<QuarterlyFinancial[]> {
  return sectorsGet<QuarterlyFinancial[]>(
    `/financials/quarterly/${symbol.toUpperCase()}/?n_quarters=${nQuarters}`
  );
}

export async function getQuarterlyDates(symbol: string): Promise<QuarterlyDates> {
  return sectorsGet<QuarterlyDates>(
    `/financials/quarterly/dates/${symbol.toUpperCase()}/`
  );
}

export async function searchCompanies(q: string): Promise<Array<{ symbol: string; company_name: string }>> {
  return sectorsGet<Array<{ symbol: string; company_name: string }>>(
    `/screener/companies/?q=${encodeURIComponent(q)}&limit=10`
  );
}
