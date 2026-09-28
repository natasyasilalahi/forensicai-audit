'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ─── Types ────────────────────────────────────────────────── */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  symbol: string;
  companyName: string;
  riskScore: number;
  riskLevel: string;
  flagCount: number;
  date: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  history: HistoryEntry[];
  addHistory: (entry: Omit<HistoryEntry, 'id' | 'date'>) => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/* ─── Helpers ──────────────────────────────────────────────── */

const USERS_KEY = 'forensicai_users';
const SESSION_KEY = 'forensicai_session';
const HISTORY_KEY = 'forensicai_history';

function getUsers(): Record<string, { name: string; email: string; password: string; createdAt: string }> {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; }
}

function saveUsers(u: Record<string, { name: string; email: string; password: string; createdAt: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
}

function getHistory(userId: string): HistoryEntry[] {
  try { return JSON.parse(localStorage.getItem(`${HISTORY_KEY}_${userId}`) || '[]'); } catch { return []; }
}

function saveHistory(userId: string, h: HistoryEntry[]) {
  localStorage.setItem(`${HISTORY_KEY}_${userId}`, JSON.stringify(h));
}

/* ─── Provider ─────────────────────────────────────────────── */

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session
  useEffect(() => {
    try {
      // Seed a demo user if none exists
      const users = getUsers();
      if (!users['demo-user-1']) {
        users['demo-user-1'] = {
          name: 'Analis Forensik',
          email: 'demo@forensicai.id',
          password: 'demo123password',
          createdAt: new Date().toISOString(),
        };
        saveUsers(users);
      }

      const sid = localStorage.getItem(SESSION_KEY);
      if (sid && users[sid]) {
        setUser({ id: sid, name: users[sid].name, email: users[sid].email, createdAt: users[sid].createdAt });
        setHistory(getHistory(sid));
      } else {
        // Guest history
        setHistory(getHistory('guest'));
      }
    } catch { /* ignore */ }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = getUsers();
    const entry = Object.entries(users).find(([, v]) => v.email.toLowerCase() === email.toLowerCase());
    if (!entry) return { ok: false, error: 'Email tidak ditemukan.' };
    if (entry[1].password !== password) return { ok: false, error: 'Password salah.' };
    const id = entry[0];
    localStorage.setItem(SESSION_KEY, id);
    setUser({ id, name: entry[1].name, email: entry[1].email, createdAt: entry[1].createdAt });
    setHistory(getHistory(id));
    return { ok: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const users = getUsers();
    const exists = Object.values(users).some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: 'Email sudah terdaftar.' };
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    users[id] = { name, email, password, createdAt: now };
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, id);
    setUser({ id, name, email, createdAt: now });
    setHistory(getHistory(id));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setHistory(getHistory('guest'));
  }, []);

  const addHistory = useCallback((entry: Omit<HistoryEntry, 'id' | 'date'>) => {
    const userId = user ? user.id : 'guest';
    const currentHist = getHistory(userId);
    // Avoid duplicate adjacent entries
    if (currentHist.length > 0 && currentHist[0].symbol === entry.symbol) return;
    
    const newEntry: HistoryEntry = { ...entry, id: crypto.randomUUID(), date: new Date().toISOString() };
    const updated = [newEntry, ...currentHist].slice(0, 50);
    setHistory(updated);
    saveHistory(userId, updated);
  }, [user]);

  const clearHistory = useCallback(() => {
    const userId = user ? user.id : 'guest';
    setHistory([]);
    saveHistory(userId, []);
  }, [user]);

  const removeHistoryItem = useCallback((id: string) => {
    const userId = user ? user.id : 'guest';
    const currentHist = getHistory(userId);
    const updated = currentHist.filter(h => h.id !== id);
    setHistory(updated);
    saveHistory(userId, updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, history, addHistory, clearHistory, removeHistoryItem }}>
      {children}
    </AuthContext.Provider>
  );
}
