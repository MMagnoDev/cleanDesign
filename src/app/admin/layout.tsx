"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, render without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (err) {
      console.error("Logout failed", err);
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex text-[#f4f4f5] font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121215] border-r border-white/5 flex flex-col justify-between hidden md:flex">
        <div className="p-8">
          <div className="mb-12">
            <span className="font-sans font-light tracking-[0.3em] text-[14px] text-white/90">CLEAN</span>
            <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-2">Restricted Mode</p>
          </div>
          
          <nav className="space-y-4 font-mono text-[11px] tracking-widest uppercase">
            <Link href="/admin" className="block text-[#c5a880] hover:text-white transition-colors">
              Portfólio
            </Link>
            <Link href="/admin/settings" className="block text-zinc-500 hover:text-white transition-colors">
              Configurações
            </Link>
          </nav>
        </div>

        <div className="p-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-zinc-500 hover:text-red-400 font-mono text-[10px] tracking-widest uppercase transition-colors"
          >
            {loggingOut ? 'Saindo...' : 'Desconectar'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#09090b]">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center p-6 border-b border-white/5 bg-[#121215]">
          <span className="font-sans font-light tracking-[0.3em] text-[12px] text-white">CLEAN</span>
          <button onClick={handleLogout} className="text-zinc-500 hover:text-white font-mono text-[9px] uppercase tracking-widest">
            Sair
          </button>
        </header>

        <div className="p-6 sm:p-12 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
