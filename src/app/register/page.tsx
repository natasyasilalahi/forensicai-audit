'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { AlertTriangle, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('Lengkapi semua field.'); return; }
    if (password.length < 6) { setError('Password minimal 6 karakter.'); return; }
    
    setLoading(true);
    setTimeout(() => {
      const result = register(name, email, password);
      if (!result.ok) {
        setError(result.error || 'Gagal mendaftar.');
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 800);
      }
    }, 500);
  }

  return (
    <div
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-base)', padding: '24px',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(124,58,237,0.12) 0%, transparent 60%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '460px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: 56, height: 56, borderRadius: '16px', margin: '0 auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            }}
          >
            <AlertTriangle size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Buat Akun ForensicAI
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>
            Dapatkan akses simpan riwayat audit & analisis mendalam emiten IDX
          </p>
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: '36px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={48} style={{ color: '#10b981', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Pendaftaran Berhasil!</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Mengalihkan ke dashboard...</p>
            </div>
          ) : (
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

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Nama Lengkap
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Budi Santoso"
                    className="input-field"
                    style={{ paddingLeft: '44px', fontSize: '16px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
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
                    placeholder="Minimal 6 karakter"
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
                style={{ width: '100%', fontSize: '16px', padding: '16px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
              >
                {loading ? (
                  <><Sparkles size={18} className="animate-spin" /> Mendaftar...</>
                ) : (
                  <>Buat Akun <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          )}

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Sudah punya akun? </span>
            <a href="/login" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-1)', textDecoration: 'none' }}>
              Masuk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
