// src/app/components/MobileMenu.tsx
"use client";
import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm text-white"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-xl font-bold"
        onClick={e => { e.stopPropagation(); onClose(); }}
      >
        ✕
      </button>
      <nav className="flex flex-col space-y-6 text-2xl">
        <Link href="#" onClick={e => { e.preventDefault(); onClose(); }} className="hover:text-[#c5a880] transition-colors">
          INÍCIO
        </Link>
        <Link href="#sobre-mim" onClick={e => { e.preventDefault(); document.getElementById('sobre-mim')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} className="hover:text-[#c5a880] transition-colors">
          SOBRE &amp; EQUIPE
        </Link>
        <a href="#metodo" onClick={e => { e.preventDefault(); document.getElementById('metodo')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} className="hover:text-[#c5a880] transition-colors cursor-pointer">
          MÉTODO
        </a>
        <Link href="#vitrine" onClick={e => { e.preventDefault(); onClose(); }} className="hover:text-[#c5a880] transition-colors">
          TRABALHOS
        </Link>
        <Link href="/portfolio" onClick={e => { e.preventDefault(); onClose(); }} className="hover:text-[#c5a880] transition-colors">
          PORTFÓLIO
        </Link>
        <Link href="#coordinates" onClick={e => { e.preventDefault(); onClose(); }} className="hover:text-[#c5a880] transition-colors">
          CONTATO
        </Link>
      </nav>
    </div>
  );
}
