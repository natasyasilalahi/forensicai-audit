export type Language = 'id' | 'en';

export interface Translations {
  common: {
    back: string;
    cancel: string;
    confirm: string;
    save: string;
    loading: string;
    error: string;
    close: string;
    search: string;
    details: string;
    all: string;
    reset: string;
    copy: string;
    copied: string;
    download: string;
    yes: string;
    no: string;
  };
  nav: {
    liveData: string;
    sectorsApp: string;
    login: string;
    register: string;
    logout: string;
    profile: string;
    language: string;
  };
  ticker: {
    live: string;
  };
  sidebar: {
    home: string;
    forensicAnalysis: string;
    compareStocks: string;
    history: string;
    settings: string;
    integratedSystem: string;
    integratedDesc: string;
    status: string;
  };
  settings: {
    modalTitle: string;
    modalSubtitle: string;
    accountTab: string;
    preferencesTab: string;
    aboutTab: string;
    appTheme: string;
    appThemeDesc: string;
    systemNotifications: string;
    systemNotificationsDesc: string;
    autoSaveHistory: string;
    autoSaveHistoryDesc: string;
    language: string;
    langId: string;
    langEn: string;
    accountInfo: string;
    notLoggedIn: string;
    notLoggedInDesc: string;
    aboutTitle: string;
    aboutSubtitle: string;
    version: string;
    framework: string;
    dataSource: string;
    dataSourceVal: string;
    engine: string;
    engineVal: string;
    license: string;
    builtFor: string;
    logoutConfirmTitle: string;
    logoutConfirmDesc: string;
    logoutCancel: string;
    logoutConfirm: string;
    logoutBtn: string;
    loginBtn: string;
    registerBtn: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    loginAction: string;
    registerAction: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    registerNow: string;
    loginNow: string;
    loggingIn: string;
    registering: string;
    fillAll: string;
    loginFailed: string;
    demoNote: string;
  };
  profile: {
    title: string;
    accountDetails: string;
    emailLabel: string;
    memberSince: string;
    totalAudits: string;
    logoutBtn: string;
  };
  history: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearAll: string;
    emptyTitle: string;
    emptyDesc: string;
    auditNow: string;
    viewAudit: string;
    delete: string;
    riskScore: string;
    riskLevel: string;
    redFlags: string;
    auditDate: string;
  };
  home: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    startAuditBtn: string;
    compareBtn: string;
    orTry: string;
    statsTitle: string;
    statsSubtitle: string;
    statStocks: string;
    statDetectors: string;
    statQuarters: string;
    statAccuracy: string;
    detectorTitle: string;
    detectorSubtitle: string;
    flipHint: string;
    sampleRedFlag: string;
    sampleOutput: string;
    radarTitle: string;
    radarSubtitle: string;
    newsTitle: string;
    newsSubtitle: string;
  };
  searchView: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    auditBtn: string;
    allSectors: string;
    quickPicks: string;
    detectorsTitle: string;
    detectorsSubtitle: string;
    activeDetectors: string;
    viewDetails: string;
    formula: string;
    threshold: string;
  };
  dashboard: {
    backToSearch: string;
    printExportPdf: string;
    loadingTitle: string;
    loadingSubtitle: string;
    cleanTitle: string;
    cleanDesc: string;
    criticalHighHeader: string;
    mediumHeader: string;
    lowHeader: string;
    flagsSuffix: string;
    auditResultFor: string;
    errorTitle: string;
    backBtn: string;
  };
  companyHeader: {
    riskScoreTitle: string;
    riskLevels: {
      low: string;
      medium: string;
      high: string;
      critical: string;
    };
    riskDescriptions: {
      low: string;
      medium: string;
      high: string;
      critical: string;
    };
    sector: string;
    subSector: string;
    marketCap: string;
    revenue: string;
    netIncome: string;
    ocf: string;
    shares: string;
    listingDate: string;
  };
  redFlag: {
    categories: {
      earnings_quality: string;
      receivables: string;
      auditor: string;
      cashflow: string;
      debt: string;
      accruals: string;
    };
    analysisDetails: string;
    implication: string;
    recommendation: string;
    underlyingData: string;
    hideDetails: string;
    viewDetails: string;
  };
  stressTest: {
    title: string;
    badge: string;
    subtitle: string;
    selectScenario: string;
    scenarios: {
      revDrop: { name: string; desc: string };
      marginComp: { name: string; desc: string };
      rateHike: { name: string; desc: string };
      worstCase: { name: string; desc: string };
    };
    simulatedScore: string;
    simulatedRisk: string;
    simulatedBeneish: string;
    reset: string;
    scoreChange: string;
    originalScore: string;
    impactAssessment: string;
    resetBtn: string;
  };
  companyProfile: {
    title: string;
    sector: string;
    subSector: string;
    listingDate: string;
    employees: string;
    website: string;
    office: string;
    about: string;
    directors: string;
    commissioners: string;
    shareholders: string;
    viewPublicProfile: string;
  };
  chartPanel: {
    title: string;
    subtitle: string;
    quarterlyTab: string;
    annualTab: string;
    legendRevenue: string;
    legendNetIncome: string;
    legendOCF: string;
    note: string;
  };
  aiPanel: {
    title: string;
    subtitle: string;
    generateBtn: string;
    generating: string;
    regenerateBtn: string;
    reanalyze: string;
    runAgent: string;
    disclaimer: string;
    copyBtn: string;
    copiedBtn: string;
    downloadBtn: string;
    readyTitle: string;
    readyDesc: string;
    promptPlaceholder: string;
  };
  compare: {
    title: string;
    subtitle: string;
    stockA: string;
    stockB: string;
    compareBtn: string;
    popularBattles: string;
    popularPresets: string;
    verdictTitle: string;
    verdictDesc: string;
    cleaner: string;
    superiorEarnings: string;
    lowerRisk: string;
    tieVerdict: string;
    metricComparison: string;
    riskScore: string;
    riskLevel: string;
    redFlagsCount: string;
    quartersAnalyzed: string;
    anomaliesComparison: string;
    noRedFlags: string;
    bothHighRiskTitle: string;
    bothHighRiskDesc: string;
    bothHealthyTitle: string;
    bothHealthyDesc: string;
    closeMatchTitle: string;
    closeMatchDesc: string;
    metrics: {
      riskScore: string;
      riskLevel: string;
      redFlags: string;
      revenue: string;
      netIncome: string;
      ocf: string;
      accrualQuality: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    common: {
      back: 'Kembali',
      cancel: 'Batal',
      confirm: 'Konfirmasi',
      save: 'Simpan',
      loading: 'Memuat...',
      error: 'Terjadi kesalahan',
      close: 'Tutup',
      search: 'Cari',
      details: 'Rincian',
      all: 'Semua',
      reset: 'Reset',
      copy: 'Salin',
      copied: 'Tersalin!',
      download: 'Unduh',
      yes: 'Ya',
      no: 'Tidak',
    },
    nav: {
      liveData: 'Data Langsung',
      sectorsApp: 'Sectors.app',
      login: 'Masuk',
      register: 'Buat Akun',
      logout: 'Keluar',
      profile: 'Profil',
      language: 'Bahasa',
    },
    ticker: {
      live: 'IDX Live',
    },
    sidebar: {
      home: 'Beranda',
      forensicAnalysis: 'Analisis Forensik',
      compareStocks: 'Komparasi Saham',
      history: 'Riwayat',
      settings: 'Pengaturan',
      integratedSystem: 'Sistem Terintegrasi',
      integratedDesc: 'Data real-time dari berbagai sektor untuk analisis yang lebih akurat dan cepat.',
      status: 'ForensicAI v1.0 • IDX',
    },
    settings: {
      modalTitle: 'Pengaturan',
      modalSubtitle: 'Preferensi aplikasi dan konfigurasi akun Anda',
      accountTab: 'Akun',
      preferencesTab: 'Preferensi',
      aboutTab: 'Tentang',
      appTheme: 'Mode Gelap',
      appThemeDesc: 'Latar belakang gelap untuk kenyamanan mata',
      systemNotifications: 'Notifikasi Sistem',
      systemNotificationsDesc: 'Tampilkan notifikasi status analisis forensik',
      autoSaveHistory: 'Simpan Riwayat Otomatis',
      autoSaveHistoryDesc: 'Simpan setiap hasil audit ke riwayat secara otomatis',
      language: 'BAHASA',
      langId: '🇮🇩 Bahasa Indonesia',
      langEn: '🇬🇧 English',
      accountInfo: 'Informasi Akun',
      notLoggedIn: 'Belum Masuk',
      notLoggedInDesc: 'Masuk atau buat akun untuk menyimpan riwayat audit dan mengakses fitur personalisasi.',
      aboutTitle: 'ForensicAI',
      aboutSubtitle: 'IDX Audit Agent • v1.0.0',
      version: 'Versi',
      framework: 'Framework',
      dataSource: 'Sumber Data',
      dataSourceVal: 'Data Pasar Modal IDX',
      engine: 'Analisis Engine',
      engineVal: 'Forensic Report Engine',
      license: 'Lisensi',
      builtFor: 'Dibuat untuk',
      logoutConfirmTitle: 'Keluar dari Akun?',
      logoutConfirmDesc: 'Anda akan keluar dari akun. Riwayat audit tetap tersimpan di perangkat ini.',
      logoutCancel: 'Batal',
      logoutConfirm: 'Ya, Keluar',
      logoutBtn: 'Keluar dari Akun',
      loginBtn: 'Masuk',
      registerBtn: 'Buat Akun',
    },
    auth: {
      loginTitle: 'Masuk ke ForensicAI',
      loginSubtitle: 'Audit laporan keuangan emiten IDX dengan AI',
      registerTitle: 'Buat Akun Baru',
      registerSubtitle: 'Mulai audit forensik laporan keuangan saham IDX',
      fullName: 'Nama Lengkap',
      fullNamePlaceholder: 'Contoh: Budi Santoso',
      email: 'Alamat Email',
      emailPlaceholder: 'nama@email.com',
      password: 'Kata Sandi',
      passwordPlaceholder: 'Minimal 6 karakter',
      loginAction: 'Masuk ke Akun',
      registerAction: 'Daftar Akun Baru',
      dontHaveAccount: 'Belum punya akun?',
      alreadyHaveAccount: 'Sudah punya akun?',
      registerNow: 'Daftar sekarang',
      loginNow: 'Masuk di sini',
      loggingIn: 'Memverifikasi...',
      registering: 'Mendaftarkan...',
      fillAll: 'Harap lengkapi semua bidang formulir.',
      loginFailed: 'Email atau kata sandi tidak sesuai.',
      demoNote: 'Akun demo tersedia otomatis untuk pengujian cepat.',
    },
    profile: {
      title: 'Profil Pengguna',
      accountDetails: 'Detail akun Anda di ForensicAI',
      emailLabel: 'Email Terdaftar',
      memberSince: 'Bergabung Sejak',
      totalAudits: 'Total Audit Dilakukan',
      logoutBtn: 'Keluar dari Akun',
    },
    history: {
      title: 'Riwayat Audit Forensik',
      subtitle: 'Daftar saham yang pernah Anda audit sebelumnya',
      searchPlaceholder: 'Cari riwayat emiten atau kode saham...',
      clearAll: 'Hapus Semua',
      emptyTitle: 'Belum Ada Riwayat Audit',
      emptyDesc: 'Saham yang Anda audit akan otomatis tercatat dan tersimpan di sini.',
      auditNow: 'Mulai Audit Saham',
      viewAudit: 'Lihat Hasil Audit',
      delete: 'Hapus',
      riskScore: 'Skor Risiko',
      riskLevel: 'Tingkat',
      redFlags: 'Red Flags',
      auditDate: 'Waktu Audit',
    },
    home: {
      badge: 'AI-POWERED FORENSIC ACCOUNTING AGENT',
      heroTitle1: 'Deteksi Anomali Lapkeu',
      heroTitle2: 'Emiten IDX Sebelum Terlambat',
      heroDesc: 'ForensicAI mengaudit 12 kuartal data keuangan emiten IDX menggunakan 8 algoritma forensik akuntansi: Beneish M-Score, Sloan Accrual Ratio, OCF Divergence, dan deteksi manipulasi laba.',
      startAuditBtn: 'Mulai Audit Saham',
      compareBtn: 'Bandingkan 2 Emiten',
      orTry: 'Atau coba emiten populer:',
      statsTitle: 'Statistik Audit IDX Terkini',
      statsSubtitle: 'Cakupan data dan akurasi mesin audit forensik kami',
      statStocks: 'Emiten Terdaftar',
      statDetectors: 'Algoritma Forensik',
      statQuarters: 'Kuartal Dianalisis',
      statAccuracy: 'Akurasi Deteksi',
      detectorTitle: '8 Algoritma Forensik Akuntansi Canggih',
      detectorSubtitle: 'Setiap laporan keuangan dievaluasi melalui matriks deteksi kuantitatif yang ketat.',
      flipHint: 'Klik kartu untuk melihat simulasi red flag',
      sampleRedFlag: 'Contoh Temuan Red Flag',
      sampleOutput: 'Contoh Output Laporan',
      radarTitle: 'Radar Sektor IDX',
      radarSubtitle: 'Peta risiko forensik lintas sektor pasar modal',
      newsTitle: 'Radar Berita & Pengungkapan Emiten',
      newsSubtitle: 'Sentimen dan berita pasar terkini yang dapat memicu anomali pelaporan.',
    },
    searchView: {
      heroTitle: 'Cari & Audit Emiten IDX',
      heroSubtitle: 'Ketik kode saham untuk menjalankan 8 model forensik dan analisis AI komprehensif',
      searchPlaceholder: 'Cari kode saham (cth: BBCA, GOTO, BUMI)...',
      auditBtn: 'Audit Forensik',
      allSectors: 'Semua Sektor',
      quickPicks: 'Pilihan Cepat Emiten Populer:',
      detectorsTitle: 'Model Forensik yang Diaktifkan',
      detectorsSubtitle: 'Algoritma akuntansi kuantitatif yang dieksekusi saat analisis',
      activeDetectors: 'Detektor Aktif',
      viewDetails: 'Lihat Formula & Parameter',
      formula: 'Formula Metrik',
      threshold: 'Ambang Batas',
    },
    dashboard: {
      backToSearch: '← Cari Saham Lain',
      printExportPdf: 'Cetak / Export PDF',
      loadingTitle: 'Mengaudit',
      loadingSubtitle: 'Menjalankan 8 detektor forensik dan menganalisis 12 kuartal data keuangan.',
      cleanTitle: 'Laporan Keuangan Sehat (Tidak Ditemukan Anomali Signifikan)',
      cleanDesc: 'Indikator akrual, arus kas operasi, dan kualitas laba berada dalam rentang wajar dan aman.',
      criticalHighHeader: 'Critical & High Risk',
      mediumHeader: 'Medium Risk',
      lowHeader: 'Low Risk / Informasi',
      flagsSuffix: 'Flag',
      auditResultFor: 'Hasil Audit Forensik:',
      errorTitle: 'Terjadi Kesalahan',
      backBtn: '← Kembali ke Pencarian',
    },
    companyHeader: {
      riskScoreTitle: 'Skor Risiko Forensik',
      riskLevels: {
        low: 'RENDAH',
        medium: 'SEDANG',
        high: 'TINGGI',
        critical: 'KRITIS',
      },
      riskDescriptions: {
        low: 'Integritas pelaporan keuangan prima tanpa anomali material',
        medium: 'Ditemukan beberapa indikasi non-kas yang perlu pemantauan berkala',
        high: 'Divergensi signifikan antara laba akuntansi dan kas operasional',
        critical: 'Peringatan tingkat tinggi: potensi rekayasa laba atau distorsi akrual berat',
      },
      sector: 'Sektor',
      subSector: 'Sub Sektor',
      marketCap: 'Kapitalisasi Pasar',
      revenue: 'Pendapatan (TTM)',
      netIncome: 'Laba Bersih (TTM)',
      ocf: 'Arus Kas Operasi (OCF)',
      shares: 'Jumlah Saham Beredar',
      listingDate: 'Tanggal IPO',
    },
    redFlag: {
      categories: {
        earnings_quality: 'Kualitas Laba',
        receivables: 'Piutang Usaha',
        auditor: 'Auditor & Tata Kelola',
        cashflow: 'Arus Kas',
        debt: 'Leverage / Utang',
        accruals: 'Akrual',
      },
      analysisDetails: 'Rincian Analisis',
      implication: 'Implikasi Investigasi',
      recommendation: 'Rekomendasi Tindakan',
      underlyingData: 'Data Terkait',
      hideDetails: 'Tutup Rincian',
      viewDetails: 'Lihat Rincian Analisis',
    },
    stressTest: {
      title: 'Simulasi What-If Stress Test',
      badge: 'STRESS TEST ENGINE',
      subtitle: 'Uji ketahanan emiten terhadap skenario penurunan pendapatan, lonjakan beban bunga, atau kompresi margin',
      selectScenario: 'Pilih Skenario Stres:',
      scenarios: {
        revDrop: { name: 'Penurunan Omzet -20%', desc: 'Menguji ketahanan kas jika volume penjualan anjlok drastis.' },
        marginComp: { name: 'Kompresi Margin Laba -5%', desc: 'Simulasi kenaikan beban bahan baku dan operasional.' },
        rateHike: { name: 'Lonjakan Beban Bunga +300bps', desc: 'Menguji rasio cakupan bunga terhadap lonjakan beban utang.' },
        worstCase: { name: 'Kombinasi Krisis Ekstrem', desc: 'Penurunan omzet simultan dengan kontraksi margin dan kenaikan suku bunga.' },
      },
      simulatedScore: 'Skor Risiko Simulasi',
      simulatedRisk: 'Skor Risiko Simulasi',
      simulatedBeneish: 'Estimasi Beneish M-Score',
      reset: 'Reset',
      scoreChange: 'Perubahan Skor',
      originalScore: 'Skor Awal',
      impactAssessment: 'Dampak Terhadap Solvabilitas & Integritas Kas',
      resetBtn: 'Reset Skenario',
    },
    companyProfile: {
      title: 'Profil Perusahaan & Manajemen',
      sector: 'Sektor Industri',
      subSector: 'Sub Sektor',
      listingDate: 'Tanggal Pencatatan',
      employees: 'Karyawan',
      website: 'Situs Resmi',
      office: 'Kantor Pusat',
      about: 'Tentang Perusahaan',
      directors: 'Dewan Direksi',
      commissioners: 'Dewan Komisaris',
      shareholders: 'Struktur Pemegang Saham',
      viewPublicProfile: 'Kunjungi Website Emiten',
    },
    chartPanel: {
      title: 'Tren Keuangan Multi-Kuartal',
      subtitle: 'Analisis komparatif Laba Bersih vs Arus Kas Operasional (OCF) & Pendapatan',
      quarterlyTab: 'Kuartalan (12 Kuartal)',
      annualTab: 'Tahunan (Historis)',
      legendRevenue: 'Pendapatan',
      legendNetIncome: 'Laba Bersih',
      legendOCF: 'Arus Kas Operasi (OCF)',
      note: 'Perhatikan jarak antara kurva Laba Bersih dan Kas Operasional. Divergensi yang melebar menandakan kualitas laba yang menurun.',
    },
    aiPanel: {
      title: 'Analisis Forensik AI (CFA Level III Agent)',
      subtitle: 'Opini independen bertenaga Google Gemini tentang kualitas laba dan integritas pelaporan',
      generateBtn: 'Jalankan Analisis AI',
      generating: 'Menganalisis Laporan Keuangan...',
      regenerateBtn: 'Analisis Ulang',
      reanalyze: 'Analisis Ulang',
      runAgent: 'Jalankan Agent',
      disclaimer: 'Disclaimer: Analisis ini dihasilkan otomatis oleh AI berdasarkan model akuntansi forensik dan tidak merupakan rekomendasi investasi langsung.',
      copyBtn: 'Salin Laporan',
      copiedBtn: 'Tersalin!',
      downloadBtn: 'Unduh Markdown',
      readyTitle: 'Siap untuk Analisis Mendalam',
      readyDesc: 'Klik tombol di bawah untuk menghasilkan laporan audit forensik komprehensif dari AI.',
      promptPlaceholder: 'Tambahkan instruksi khusus untuk auditor AI (opsional)...',
    },
    compare: {
      title: 'Komparasi Forensik Head-to-Head',
      subtitle: 'Bandingkan integritas laporan keuangan antara dua emiten IDX secara berdampingan',
      stockA: 'Emiten A',
      stockB: 'Emiten B',
      compareBtn: 'Bandingkan Emiten',
      popularBattles: 'Duel Saham Populer:',
      popularPresets: 'Duel Saham Populer:',
      verdictTitle: 'Kesimpulan Evaluasi Forensik',
      verdictDesc: 'Evaluasi berdasarkan anomali akuntansi, divergensi arus kas, rasio akrual, dan transparansi laporan keuangan.',
      cleaner: 'Lebih Sehat',
      superiorEarnings: 'Kualitas Laba Lebih Unggul',
      lowerRisk: 'Tingkat Risiko Lebih Rendah',
      tieVerdict: 'Kedua emiten menunjukkan profil risiko yang sebanding',
      metricComparison: 'Perbandingan Metrik Utama',
      riskScore: 'Skor Risiko Forensik',
      riskLevel: 'Tingkat Risiko',
      redFlagsCount: 'Jumlah Red Flag',
      quartersAnalyzed: 'Kuartal Dianalisis',
      anomaliesComparison: 'Perbandingan Temuan Anomali & Red Flag',
      noRedFlags: 'Tidak ada red flag signifikan terdeteksi.',
      bothHighRiskTitle: 'PERINGATAN: KEDUA EMITEN MEMILIKI RISIKO TINGGI',
      bothHighRiskDesc: 'Kedua emiten terdeteksi memiliki sejumlah red flag manipulasi akuntansi. Diperlukan kewaspadaan ekstra dan audit mendalam sebelum berinvestasi.',
      bothHealthyTitle: 'KEDUA EMITEN SANGAT SEHAT & BEBAS DARI RED FLAG KRITIS',
      bothHealthyDesc: 'Kedua emiten menunjukkan kualitas pelaporan keuangan yang solid, arus kas sehat, dan transparansi akrual yang sangat baik.',
      closeMatchTitle: 'PROFIL RISIKO SANGAT SEIMBANG',
      closeMatchDesc: 'Kedua emiten memiliki selisih skor forensik yang sangat tipis dan standar tata kelola laporan keuangan yang setara.',
      metrics: {
        riskScore: 'Skor Risiko Forensik',
        riskLevel: 'Tingkat Risiko',
        redFlags: 'Jumlah Red Flag',
        revenue: 'Pendapatan Terakhir',
        netIncome: 'Laba Bersih Terakhir',
        ocf: 'Kas Operasi (OCF)',
        accrualQuality: 'Kualitas Akrual',
      },
    },
  },

  en: {
    common: {
      back: 'Back',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      loading: 'Loading...',
      error: 'An error occurred',
      close: 'Close',
      search: 'Search',
      details: 'Details',
      all: 'All',
      reset: 'Reset',
      copy: 'Copy',
      copied: 'Copied!',
      download: 'Download',
      yes: 'Yes',
      no: 'No',
    },
    nav: {
      liveData: 'Live Data',
      sectorsApp: 'Sectors.app',
      login: 'Log In',
      register: 'Sign Up',
      logout: 'Log Out',
      profile: 'Profile',
      language: 'Language',
    },
    ticker: {
      live: 'IDX Live',
    },
    sidebar: {
      home: 'Home',
      forensicAnalysis: 'Forensic Analysis',
      compareStocks: 'Stock Comparison',
      history: 'History',
      settings: 'Settings',
      integratedSystem: 'Integrated System',
      integratedDesc: 'Real-time data across IDX sectors for faster, more accurate forensic analysis.',
      status: 'ForensicAI v1.0 • IDX',
    },
    settings: {
      modalTitle: 'Settings',
      modalSubtitle: 'Application preferences and account configuration',
      accountTab: 'Account',
      preferencesTab: 'Preferences',
      aboutTab: 'About',
      appTheme: 'Dark Mode',
      appThemeDesc: 'Dark background for optimal visual comfort',
      systemNotifications: 'System Notifications',
      systemNotificationsDesc: 'Display forensic analysis status notifications',
      autoSaveHistory: 'Auto-Save History',
      autoSaveHistoryDesc: 'Automatically record each audit result to history',
      language: 'LANGUAGE',
      langId: '🇮🇩 Bahasa Indonesia',
      langEn: '🇬🇧 English',
      accountInfo: 'Account Information',
      notLoggedIn: 'Not Logged In',
      notLoggedInDesc: 'Log in or create an account to save audit history and access personalized features.',
      aboutTitle: 'ForensicAI',
      aboutSubtitle: 'IDX Audit Agent • v1.0.0',
      version: 'Version',
      framework: 'Framework',
      dataSource: 'Data Source',
      dataSourceVal: 'IDX Capital Market Data',
      engine: 'Analysis Engine',
      engineVal: 'Forensic Report Engine',
      license: 'License',
      builtFor: 'Built for',
      logoutConfirmTitle: 'Log Out of Account?',
      logoutConfirmDesc: 'You will be logged out of your account. Your audit history will remain saved on this device.',
      logoutCancel: 'Cancel',
      logoutConfirm: 'Yes, Log Out',
      logoutBtn: 'Log Out',
      loginBtn: 'Log In',
      registerBtn: 'Sign Up',
    },
    auth: {
      loginTitle: 'Log In to ForensicAI',
      loginSubtitle: 'Audit IDX financial statements with AI precision',
      registerTitle: 'Create New Account',
      registerSubtitle: 'Start forensic auditing on IDX stock financials',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. John Doe',
      email: 'Email Address',
      emailPlaceholder: 'name@email.com',
      password: 'Password',
      passwordPlaceholder: 'Minimum 6 characters',
      loginAction: 'Log In to Account',
      registerAction: 'Create Account',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      registerNow: 'Sign up now',
      loginNow: 'Log in here',
      loggingIn: 'Verifying...',
      registering: 'Creating account...',
      fillAll: 'Please fill in all form fields.',
      loginFailed: 'Incorrect email or password.',
      demoNote: 'Demo account is automatically ready for quick testing.',
    },
    profile: {
      title: 'User Profile',
      accountDetails: 'Your ForensicAI account details',
      emailLabel: 'Registered Email',
      memberSince: 'Member Since',
      totalAudits: 'Total Audits Completed',
      logoutBtn: 'Log Out of Account',
    },
    history: {
      title: 'Forensic Audit History',
      subtitle: 'List of stocks you have previously analyzed',
      searchPlaceholder: 'Search audited tickers or company names...',
      clearAll: 'Clear All',
      emptyTitle: 'No Audit History Yet',
      emptyDesc: 'Stocks that you analyze will automatically be recorded and saved here.',
      auditNow: 'Start Stock Audit',
      viewAudit: 'View Audit Results',
      delete: 'Delete',
      riskScore: 'Risk Score',
      riskLevel: 'Risk Level',
      redFlags: 'Red Flags',
      auditDate: 'Audit Date',
    },
    home: {
      badge: 'AI-POWERED FORENSIC ACCOUNTING AGENT',
      heroTitle1: 'Detect Financial Anomalies',
      heroTitle2: 'In IDX Stocks Before It Is Too Late',
      heroDesc: 'ForensicAI audits 12 quarters of IDX financial reports using 8 forensic accounting algorithms: Beneish M-Score, Sloan Accrual Ratio, OCF Divergence, and earnings manipulation detectors.',
      startAuditBtn: 'Start Stock Audit',
      compareBtn: 'Compare 2 Stocks',
      orTry: 'Or try popular stocks:',
      statsTitle: 'Latest IDX Audit Statistics',
      statsSubtitle: 'Our forensic engine coverage and detection metrics',
      statStocks: 'Listed Companies',
      statDetectors: 'Forensic Algorithms',
      statQuarters: 'Quarters Analyzed',
      statAccuracy: 'Detection Accuracy',
      detectorTitle: '8 Advanced Forensic Accounting Algorithms',
      detectorSubtitle: 'Every financial report is rigorously evaluated through a multi-dimensional quantitative matrix.',
      flipHint: 'Click card to preview red flag simulation',
      sampleRedFlag: 'Red Flag Case Study',
      sampleOutput: 'Sample Report Output',
      radarTitle: 'IDX Sector Radar',
      radarSubtitle: 'Cross-sector forensic risk heatmap across the capital market',
      newsTitle: 'Market News & Disclosure Radar',
      newsSubtitle: 'Real-time market sentiment and public disclosures that could signal reporting anomalies.',
    },
    searchView: {
      heroTitle: 'Search & Audit IDX Stocks',
      heroSubtitle: 'Enter ticker symbol to run 8 forensic models and comprehensive AI analysis',
      searchPlaceholder: 'Search ticker (e.g. BBCA, GOTO, BUMI)...',
      auditBtn: 'Forensic Audit',
      allSectors: 'All Sectors',
      quickPicks: 'Quick Picks - Popular Stocks:',
      detectorsTitle: 'Active Forensic Models',
      detectorsSubtitle: 'Quantitative accounting algorithms executed during evaluation',
      activeDetectors: 'Active Detectors',
      viewDetails: 'View Formula & Thresholds',
      formula: 'Metric Formula',
      threshold: 'Alert Threshold',
    },
    dashboard: {
      backToSearch: '← Search Another Stock',
      printExportPdf: 'Print / Export PDF',
      loadingTitle: 'Auditing',
      loadingSubtitle: 'Running 8 forensic detectors and analyzing 12 quarters of financial data.',
      cleanTitle: 'Clean Financial Report (No Significant Anomalies Detected)',
      cleanDesc: 'Accrual indicators, operating cash flow, and earnings quality are within healthy, expected ranges.',
      criticalHighHeader: 'Critical & High Risk',
      mediumHeader: 'Medium Risk',
      lowHeader: 'Low Risk / Information',
      flagsSuffix: 'Flags',
      auditResultFor: 'Forensic Audit Result:',
      errorTitle: 'An Error Occurred',
      backBtn: '← Back to Search',
    },
    companyHeader: {
      riskScoreTitle: 'Forensic Risk Score',
      riskLevels: {
        low: 'LOW',
        medium: 'MEDIUM',
        high: 'HIGH',
        critical: 'CRITICAL',
      },
      riskDescriptions: {
        low: 'Prime financial reporting integrity with no material anomalies detected',
        medium: 'Minor non-cash indications observed requiring periodic review',
        high: 'Significant divergence between accounting earnings and operational cash',
        critical: 'High-severity alert: potential earnings manipulation or severe accrual distortion',
      },
      sector: 'Sector',
      subSector: 'Sub Sector',
      marketCap: 'Market Cap',
      revenue: 'Revenue (TTM)',
      netIncome: 'Net Income (TTM)',
      ocf: 'Operating Cash Flow (OCF)',
      shares: 'Shares Outstanding',
      listingDate: 'IPO Date',
    },
    redFlag: {
      categories: {
        earnings_quality: 'Earnings Quality',
        receivables: 'Accounts Receivable',
        auditor: 'Auditor & Governance',
        cashflow: 'Cash Flow',
        debt: 'Leverage & Debt',
        accruals: 'Accrual Accounting',
      },
      analysisDetails: 'Analysis Breakdown',
      implication: 'Investigative Implication',
      recommendation: 'Recommended Action',
      underlyingData: 'Underlying Financial Data',
      hideDetails: 'Hide Details',
      viewDetails: 'View Detailed Breakdown',
    },
    stressTest: {
      title: 'What-If Stress Test Simulation',
      badge: 'STRESS TEST ENGINE',
      subtitle: 'Simulate company resilience against revenue shocks, interest rate spikes, or margin compression',
      selectScenario: 'Select Stress Scenario:',
      scenarios: {
        revDrop: { name: 'Revenue Shock -20%', desc: 'Tests cash buffer if top-line sales suddenly plunge.' },
        marginComp: { name: 'Margin Compression -5%', desc: 'Simulates rising input costs and operational pressure.' },
        rateHike: { name: 'Interest Rate Surge +300bps', desc: 'Tests interest coverage under higher borrowing costs.' },
        worstCase: { name: 'Extreme Crisis Combination', desc: 'Simultaneous top-line decline, margin crunch, and interest spike.' },
      },
      simulatedScore: 'Simulated Risk Score',
      simulatedRisk: 'Simulated Risk Score',
      simulatedBeneish: 'Estimated Beneish M-Score',
      reset: 'Reset',
      scoreChange: 'Score Change',
      originalScore: 'Baseline Score',
      impactAssessment: 'Impact on Solvency & Cash Integrity',
      resetBtn: 'Reset Scenario',
    },
    companyProfile: {
      title: 'Company Profile & Leadership',
      sector: 'Industry Sector',
      subSector: 'Sub Sector',
      listingDate: 'Listing Date',
      employees: 'Employees',
      website: 'Official Website',
      office: 'Headquarters',
      about: 'About Company',
      directors: 'Board of Directors',
      commissioners: 'Board of Commissioners',
      shareholders: 'Major Shareholders',
      viewPublicProfile: 'Visit Official Website',
    },
    chartPanel: {
      title: 'Multi-Quarter Financial Trends',
      subtitle: 'Comparative analysis of Net Income vs Operating Cash Flow (OCF) & Revenue',
      quarterlyTab: 'Quarterly (12 Quarters)',
      annualTab: 'Annual (Historical)',
      legendRevenue: 'Revenue',
      legendNetIncome: 'Net Income',
      legendOCF: 'Operating Cash Flow (OCF)',
      note: 'Observe the divergence between Net Income and Operating Cash Flow curves. Widening gaps indicate deteriorating earnings quality.',
    },
    aiPanel: {
      title: 'AI Forensic Analysis (CFA Level III Agent)',
      subtitle: 'Independent opinion powered by Google Gemini on earnings quality and reporting integrity',
      generateBtn: 'Run AI Forensic Audit',
      generating: 'Analyzing Financial Statements...',
      regenerateBtn: 'Re-analyze',
      reanalyze: 'Re-analyze',
      runAgent: 'Run Agent',
      disclaimer: 'Disclaimer: This analysis is generated by AI based on forensic accounting models and does not constitute direct investment advice.',
      copyBtn: 'Copy Report',
      copiedBtn: 'Copied!',
      downloadBtn: 'Download Markdown',
      readyTitle: 'Ready for Forensic Audit',
      readyDesc: 'Click the button below to generate a comprehensive AI forensic audit report.',
      promptPlaceholder: 'Add custom instructions for the AI auditor (optional)...',
    },
    compare: {
      title: 'Head-to-Head Forensic Comparison',
      subtitle: 'Compare financial reporting integrity between two IDX stocks side by side',
      stockA: 'Stock A',
      stockB: 'Stock B',
      compareBtn: 'Compare Stocks',
      popularBattles: 'Popular Stock Duels:',
      popularPresets: 'Popular Stock Duels:',
      verdictTitle: 'Forensic Verdict Summary',
      verdictDesc: 'Evaluated based on accounting anomalies, cash flow divergences, accrual ratios, and financial statement transparency.',
      cleaner: 'Healthier Profile',
      superiorEarnings: 'Superior Earnings Quality',
      lowerRisk: 'Lower Forensic Risk',
      tieVerdict: 'Both companies exhibit comparable risk profiles',
      metricComparison: 'Key Forensic Metrics',
      riskScore: 'Forensic Risk Score',
      riskLevel: 'Risk Level',
      redFlagsCount: 'Red Flag Count',
      quartersAnalyzed: 'Quarters Analyzed',
      anomaliesComparison: 'Side-by-Side Anomaly & Red Flag Breakdown',
      noRedFlags: 'No significant forensic red flags detected.',
      bothHighRiskTitle: 'WARNING: BOTH ISSUERS RESIDE IN ELEVATED RISK ZONES',
      bothHighRiskDesc: 'Both issuers have triggered multiple accounting manipulation red flags. Extreme diligence and thorough forensic investigation are advised before investing.',
      bothHealthyTitle: 'BOTH ISSUERS DEMONSTRATE STRONG FINANCIAL INTEGRITY',
      bothHealthyDesc: 'Both issuers exhibit clean reporting quality, solid operational cash generation, and transparent accrual records with no critical red flags.',
      closeMatchTitle: 'CLOSELY MATCHED FORENSIC PROFILES',
      closeMatchDesc: 'Both issuers share comparable forensic risk scores and equivalent reporting governance standards.',
      metrics: {
        riskScore: 'Forensic Risk Score',
        riskLevel: 'Risk Level',
        redFlags: 'Red Flag Count',
        revenue: 'Latest Revenue',
        netIncome: 'Latest Net Income',
        ocf: 'Operating Cash Flow (OCF)',
        accrualQuality: 'Accrual Quality',
      },
    },
  },
};
