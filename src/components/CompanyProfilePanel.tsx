'use client';
import {
  Building2, Globe, MapPin, Users, Calendar, Award,
  ExternalLink, Info, CheckCircle2, ChevronRight, Layers, Tag
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { StockProfile } from '@/lib/stock-info';
import { getStockProfile, normalizeWebsite } from '@/lib/stock-info';

interface CompanyProfilePanelProps {
  symbol: string;
  companyName: string;
  profile?: StockProfile;
  overview?: any;
}

function formatIDR(val: number | undefined | null, lang: 'id' | 'en'): string {
  if (!val) return 'N/A';
  if (Math.abs(val) >= 1e12) return lang === 'en' ? `Rp ${(val / 1e12).toFixed(2)} Trillion` : `Rp ${(val / 1e12).toFixed(2)} Triliun`;
  if (Math.abs(val) >= 1e9) return lang === 'en' ? `Rp ${(val / 1e9).toFixed(2)} Billion` : `Rp ${(val / 1e9).toFixed(2)} Miliar`;
  return `Rp ${val.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')}`;
}

export default function CompanyProfilePanel({
  symbol,
  companyName,
  profile: initialProfile,
  overview,
}: CompanyProfilePanelProps) {
  const { language, t } = useLanguage();
  const profile = initialProfile || getStockProfile(symbol, companyName, overview);

  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        padding: '28px',
        borderRadius: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        marginBottom: '28px',
      }}
    >
      {/* ── Top Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '24px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                {profile.name}
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '13px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--accent-1), #7c3aed)',
                  color: 'white',
                }}
              >
                {profile.symbol}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, color: 'var(--accent-1)' }}>{profile.sector}</span>
              <span>•</span>
              <span>{profile.industry}</span>
              {profile.listingBoard && (
                <>
                  <span>•</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {language === 'en' ? `${profile.listingBoard} Board` : `Papan ${profile.listingBoard}`}
                  </span>
                </>
              )}
            </div>
          </div>

        {profile.website && (
          <a
            href={normalizeWebsite(profile.website, profile.symbol)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-1)';
              e.currentTarget.style.color = 'var(--accent-1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <Globe size={16} /> {language === 'en' ? 'Official Website' : 'Website Resmi'} <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* ── Business Description ── */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Info size={15} /> {language === 'en' ? 'COMPANY PROFILE & DESCRIPTION' : 'PROFIL & DESKRIPSI EMITEN'}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {profile.description}
        </p>
      </div>

      {/* ── Key Company Metadata Cards ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '24px',
        }}
      >
        {/* Market Cap */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '14px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={14} /> {language === 'en' ? 'Market Capitalization' : 'Kapitalisasi Pasar'}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
            {profile.marketCap ? formatIDR(profile.marketCap, language) : (language === 'en' ? 'Sector Benchmark' : 'Sensitif Sektor')}
          </div>
          {profile.marketCapRank && (
            <div style={{ fontSize: '12px', color: 'var(--accent-1)', fontWeight: 700, marginTop: '2px' }}>
              {language === 'en' ? `Market Rank #${profile.marketCapRank}` : `Peringkat Pasar #${profile.marketCapRank}`}
            </div>
          )}
        </div>

        {/* Listing Date */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '14px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} /> {language === 'en' ? 'IPO / Listing Date' : 'Tanggal IPO / Listing'}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {profile.listingDate || (language === 'en' ? 'IDX Listed' : 'Terdaftar IDX')}
          </div>
        </div>

        {/* Employee count */}
        {profile.employeeNum && (
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '14px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} /> {language === 'en' ? 'Workforce' : 'Tenaga Kerja'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {profile.employeeNum.toLocaleString(language === 'en' ? 'en-US' : 'id-ID')} {language === 'en' ? 'Employees' : 'Karyawan'}
            </div>
          </div>
        )}

        {/* HQ Address */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '14px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} /> {language === 'en' ? 'Headquarters' : 'Kantor Pusat'}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {profile.address || 'Jakarta, Indonesia'}
          </div>
        </div>
      </div>

      {/* ── Key Management / Executives Section ── */}
      {profile.executives && profile.executives.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={15} /> {language === 'en' ? 'BOARD OF DIRECTORS & KEY EXECUTIVES' : 'DEWAN DIREKSI & MANAJEMEN UTAMA'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {profile.executives.map((exec, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(99,102,241,0.15)',
                    color: 'var(--accent-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '14px',
                  }}
                >
                  {exec.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {exec.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {exec.position}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Stock Indices Tags ── */}
      {profile.indices && profile.indices.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Tag size={13} /> {language === 'en' ? 'Listed Indices:' : 'Indeks Terdaftar:'}
          </span>
          {profile.indices.map((idx) => (
            <span
              key={idx}
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '6px',
                background: 'rgba(99,102,241,0.12)',
                color: 'var(--accent-1)',
                border: '1px solid rgba(99,102,241,0.25)',
              }}
            >
              {idx}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
