import type {
  CompanyReport,
  CompanyOverview,
  HistoricalFinancial,
  HistoricalFinancialRatio,
  QuarterlyFinancial,
  QuarterlyDates,
  FinancialsSectorMetrics,
} from './sectors';
import { IDX_STOCKS } from './stocks-db';
import { getStockProfile } from './stock-info';

// ─── Helper Dates ─────────────────────────────────────────────────────────────
const MOCK_QUARTER_DATES = [
  '2021-12-31',
  '2022-03-31',
  '2022-06-30',
  '2022-09-30',
  '2022-12-31',
  '2023-03-31',
  '2023-06-30',
  '2023-09-30',
  '2023-12-31',
  '2024-03-31',
  '2024-06-30',
  '2024-09-30',
];

// ─── Curated High-Fidelity Datasets ──────────────────────────────────────────

// 1. BBCA (Bank Central Asia) - Super sound banking, prime cash flow & provisions
const BBCA_QUARTERLY: QuarterlyFinancial[] = [
  {
    symbol: 'BBCA',
    date: '2021-12-31',
    revenue: 21_200_000_000_000,
    earnings: 8_500_000_000_000,
    operating_cash_flow: 11_200_000_000_000,
    investing_cash_flow: -2_100_000_000_000,
    financing_cash_flow: -4_200_000_000_000,
    net_cash_flow: 4_900_000_000_000,
    free_cash_flow: 9_800_000_000_000,
    total_assets: 1_228_000_000_000_000,
    total_equity: 203_000_000_000_000,
    total_liabilities: 1_025_000_000_000_000,
    total_debt: 12_500_000_000_000,
    cost_of_revenue: 3_800_000_000_000,
    gross_profit: 17_400_000_000_000,
    operating_expense: 7_100_000_000_000,
    ebit: 10_300_000_000_000,
    ebitda: 11_200_000_000_000,
    earnings_before_tax: 10_600_000_000_000,
    tax: 2_100_000_000_000,
    cash_only: 65_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 17_800_000_000_000,
      interest_expense: 2_600_000_000_000,
      net_interest_income: 15_200_000_000_000,
      gross_loan: 637_000_000_000_000,
      allowance_for_loans: 42_000_000_000_000,
      net_loan: 595_000_000_000_000,
      total_deposit: 975_000_000_000_000,
      current_account: 310_000_000_000_000,
      savings_account: 460_000_000_000_000,
      time_deposit: 205_000_000_000_000,
      total_cash_and_due_from_banks: 180_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2022-03-31',
    revenue: 20_500_000_000_000,
    earnings: 8_100_000_000_000,
    operating_cash_flow: 10_500_000_000_000,
    investing_cash_flow: -1_900_000_000_000,
    financing_cash_flow: -3_500_000_000_000,
    net_cash_flow: 5_100_000_000_000,
    free_cash_flow: 9_200_000_000_000,
    total_assets: 1_259_000_000_000_000,
    total_equity: 209_000_000_000_000,
    total_liabilities: 1_050_000_000_000_000,
    total_debt: 12_800_000_000_000,
    cost_of_revenue: 3_600_000_000_000,
    gross_profit: 16_900_000_000_000,
    operating_expense: 7_000_000_000_000,
    ebit: 9_900_000_000_000,
    ebitda: 10_800_000_000_000,
    earnings_before_tax: 10_200_000_000_000,
    tax: 2_100_000_000_000,
    cash_only: 68_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 17_500_000_000_000,
      interest_expense: 2_400_000_000_000,
      net_interest_income: 15_100_000_000_000,
      gross_loan: 656_000_000_000_000,
      allowance_for_loans: 43_500_000_000_000,
      net_loan: 612_500_000_000_000,
      total_deposit: 998_000_000_000_000,
      current_account: 320_000_000_000_000,
      savings_account: 475_000_000_000_000,
      time_deposit: 203_000_000_000_000,
      total_cash_and_due_from_banks: 185_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2022-06-30',
    revenue: 21_900_000_000_000,
    earnings: 9_900_000_000_000,
    operating_cash_flow: 12_000_000_000_000,
    investing_cash_flow: -2_400_000_000_000,
    financing_cash_flow: -4_100_000_000_000,
    net_cash_flow: 5_500_000_000_000,
    free_cash_flow: 10_600_000_000_000,
    total_assets: 1_264_000_000_000_000,
    total_equity: 212_000_000_000_000,
    total_liabilities: 1_052_000_000_000_000,
    total_debt: 13_000_000_000_000,
    cost_of_revenue: 3_800_000_000_000,
    gross_profit: 18_100_000_000_000,
    operating_expense: 7_300_000_000_000,
    ebit: 10_800_000_000_000,
    ebitda: 11_800_000_000_000,
    earnings_before_tax: 12_400_000_000_000,
    tax: 2_500_000_000_000,
    cash_only: 72_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 18_600_000_000_000,
      interest_expense: 2_500_000_000_000,
      net_interest_income: 16_100_000_000_000,
      gross_loan: 675_000_000_000_000,
      allowance_for_loans: 44_200_000_000_000,
      net_loan: 630_800_000_000_000,
      total_deposit: 1_011_000_000_000_000,
      current_account: 330_000_000_000_000,
      savings_account: 485_000_000_000_000,
      time_deposit: 196_000_000_000_000,
      total_cash_and_due_from_banks: 190_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2022-09-30',
    revenue: 22_400_000_000_000,
    earnings: 10_900_000_000_000,
    operating_cash_flow: 13_200_000_000_000,
    investing_cash_flow: -2_600_000_000_000,
    financing_cash_flow: -4_300_000_000_000,
    net_cash_flow: 6_300_000_000_000,
    free_cash_flow: 11_800_000_000_000,
    total_assets: 1_284_000_000_000_000,
    total_equity: 218_000_000_000_000,
    total_liabilities: 1_066_000_000_000_000,
    total_debt: 13_200_000_000_000,
    cost_of_revenue: 3_900_000_000_000,
    gross_profit: 18_500_000_000_000,
    operating_expense: 7_400_000_000_000,
    ebit: 11_100_000_000_000,
    ebitda: 12_100_000_000_000,
    earnings_before_tax: 13_600_000_000_000,
    tax: 2_700_000_000_000,
    cash_only: 75_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 19_200_000_000_000,
      interest_expense: 2_600_000_000_000,
      net_interest_income: 16_600_000_000_000,
      gross_loan: 692_000_000_000_000,
      allowance_for_loans: 45_000_000_000_000,
      net_loan: 647_000_000_000_000,
      total_deposit: 1_025_000_000_000_000,
      current_account: 340_000_000_000_000,
      savings_account: 495_000_000_000_000,
      time_deposit: 190_000_000_000_000,
      total_cash_and_due_from_banks: 195_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2022-12-31',
    revenue: 22_600_000_000_000,
    earnings: 11_800_000_000_000,
    operating_cash_flow: 14_100_000_000_000,
    investing_cash_flow: -3_000_000_000_000,
    financing_cash_flow: -4_800_000_000_000,
    net_cash_flow: 6_300_000_000_000,
    free_cash_flow: 12_500_000_000_000,
    total_assets: 1_314_000_000_000_000,
    total_equity: 221_000_000_000_000,
    total_liabilities: 1_093_000_000_000_000,
    total_debt: 13_500_000_000_000,
    cost_of_revenue: 4_000_000_000_000,
    gross_profit: 18_600_000_000_000,
    operating_expense: 7_600_000_000_000,
    ebit: 11_000_000_000_000,
    ebitda: 12_200_000_000_000,
    earnings_before_tax: 14_800_000_000_000,
    tax: 3_000_000_000_000,
    cash_only: 81_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 19_800_000_000_000,
      interest_expense: 2_700_000_000_000,
      net_interest_income: 17_100_000_000_000,
      gross_loan: 711_000_000_000_000,
      allowance_for_loans: 46_200_000_000_000,
      net_loan: 664_800_000_000_000,
      total_deposit: 1_040_000_000_000_000,
      current_account: 350_000_000_000_000,
      savings_account: 505_000_000_000_000,
      time_deposit: 185_000_000_000_000,
      total_cash_and_due_from_banks: 202_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2023-03-31',
    revenue: 24_600_000_000_000,
    earnings: 11_500_000_000_000,
    operating_cash_flow: 13_800_000_000_000,
    investing_cash_flow: -2_800_000_000_000,
    financing_cash_flow: -4_500_000_000_000,
    net_cash_flow: 6_500_000_000_000,
    free_cash_flow: 12_200_000_000_000,
    total_assets: 1_321_000_000_000_000,
    total_equity: 228_000_000_000_000,
    total_liabilities: 1_093_000_000_000_000,
    total_debt: 13_600_000_000_000,
    cost_of_revenue: 4_200_000_000_000,
    gross_profit: 20_400_000_000_000,
    operating_expense: 7_800_000_000_000,
    ebit: 12_600_000_000_000,
    ebitda: 13_800_000_000_000,
    earnings_before_tax: 14_400_000_000_000,
    tax: 2_900_000_000_000,
    cash_only: 85_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 21_200_000_000_000,
      interest_expense: 2_800_000_000_000,
      net_interest_income: 18_400_000_000_000,
      gross_loan: 730_000_000_000_000,
      allowance_for_loans: 47_100_000_000_000,
      net_loan: 682_900_000_000_000,
      total_deposit: 1_045_000_000_000_000,
      current_account: 355_000_000_000_000,
      savings_account: 510_000_000_000_000,
      time_deposit: 180_000_000_000_000,
      total_cash_and_due_from_banks: 208_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2023-06-30',
    revenue: 25_100_000_000_000,
    earnings: 12_700_000_000_000,
    operating_cash_flow: 15_200_000_000_000,
    investing_cash_flow: -3_100_000_000_000,
    financing_cash_flow: -4_900_000_000_000,
    net_cash_flow: 7_200_000_000_000,
    free_cash_flow: 13_500_000_000_000,
    total_assets: 1_356_000_000_000_000,
    total_equity: 236_000_000_000_000,
    total_liabilities: 1_120_000_000_000_000,
    total_debt: 13_900_000_000_000,
    cost_of_revenue: 4_400_000_000_000,
    gross_profit: 20_700_000_000_000,
    operating_expense: 8_100_000_000_000,
    ebit: 12_600_000_000_000,
    ebitda: 13_900_000_000_000,
    earnings_before_tax: 15_900_000_000_000,
    tax: 3_200_000_000_000,
    cash_only: 90_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 22_000_000_000_000,
      interest_expense: 2_950_000_000_000,
      net_interest_income: 19_050_000_000_000,
      gross_loan: 752_000_000_000_000,
      allowance_for_loans: 48_500_000_000_000,
      net_loan: 703_500_000_000_000,
      total_deposit: 1_070_000_000_000_000,
      current_account: 365_000_000_000_000,
      savings_account: 525_000_000_000_000,
      time_deposit: 180_000_000_000_000,
      total_cash_and_due_from_banks: 215_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2023-09-30',
    revenue: 25_800_000_000_000,
    earnings: 12_200_000_000_000,
    operating_cash_flow: 14_900_000_000_000,
    investing_cash_flow: -3_300_000_000_000,
    financing_cash_flow: -5_100_000_000_000,
    net_cash_flow: 6_500_000_000_000,
    free_cash_flow: 13_100_000_000_000,
    total_assets: 1_381_000_000_000_000,
    total_equity: 242_000_000_000_000,
    total_liabilities: 1_139_000_000_000_000,
    total_debt: 14_200_000_000_000,
    cost_of_revenue: 4_600_000_000_000,
    gross_profit: 21_200_000_000_000,
    operating_expense: 8_300_000_000_000,
    ebit: 12_900_000_000_000,
    ebitda: 14_200_000_000_000,
    earnings_before_tax: 15_300_000_000_000,
    tax: 3_100_000_000_000,
    cash_only: 94_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 22_800_000_000_000,
      interest_expense: 3_100_000_000_000,
      net_interest_income: 19_700_000_000_000,
      gross_loan: 775_000_000_000_000,
      allowance_for_loans: 49_800_000_000_000,
      net_loan: 725_200_000_000_000,
      total_deposit: 1_090_000_000_000_000,
      current_account: 375_000_000_000_000,
      savings_account: 535_000_000_000_000,
      time_deposit: 180_000_000_000_000,
      total_cash_and_due_from_banks: 222_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2023-12-31',
    revenue: 26_200_000_000_000,
    earnings: 12_300_000_000_000,
    operating_cash_flow: 15_600_000_000_000,
    investing_cash_flow: -3_500_000_000_000,
    financing_cash_flow: -5_400_000_000_000,
    net_cash_flow: 6_700_000_000_000,
    free_cash_flow: 13_800_000_000_000,
    total_assets: 1_408_000_000_000_000,
    total_equity: 245_000_000_000_000,
    total_liabilities: 1_163_000_000_000_000,
    total_debt: 14_500_000_000_000,
    cost_of_revenue: 4_700_000_000_000,
    gross_profit: 21_500_000_000_000,
    operating_expense: 8_500_000_000_000,
    ebit: 13_000_000_000_000,
    ebitda: 14_400_000_000_000,
    earnings_before_tax: 15_400_000_000_000,
    tax: 3_100_000_000_000,
    cash_only: 98_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 23_400_000_000_000,
      interest_expense: 3_250_000_000_000,
      net_interest_income: 20_150_000_000_000,
      gross_loan: 810_000_000_000_000,
      allowance_for_loans: 51_500_000_000_000,
      net_loan: 758_500_000_000_000,
      total_deposit: 1_102_000_000_000_000,
      current_account: 380_000_000_000_000,
      savings_account: 542_000_000_000_000,
      time_deposit: 180_000_000_000_000,
      total_cash_and_due_from_banks: 230_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2024-03-31',
    revenue: 27_100_000_000_000,
    earnings: 12_900_000_000_000,
    operating_cash_flow: 16_100_000_000_000,
    investing_cash_flow: -3_700_000_000_000,
    financing_cash_flow: -5_800_000_000_000,
    net_cash_flow: 6_600_000_000_000,
    free_cash_flow: 14_200_000_000_000,
    total_assets: 1_438_000_000_000_000,
    total_equity: 254_000_000_000_000,
    total_liabilities: 1_184_000_000_000_000,
    total_debt: 14_800_000_000_000,
    cost_of_revenue: 4_900_000_000_000,
    gross_profit: 22_200_000_000_000,
    operating_expense: 8_700_000_000_000,
    ebit: 13_500_000_000_000,
    ebitda: 14_900_000_000_000,
    earnings_before_tax: 16_200_000_000_000,
    tax: 3_300_000_000_000,
    cash_only: 104_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 24_300_000_000_000,
      interest_expense: 3_400_000_000_000,
      net_interest_income: 20_900_000_000_000,
      gross_loan: 835_000_000_000_000,
      allowance_for_loans: 53_000_000_000_000,
      net_loan: 782_000_000_000_000,
      total_deposit: 1_125_000_000_000_000,
      current_account: 395_000_000_000_000,
      savings_account: 550_000_000_000_000,
      time_deposit: 180_000_000_000_000,
      total_cash_and_due_from_banks: 240_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2024-06-30',
    revenue: 27_800_000_000_000,
    earnings: 13_800_000_000_000,
    operating_cash_flow: 17_400_000_000_000,
    investing_cash_flow: -4_000_000_000_000,
    financing_cash_flow: -6_200_000_000_000,
    net_cash_flow: 7_200_000_000_000,
    free_cash_flow: 15_400_000_000_000,
    total_assets: 1_460_000_000_000_000,
    total_equity: 261_000_000_000_000,
    total_liabilities: 1_199_000_000_000_000,
    total_debt: 15_100_000_000_000,
    cost_of_revenue: 5_100_000_000_000,
    gross_profit: 22_700_000_000_000,
    operating_expense: 8_900_000_000_000,
    ebit: 13_800_000_000_000,
    ebitda: 15_300_000_000_000,
    earnings_before_tax: 17_300_000_000_000,
    tax: 3_500_000_000_000,
    cash_only: 110_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 25_100_000_000_000,
      interest_expense: 3_550_000_000_000,
      net_interest_income: 21_550_000_000_000,
      gross_loan: 850_000_000_000_000,
      allowance_for_loans: 54_200_000_000_000,
      net_loan: 795_800_000_000_000,
      total_deposit: 1_145_000_000_000_000,
      current_account: 405_000_000_000_000,
      savings_account: 560_000_000_000_000,
      time_deposit: 180_000_000_000_000,
      total_cash_and_due_from_banks: 248_000_000_000_000,
    },
  },
  {
    symbol: 'BBCA',
    date: '2024-09-30',
    revenue: 28_500_000_000_000,
    earnings: 14_400_000_000_000,
    operating_cash_flow: 18_200_000_000_000,
    investing_cash_flow: -4_200_000_000_000,
    financing_cash_flow: -6_500_000_000_000,
    net_cash_flow: 7_500_000_000_000,
    free_cash_flow: 16_100_000_000_000,
    total_assets: 1_472_000_000_000_000,
    total_equity: 268_000_000_000_000,
    total_liabilities: 1_204_000_000_000_000,
    total_debt: 15_400_000_000_000,
    cost_of_revenue: 5_200_000_000_000,
    gross_profit: 23_300_000_000_000,
    operating_expense: 9_100_000_000_000,
    ebit: 14_200_000_000_000,
    ebitda: 15_800_000_000_000,
    earnings_before_tax: 18_100_000_000_000,
    tax: 3_700_000_000_000,
    cash_only: 115_000_000_000_000,
    financials_sector_metrics: {
      interest_income: 25_800_000_000_000,
      interest_expense: 3_700_000_000_000,
      net_interest_income: 22_100_000_000_000,
      gross_loan: 877_000_000_000_000,
      allowance_for_loans: 55_600_000_000_000,
      net_loan: 821_400_000_000_000,
      total_deposit: 1_160_000_000_000_000,
      current_account: 415_000_000_000_000,
      savings_account: 565_000_000_000_000,
      time_deposit: 180_000_000_000_000,
      total_cash_and_due_from_banks: 255_000_000_000_000,
    },
  },
];

// 2. GOTO (GoTo Gojek Tokopedia) - High tech burn, negative FCF, accrual gap
const GOTO_QUARTERLY: QuarterlyFinancial[] = [
  {
    symbol: 'GOTO',
    date: '2021-12-31',
    revenue: 2_100_000_000_000,
    earnings: -6_200_000_000_000,
    operating_cash_flow: -5_400_000_000_000,
    investing_cash_flow: -1_200_000_000_000,
    financing_cash_flow: 18_500_000_000_000,
    net_cash_flow: 11_900_000_000_000,
    free_cash_flow: -6_100_000_000_000,
    total_assets: 155_000_000_000_000,
    total_equity: 138_000_000_000_000,
    total_liabilities: 17_000_000_000_000,
    total_debt: 2_500_000_000_000,
    cost_of_revenue: 1_900_000_000_000,
    gross_profit: 200_000_000_000,
    operating_expense: 6_800_000_000_000,
    ebit: -6_600_000_000_000,
    ebitda: -5_900_000_000_000,
    earnings_before_tax: -6_100_000_000_000,
    tax: 100_000_000_000,
    cash_only: 31_000_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2022-03-31',
    revenue: 2_450_000_000_000,
    earnings: -6_500_000_000_000,
    operating_cash_flow: -5_200_000_000_000,
    investing_cash_flow: -800_000_000_000,
    financing_cash_flow: 13_800_000_000_000,
    net_cash_flow: 7_800_000_000_000,
    free_cash_flow: -5_800_000_000_000,
    total_assets: 152_000_000_000_000,
    total_equity: 134_000_000_000_000,
    total_liabilities: 18_000_000_000_000,
    total_debt: 2_800_000_000_000,
    cost_of_revenue: 2_100_000_000_000,
    gross_profit: 350_000_000_000,
    operating_expense: 6_900_000_000_000,
    ebit: -6_550_000_000_000,
    ebitda: -5_800_000_000_000,
    earnings_before_tax: -6_400_000_000_000,
    tax: 100_000_000_000,
    cash_only: 29_000_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2022-06-30',
    revenue: 2_950_000_000_000,
    earnings: -7_100_000_000_000,
    operating_cash_flow: -4_900_000_000_000,
    investing_cash_flow: -650_000_000_000,
    financing_cash_flow: -200_000_000_000,
    net_cash_flow: -5_750_000_000_000,
    free_cash_flow: -5_400_000_000_000,
    total_assets: 147_000_000_000_000,
    total_equity: 128_000_000_000_000,
    total_liabilities: 19_000_000_000_000,
    total_debt: 3_100_000_000_000,
    cost_of_revenue: 2_400_000_000_000,
    gross_profit: 550_000_000_000,
    operating_expense: 7_600_000_000_000,
    ebit: -7_050_000_000_000,
    ebitda: -6_200_000_000_000,
    earnings_before_tax: -7_000_000_000_000,
    tax: 100_000_000_000,
    cash_only: 26_500_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2022-09-30',
    revenue: 3_150_000_000_000,
    earnings: -6_700_000_000_000,
    operating_cash_flow: -4_400_000_000_000,
    investing_cash_flow: -500_000_000_000,
    financing_cash_flow: -150_000_000_000,
    net_cash_flow: -5_050_000_000_000,
    free_cash_flow: -4_850_000_000_000,
    total_assets: 142_000_000_000_000,
    total_equity: 122_000_000_000_000,
    total_liabilities: 20_000_000_000_000,
    total_debt: 3_400_000_000_000,
    cost_of_revenue: 2_500_000_000_000,
    gross_profit: 650_000_000_000,
    operating_expense: 7_300_000_000_000,
    ebit: -6_650_000_000_000,
    ebitda: -5_750_000_000_000,
    earnings_before_tax: -6_600_000_000_000,
    tax: 100_000_000_000,
    cash_only: 24_000_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2022-12-31',
    revenue: 3_350_000_000_000,
    earnings: -19_500_000_000_000, // Year-end massive goodwill impairment
    operating_cash_flow: -3_900_000_000_000,
    investing_cash_flow: -450_000_000_000,
    financing_cash_flow: -100_000_000_000,
    net_cash_flow: -4_450_000_000_000,
    free_cash_flow: -4_300_000_000_000,
    total_assets: 121_000_000_000_000,
    total_equity: 103_000_000_000_000,
    total_liabilities: 18_000_000_000_000,
    total_debt: 3_600_000_000_000,
    cost_of_revenue: 2_600_000_000_000,
    gross_profit: 750_000_000_000,
    operating_expense: 20_200_000_000_000,
    ebit: -19_450_000_000_000,
    ebitda: -4_900_000_000_000,
    earnings_before_tax: -19_400_000_000_000,
    tax: 100_000_000_000,
    cash_only: 21_000_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2023-03-31',
    revenue: 3_330_000_000_000,
    earnings: -3_900_000_000_000,
    operating_cash_flow: -2_800_000_000_000,
    investing_cash_flow: -300_000_000_000,
    financing_cash_flow: -80_000_000_000,
    net_cash_flow: -3_180_000_000_000,
    free_cash_flow: -3_050_000_000_000,
    total_assets: 118_000_000_000_000,
    total_equity: 99_000_000_000_000,
    total_liabilities: 19_000_000_000_000,
    total_debt: 3_800_000_000_000,
    cost_of_revenue: 2_450_000_000_000,
    gross_profit: 880_000_000_000,
    operating_expense: 4_700_000_000_000,
    ebit: -3_820_000_000_000,
    ebitda: -2_900_000_000_000,
    earnings_before_tax: -3_850_000_000_000,
    tax: 50_000_000_000,
    cash_only: 18_500_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2023-06-30',
    revenue: 3_550_000_000_000,
    earnings: -3_300_000_000_000,
    operating_cash_flow: -2_100_000_000_000,
    investing_cash_flow: -250_000_000_000,
    financing_cash_flow: -60_000_000_000,
    net_cash_flow: -2_410_000_000_000,
    free_cash_flow: -2_300_000_000_000,
    total_assets: 115_000_000_000_000,
    total_equity: 96_000_000_000_000,
    total_liabilities: 19_000_000_000_000,
    total_debt: 3_900_000_000_000,
    cost_of_revenue: 2_500_000_000_000,
    gross_profit: 1_050_000_000_000,
    operating_expense: 4_300_000_000_000,
    ebit: -3_250_000_000_000,
    ebitda: -2_200_000_000_000,
    earnings_before_tax: -3_250_000_000_000,
    tax: 50_000_000_000,
    cash_only: 16_800_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2023-09-30',
    revenue: 3_620_000_000_000,
    earnings: -2_400_000_000_000,
    operating_cash_flow: -1_400_000_000_000,
    investing_cash_flow: -200_000_000_000,
    financing_cash_flow: -50_000_000_000,
    net_cash_flow: -1_650_000_000_000,
    free_cash_flow: -1_550_000_000_000,
    total_assets: 113_000_000_000_000,
    total_equity: 94_000_000_000_000,
    total_liabilities: 19_000_000_000_000,
    total_debt: 4_000_000_000_000,
    cost_of_revenue: 2_450_000_000_000,
    gross_profit: 1_170_000_000_000,
    operating_expense: 3_500_000_000_000,
    ebit: -2_330_000_000_000,
    ebitda: -1_350_000_000_000,
    earnings_before_tax: -2_360_000_000_000,
    tax: 40_000_000_000,
    cash_only: 15_400_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2023-12-31',
    revenue: 4_280_000_000_000,
    earnings: -80_500_000_000_000, // Deconsolidation of Tokopedia & Goodwill write-down
    operating_cash_flow: -850_000_000_000,
    investing_cash_flow: 12_000_000_000_000, // TikTok investment consideration
    financing_cash_flow: -100_000_000_000,
    net_cash_flow: 11_050_000_000_000,
    free_cash_flow: -980_000_000_000,
    total_assets: 54_000_000_000_000,
    total_equity: 36_000_000_000_000,
    total_liabilities: 18_000_000_000_000,
    total_debt: 4_100_000_000_000,
    cost_of_revenue: 2_600_000_000_000,
    gross_profit: 1_680_000_000_000,
    operating_expense: 82_000_000_000_000,
    ebit: -80_320_000_000_000,
    ebitda: -750_000_000_000,
    earnings_before_tax: -80_450_000_000_000,
    tax: 50_000_000_000,
    cash_only: 26_200_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2024-03-31',
    revenue: 3_950_000_000_000,
    earnings: 450_000_000_000, // Paper gain / deconsolidation accounting profit
    operating_cash_flow: -520_000_000_000, // Negative OCF creates divergence
    investing_cash_flow: -150_000_000_000,
    financing_cash_flow: -40_000_000_000,
    net_cash_flow: -710_000_000_000,
    free_cash_flow: -610_000_000_000,
    total_assets: 53_200_000_000_000,
    total_equity: 35_100_000_000_000,
    total_liabilities: 18_100_000_000_000,
    total_debt: 4_150_000_000_000,
    cost_of_revenue: 2_200_000_000_000,
    gross_profit: 1_750_000_000_000,
    operating_expense: 2_600_000_000_000,
    ebit: 420_000_000_000,
    ebitda: 610_000_000_000,
    earnings_before_tax: 470_000_000_000,
    tax: 20_000_000_000,
    cash_only: 25_600_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2024-06-30',
    revenue: 4_150_000_000_000,
    earnings: 380_000_000_000,
    operating_cash_flow: -380_000_000_000,
    investing_cash_flow: -120_000_000_000,
    financing_cash_flow: -30_000_000_000,
    net_cash_flow: -530_000_000_000,
    free_cash_flow: -460_000_000_000,
    total_assets: 52_400_000_000_000,
    total_equity: 34_200_000_000_000,
    total_liabilities: 18_200_000_000_000,
    total_debt: 4_200_000_000_000,
    cost_of_revenue: 2_300_000_000_000,
    gross_profit: 1_850_000_000_000,
    operating_expense: 2_780_000_000_000,
    ebit: 350_000_000_000,
    ebitda: 520_000_000_000,
    earnings_before_tax: 400_000_000_000,
    tax: 20_000_000_000,
    cash_only: 25_200_000_000_000,
  },
  {
    symbol: 'GOTO',
    date: '2024-09-30',
    revenue: 4_420_000_000_000,
    earnings: 520_000_000_000,
    operating_cash_flow: -310_000_000_000, // Negative OCF vs positive earnings
    investing_cash_flow: -90_000_000_000,
    financing_cash_flow: -20_000_000_000,
    net_cash_flow: -420_000_000_000,
    free_cash_flow: -390_000_000_000,
    total_assets: 51_900_000_000_000,
    total_equity: 33_600_000_000_000,
    total_liabilities: 18_300_000_000_000,
    total_debt: 4_250_000_000_000,
    cost_of_revenue: 2_400_000_000_000,
    gross_profit: 2_020_000_000_000,
    operating_expense: 2_650_000_000_000,
    ebit: 490_000_000_000,
    ebitda: 660_000_000_000,
    earnings_before_tax: 540_000_000_000,
    tax: 20_000_000_000,
    cash_only: 24_800_000_000_000,
  },
];

// 3. TLKM (Telkom Indonesia) - Strong infrastructure cash flow, high capex, solid telecom
const TLKM_QUARTERLY: QuarterlyFinancial[] = [
  {
    symbol: 'TLKM',
    date: '2021-12-31',
    revenue: 35_900_000_000_000,
    earnings: 6_200_000_000_000,
    operating_cash_flow: 12_800_000_000_000,
    investing_cash_flow: -7_200_000_000_000,
    financing_cash_flow: -4_100_000_000_000,
    net_cash_flow: 1_500_000_000_000,
    free_cash_flow: 5_600_000_000_000,
    total_assets: 277_000_000_000_000,
    total_equity: 145_000_000_000_000,
    total_liabilities: 132_000_000_000_000,
    total_debt: 58_000_000_000_000,
    cost_of_revenue: 12_400_000_000_000,
    gross_profit: 23_500_000_000_000,
    operating_expense: 14_800_000_000_000,
    ebit: 8_700_000_000_000,
    ebitda: 18_500_000_000_000,
    earnings_before_tax: 8_100_000_000_000,
    tax: 1_900_000_000_000,
    cash_only: 38_000_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2022-03-31',
    revenue: 36_800_000_000_000,
    earnings: 6_400_000_000_000,
    operating_cash_flow: 13_100_000_000_000,
    investing_cash_flow: -7_500_000_000_000,
    financing_cash_flow: -4_200_000_000_000,
    net_cash_flow: 1_400_000_000_000,
    free_cash_flow: 5_600_000_000_000,
    total_assets: 280_000_000_000_000,
    total_equity: 148_000_000_000_000,
    total_liabilities: 132_000_000_000_000,
    total_debt: 59_000_000_000_000,
    cost_of_revenue: 12_800_000_000_000,
    gross_profit: 24_000_000_000_000,
    operating_expense: 15_100_000_000_000,
    ebit: 8_900_000_000_000,
    ebitda: 18_800_000_000_000,
    earnings_before_tax: 8_300_000_000_000,
    tax: 1_900_000_000_000,
    cash_only: 39_500_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2022-06-30',
    revenue: 37_400_000_000_000,
    earnings: 6_700_000_000_000,
    operating_cash_flow: 13_500_000_000_000,
    investing_cash_flow: -7_800_000_000_000,
    financing_cash_flow: -4_500_000_000_000,
    net_cash_flow: 1_200_000_000_000,
    free_cash_flow: 5_700_000_000_000,
    total_assets: 284_000_000_000_000,
    total_equity: 150_000_000_000_000,
    total_liabilities: 134_000_000_000_000,
    total_debt: 60_000_000_000_000,
    cost_of_revenue: 13_100_000_000_000,
    gross_profit: 24_300_000_000_000,
    operating_expense: 15_300_000_000_000,
    ebit: 9_000_000_000_000,
    ebitda: 19_100_000_000_000,
    earnings_before_tax: 8_600_000_000_000,
    tax: 1_900_000_000_000,
    cash_only: 40_200_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2022-09-30',
    revenue: 37_900_000_000_000,
    earnings: 6_800_000_000_000,
    operating_cash_flow: 13_900_000_000_000,
    investing_cash_flow: -8_100_000_000_000,
    financing_cash_flow: -4_700_000_000_000,
    net_cash_flow: 1_100_000_000_000,
    free_cash_flow: 5_800_000_000_000,
    total_assets: 287_000_000_000_000,
    total_equity: 152_000_000_000_000,
    total_liabilities: 135_000_000_000_000,
    total_debt: 61_000_000_000_000,
    cost_of_revenue: 13_300_000_000_000,
    gross_profit: 24_600_000_000_000,
    operating_expense: 15_500_000_000_000,
    ebit: 9_100_000_000_000,
    ebitda: 19_300_000_000_000,
    earnings_before_tax: 8_800_000_000_000,
    tax: 2_000_000_000_000,
    cash_only: 41_000_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2022-12-31',
    revenue: 38_500_000_000_000,
    earnings: 6_900_000_000_000,
    operating_cash_flow: 14_200_000_000_000,
    investing_cash_flow: -8_500_000_000_000,
    financing_cash_flow: -4_900_000_000_000,
    net_cash_flow: 800_000_000_000,
    free_cash_flow: 5_700_000_000_000,
    total_assets: 290_000_000_000_000,
    total_equity: 154_000_000_000_000,
    total_liabilities: 136_000_000_000_000,
    total_debt: 62_000_000_000_000,
    cost_of_revenue: 13_600_000_000_000,
    gross_profit: 24_900_000_000_000,
    operating_expense: 15_800_000_000_000,
    ebit: 9_100_000_000_000,
    ebitda: 19_500_000_000_000,
    earnings_before_tax: 8_900_000_000_000,
    tax: 2_000_000_000_000,
    cash_only: 41_800_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2023-03-31',
    revenue: 38_800_000_000_000,
    earnings: 6_800_000_000_000,
    operating_cash_flow: 14_000_000_000_000,
    investing_cash_flow: -8_200_000_000_000,
    financing_cash_flow: -4_600_000_000_000,
    net_cash_flow: 1_200_000_000_000,
    free_cash_flow: 5_800_000_000_000,
    total_assets: 293_000_000_000_000,
    total_equity: 156_000_000_000_000,
    total_liabilities: 137_000_000_000_000,
    total_debt: 62_500_000_000_000,
    cost_of_revenue: 13_700_000_000_000,
    gross_profit: 25_100_000_000_000,
    operating_expense: 15_900_000_000_000,
    ebit: 9_200_000_000_000,
    ebitda: 19_600_000_000_000,
    earnings_before_tax: 8_800_000_000_000,
    tax: 2_000_000_000_000,
    cash_only: 42_500_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2023-06-30',
    revenue: 39_200_000_000_000,
    earnings: 6_950_000_000_000,
    operating_cash_flow: 14_400_000_000_000,
    investing_cash_flow: -8_500_000_000_000,
    financing_cash_flow: -4_800_000_000_000,
    net_cash_flow: 1_100_000_000_000,
    free_cash_flow: 5_900_000_000_000,
    total_assets: 296_000_000_000_000,
    total_equity: 158_000_000_000_000,
    total_liabilities: 138_000_000_000_000,
    total_debt: 63_000_000_000_000,
    cost_of_revenue: 13_900_000_000_000,
    gross_profit: 25_300_000_000_000,
    operating_expense: 16_100_000_000_000,
    ebit: 9_200_000_000_000,
    ebitda: 19_800_000_000_000,
    earnings_before_tax: 8_950_000_000_000,
    tax: 2_000_000_000_000,
    cash_only: 43_200_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2023-09-30',
    revenue: 39_700_000_000_000,
    earnings: 7_100_000_000_000,
    operating_cash_flow: 14_800_000_000_000,
    investing_cash_flow: -8_700_000_000_000,
    financing_cash_flow: -5_000_000_000_000,
    net_cash_flow: 1_100_000_000_000,
    free_cash_flow: 6_100_000_000_000,
    total_assets: 299_000_000_000_000,
    total_equity: 160_000_000_000_000,
    total_liabilities: 139_000_000_000_000,
    total_debt: 63_500_000_000_000,
    cost_of_revenue: 14_100_000_000_000,
    gross_profit: 25_600_000_000_000,
    operating_expense: 16_300_000_000_000,
    ebit: 9_300_000_000_000,
    ebitda: 20_000_000_000_000,
    earnings_before_tax: 9_100_000_000_000,
    tax: 2_000_000_000_000,
    cash_only: 44_000_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2023-12-31',
    revenue: 40_200_000_000_000,
    earnings: 7_250_000_000_000,
    operating_cash_flow: 15_100_000_000_000,
    investing_cash_flow: -9_000_000_000_000,
    financing_cash_flow: -5_200_000_000_000,
    net_cash_flow: 900_000_000_000,
    free_cash_flow: 6_100_000_000_000,
    total_assets: 302_000_000_000_000,
    total_equity: 162_000_000_000_000,
    total_liabilities: 140_000_000_000_000,
    total_debt: 64_000_000_000_000,
    cost_of_revenue: 14_300_000_000_000,
    gross_profit: 25_900_000_000_000,
    operating_expense: 16_500_000_000_000,
    ebit: 9_400_000_000_000,
    ebitda: 20_200_000_000_000,
    earnings_before_tax: 9_350_000_000_000,
    tax: 2_100_000_000_000,
    cash_only: 44_800_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2024-03-31',
    revenue: 40_700_000_000_000,
    earnings: 7_150_000_000_000,
    operating_cash_flow: 14_900_000_000_000,
    investing_cash_flow: -8_800_000_000_000,
    financing_cash_flow: -5_100_000_000_000,
    net_cash_flow: 1_000_000_000_000,
    free_cash_flow: 6_100_000_000_000,
    total_assets: 305_000_000_000_000,
    total_equity: 164_000_000_000_000,
    total_liabilities: 141_000_000_000_000,
    total_debt: 64_500_000_000_000,
    cost_of_revenue: 14_500_000_000_000,
    gross_profit: 26_200_000_000_000,
    operating_expense: 16_700_000_000_000,
    ebit: 9_500_000_000_000,
    ebitda: 20_400_000_000_000,
    earnings_before_tax: 9_250_000_000_000,
    tax: 2_100_000_000_000,
    cash_only: 45_500_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2024-06-30',
    revenue: 41_200_000_000_000,
    earnings: 7_300_000_000_000,
    operating_cash_flow: 15_300_000_000_000,
    investing_cash_flow: -9_100_000_000_000,
    financing_cash_flow: -5_300_000_000_000,
    net_cash_flow: 900_000_000_000,
    free_cash_flow: 6_200_000_000_000,
    total_assets: 308_000_000_000_000,
    total_equity: 166_000_000_000_000,
    total_liabilities: 142_000_000_000_000,
    total_debt: 65_000_000_000_000,
    cost_of_revenue: 14_700_000_000_000,
    gross_profit: 26_500_000_000_000,
    operating_expense: 16_900_000_000_000,
    ebit: 9_600_000_000_000,
    ebitda: 20_700_000_000_000,
    earnings_before_tax: 9_400_000_000_000,
    tax: 2_100_000_000_000,
    cash_only: 46_200_000_000_000,
  },
  {
    symbol: 'TLKM',
    date: '2024-09-30',
    revenue: 41_800_000_000_000,
    earnings: 7_450_000_000_000,
    operating_cash_flow: 15_600_000_000_000,
    investing_cash_flow: -9_300_000_000_000,
    financing_cash_flow: -5_400_000_000_000,
    net_cash_flow: 900_000_000_000,
    free_cash_flow: 6_300_000_000_000,
    total_assets: 311_000_000_000_000,
    total_equity: 168_000_000_000_000,
    total_liabilities: 143_000_000_000_000,
    total_debt: 65_500_000_000_000,
    cost_of_revenue: 14_900_000_000_000,
    gross_profit: 26_900_000_000_000,
    operating_expense: 17_100_000_000_000,
    ebit: 9_800_000_000_000,
    ebitda: 21_000_000_000_000,
    earnings_before_tax: 9_650_000_000_000,
    tax: 2_200_000_000_000,
    cash_only: 47_000_000_000_000,
  },
];

// Helper to scale curated data for peer banks (BBRI, BMRI, BBNI)
function createBankQuarterly(
  symbol: string,
  scale: number,
  ocfMult: number,
  niiMult: number,
  loanMult: number,
  riskAdj: number
): QuarterlyFinancial[] {
  return BBCA_QUARTERLY.map(q => {
    const rev = q.revenue ? Math.round(q.revenue * scale) : null;
    const earn = q.earnings ? Math.round(q.earnings * scale * (1 - riskAdj * 0.05)) : null;
    const ocf = q.operating_cash_flow ? Math.round(q.operating_cash_flow * scale * ocfMult) : null;
    const assets = q.total_assets ? Math.round(q.total_assets * scale * 1.1) : null;
    const eq = q.total_equity ? Math.round(q.total_equity * scale * 0.95) : null;
    const liab = assets && eq ? assets - eq : null;
    const m = q.financials_sector_metrics;

    return {
      ...q,
      symbol,
      revenue: rev,
      earnings: earn,
      operating_cash_flow: ocf,
      free_cash_flow: ocf ? Math.round(ocf * 0.85) : null,
      total_assets: assets,
      total_equity: eq,
      total_liabilities: liab,
      financials_sector_metrics: m ? {
        ...m,
        interest_income: m.interest_income ? Math.round(m.interest_income * scale * niiMult) : null,
        interest_expense: m.interest_expense ? Math.round(m.interest_expense * scale * (1 + riskAdj * 0.1)) : null,
        net_interest_income: m.net_interest_income ? Math.round(m.net_interest_income * scale * niiMult) : null,
        gross_loan: m.gross_loan ? Math.round(m.gross_loan * scale * loanMult) : null,
        allowance_for_loans: m.allowance_for_loans ? Math.round(m.allowance_for_loans * scale * (1.1 + riskAdj * 0.15)) : null,
        total_deposit: m.total_deposit ? Math.round(m.total_deposit * scale * 1.05) : null,
      } : null,
    };
  });
}

// 4. BUMI (Bumi Resources) - Cyclical mining, high accruals, debt volatility
function createBumiQuarterly(): QuarterlyFinancial[] {
  return MOCK_QUARTER_DATES.map((date, idx) => {
    const isBoom = idx >= 3 && idx <= 7; // Coal boom 2022-2023
    const rev = isBoom ? 24_000_000_000_000 : 16_000_000_000_000;
    // Volatile earnings with lower OCF -> triggers forensic detectors!
    const earn = isBoom ? 3_800_000_000_000 : 1_200_000_000_000;
    const ocf = Math.round(earn * (0.35 + (idx % 3) * 0.15)); // OCF persistently below earnings
    const debt = 32_000_000_000_000 - idx * 800_000_000_000;
    const assets = 65_000_000_000_000;
    const equity = 24_000_000_000_000 + idx * 600_000_000_000;

    return {
      symbol: 'BUMI',
      date,
      revenue: rev,
      earnings: earn,
      operating_cash_flow: ocf,
      investing_cash_flow: -1_500_000_000_000,
      financing_cash_flow: -Math.round(debt * 0.05),
      net_cash_flow: ocf - 1_500_000_000_000,
      free_cash_flow: ocf - 1_200_000_000_000,
      total_assets: assets,
      total_equity: equity,
      total_liabilities: assets - equity,
      total_debt: debt,
      cost_of_revenue: Math.round(rev * 0.72),
      gross_profit: Math.round(rev * 0.28),
      operating_expense: Math.round(rev * 0.12),
      ebit: Math.round(rev * 0.16),
      ebitda: Math.round(rev * 0.22),
      earnings_before_tax: Math.round(earn * 1.25),
      tax: Math.round(earn * 0.25),
      cash_only: 8_000_000_000_000,
    };
  });
}

// 5. ASII (Astra International) - Stable industrial conglomerate
function createAsiiQuarterly(): QuarterlyFinancial[] {
  return MOCK_QUARTER_DATES.map((date, idx) => {
    const rev = 72_000_000_000_000 + idx * 1_500_000_000_000;
    const earn = 7_500_000_000_000 + idx * 250_000_000_000;
    const ocf = Math.round(earn * 1.15); // Healthy OCF
    const assets = 410_000_000_000_000 + idx * 3_000_000_000_000;
    const equity = 230_000_000_000_000 + idx * 2_000_000_000_000;

    return {
      symbol: 'ASII',
      date,
      revenue: rev,
      earnings: earn,
      operating_cash_flow: ocf,
      investing_cash_flow: -4_000_000_000_000,
      financing_cash_flow: -4_500_000_000_000,
      net_cash_flow: ocf - 8_500_000_000_000,
      free_cash_flow: ocf - 3_500_000_000_000,
      total_assets: assets,
      total_equity: equity,
      total_liabilities: assets - equity,
      total_debt: 75_000_000_000_000,
      cost_of_revenue: Math.round(rev * 0.78),
      gross_profit: Math.round(rev * 0.22),
      operating_expense: Math.round(rev * 0.09),
      ebit: Math.round(rev * 0.13),
      ebitda: Math.round(rev * 0.18),
      earnings_before_tax: Math.round(earn * 1.25),
      tax: Math.round(earn * 0.25),
      cash_only: 55_000_000_000_000,
    };
  });
}

// 6. UNVR (Unilever Indonesia) - FMCG with slowing growth & margin pressure
function createUnvrQuarterly(): QuarterlyFinancial[] {
  return MOCK_QUARTER_DATES.map((date, idx) => {
    const rev = 10_200_000_000_000 - idx * 50_000_000_000; // Slight revenue stagnation
    const earn = 1_400_000_000_000 - idx * 25_000_000_000;
    const ocf = Math.round(earn * 1.02);
    const assets = 19_500_000_000_000;
    const equity = 4_800_000_000_000; // High dividend payout keeps equity small

    return {
      symbol: 'UNVR',
      date,
      revenue: rev,
      earnings: earn,
      operating_cash_flow: ocf,
      investing_cash_flow: -300_000_000_000,
      financing_cash_flow: -Math.round(earn * 0.95), // ~100% dividend payout
      net_cash_flow: 50_000_000_000,
      free_cash_flow: ocf - 250_000_000_000,
      total_assets: assets,
      total_equity: equity,
      total_liabilities: assets - equity,
      total_debt: 2_800_000_000_000,
      cost_of_revenue: Math.round(rev * 0.52),
      gross_profit: Math.round(rev * 0.48),
      operating_expense: Math.round(rev * 0.32),
      ebit: Math.round(rev * 0.16),
      ebitda: Math.round(rev * 0.19),
      earnings_before_tax: Math.round(earn * 1.28),
      tax: Math.round(earn * 0.28),
      cash_only: 650_000_000_000,
    };
  });
}

// ─── Procedural Generator for ANY other IDX Ticker ────────────────────────────
function generateProceduralQuarterly(symbol: string): QuarterlyFinancial[] {
  const clean = symbol.replace('.JK', '').toUpperCase();
  const stockMeta = IDX_STOCKS.find(s => s.symbol === clean);
  const sector = (stockMeta?.sector || 'Industrial').toLowerCase();

  // Deterministic seed based on symbol characters
  let seed = 0;
  for (let i = 0; i < clean.length; i++) {
    seed = (seed * 31 + clean.charCodeAt(i)) & 0xffffffff;
  }
  const rand = (min: number, max: number) => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    const norm = (seed >>> 0) / 4294967296;
    return min + norm * (max - min);
  };

  const isBank = sector.includes('financial') || sector.includes('bank');
  const isTech = sector.includes('tech');
  const isEnergy = sector.includes('energy') || sector.includes('material');

  const baseRev = isBank ? rand(15e12, 35e12) : isTech ? rand(1e12, 5e12) : isEnergy ? rand(8e12, 25e12) : rand(5e12, 20e12);
  const baseMargin = isBank ? rand(0.35, 0.45) : isTech ? rand(-0.25, 0.05) : rand(0.08, 0.22);
  const baseAssets = isBank ? baseRev * rand(40, 60) : baseRev * rand(2.5, 5);
  const baseEquity = isBank ? baseAssets * rand(0.12, 0.18) : baseAssets * rand(0.45, 0.65);

  return MOCK_QUARTER_DATES.map((date, idx) => {
    const growth = 1 + (idx * 0.02) + rand(-0.03, 0.03);
    const rev = Math.round(baseRev * growth);
    const earn = Math.round(rev * baseMargin);
    const ocf = Math.round(earn > 0 ? earn * rand(0.85, 1.25) : earn * rand(0.7, 1.1));
    const assets = Math.round(baseAssets * (1 + idx * 0.015));
    const equity = Math.round(baseEquity * (1 + idx * 0.012));
    const debt = isBank ? Math.round(assets * 0.04) : Math.round(assets * rand(0.15, 0.35));

    const item: QuarterlyFinancial = {
      symbol: clean,
      date,
      revenue: rev,
      earnings: earn,
      operating_cash_flow: ocf,
      investing_cash_flow: -Math.round(Math.abs(ocf) * rand(0.3, 0.6)),
      financing_cash_flow: -Math.round(Math.abs(ocf) * rand(0.2, 0.5)),
      net_cash_flow: Math.round(ocf * rand(0.1, 0.3)),
      free_cash_flow: Math.round(ocf * rand(0.65, 0.85)),
      total_assets: assets,
      total_equity: equity,
      total_liabilities: assets - equity,
      total_debt: debt,
      cost_of_revenue: Math.round(rev * (1 - Math.max(baseMargin, 0.15))),
      gross_profit: Math.round(rev * Math.max(baseMargin, 0.15)),
      operating_expense: Math.round(rev * 0.12),
      ebit: Math.round(earn * 1.3),
      ebitda: Math.round(earn * 1.55),
      earnings_before_tax: Math.round(earn * 1.25),
      tax: Math.round(Math.max(earn * 0.22, 0)),
      cash_only: Math.round(assets * 0.08),
    };

    if (isBank) {
      const loan = Math.round(assets * 0.62);
      const allowance = Math.round(loan * 0.05);
      const deposit = Math.round(assets * 0.78);
      item.financials_sector_metrics = {
        interest_income: Math.round(rev * 0.9),
        interest_expense: Math.round(rev * 0.25),
        net_interest_income: Math.round(rev * 0.65),
        gross_loan: loan,
        allowance_for_loans: allowance,
        net_loan: loan - allowance,
        total_deposit: deposit,
        current_account: Math.round(deposit * 0.35),
        savings_account: Math.round(deposit * 0.45),
        time_deposit: Math.round(deposit * 0.2),
        total_cash_and_due_from_banks: Math.round(assets * 0.15),
      };
    }

    return item;
  });
}

// ─── Public API: Get Quarterly Financials ─────────────────────────────────────
export function getMockQuarterlyFinancials(symbol: string, nQuarters: number = 12): QuarterlyFinancial[] {
  const clean = symbol.replace('.JK', '').toUpperCase();

  let dataset: QuarterlyFinancial[];
  switch (clean) {
    case 'BBCA':
      dataset = BBCA_QUARTERLY;
      break;
    case 'BBRI':
      dataset = createBankQuarterly('BBRI', 1.35, 0.95, 1.15, 1.2, 0.8);
      break;
    case 'BMRI':
      dataset = createBankQuarterly('BMRI', 1.45, 1.05, 1.1, 1.25, 0.5);
      break;
    case 'BBNI':
      dataset = createBankQuarterly('BBNI', 0.82, 0.98, 0.95, 0.85, 0.6);
      break;
    case 'GOTO':
      dataset = GOTO_QUARTERLY;
      break;
    case 'TLKM':
      dataset = TLKM_QUARTERLY;
      break;
    case 'ASII':
      dataset = createAsiiQuarterly();
      break;
    case 'BUMI':
      dataset = createBumiQuarterly();
      break;
    case 'UNVR':
      dataset = createUnvrQuarterly();
      break;
    default:
      dataset = generateProceduralQuarterly(clean);
      break;
  }

  return dataset.slice(-nQuarters);
}

// ─── Public API: Get Company Report ──────────────────────────────────────────
export function getMockCompanyReport(symbol: string): CompanyReport {
  const clean = symbol.replace('.JK', '').toUpperCase();
  const profile = getStockProfile(clean, clean);
  const quarters = getMockQuarterlyFinancials(clean, 12);
  const latestQ = quarters[quarters.length - 1];

  // Synthesize 4 annual historical data points from quarterly
  const years = [2021, 2022, 2023, 2024];
  const historical_financials: HistoricalFinancial[] = years.map(yr => {
    const yrQuarters = quarters.filter(q => q.date.startsWith(String(yr)));
    const mult = yrQuarters.length > 0 ? (4 / yrQuarters.length) : 4;
    const sumRev = yrQuarters.reduce((s, q) => s + (q.revenue ?? 0), 0) * mult;
    const sumEarn = yrQuarters.reduce((s, q) => s + (q.earnings ?? 0), 0) * mult;
    const sumOcf = yrQuarters.reduce((s, q) => s + (q.operating_cash_flow ?? 0), 0) * mult;
    const lastQInYr = yrQuarters[yrQuarters.length - 1] || latestQ;

    return {
      year: yr,
      revenue: Math.round(sumRev),
      earnings: Math.round(sumEarn),
      operating_cash_flow: Math.round(sumOcf),
      free_cash_flow: Math.round(sumOcf * 0.8),
      total_assets: lastQInYr.total_assets,
      total_equity: lastQInYr.total_equity,
      total_liabilities: lastQInYr.total_liabilities,
      net_debt: lastQInYr.total_debt,
    };
  });

  const historical_financial_ratio: HistoricalFinancialRatio[] = years.map(yr => ({
    year: String(yr),
    profitability: {
      roa: 0.035,
      roe: 0.165,
      net_profit_margin: 0.28,
      operating_profit_margin: 0.38,
      operating_cash_flow_margin: 0.42,
    },
    leverage: {
      debt_to_asset_ratio: 0.78,
      debt_to_equity_ratio: 3.5,
    },
  }));

  const stockMeta = IDX_STOCKS.find(s => s.symbol === clean);
  const detectedSector = profile.sector || stockMeta?.sector || 'Industrial';
  const detectedIndustry = profile.industry || stockMeta?.sector || 'Manufacturing';
  const detectedSubSector = profile.subSector || stockMeta?.sector || 'General';

  const overview: CompanyOverview = {
    listing_board: profile.listingBoard || 'Utama',
    industry: detectedIndustry,
    sub_industry: detectedIndustry,
    sector: detectedSector,
    sub_sector: detectedSubSector,
    market_cap: profile.marketCap || 1_250_000_000_000_000,
    market_cap_rank: profile.marketCapRank || 1,
    address: profile.address || 'Jakarta, Indonesia',
    employee_num: profile.employeeNum || 25000,
    listing_date: profile.listingDate || '2000-05-31',
    website: profile.website || 'https://www.idx.co.id',
    last_close_price: 10250,
    latest_close_date: '2024-09-30',
    daily_close_change: 0.0125,
    esg_score: 78.5,
    tags: ['LQ45', 'IDX30', 'KOMPAS100'],
    indices: profile.indices || ['LQ45', 'IDX30'],
  };

  return {
    symbol: clean,
    company_name: profile.name || clean,
    overview,
    financials: {
      eps: 385,
      historical_financials,
      historical_financial_ratio,
      yoy_quarter_earnings_growth: 0.128,
      yoy_quarter_revenue_growth: 0.095,
    },
    management: {
      key_executives: profile.executives && profile.executives.length > 0 ? profile.executives : [
        { name: 'Direktur Utama', position: 'Presiden Direktur' },
        { name: 'Direktur Keuangan', position: 'Direktur Keuangan' },
      ],
      executives_shareholdings: [],
    },
    valuation: {
      historical_valuation: [
        { year: 2021, pb: 4.2, pe: 28.5, ps: 11.2 },
        { year: 2022, pb: 4.6, pe: 26.1, ps: 10.8 },
        { year: 2023, pb: 4.8, pe: 24.3, ps: 10.4 },
        { year: 2024, pb: 4.9, pe: 23.5, ps: 10.1 },
      ],
    },
  };
}

// ─── Public API: Get Quarterly Dates ─────────────────────────────────────────
export function getMockQuarterlyDates(symbol: string): QuarterlyDates {
  return {
    '2024': ['2024-09-30', '2024-06-30', '2024-03-31'],
    '2023': ['2023-12-31', '2023-09-30', '2023-06-30', '2023-03-31'],
    '2022': ['2022-12-31', '2022-09-30', '2022-06-30', '2022-03-31'],
    '2021': ['2021-12-31'],
  };
}
