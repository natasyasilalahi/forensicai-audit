import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ForensicAI — Forensic Accounting & Red-Flag Audit Agent | IDX',
  description:
    'Agen AI forensik akuntansi untuk mendeteksi anomali laporan keuangan emiten IDX. Analisis Earnings vs OCF, Accrual Ratio, Beneish M-Score, dan red flags keuangan secara otomatis.',
  keywords: ['forensic accounting', 'IDX', 'saham Indonesia', 'red flag', 'audit', 'Beneish M-Score', 'laporan keuangan'],
  openGraph: {
    title: 'ForensicAI — IDX Forensic Accounting Agent',
    description: 'Deteksi anomali laporan keuangan emiten IDX secara otomatis dengan AI.',
    type: 'website',
  },
};

import AuthProvider from '@/components/AuthProvider';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Prevent FOUC for theme and language */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', t);
                var l = localStorage.getItem('forensicai_language') || 'id';
                document.documentElement.setAttribute('lang', l);
              } catch(e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
