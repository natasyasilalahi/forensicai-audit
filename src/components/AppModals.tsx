'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useLanguage } from '@/context/LanguageContext';
import {
  X, Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight,
  Clock, Trash2, Settings, ShieldCheck, CheckCircle, LogOut, Key, Check
} from 'lucide-react';

/* ─── Modal Container Wrapper ──────────────────────────────── */

function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

/* ─── Auth Modal (Login / Register) ───────────────────────── */

export function AuthModal({
  isOpen,
  onClose,
  initialTab = 'login',
}: {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}) {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) { setError('Lengkapi email dan password.'); return; }
    setLoading(true);
    setTimeout(() => {
      const res = login(loginEmail, loginPassword);
      setLoading(false);
      if (res.ok) { onClose(); }
      else { setError(res.error || 'Gagal masuk.'); }
    }, 400);
  }

  function handleQuickDemo() {
    setError('');
    setLoading(true);
    setTimeout(() => {
      const res = login('demo@forensicai.id', 'demo123password');
      setLoading(false);
      if (res.ok) { onClose(); }
      else { setError(res.error || 'Gagal masuk.'); }
    }, 400);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!regName || !regEmail || !regPassword) { setError('Lengkapi semua field.'); return; }
    if (regPassword.length < 6) { setError('Password minimal 6 karakter.'); return; }
    setLoading(true);
    setTimeout(() => {
      const res = register(regName, regEmail, regPassword);
      setLoading(false);
      if (res.ok) { onClose(); }
      else { setError(res.error || 'Gagal mendaftar.'); }
    }, 400);
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="glass-card"
        style={{
          width: '100%', maxWidth: '440px', padding: '32px',
          borderRadius: '24px', background: 'var(--bg-card)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(255,255,255,0.08)', border: 'none',
            borderRadius: '50%', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Tab Header */}
        <div style={{ display: 'flex', background: 'var(--bg-input)', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          <button
            onClick={() => { setTab('login'); setError(''); }}
            style={{
              flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
              fontWeight: 700, fontSize: '15px', cursor: 'pointer',
              background: tab === 'login' ? 'var(--bg-card)' : 'transparent',
              color: tab === 'login' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: tab === 'login' ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Masuk
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            style={{
              flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
              fontWeight: 700, fontSize: '15px', cursor: 'pointer',
              background: tab === 'register' ? 'var(--bg-card)' : 'transparent',
              color: tab === 'register' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: tab === 'register' ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Buat Akun
          </button>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px', borderRadius: '12px', marginBottom: '18px',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#f87171', fontSize: '14px', fontWeight: 600,
          }}>
            {error}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="demo@forensicai.id"
                  className="input-field"
                  style={{ paddingLeft: '44px', fontSize: '15px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingLeft: '44px', paddingRight: '44px', fontSize: '15px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', fontSize: '16px', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}
            >
              {loading ? <Sparkles size={18} className="animate-spin" /> : <>Masuk Akun <ArrowRight size={18} /></>}
            </button>

            <button
              type="button"
              onClick={handleQuickDemo}
              style={{
                width: '100%', marginTop: '12px', padding: '12px', borderRadius: '12px',
                border: '1px stroke var(--border-subtle)', background: 'rgba(99,102,241,0.08)',
                color: 'var(--accent-1)', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <Sparkles size={16} /> Demo Instant Login (Tanpa Ketik)
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Nama Lengkap
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="Ahmad Risk"
                  className="input-field"
                  style={{ paddingLeft: '44px', fontSize: '15px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="ahmad@analis.com"
                  className="input-field"
                  style={{ paddingLeft: '44px', fontSize: '15px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="input-field"
                  style={{ paddingLeft: '44px', paddingRight: '44px', fontSize: '15px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', fontSize: '16px', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
            >
              {loading ? <Sparkles size={18} className="animate-spin" /> : <>Daftar Akun Baru <ArrowRight size={18} /></>}
            </button>
          </form>
        )}
      </div>
    </ModalBackdrop>
  );
}

/* ─── Audit History Modal ─────────────────────────────────── */

export function HistoryModal({
  isOpen,
  onClose,
  onSelectSymbol,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}) {
  const { history, clearHistory } = useAuth();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="glass-card"
        style={{
          width: '100%', maxWidth: '580px', maxHeight: '80vh', display: 'flex', flexDirection: 'column',
          padding: '28px', borderRadius: '24px', background: 'var(--bg-card)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(99,102,241,0.12)', color: 'var(--accent-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{t.history.title}</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t.history.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* History List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
              <Clock size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <p style={{ fontSize: '16px', fontWeight: 600 }}>{t.history.emptyTitle}</p>
              <p style={{ fontSize: '14px', marginTop: '4px' }}>{t.history.emptyDesc}</p>
            </div>
          ) : (
            history.map((item) => {
              const isHigh = item.riskLevel === 'HIGH' || item.riskScore > 60;
              const isMed = item.riskLevel === 'MEDIUM' || (item.riskScore > 30 && item.riskScore <= 60);
              const badgeBg = isHigh ? 'rgba(239,68,68,0.15)' : isMed ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)';
              const badgeColor = isHigh ? '#ef4444' : isMed ? '#f59e0b' : '#10b981';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectSymbol(item.symbol);
                    onClose();
                  }}
                  style={{
                    padding: '16px 20px', borderRadius: '16px', background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-1)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{item.symbol}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: badgeBg, color: badgeColor }}>
                        Score {item.riskScore} • {item.riskLevel}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {item.companyName} • {item.flagCount} {t.history.redFlags}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {new Date(item.date).toLocaleDateString(t.settings.language === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={clearHistory}
              style={{
                background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none',
                padding: '10px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <Trash2 size={16} /> {t.history.clearAll}
            </button>
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
}

/* ─── Settings Modal ───────────────────────────────────────── */

type SettingsTab = 'account' | 'preferences' | 'about';

export function SettingsModal({
  isOpen,
  onClose,
  onOpenAuth,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth?: (tab: 'login' | 'register') => void;
}) {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SettingsTab>('preferences');
  const [isDark, setIsDark] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const theme = localStorage.getItem('theme') || 'dark';
      setIsDark(theme === 'dark');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const TABS: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'preferences', label: t.settings.preferencesTab, icon: <Sparkles size={17} /> },
    { id: 'account',     label: t.settings.accountTab,     icon: <User size={17} /> },
    { id: 'about',       label: t.settings.aboutTab,       icon: <ShieldCheck size={17} /> },
  ];

  function handleLogout() {
    logout();
    setShowLogoutConfirm(false);
    onClose();
  }

  function toggleTheme() {
    const next = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '15px 0',
    borderBottom: '1px solid var(--border-subtle)',
  };

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        style={{
          width: 44, height: 24, borderRadius: '9999px', border: 'none',
          background: on ? '#7c3aed' : 'var(--border-default)',
          cursor: 'pointer', position: 'relative', transition: 'background 0.25s',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 18, height: 18, borderRadius: '50%', background: 'white',
            position: 'absolute', top: 3,
            left: on ? 23 : 3,
            transition: 'left 0.25s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        />
      </button>
    );
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="glass-card"
        style={{
          width: '100%', maxWidth: '640px', height: 'min(88vh, 620px)',
          borderRadius: '24px', background: 'var(--bg-card)',
          boxShadow: '0 25px 60px -12px rgba(0,0,0,0.5)',
          display: 'flex', overflow: 'hidden', position: 'relative',
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            width: 185, flexShrink: 0,
            borderRight: '1px solid var(--border-subtle)',
            background: 'var(--bg-input)',
            display: 'flex', flexDirection: 'column',
            padding: '20px 10px',
            gap: '2px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', paddingLeft: '12px', letterSpacing: '0.08em' }}>
            {t.settings.modalTitle.toUpperCase()}
          </div>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 12px', borderRadius: '12px', border: 'none',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                background: activeTab === tab.id ? 'rgba(124,58,237,0.14)' : 'transparent',
                color: activeTab === tab.id ? '#a78bfa' : 'var(--text-secondary)',
                transition: 'all 0.18s', textAlign: 'left', width: '100%',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          {user && (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 12px', borderRadius: '12px', border: 'none',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                background: 'transparent', color: '#f87171',
                transition: 'all 0.18s', textAlign: 'left', width: '100%',
              }}
            >
              <LogOut size={17} /> {t.settings.logoutBtn}
            </button>
          )}
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {TABS.find(t => t.id === activeTab)?.label}
            </h2>
            <button
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '50%', width: 30, height: 30, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={17} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px' }}>

            {/* ── AKUN ── */}
            {activeTab === 'account' && (
              <div>
                {user ? (
                  <>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '18px', borderRadius: '16px', marginBottom: '20px',
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.06))',
                      border: '1px solid rgba(124,58,237,0.2)',
                    }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '20px', fontWeight: 900, color: 'white',
                      }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
                        <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <CheckCircle size={12} style={{ color: '#10b981' }} />
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>{language === 'en' ? 'Verified Account' : 'Akun Terverifikasi'}</span>
                        </div>
                      </div>
                    </div>

                    <div style={rowStyle}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>{t.auth.fullName}</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</span>
                    </div>
                    <div style={rowStyle}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>{t.auth.email}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{user.email}</span>
                    </div>
                    <div style={{ ...rowStyle, borderBottom: 'none' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>{t.profile.memberSince}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                        {new Date(user.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <div style={{ marginTop: '20px', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '10px', letterSpacing: '0.06em' }}>DANGER ZONE</div>
                      <button
                        onClick={() => setShowLogoutConfirm(true)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                          padding: '10px 14px', borderRadius: '10px', border: 'none',
                          background: 'rgba(239,68,68,0.12)', color: '#ef4444',
                          fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                        }}
                      >
                        <LogOut size={15} /> {t.settings.logoutBtn}
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '28px 20px' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                      <User size={26} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{t.settings.notLoggedIn}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
                      {t.settings.notLoggedInDesc}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button onClick={() => { onClose(); onOpenAuth?.('login'); }} className="btn-primary" style={{ padding: '11px 22px', fontSize: '14px', background: 'linear-gradient(135deg,#7c3aed,#6366f1)' }}>{t.settings.loginBtn}</button>
                      <button onClick={() => { onClose(); onOpenAuth?.('register'); }} className="btn-secondary" style={{ padding: '11px 22px', fontSize: '14px' }}>{t.settings.registerBtn}</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── TAMPILAN ── */}
            {activeTab === 'preferences' && (
              <div>
                <div style={rowStyle}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.settings.appTheme}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.settings.appThemeDesc}</div>
                  </div>
                  <Toggle on={isDark} onToggle={toggleTheme} />
                </div>
                <div style={rowStyle}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.settings.systemNotifications}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.settings.systemNotificationsDesc}</div>
                  </div>
                  <Toggle on={notifications} onToggle={() => setNotifications(v => !v)} />
                </div>
                <div style={{ ...rowStyle, borderBottom: 'none' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.settings.autoSaveHistory}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.settings.autoSaveHistoryDesc}</div>
                  </div>
                  <Toggle on={autoSave} onToggle={() => setAutoSave(v => !v)} />
                </div>

                {/* ── BAHASA SELECTION (Active and Reactive) ── */}
                <div style={{ marginTop: '20px', padding: '14px 16px', borderRadius: '14px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.06em' }}>
                    {t.settings.language}
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'id' | 'en')}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '10px',
                      background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                      color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'inherit', outline: 'none',
                    }}
                  >
                    <option value="id">{t.settings.langId}</option>
                    <option value="en">{t.settings.langEn}</option>
                  </select>
                </div>
              </div>
            )}

            {/* ── TENTANG ── */}
            {activeTab === 'about' && (
              <div>
                <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '16px', margin: '0 auto 12px', background: 'linear-gradient(135deg,#ef4444,#dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={28} color="white" />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '3px' }}>Forensic<span style={{ color: '#f87171' }}>AI</span></h3>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{t.settings.aboutSubtitle}</span>
                </div>
                {[
                  { label: t.settings.version, value: '1.0.0' },
                  { label: t.settings.framework, value: 'Next.js 16' },
                  { label: t.settings.dataSource, value: t.settings.dataSourceVal },
                  { label: t.settings.engine, value: t.settings.engineVal },
                  { label: t.settings.license, value: 'MIT License' },
                  { label: t.settings.builtFor, value: '🏆 Sectors Hackathon' },
                ].map((row, i, arr) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.label}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 700 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout Confirmation Overlay */}
        {showLogoutConfirm && (
          <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.15s ease-out', zIndex: 10 }}>
            <div style={{ textAlign: 'center', padding: '32px', maxWidth: '300px' }}>
              <LogOut size={36} style={{ color: '#f87171', margin: '0 auto 14px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{t.settings.logoutConfirmTitle}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '22px', lineHeight: 1.6 }}>
                {t.settings.logoutConfirmDesc}
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: '11px 22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>{t.settings.logoutCancel}</button>
                <button onClick={handleLogout} style={{ padding: '11px 22px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>{t.settings.logoutConfirm}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalBackdrop>
  );
}

/* ─── Profile Modal ────────────────────────────────────────── */

export function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();

  if (!isOpen || !user) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="glass-card"
        style={{
          width: '100%', maxWidth: '440px', padding: '32px',
          borderRadius: '24px', background: 'var(--bg-card)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative',
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={18} />
        </button>

        {/* User Info */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              color: 'white', fontSize: '28px', fontWeight: 800,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {user.name}
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
            {user.email}
          </p>
        </div>

        <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--bg-input)', marginBottom: '24px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'Account Status' : 'Status Akun'}</span>
            <span style={{ fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={14} /> {language === 'en' ? 'Verified' : 'Terverifikasi'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t.profile.memberSince}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
              {new Date(user.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            onClose();
          }}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
            background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontSize: '15px', fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          <LogOut size={18} /> {t.profile.logoutBtn}
        </button>
      </div>
    </ModalBackdrop>
  );
}
