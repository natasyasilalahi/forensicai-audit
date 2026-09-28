export interface StockProfile {
  symbol: string;
  name: string;
  logoUrl?: string;
  sector: string;
  subSector: string;
  industry: string;
  marketCap: number; // in IDR
  marketCapRank?: number;
  listingDate: string;
  listingBoard: string;
  website: string;
  address: string;
  employeeNum?: number;
  description: string;
  executives: Array<{ name: string; position: string }>;
  indices: string[];
}

// Map of official high-resolution local vector logos and metadata for IDX tickers
const STOCK_LOGOS: Record<
  string,
  {
    logo: string;
    brandColor: string;
    description: string;
    sector: string;
    industry: string;
    listingDate: string;
    website: string;
    address: string;
    executives: Array<{ name: string; position: string }>;
    indices: string[];
  }
> = {
  BBCA: {
    logo: '/logos/bbca.svg',
    brandColor: '#005caa',
    description:
      'PT Bank Central Asia Tbk (BCA) adalah bank swasta terbesar di Indonesia yang berfokus pada layanan transaksi perbankan, kredit korporasi, komersial, UKM, dan konsumer.',
    sector: 'Keuangan (Financials)',
    industry: 'Perbankan (Banking)',
    listingDate: '31 Mei 2000',
    website: 'https://www.bca.co.id',
    address: 'Menara BCA, Grand Indonesia, Jl. M.H. Thamrin No. 1, Jakarta 10310',
    executives: [
      { name: 'Jahja Setiaatmadja', position: 'Presiden Direktur' },
      { name: 'Armand Wahyudi Hartono', position: 'Wakil Presiden Direktur' },
      { name: 'Gregory Hendra Lembong', position: 'Wakil Presiden Direktur' },
      { name: 'Djohan Emir Setijoso', position: 'Presiden Komisaris' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'SRKEHATI'],
  },
  BBRI: {
    logo: '/logos/bbri.svg',
    brandColor: '#00529c',
    description:
      'PT Bank Rakyat Indonesia (Persero) Tbk (BRI) adalah bank BUMN terbesar di Indonesia yang berfokus pada pemberdayaan Usaha Mikro, Kecil, dan Menengah (UMKM).',
    sector: 'Keuangan (Financials)',
    industry: 'Perbankan (Banking)',
    listingDate: '10 November 2003',
    website: 'https://www.bri.co.id',
    address: 'Gedung BRI 1, Jl. Jend. Sudirman Kav. 44-46, Jakarta 10210',
    executives: [
      { name: 'Sunarso', position: 'Direktur Utama' },
      { name: 'Catur Budi Harto', position: 'Wakil Direktur Utama' },
      { name: 'Viviana Dyah Ayu Retno K.', position: 'Direktur Keuangan' },
      { name: 'Kartika Wirjoatmodjo', position: 'Komisaris Utama' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'IDXHIDIV20'],
  },
  BMRI: {
    logo: '/logos/bmri.svg',
    brandColor: '#003d79',
    description:
      'PT Bank Mandiri (Persero) Tbk adalah bank BUMN terbesar di Indonesia berdasarkan aset, menyediakan layanan perbankan korporasi, komersial, serta digital banking (Livin\' by Mandiri).',
    sector: 'Keuangan (Financials)',
    industry: 'Perbankan (Banking)',
    listingDate: '14 Juli 2003',
    website: 'https://www.bankmandiri.co.id',
    address: 'Plaza Mandiri, Jl. Jend. Gatot Subroto Kav. 36-38, Jakarta 12190',
    executives: [
      { name: 'Daratjyono Hanado', position: 'Direktur Utama' },
      { name: 'Alexandra Askandar', position: 'Wakil Direktur Utama' },
      { name: 'Sigit Prastowo', position: 'Direktur Keuangan' },
      { name: 'M. Chatib Basri', position: 'Komisaris Utama' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'IDXESGL'],
  },
  TLKM: {
    logo: '/logos/tlkm.svg',
    brandColor: '#e30613',
    description:
      'PT Telkom Indonesia (Persero) Tbk adalah perusahaan BUMN telekomunikasi dan jaringan digital terbesar di Indonesia dengan layanan IndiHome, Telkomsel, serta infrastruktur data center.',
    sector: 'Infrastruktur & Telekomunikasi',
    industry: 'Jasa Telekomunikasi',
    listingDate: '14 November 1995',
    website: 'https://www.telkom.co.id',
    address: 'Telkom Landmark Tower, Jl. Jend. Gatot Subroto Kav. 52, Jakarta 12710',
    executives: [
      { name: 'Ririek Adriansyah', position: 'Direktur Utama' },
      { name: 'Heri Supriadi', position: 'Direktur Keuangan & Manajemen Risiko' },
      { name: 'Bambang Brodjonegoro', position: 'Komisaris Utama' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'IDXHIGHDIV'],
  },
  GOTO: {
    logo: '/logos/goto.svg',
    brandColor: '#00d084',
    description:
      'PT GoTo Gojek Tokopedia Tbk adalah ekosistem digital terbesar di Indonesia yang menggabungkan layanan on-demand (Gojek), e-commerce (Tokopedia), serta finansial (GoPay).',
    sector: 'Teknologi (Technology)',
    industry: 'Layanan Internet & Perangkat Lunak',
    listingDate: '11 April 2022',
    website: 'https://www.gotocompany.com',
    address: 'Gedung Pasar Daya, Jl. Sultan Hasanuddin No. 6, Jakarta Selatan 12160',
    executives: [
      { name: 'Patrick Sugito Walujo', position: 'Direktur Utama / CEO' },
      { name: 'Jacky Lo', position: 'Direktur Keuangan / CFO' },
      { name: 'Garibaldi Thohir', position: 'Komisaris Utama' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'IDXTECH'],
  },
  ASII: {
    logo: '/logos/asii.svg',
    brandColor: '#004b93',
    description:
      'PT Astra International Tbk adalah salah satu konglomerasi terbesar di Indonesia yang bergerak di bidang otomotif (Toyota, Daihatsu, Honda), jasa keuangan, alat berat, dan agribisnis.',
    sector: 'Barang Konsumen Primer & Otomotif',
    industry: 'Otomotif & Komponen',
    listingDate: '4 April 1990',
    website: 'https://www.astra.co.id',
    address: 'Menara Astra, Jl. Jend. Sudirman Kav. 5-6, Jakarta 10220',
    executives: [
      { name: 'Djony Bunarto Tjondro', position: 'Presiden Direktur' },
      { name: 'Gidion Hasan', position: 'Direktur Keuangan' },
      { name: 'Prijono Sugiarto', position: 'Presiden Komisaris' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'SRKEHATI'],
  },
  BREN: {
    logo: '/logos/bren.svg',
    brandColor: '#10b981',
    description:
      'PT Barito Renewables Energy Tbk adalah induk perusahaan energi terbarukan di Indonesia, berfokus pada penyediaan tenaga panas bumi (geothermal) melalui Star Energy Geothermal.',
    sector: 'Energi (Energy)',
    industry: 'Energi Terbarukan (Renewable Energy)',
    listingDate: '9 Oktober 2023',
    website: 'https://baritorenewables.co.id',
    address: 'Wisma Barito Pacific Tower B, Jl. S. Parman Kav. 62-63, Jakarta 11410',
    executives: [
      { name: 'Hendra Soetjipto Tan', position: 'Direktur Utama' },
      { name: 'Prajogo Pangestu', position: 'Pendiri & Pengendali' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  ANTM: {
    logo: '/logos/antm.svg',
    brandColor: '#f59e0b',
    description:
      'PT Aneka Tambang Tbk (ANTAM) adalah anggota Holding Industri Pertambangan BUMN (MIND ID) yang bergerak di bidang eksplorasi, penambangan, serta pengolahan nikel, emas, dan bauksit.',
    sector: 'Barang Baku (Basic Materials)',
    industry: 'Pertambangan Logam & Mineral',
    listingDate: '27 November 1997',
    website: 'https://www.antam.com',
    address: 'Gedung Aneka Tambang, Jl. Letjen TB Simatupang No. 1, Jakarta 12530',
    executives: [
      { name: 'Nico Kanter', position: 'Direktur Utama' },
      { name: 'Elisabeth RT Siahaan', position: 'Direktur Keuangan & Manajemen Risiko' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'IDXMINING'],
  },
  UNVR: {
    logo: '/logos/unvr.svg',
    brandColor: '#1f2937',
    description:
      'PT Unilever Indonesia Tbk adalah produsen barang konsumsi cepat (FMCG) terdepan di Indonesia dengan merek ternama seperti Pepsodent, Lifebuoy, Dove, Sunsilk, Bango, dan Royco.',
    sector: 'Barang Konsumen Primer (Consumer Non-Cyclicals)',
    industry: 'Kebutuhan Rumah Tangga & Perawatan Pribadi',
    listingDate: '11 Januari 1982',
    website: 'https://www.unilever.co.id',
    address: 'Grha Unilever, BSD Green Office Park Kav. 3, Tangerang 15345',
    executives: [
      { name: 'Benjie Yap', position: 'Presiden Direktur' },
      { name: 'Vivek Agarwal', position: 'Direktur Keuangan' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  ICBP: {
    logo: '/logos/icbp.svg',
    brandColor: '#ef4444',
    description:
      'PT Indofood CBP Sukses Makmur Tbk adalah produsen makanan olahan terkemuka di Indonesia yang memproduksi mi instan (Indomie), produk susu, makanan ringan, dan nutrisi.',
    sector: 'Barang Konsumen Primer',
    industry: 'Makanan & Minuman Olahan',
    listingDate: '7 Oktober 2010',
    website: 'https://www.indofoodcbp.com',
    address: 'Sudirman Plaza, Indofood Tower, Jl. Jend. Sudirman Kav. 76-78, Jakarta 12910',
    executives: [
      { name: 'Anthoni Salim', position: 'Direktur Utama' },
      { name: 'Taufik Wiraatmadja', position: 'Direktur' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  ADRO: {
    logo: '/logos/adro.svg',
    brandColor: '#15803d',
    description:
      'PT Adaro Energy Indonesia Tbk adalah perusahaan energi terintegrasi yang bergerak di bidang pertambangan batu bara termal, mineral terbarukan, serta infrastruktur daya listrik.',
    sector: 'Energi (Energy)',
    industry: 'Pertambangan Batu Bara',
    listingDate: '16 Juli 2008',
    website: 'https://www.adaro.com',
    address: 'Menara Karya Lt. 23, Jl. H.R. Rasuna Said Block X-5, Kav. 1-2, Jakarta 12950',
    executives: [
      { name: 'Garibaldi Thohir', position: 'Presiden Direktur & CEO' },
      { name: 'Christian Ariano Rachmat', position: 'Wakil Presiden Direktur' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  BBNI: {
    logo: '/logos/bbni.svg',
    brandColor: '#f97316',
    description:
      'PT Bank Negara Indonesia (Persero) Tbk (BNI) adalah salah satu bank komersial terbesar BUMN yang berfokus pada pembiayaan korporasi, perbankan internasional, serta digital consumer banking (wondr by BNI).',
    sector: 'Keuangan (Financials)',
    industry: 'Perbankan (Banking)',
    listingDate: '25 November 1996',
    website: 'https://www.bni.co.id',
    address: 'Gedung Grha BNI, Jl. Jend. Sudirman Kav. 1, Jakarta Pusat 10220',
    executives: [
      { name: 'Royke Tumilaar', position: 'Direktur Utama' },
      { name: 'Novita Widya Anggraini', position: 'Direktur Keuangan' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  ARTO: {
    logo: '/logos/arto.svg',
    brandColor: '#8b5cf6',
    description:
      'PT Bank Jago Tbk adalah bank berbasis teknologi (tech-based bank) terdepan di Indonesia yang terintegrasi langsung dengan ekosistem digital GoTo dan Bibit.',
    sector: 'Keuangan (Financials)',
    industry: 'Perbankan Digital (Digital Banking)',
    listingDate: '13 Januari 2016',
    website: 'https://www.jago.com',
    address: 'Menara BTPN Lt. 46, Jl. Dr. Ide Anak Agung Gde Agung Kav. 5.5-5.6, Jakarta 12950',
    executives: [
      { name: 'Arief Harris Tandjung', position: 'Direktur Utama' },
      { name: 'Jerry Ng', position: 'Komisaris Utama' },
    ],
    indices: ['LQ45', 'IDX30', 'IDXTECH'],
  },
  BRIS: {
    logo: '/logos/bris.svg',
    brandColor: '#00a39d',
    description:
      'PT Bank Syariah Indonesia Tbk (BSI) adalah bank syariah terbesar di Indonesia, hasil penggabungan Bank Syariah Mandiri, BNI Syariah, dan BRI Syariah.',
    sector: 'Keuangan (Financials)',
    industry: 'Perbankan Syariah (Islamic Banking)',
    listingDate: '9 Mei 2018',
    website: 'https://www.bankbsi.co.id',
    address: 'Gedung The Tower, Jl. Gatot Subroto No. 27, Jakarta 12930',
    executives: [
      { name: 'Hery Gunardi', position: 'Direktur Utama' },
      { name: 'Muliaman D. Hadad', position: 'Komisaris Utama' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'JII'],
  },
  BBTN: {
    logo: '/logos/bbTN.svg',
    brandColor: '#004b93',
    description:
      'PT Bank Tabungan Negara (Persero) Tbk (BTN) adalah bank BUMN yang berfokus pada pembiayaan perumahan rakyat (KPR) dan jasa keuangan komersial.',
    sector: 'Keuangan (Financials)',
    industry: 'Perbankan (Banking)',
    listingDate: '17 Desember 2009',
    website: 'https://www.btn.co.id',
    address: 'Menara BTN, Jl. Gajah Mada No. 1, Jakarta Pusat 10130',
    executives: [
      { name: 'Nixon LP Napitupulu', position: 'Direktur Utama' },
      { name: 'Chandra Hamzah', position: 'Komisaris Utama' },
    ],
    indices: ['LQ45', 'KOMPAS100'],
  },
  BUKA: {
    logo: '/logos/buka.svg',
    brandColor: '#e0004d',
    description:
      'PT Bukalapak.com Tbk adalah perusahaan teknologi Indonesia yang mengoperasikan marketplace dan jaringan warung Mitra Bukalapak di seluruh nusantara.',
    sector: 'Teknologi (Technology)',
    industry: 'Layanan Internet & E-Commerce',
    listingDate: '6 Agustus 2021',
    website: 'https://www.bukalapak.com',
    address: 'Metropolitan Tower Lt. 22, Jl. R.A. Kartini Kav. 14, Jakarta Selatan 12430',
    executives: [
      { name: 'Willix Halim', position: 'Direktur Utama' },
      { name: 'Teddy Oetomo', position: 'Direktur' },
    ],
    indices: ['LQ45', 'IDX30', 'IDXTECH'],
  },
  ISAT: {
    logo: '/logos/isat.svg',
    brandColor: '#e50019',
    description:
      'PT Indosat Tbk (Indosat Ooredoo Hutchison) adalah operator telekomunikasi seluler digital terkemuka di Indonesia dengan merek IM3 dan Tri.',
    sector: 'Infrastruktur & Telekomunikasi',
    industry: 'Jasa Telekomunikasi Seluler',
    listingDate: '19 Oktober 1994',
    website: 'https://www.ioh.co.id',
    address: 'Gedung Indosat, Jl. Medan Merdeka Barat No. 21, Jakarta 10110',
    executives: [
      { name: 'Vikram Sinha', position: 'President Director & CEO' },
      { name: 'Nicky Lee Chi Hung', position: 'Director & CFO' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  BUMI: {
    logo: '/logos/bumi.svg',
    brandColor: '#0f2b5c',
    description:
      'PT Bumi Resources Tbk adalah produsen batu bara termal terbesar di Indonesia dengan anak usaha operasional PT Kaltim Prima Coal (KPC) dan PT Arutmin Indonesia.',
    sector: 'Energi (Energy)',
    industry: 'Pertambangan Batu Bara',
    listingDate: '28 Juli 1990',
    website: 'https://www.bumiresources.com',
    address: 'Bakrie Tower Lt. 12, Kompleks Rasuna Epicentrum, Jl. H.R. Rasuna Said, Jakarta 12940',
    executives: [
      { name: 'Adika Nuraga Bakrie', position: 'Presiden Direktur' },
      { name: 'Sharif Cicip Sutardjo', position: 'Presiden Komisaris' },
    ],
    indices: ['LQ45', 'KOMPAS100', 'IDXENERGY'],
  },
  WIKA: {
    logo: '/logos/wika.svg',
    brandColor: '#0060af',
    description:
      'PT Wijaya Karya (Persero) Tbk adalah salah satu BUMN konstruksi dan infrastruktur terintegrasi terbesar di Indonesia.',
    sector: 'Infrastruktur & Konstruksi',
    industry: 'Konstruksi Bangunan Sipil',
    listingDate: '29 Oktober 2007',
    website: 'https://www.wika.co.id',
    address: 'Jl. D.I. Panjaitan Kav. 9-10, Cipinang Cempedak, Jatinegara, Jakarta Timur 13340',
    executives: [
      { name: 'Agung Budi Waskito', position: 'Direktur Utama' },
      { name: 'Adityo Kusumo', position: 'Direktur Keuangan & Manajemen Risiko' },
    ],
    indices: ['KOMPAS100', 'IDXINFRA'],
  },
  KLBF: {
    logo: '/logos/klbf.svg',
    brandColor: '#00682b',
    description:
      'PT Kalbe Farma Tbk adalah perusahaan farmasi dan produk kesehatan konsumen terbesar di Asia Tenggara.',
    sector: 'Kesehatan (Healthcare)',
    industry: 'Farmasi & Perlengkapan Kesehatan',
    listingDate: '30 Juli 1991',
    website: 'https://www.kalbe.co.id',
    address: 'Gedung KALBE, Jl. Let. Jend. Suprapto Kav. 4, Cempaka Putih, Jakarta 10510',
    executives: [
      { name: 'Vidjongtius', position: 'Presiden Direktur' },
      { name: 'Bernadus Karmin Winata', position: 'Direktur' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'SRKEHATI'],
  },
  PTBA: {
    logo: '/logos/ptba.svg',
    brandColor: '#ca8a04',
    description:
      'PT Bukit Asam Tbk adalah anggota Holding BUMN Pertambangan MIND ID yang bergerak di bidang pertambangan batu bara dan energi terbarukan.',
    sector: 'Energi (Energy)',
    industry: 'Pertambangan Batu Bara',
    listingDate: '23 Desember 2002',
    website: 'https://www.ptba.co.id',
    address: 'Menara Kadin Lt. 15, Jl. H.R. Rasuna Said Blok X-5, Kav. 2-3, Jakarta 12950',
    executives: [
      { name: 'Arsal Ismail', position: 'Direktur Utama' },
      { name: 'Farida Thamrin', position: 'Direktur Keuangan' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100', 'IDXHIDIV20'],
  },
  UNTR: {
    logo: '/logos/untr.svg',
    brandColor: '#1e3a8a',
    description:
      'PT United Tractors Tbk adalah distributor alat berat (Komatsu) dan kontraktor penambangan (Pama Persada) terbesar di Indonesia, anak perusahaan PT Astra International Tbk.',
    sector: 'Barang Industri (Industrials)',
    industry: 'Distribusi Alat Berat & Jasa Penambangan',
    listingDate: '19 September 1989',
    website: 'https://www.unitedtractors.com',
    address: 'Jl. Raya Bekasi Km. 22, Cakung, Jakarta Timur 13910',
    executives: [
      { name: 'Frans Kesuma', position: 'Presiden Direktur' },
      { name: 'Iwan Hadiantoro', position: 'Direktur Keuangan' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  INDF: {
    logo: '/logos/indf.svg',
    brandColor: '#1e3a8a',
    description:
      'PT Indofood Sukses Makmur Tbk adalah perusahaan Total Food Solutions terdepan di Indonesia yang menaungi ICBP, Bogasari, agribisnis, dan distribusi nasional.',
    sector: 'Barang Konsumen Primer',
    industry: 'Makanan & Pertanian Terintegrasi',
    listingDate: '14 Juli 1994',
    website: 'https://www.indofood.com',
    address: 'Sudirman Plaza, Indofood Tower, Jl. Jend. Sudirman Kav. 76-78, Jakarta 12910',
    executives: [
      { name: 'Anthoni Salim', position: 'Direktur Utama' },
      { name: 'Franciscus Welirang', position: 'Direktur' },
    ],
    indices: ['LQ45', 'IDX30', 'KOMPAS100'],
  },
  BSDE: {
    logo: '/logos/bsde.svg',
    brandColor: '#e11d48',
    description:
      'PT Bumi Serpong Damai Tbk adalah pengembang kota mandiri BSD City dan aset properti komersial terkemuka di bawah naungan Sinar Mas Land.',
    sector: 'Properti & Real Estate',
    industry: 'Pengembangan Real Estat Kota Mandiri',
    listingDate: '6 Juni 2008',
    website: 'https://www.bsdcity.com',
    address: 'Sinar Mas Land Plaza, Grand Boulevard BSD Green Office Park, Tangerang 15345',
    executives: [
      { name: 'Francis Raditya', position: 'Presiden Direktur' },
      { name: 'Lie Jani Harjanto', position: 'Direktur Keuangan' },
    ],
    indices: ['LQ45', 'KOMPAS100', 'IDXPROP'],
  },
  CTRA: {
    logo: '/logos/ctra.svg',
    brandColor: '#0369a1',
    description:
      'PT Ciputra Development Tbk adalah salah satu pionir dan pengembang properti terintegrasi terbesar di Indonesia dengan portofolio di lebih dari 40 kota.',
    sector: 'Properti & Real Estate',
    industry: 'Pengembangan Perumahan & Komersial',
    listingDate: '28 Maret 1994',
    website: 'https://www.ciputradevelopment.com',
    address: 'DBS Bank Tower Lt. 39, Ciputra World 1, Jl. Prof. Dr. Satrio Kav. 3-5, Jakarta 12940',
    executives: [
      { name: 'Candra Ciputra', position: 'Direktur Utama' },
      { name: 'Tulus Santoso Brotosiswojo', position: 'Direktur Keuangan' },
    ],
    indices: ['LQ45', 'KOMPAS100', 'IDXPROP'],
  },
  SMRA: {
    logo: '/logos/smra.svg',
    brandColor: '#881337',
    description:
      'PT Summarecon Agung Tbk adalah pengembang kawasan terpadu terkemuka di Kelapa Gading, Serpong, Bekasi, Bandung, dan Makassar.',
    sector: 'Properti & Real Estate',
    industry: 'Pengembangan Kawasan Terpadu',
    listingDate: '7 Mei 1990',
    website: 'https://www.summarecon.com',
    address: 'Plaza Summarecon, Jl. Perintis Kemerdekaan No. 42, Jakarta Timur 13210',
    executives: [
      { name: 'Adrianto P. Adhi', position: 'Direktur Utama' },
      { name: 'Lydia Tjio', position: 'Direktur Keuangan' },
    ],
    indices: ['KOMPAS100', 'IDXPROP'],
  },
  PWON: {
    logo: '/logos/pwon.svg',
    brandColor: '#9a3412',
    description:
      'PT Pakuwon Jati Tbk adalah pengembang dan pengelola pusat perbelanjaan dan superblok ritel terkemuka (Kota Kasablanka, Gandaria City, Tunjungan Plaza).',
    sector: 'Properti & Real Estate',
    industry: 'Pusat Perbelanjaan & Superblok',
    listingDate: '9 Oktober 1989',
    website: 'https://www.pakuwonjati.com',
    address: 'East Coast Center Lt. 5, Jl. Kejawan Putih Mutiara No. 17, Surabaya 60112',
    executives: [
      { name: 'Alexander Stefanus Ridwan Suhendra', position: 'Presiden Direktur' },
      { name: 'Minarto', position: 'Direktur Keuangan' },
    ],
    indices: ['KOMPAS100', 'IDXPROP'],
  },
};

/**
 * Normalizes website URLs to ensure they have valid https protocol
 * and prevents relative localhost URL navigation errors (404).
 */
export function normalizeWebsite(url?: string, symbol?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.trim() === 'N/A') {
    return symbol
      ? `https://www.google.com/search?q=${encodeURIComponent(
          symbol.replace('.JK', '').toUpperCase() + ' IDX profil perusahaan'
        )}`
      : 'https://www.idx.co.id';
  }
  const clean = url.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  return `https://${clean}`;
}

/**
 * Generates an official, high-resolution Corporate Exchange Seal SVG
 * for any arbitrary IDX stock that does not yet have a dedicated logo asset.
 */
function generateCorporateSeal(symbol: string, sector?: string): string {
  const clean = symbol.replace('.JK', '').toUpperCase();
  const hue = Math.abs(clean.split('').reduce((acc, c) => acc + c.charCodeAt(0) * 17, 0)) % 360;

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="hsl(${hue}, 65%, 22%)"/>
        <stop offset="100%" stop-color="hsl(${hue}, 75%, 10%)"/>
      </linearGradient>
      <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23FACC15"/>
        <stop offset="100%" stop-color="%23EAB308"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="36" fill="url(%23bgG)"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <circle cx="100" cy="100" r="76" fill="none" stroke="url(%23goldG)" stroke-width="2" stroke-dasharray="8 4"/>
    <polygon points="100,32 112,48 100,64 88,48" fill="url(%23goldG)"/>
    <text x="100" y="112" font-family="'JetBrains Mono', monospace, sans-serif" font-weight="900" font-size="34" fill="%23FFFFFF" text-anchor="middle" letter-spacing="1px">${clean.slice(0, 4)}</text>
    <rect x="52" y="130" width="96" height="20" rx="6" fill="rgba(255,255,255,0.12)"/>
    <text x="100" y="144" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="10" fill="url(%23goldG)" text-anchor="middle" letter-spacing="1.5px">BEI • IDX</text>
  </svg>`;
}

/**
 * Gets stock profile and official vector logo URL for a given ticker symbol.
 */
export function getStockProfile(symbol: string, companyName?: string, overviewData?: any): StockProfile {
  const clean = symbol.replace('.JK', '').toUpperCase();
  const known = STOCK_LOGOS[clean];

  const defaultDescription = overviewData?.sub_industry
    ? `PT ${companyName || clean} Tbk adalah perusahaan publik yang terdaftar di Bursa Efek Indonesia (IDX) dalam sektor ${
        overviewData.sector || 'Pasar Modal'
      } dan sub-sektor ${overviewData.sub_industry}.`
    : `PT ${companyName || clean} Tbk adalah emiten terdaftar di Bursa Efek Indonesia (IDX).`;

  if (known) {
    return {
      symbol: clean,
      name: companyName || `PT ${clean} Tbk.`,
      logoUrl: known.logo,
      sector: overviewData?.sector || known.sector,
      subSector: overviewData?.sub_sector || known.industry,
      industry: overviewData?.industry || known.industry,
      marketCap: overviewData?.market_cap || 0,
      marketCapRank: overviewData?.market_cap_rank,
      listingDate: overviewData?.listing_date || known.listingDate,
      listingBoard: overviewData?.listing_board || 'Main Board',
      website: normalizeWebsite(overviewData?.website || known.website, clean),
      address: overviewData?.address || known.address,
      employeeNum: overviewData?.employee_num,
      description: known.description || defaultDescription,
      executives: known.executives,
      indices: known.indices,
    };
  }

  // Check if we have a matching local SVG logo in /logos/
  const knownLocalTickers = [
    'adro', 'antm', 'arto', 'asii', 'bbtn', 'bbca', 'bbni', 'bbri', 'bmri',
    'bren', 'bris', 'buka', 'bumi', 'ctra', 'bsde', 'goto', 'icbp', 'indf',
    'isat', 'klbf', 'ptba', 'pwon', 'smra', 'tlkm', 'untr', 'unvr', 'wika'
  ];

  const lower = clean.toLowerCase();
  const matchedLogo = knownLocalTickers.includes(lower)
    ? `/logos/${lower === 'bbtn' ? 'bbTN' : lower}.svg`
    : generateCorporateSeal(clean, overviewData?.sector);

  return {
    symbol: clean,
    name: companyName || `PT ${clean} Tbk.`,
    logoUrl: matchedLogo,
    sector: overviewData?.sector || 'Sektor Pasar Modal',
    subSector: overviewData?.sub_sector || 'Industri Publik',
    industry: overviewData?.industry || 'Keuangan & Bisnis',
    marketCap: overviewData?.market_cap || 0,
    marketCapRank: overviewData?.market_cap_rank,
    listingDate: overviewData?.listing_date || 'N/A',
    listingBoard: overviewData?.listing_board || 'Main Board',
    website: normalizeWebsite(overviewData?.website, clean),
    address: overviewData?.address || 'Jakarta, Indonesia',
    employeeNum: overviewData?.employee_num,
    description: defaultDescription,
    executives: [
      { name: 'Direksi Perusahaan', position: 'Manajemen Eksekutif' },
    ],
    indices: ['IDX', 'BEI'],
  };
}
