"use client";
import { useState } from 'react';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senhaAtual: currentPassword, novaSenha: newPassword }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ type: 'success', message: 'Senha atualizada com sucesso!' });
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Erro ao alterar a senha.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de comunicação.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-2xl font-light tracking-wide text-[#f4f4f5]">Configurações</h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-2">Segurança e Sistema</p>
      </div>

      <div className="bg-[#121215] border border-white/5 p-6 md:p-10 rounded-[2px] max-w-2xl">
        <h2 className="text-lg font-light mb-8 text-[#c5a880]">Alterar Senha de Acesso</h2>
        
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase">Senha Atual</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={e => setCurrentPassword(e.target.value)} 
              required
              className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-white focus:border-[#c5a880]/50 outline-none transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase">Nova Senha</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              required
              minLength={4}
              className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-white focus:border-[#c5a880]/50 outline-none transition-colors" 
            />
          </div>

          {status.message && (
            <p className={`font-mono text-[11px] ${status.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
              {status.message}
            </p>
          )}

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#c5a880] text-black px-8 py-3 rounded-[2px] font-mono text-[10px] tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Nova Senha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
