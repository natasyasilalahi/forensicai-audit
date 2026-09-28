'use client';

import { Home, Search, Clock, Settings, ShieldCheck, ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SidebarProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onOpenHistory?: () => void;
  onOpenSettings?: () => void;
}

export default function Sidebar({
  activeTab = 'home',
  onNavigate,
  onOpenHistory,
  onOpenSettings,
}: SidebarProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', icon: <Home size={22} />, label: t.sidebar.home },
    { id: 'search', icon: <Search size={22} />, label: t.sidebar.forensicAnalysis },
    { id: 'compare', icon: <ArrowLeftRight size={22} />, label: t.sidebar.compareStocks },
    { id: 'history', icon: <Clock size={22} />, label: t.sidebar.history },
    { id: 'settings', icon: <Settings size={22} />, label: t.sidebar.settings },
  ];

  function handleItemClick(id: string) {
    if (id === 'settings') {
      onOpenSettings?.();
    } else {
      onNavigate?.(id);
    }
  }

  return (
    <aside
      className="hidden lg:flex w-[280px] flex-shrink-0 flex-col justify-between h-[calc(100vh-64px)] sticky top-[64px] overflow-y-auto"
      style={{
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border-subtle)',
        transition: 'background 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Top gradient accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #6366f1, #ec4899, #f97316)',
          backgroundSize: '200% 100%',
          animation: 'gradient-x 4s ease infinite',
        }}
      />
      {/* Subtle dot decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 120, height: 120,
          background: 'radial-gradient(circle at top right, rgba(99,102,241,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Navigation */}
      <nav className="p-5 flex flex-col gap-1.5 mt-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="sidebar-nav-item"
              data-active={isActive || undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 600,
                color: isActive ? 'var(--accent-1)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-input)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom card */}
      <div className="p-5">
        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid rgba(99,102,241,0.2)',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner accent */}
          <div
            style={{
              position: 'absolute',
              top: -20, right: -20,
              width: 60, height: 60,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }}
          />
          <div className="flex items-center gap-3 mb-3" style={{ color: 'var(--accent-1)' }}>
            <ShieldCheck size={22} />
            <span style={{ fontSize: '16px', fontWeight: 700 }}>{t.sidebar.integratedSystem}</span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)' }}>
            {t.sidebar.integratedDesc}
          </p>
        </div>
        <div style={{ marginTop: '20px', paddingLeft: '4px', fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              boxShadow: '0 0 6px rgba(99,102,241,0.5)',
            }}
          />
          Forensic AI <span style={{ opacity: 0.5, marginLeft: '4px' }}>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
