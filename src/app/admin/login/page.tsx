"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Senha incorreta');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121215] border border-white/10 p-8 rounded-[2px] shadow-2xl relative">
        <div className="glass-border-refraction rounded-[2px]"></div>
        
        <div className="text-center mb-8 relative z-10">
          <span className="font-sans font-light tracking-[0.3em] text-[16px] text-white/90">CLEAN</span>
          <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-4">Sistema de Gestão Restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] font-mono text-zinc-400 mb-2 uppercase tracking-wider">
              Chave de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-[2px] font-mono text-sm focus:outline-none focus:border-[#c5a880]/50 transition-colors"
              placeholder="••••••••"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-[11px] font-mono">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c5a880] text-black font-semibold text-[11px] tracking-[0.2em] uppercase py-4 rounded-[2px] hover:bg-white transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'AUTENTICANDO...' : 'ACESSAR PAINEL'}
          </button>
        </form>
      </div>
    </div>
  );
}
