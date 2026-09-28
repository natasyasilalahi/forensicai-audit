import type { RedFlag } from './forensic';
import type { Language } from './translations';

export interface LocalizedFlag extends RedFlag {
  localizedTitle: string;
  localizedDescription: string;
  localizedDetail: string;
  implication?: string;
  recommendation?: string;
}

const EN_FLAG_MAP: Record<string, { title: string; description: string; detailPrefix?: string; implication: string; recommendation: string }> = {
  earnings_ocf_critical: {
    title: 'Earnings vs Operating Cash Flow Mismatch',
    description: 'Net income consistently outpaces operating cash flow by a wide margin — a strong indicator of accrual manipulation.',
    implication: 'Reported profits are largely book entries unsupported by real cash inflows, signaling high risk of future earnings restatements.',
    recommendation: 'Perform detailed cash reconciliation and scrutinize unbilled revenue accounts.',
  },
  earnings_ocf_high: {
    title: 'Potential Accrual Earnings Inflation',
    description: 'Net income periodically exceeds operating cash flow by a notable margin.',
    implication: 'Cash flow quality is deteriorating, potentially due to delayed collections or aggressive sales recognition.',
    recommendation: 'Monitor accounts receivable aging and quarterly cash collection efficiency.',
  },
  negative_ocf_latest: {
    title: 'Negative Operating Cash Flow Despite Positive Earnings',
    description: 'Latest quarter shows positive net income but severely negative operating cash flow.',
    implication: 'The company is burning operational cash despite reporting profits on the income statement.',
    recommendation: 'Investigate working capital drain, supplier payment terms, and inventory accumulation.',
  },
  revenue_ocf_divergence: {
    title: 'Rapid Revenue Growth Outpacing Cash Flow',
    description: 'Revenue grew substantially faster than operating cash flow — classic sign of premature revenue recognition.',
    implication: 'Revenue is likely being recognized before cash collection or through generous credit terms.',
    recommendation: 'Examine revenue recognition policies under PSAK 72 / IFRS 15 and customer credit terms.',
  },
  leverage_buildup: {
    title: 'Debt Accumulation Exceeding Asset Growth',
    description: 'Total debt is expanding significantly faster than productive assets — heightened leverage risk.',
    implication: 'The company is heavily leveraged, increasing vulnerability to interest rate spikes and refinancing hurdles.',
    recommendation: 'Assess debt maturity profile, interest coverage ratio (ICR), and debt covenant limits.',
  },
  poor_fcf_quality: {
    title: 'Recurring Negative Free Cash Flow',
    description: 'Over the last 6 quarters, Free Cash Flow (FCF) has frequently been negative despite positive reported earnings.',
    implication: 'Heavy capital expenditures or weak operational cash generation prevent self-sustaining operations.',
    recommendation: 'Evaluate capital expenditure return on investment (ROI) and dividend sustainability.',
  },
  margin_deterioration: {
    title: 'Significant Gross Margin Erosion',
    description: 'Gross margin has compressed substantially — indicating hidden cost inflation or aggressive pricing pressures.',
    implication: 'Core unit economics are weakening, which may tempt management to delay expense recognition.',
    recommendation: 'Audit Cost of Goods Sold (COGS) breakdown and inventory valuation methods.',
  },
  earnings_volatility: {
    title: 'Extreme Earnings Volatility',
    description: 'Net income repeatedly swings between positive and negative — indicator of earnings management or unstable core operations.',
    implication: 'Low predictability of earnings and potential smoothing via non-operating items.',
    recommendation: 'Separate core operating income from one-off gains, asset sales, and foreign exchange impacts.',
  },
  annual_earnings_vs_ocf: {
    title: 'Multi-Year Trend: Rising Earnings, Declining Cash Flow',
    description: 'Over the last 3 years, net profit increased while operating cash flow steadily declined.',
    implication: 'Long-term divergence is one of the most reliable forensic indicators of aggressive accounting.',
    recommendation: 'Conduct comprehensive multi-year accrual audit and compare with sector peers.',
  },
};

export function localizeRedFlag(flag: RedFlag, lang: Language): LocalizedFlag {
  if (lang === 'id') {
    return {
      ...flag,
      localizedTitle: flag.title,
      localizedDescription: flag.description,
      localizedDetail: flag.detail,
      implication: 'Memerlukan penelaahan mendalam terhadap pengakuan pendapatan dan rekonsiliasi kas operasional.',
      recommendation: 'Lakukan audit menyeluruh terhadap siklus piutang usaha dan verifikasi fisik persediaan aset.',
    };
  }

  // Handle dynamic accrual IDs like accrual_2024-03-31
  if (flag.id.startsWith('accrual_')) {
    const quarterDate = flag.id.replace('accrual_', '');
    return {
      ...flag,
      localizedTitle: `Elevated Accrual Ratio (${quarterDate})`,
      localizedDescription: 'Earnings accrual component is exceptionally high relative to total operating assets.',
      localizedDetail: flag.detail.replace('Accrual Ratio:', 'Accrual Ratio:').replace('Akrual =', 'Accruals ='),
      implication: 'High Sloan accruals historically predict mean-reverting and lower subsequent earnings persistence.',
      recommendation: 'Inspect non-cash current asset accounts and discretionary capitalization of costs.',
    };
  }

  const enInfo = EN_FLAG_MAP[flag.id];
  if (enInfo) {
    return {
      ...flag,
      localizedTitle: enInfo.title,
      localizedDescription: enInfo.description,
      localizedDetail: flag.detail, // contains numerical data
      implication: enInfo.implication,
      recommendation: enInfo.recommendation,
    };
  }

  // Fallback for custom or unknown IDs
  return {
    ...flag,
    localizedTitle: flag.title,
    localizedDescription: flag.description,
    localizedDetail: flag.detail,
    implication: 'Requires thorough review of revenue recognition and cash reconciliation.',
    recommendation: 'Perform detailed investigation of receivable aging and working capital.',
  };
}
