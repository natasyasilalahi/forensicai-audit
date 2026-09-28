'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { AlertTriangle, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Lengkapi semua field.'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (!result.ok) setError(result.error || 'Gagal login.');
      else window.location.href = '/';
      setLoading(false);
    }, 500);
  }

  return (
    <div
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-base)', padding: '24px',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.08) 0%, transparent 60%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: 56, height: 56, borderRadius: '16px', margin: '0 auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            }}
          >
            <AlertTriangle size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Masuk ke ForensicAI
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>
            Audit laporan keuangan emiten IDX dengan AI
          </p>
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: '12px 16px', borderRadius: '12px', marginBottom: '20px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#f87171', fontSize: '14px', fontWeight: 600,
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="input-field"
                  style={{ paddingLeft: '44px', fontSize: '16px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingLeft: '44px', paddingRight: '44px', fontSize: '16px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', fontSize: '16px', padding: '16px', background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}
            >
              {loading ? (
                <><Sparkles size={18} className="animate-spin" /> Memproses...</>
              ) : (
                <>Masuk <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Belum punya akun? </span>
            <a href="/register" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-1)', textDecoration: 'none' }}>
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
