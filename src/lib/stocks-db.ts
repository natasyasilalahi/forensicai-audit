export interface StockInfo {
  symbol: string;
  name: string;
  sector?: string;
  aliases?: string[];
}

export const IDX_STOCKS: StockInfo[] = [
  // Perbankan & Keuangan
  { symbol: 'BBCA', name: 'Bank Central Asia Tbk', sector: 'Financials', aliases: ['bca', 'bank bca', 'central asia'] },
  { symbol: 'BBRI', name: 'Bank Rakyat Indonesia (Persero) Tbk', sector: 'Financials', aliases: ['bri', 'bank bri', 'rakyat indonesia'] },
  { symbol: 'BMRI', name: 'Bank Mandiri (Persero) Tbk', sector: 'Financials', aliases: ['mandiri', 'bank mandiri'] },
  { symbol: 'BBNI', name: 'Bank Negara Indonesia (Persero) Tbk', sector: 'Financials', aliases: ['bni', 'bank bni'] },
  { symbol: 'BRIS', name: 'Bank Syariah Indonesia Tbk', sector: 'Financials', aliases: ['bsi', 'bank syariah', 'bsi syariah'] },
  { symbol: 'ARTO', name: 'Bank Jago Tbk', sector: 'Financials', aliases: ['jago', 'bank jago', 'artos'] },
  { symbol: 'BBTN', name: 'Bank Tabungan Negara (Persero) Tbk', sector: 'Financials', aliases: ['btn', 'bank btn'] },
  { symbol: 'BDMN', name: 'Bank Danamon Indonesia Tbk', sector: 'Financials', aliases: ['danamon', 'bank danamon'] },
  { symbol: 'BNGA', name: 'Bank CIMB Niaga Tbk', sector: 'Financials', aliases: ['cimb', 'cimb niaga'] },
  { symbol: 'PNBN', name: 'Bank Pan Indonesia Tbk', sector: 'Financials', aliases: ['panin', 'bank panin'] },
  { symbol: 'MEGA', name: 'Bank Mega Tbk', sector: 'Financials', aliases: ['mega', 'bank mega'] },

  // Teknologi & Telekomunikasi
  { symbol: 'TLKM', name: 'Telkom Indonesia (Persero) Tbk', sector: 'Telecommunication', aliases: ['telkom', 'telekomunikasi', 'indonesia'] },
  { symbol: 'GOTO', name: 'GoTo Gojek Tokopedia Tbk', sector: 'Technology', aliases: ['goto', 'gojek', 'tokopedia'] },
  { symbol: 'ISAT', name: 'Indosat Tbk (Indosat Ooredoo Hutchison)', sector: 'Telecommunication', aliases: ['indosat', 'ioh', 'ooredoo'] },
  { symbol: 'EXCL', name: 'XL Axiata Tbk', sector: 'Telecommunication', aliases: ['xl', 'axiata', 'xl axiata'] },
  { symbol: 'BUKA', name: 'Bukalapak.com Tbk', sector: 'Technology', aliases: ['bukalapak', 'buka'] },
  { symbol: 'BELI', name: 'Global Digital Niaga Tbk (Blibli)', sector: 'Technology', aliases: ['blibli', 'beli', 'djarum tech'] },
  { symbol: 'MTEL', name: 'Dayamitra Telekomunikasi Tbk (Mitratel)', sector: 'Telecommunication', aliases: ['mitratel', 'menara telkom'] },
  { symbol: 'TOWR', name: 'Sarana Menara Nusantara Tbk', sector: 'Telecommunication', aliases: ['protelindo', 'tower'] },
  { symbol: 'TBIG', name: 'Tower Bersama Infrastructure Tbk', sector: 'Telecommunication', aliases: ['tbig', 'tower bersama'] },

  // Otomotif & Konglomerasi
  { symbol: 'ASII', name: 'Astra International Tbk', sector: 'Consumer Discretionary', aliases: ['astra', 'asii', 'astra international'] },
  { symbol: 'AUTO', name: 'Astra Otoparts Tbk', sector: 'Consumer Discretionary', aliases: ['otoparts', 'astra auto'] },
  { symbol: 'IMAS', name: 'Indomobil Sukses Internasional Tbk', sector: 'Consumer Discretionary', aliases: ['indomobil'] },

  // Barang Konsumsi (Consumer Goods)
  { symbol: 'UNVR', name: 'Unilever Indonesia Tbk', sector: 'Consumer Staples', aliases: ['unilever', 'unvr'] },
  { symbol: 'ICBP', name: 'Indofood CBP Sukses Makmur Tbk', sector: 'Consumer Staples', aliases: ['indofood cbp', 'indomie', 'icbp'] },
  { symbol: 'INDF', name: 'Indofood Sukses Makmur Tbk', sector: 'Consumer Staples', aliases: ['indofood', 'indf', 'indofood makmur'] },
  { symbol: 'AMRT', name: 'Sumber Alfaria Trijaya Tbk (Alfamart)', sector: 'Consumer Staples', aliases: ['alfamart', 'amrt', 'alfa'] },
  { symbol: 'MYOR', name: 'Mayora Indah Tbk', sector: 'Consumer Staples', aliases: ['mayora', 'myor', 'kopiko'] },
  { symbol: 'CMRY', name: 'Cisarua Mountain Dairy Tbk (Cimory)', sector: 'Consumer Staples', aliases: ['cimory', 'cmry'] },
  { symbol: 'CPIN', name: 'Charoen Pokphand Indonesia Tbk', sector: 'Consumer Staples', aliases: ['charoen', 'pokphand', 'ayam'] },
  { symbol: 'JPFA', name: 'Japfa Comfeed Indonesia Tbk', sector: 'Consumer Staples', aliases: ['japfa', 'jpfa'] },
  { symbol: 'KLBF', name: 'Kalbe Farma Tbk', sector: 'Healthcare', aliases: ['kalbe', 'kalbe farma', 'obat'] },
  { symbol: 'SIDO', name: 'Industri Jamu Dan Farmasi Sido Muncul Tbk', sector: 'Healthcare', aliases: ['sido muncul', 'sidomuncul', 'tolak angin', 'sido'] },
  { symbol: 'GOOD', name: 'Garudafood Putra Putri Jaya Tbk', sector: 'Consumer Staples', aliases: ['garudafood', 'good'] },
  { symbol: 'STTP', name: 'Siantar Top Tbk', sector: 'Consumer Staples', aliases: ['siantar top'] },

  // Pertambangan & Energi
  { symbol: 'AMMN', name: 'Amman Mineral Internasional Tbk', sector: 'Basic Materials', aliases: ['amman', 'amman mineral', 'tembaga'] },
  { symbol: 'BREN', name: 'Barito Renewables Energy Tbk', sector: 'Energy', aliases: ['bren', 'barito', 'prajogo pangestu'] },
  { symbol: 'BRPT', name: 'Barito Pacific Tbk', sector: 'Basic Materials', aliases: ['barito pacific', 'brpt'] },
  { symbol: 'CUAN', name: 'Petrindo Jaya Kreasi Tbk', sector: 'Energy', aliases: ['cuan', 'petrindo'] },
  { symbol: 'ANTM', name: 'Aneka Tambang Tbk', sector: 'Basic Materials', aliases: ['antam', 'aneka tambang', 'emas'] },
  { symbol: 'ADRO', name: 'Adaro Energy Indonesia Tbk', sector: 'Energy', aliases: ['adaro', 'adro', 'batubara'] },
  { symbol: 'ADMR', name: 'Adaro Minerals Indonesia Tbk', sector: 'Energy', aliases: ['adaro minerals', 'admr'] },
  { symbol: 'PGAS', name: 'Perusahaan Gas Negara Tbk (PGN)', sector: 'Energy', aliases: ['pgn', 'gas negara', 'pgas'] },
  { symbol: 'PTBA', name: 'Bukit Asam Tbk', sector: 'Energy', aliases: ['bukit asam', 'ptba'] },
  { symbol: 'ITMG', name: 'Indo Tambangraya Megah Tbk', sector: 'Energy', aliases: ['itmg', 'indo tambangraya'] },
  { symbol: 'INCO', name: 'Vale Indonesia Tbk', sector: 'Basic Materials', aliases: ['vale', 'inco', 'nikel'] },
  { symbol: 'MEDC', name: 'Medco Energi Internasional Tbk', sector: 'Energy', aliases: ['medco', 'medc', 'minyak'] },
  { symbol: 'BUMI', name: 'Bumi Resources Tbk', sector: 'Energy', aliases: ['bumi', 'bumi resources', 'bakrie'] },
  { symbol: 'HRUM', name: 'Harum Energy Tbk', sector: 'Energy', aliases: ['harum', 'hrum'] },
  { symbol: 'MBMA', name: 'Merdeka Battery Materials Tbk', sector: 'Basic Materials', aliases: ['merdeka battery', 'mbma'] },
  { symbol: 'MDKA', name: 'Merdeka Copper Gold Tbk', sector: 'Basic Materials', aliases: ['merdeka copper', 'mdka'] },

  // Ritel & Properti
  { symbol: 'MAPI', name: 'Mitra Adiperkasa Tbk', sector: 'Consumer Discretionary', aliases: ['map', 'mapi', 'zara', 'starbucks'] },
  { symbol: 'ACES', name: 'Aspirasi Hidup Indonesia Tbk (Ace Hardware)', sector: 'Consumer Discretionary', aliases: ['ace hardware', 'aces', 'ace'] },
  { symbol: 'LPPF', name: 'Matahari Department Store Tbk', sector: 'Consumer Discretionary', aliases: ['matahari', 'lppf'] },
  { symbol: 'BSDE', name: 'Bumi Serpong Damai Tbk (BSD City)', sector: 'Real Estate', aliases: ['bsd', 'bsd city', 'bsde', 'sinarmas property'] },
  { symbol: 'CTRA', name: 'Ciputra Development Tbk', sector: 'Real Estate', aliases: ['ciputra', 'ctra'] },
  { symbol: 'PSSI', name: 'Pelita Samudera Shipping Tbk', sector: 'Transportation', aliases: ['pelita'] },
  { symbol: 'PTPN', name: 'Perkebunan Nusantara', sector: 'Agriculture', aliases: ['ptpn'] },
  { symbol: 'SMRA', name: 'Summarecon Agung Tbk', sector: 'Real Estate', aliases: ['summarecon', 'smra'] },
  { symbol: 'PWON', name: 'Puwuwon Jati Tbk (Pakuwon)', sector: 'Real Estate', aliases: ['pakuwon', 'pwon', 'gandaria city'] },

  // Kesehatan & Infrastruktur
  { symbol: 'MIKA', name: 'Mitra Keluarga Karyasehat Tbk', sector: 'Healthcare', aliases: ['mitra keluarga', 'mika', 'rs mika'] },
  { symbol: 'SILO', name: 'Siloam International Hospitals Tbk', sector: 'Healthcare', aliases: ['siloam', 'silo', 'rs siloam'] },
  { symbol: 'HEAL', name: 'Medikaloka Hermina Tbk (RS Hermina)', sector: 'Healthcare', aliases: ['hermina', 'heal', 'rs hermina'] },
  { symbol: 'JSMR', name: 'Jasa Marga (Persero) Tbk', sector: 'Infrastructure', aliases: ['jasa marga', 'jsmr', 'jalan tol'] },
  { symbol: 'WIKA', name: 'Wijaya Karya (Persero) Tbk', sector: 'Infrastructure', aliases: ['wika', 'wijaya karya'] },
  { symbol: 'ADHI', name: 'Adhi Karya (Persero) Tbk', sector: 'Infrastructure', aliases: ['adhi karya', 'adhi'] },
  { symbol: 'PTPP', name: 'PP (Persero) Tbk', sector: 'Infrastructure', aliases: ['ptpp', 'pp'] },
];

/**
 * Searches local IDX stocks using fuzzy matching on symbol, name, and aliases.
 */
export function searchLocalStocks(query: string): StockInfo[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: { stock: StockInfo; score: number }[] = [];

  for (const stock of IDX_STOCKS) {
    const symbol = stock.symbol.toLowerCase();
    const name = stock.name.toLowerCase();
    const aliases = stock.aliases?.map(a => a.toLowerCase()) || [];

    let score = 0;

    // Exact symbol match gets highest score
    if (symbol === q) {
      score = 100;
    }
    // Symbol starts with query (e.g. "bc" -> "BBCA" or "bca" -> "BBCA")
    else if (symbol.includes(q)) {
      score = 80;
    }
    // Aliases exact match (e.g. "bca" -> "BBCA")
    else if (aliases.some(a => a === q)) {
      score = 90;
    }
    // Aliases partial match (e.g. "bank bca" -> "BBCA")
    else if (aliases.some(a => a.includes(q) || q.includes(a))) {
      score = 70;
    }
    // Company name contains query (e.g. "central asia" -> "BBCA")
    else if (name.includes(q)) {
      score = 60;
    }

    if (score > 0) {
      results.push({ stock, score });
    }
  }

  // Sort by score descending, then by symbol length ascending
  results.sort((a, b) => b.score - a.score || a.stock.symbol.length - b.stock.symbol.length);

  return results.slice(0, 8).map(r => r.stock);
}
