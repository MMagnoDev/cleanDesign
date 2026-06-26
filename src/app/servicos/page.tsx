"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, X } from "@phosphor-icons/react";

const servicesList = [
  { id: "essencia", label: "Clean Essência", active: true, href: "/servicos" },
  { id: "presenca", label: "Clean Presença", active: false, href: "/servicos/presenca" },
  { id: "expansao", label: "Clean Expansão", active: false, href: "/servicos/expansao" },
  { id: "autoridade", label: "Clean Autoridade", active: false, href: "/servicos/autoridade" },
  { id: "signature", label: "Clean Signature", active: false, href: "/servicos/signature" },
];

export default function CleanEssenciaPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLightMode(localStorage.getItem("theme") === "light");
    }
  }, []);

  useEffect(() => {
    // Keep it dark-mode by default as it's a dark page, but honor global text classes
    document.body.classList.remove("light-mode");
    document.body.classList.add("bg-[#13110f]");
  }, []);

  return (
    <div className="w-full max-w-full min-h-screen relative flex flex-col font-sans antialiased overflow-x-hidden bg-[#13110f] text-zinc-300">
      
      {/* Meta tags fallback for Next.js client component */}
      <title>Clean Essência | Construção Visual da Marca | Clean Design</title>
      <meta name="description" content="O Clean Essência é o pacote da Clean Design para marcas que desejam construir uma base visual profissional, coerente e percebida com mais valor desde o primeiro contato." />

      {/* Background ambient blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vh] rounded-full blur-[130px] bg-[#c5a880]/5"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vh] rounded-full blur-[160px] bg-[#c5a880]/3"></div>
      </div>

      {/* HEADER MINIMALISTA */}
      <header className="w-full z-[90] py-6 px-8 sm:px-16 lg:px-24 flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-[0.25em] transition-all duration-300 border-b border-white/5 bg-[#121215]/50 backdrop-blur-md text-white/90">
        <div className="flex items-center justify-between w-full md:hidden">
          <Link href="/" className="font-sans font-light tracking-[0.3em] text-[12px] text-white">CLEAN</Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-colors font-mono text-[9px] tracking-widest bg-transparent border-none cursor-pointer"
          >
            {isMobileMenuOpen ? 'FECHAR' : 'MENU'}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-[#c5a880] transition-colors relative py-1 font-bold text-white tracking-[0.3em] mr-6">
            CLEAN DESIGN
          </Link>
          {servicesList.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className={`transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full ${
                service.active ? 'text-[#c5a880] font-medium' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {service.label.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-[2px] border border-white/10 hover:border-[#c5a880]/40 text-[#a1a1aa] hover:text-[#f4f4f5] transition-all duration-300 group font-mono text-[10px] tracking-[0.2em] uppercase bg-black/20"
          >
            <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-1" />
            VOLTAR PARA A HOME
          </Link>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-white md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white"
          >
            ✕ FECHAR
          </button>
          <nav className="flex flex-col space-y-6 text-center text-xs font-mono tracking-[0.25em] uppercase px-8">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              INÍCIO (HOME)
            </Link>
            {servicesList.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors ${service.active ? 'text-[#c5a880]' : 'hover:text-[#c5a880]'}`}
              >
                {service.label}
              </Link>
            ))}
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors border-t border-white/10 pt-4 mt-4 w-full text-center">
              ← VOLTAR PARA A HOME
            </Link>
          </nav>
        </div>
      )}

      {/* 2. HERO ESCURO */}
      <section className="w-full relative min-h-[85vh] flex items-center justify-center py-24 px-8 sm:px-16 lg:px-24 bg-[#0c0b09] text-white overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-15 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/brandingdealtopadrao.webp')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#13110f] via-transparent to-[#0c0b09]/90 z-[1]"></div>

        <div className="max-w-[1100px] w-full relative z-10 flex flex-col items-start gap-6 text-left">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#c5a880] uppercase">
            2026 — POSICIONAMENTO ESTRATÉGICO
          </span>
          <h1 className="text-[48px] sm:text-[76px] lg:text-[88px] tracking-[-0.03em] leading-[0.95] text-white font-sans font-bold">
            CLEAN ESSÊNCIA
          </h1>
          <h2 className="text-[26px] sm:text-[36px] lg:text-[42px] font-sans font-[100] text-[#c5a880] tracking-wide mt-1">
            Construção Visual da Marca
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-400 font-light leading-relaxed max-w-[650px] mt-4">
            Um pacote da Clean Design criado para estruturar a base visual de marcas que desejam deixar de parecer improvisadas e passar a transmitir profissionalismo, confiança e valor desde o primeiro contato.
          </p>
          <div className="h-[1px] w-16 bg-[#c5a880] mt-6"></div>
        </div>
      </section>

      {/* 3. SEÇÃO 01 — O CENÁRIO */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#c5a880] uppercase font-semibold">
              01 — O cenário
            </span>
            <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black">
              O mercado mudou.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-750">
              <p>
                Hoje, não basta ter um bom produto, um bom serviço ou uma boa entrega. Sua marca também precisa ser percebida como profissional antes mesmo do primeiro contato.
              </p>
              <p>
                A forma como uma marca se apresenta visualmente influencia diretamente a confiança, o desejo e a percepção de valor que o público cria sobre ela.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/estrategiademercado.webp"
                alt="Identidade visual estratégica"
                className="w-full h-full object-cover grayscale-[0.1]"
              />
            </div>
            <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono tracking-widest text-[#a39384] uppercase px-1">
              <span>Identidade visual estratégica</span>
              <span>Marca aplicada com consistência</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO 02 — O PROBLEMA */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6 text-left">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#c5a880] uppercase font-semibold font-mono">
              02 — O problema
            </span>
            <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black">
              Boas marcas, com imagens ainda improvisadas.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-750">
              <p>
                Muitos negócios têm qualidade, entrega e potencial, mas continuam sendo percebidos como menores, menos profissionais ou menos confiáveis porque sua identidade visual não acompanha o valor real da marca.
              </p>
              <p>
                Quando não existe uma base visual clara, tudo parece desconectado: o logo, as cores, as fontes, o Instagram, os materiais comerciais e a forma como o cliente percebe o negócio.
              </p>
            </div>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <div className="flex flex-col gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#a18a6e] uppercase">
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem direção visual, a marca perde força.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem consistência, ela não é lembrada.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem percepção de valor, ela passa a competir por preço.</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/posicionamento_teaser.png"
                alt="Boas marcas com imagens improvisadas"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO — O PACOTE */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto flex flex-col gap-6 text-left">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#c5a880] uppercase font-semibold">
            O pacote
          </span>
          <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px]">
            Criamos as bases que sustentam uma marca visualmente consistente e reconhecível.
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-650 font-light leading-relaxed max-w-[650px] mt-2">
            Pensado para transformar negócios em marcas mais profissionais, coerentes e percebidas com mais valor. Conduzimos um processo completo de construção visual em 4 frentes integradas.
          </p>
        </div>
      </section>

      {/* FRENTE 01 */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[24px] text-[#c5a880] font-semibold">01</span>
              <div className="h-[1px] w-8 bg-[#c5a880]/30"></div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Frente estratégica</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Diagnóstico e Direção Visual
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Antes de criar a identidade, entendemos o momento da marca, seu público, seus objetivos, suas referências e a perception que ela precisa transmitir. Essa etapa define o caminho criativo e estratégico para que a marca não seja construída apenas pela estética, mas por intenção.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Diagnóstico inicial da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Análise do momento atual do negócio</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Definição da percepção desejada</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção criativa visual</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Organização de referências estéticas</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Alinhamento do estilo visual da marca</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/posicionamentodealto.webp"
                alt="Diagnóstico e Direção Visual"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FRENTE 02 */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[24px] text-[#c5a880] font-semibold">02</span>
              <div className="h-[1px] w-8 bg-[#c5a880]/30"></div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Identidade</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Sistema de Identidade Visual
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Construção do sistema visual da marca, traduzindo a direção criativa em elementos capazes de gerar reconhecimento, profissionalismo e consistência. Essa etapa cria a base principal da identidade, garantindo que a marca tenha variações e recursos visuais para diferentes aplicações.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Logo principal</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Variações da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sublogo ou marca secundária</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Ícone ou símbolo da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Marcas d’água</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Elementos gráficos de apoio</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/idendidadevisual.jpg"
                alt="Sistema de Identidade Visual"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FRENTE 03 */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[24px] text-[#c5a880] font-semibold">03</span>
              <div className="h-[1px] w-8 bg-[#c5a880]/30"></div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Universo da marca</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Universo Visual da Marca
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Definição dos elementos que sustentam a personalidade visual da marca e tornam sua comunicação mais consistente, reconhecível e profissional. Essa etapa organiza cores, tipografias e elementos gráficos para criar uma identidade visual coerente e aplicável.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Paleta de cores estratégica</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Tipografias da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Combinações visuais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção estética da identidade</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Elementos de apoio para aplicações digitais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Orientação de coerência visual</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/naming.jpeg"
                alt="Universo Visual da Marca"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FRENTE 04 */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[24px] text-[#c5a880] font-semibold">04</span>
              <div className="h-[1px] w-8 bg-[#c5a880]/30"></div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Implementação</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Aplicação e Entrega Estratégica
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Organizamos os arquivos e orientações essenciais para que a marca possa ser usada com consistência em materiais digitais, impressos e pontos de contato. A identidade não é criada para ficar salva em uma pasta. Ela é construída para ser aplicada, reconhecida e lembrada.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Manual básico de aplicação</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Arquivos finais para uso digital</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Arquivos finais para impressão</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Orientações de uso da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Organização dos arquivos finais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção para aplicação da identidade em futuros materiais</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/brandingdealtopadrao.webp"
                alt="Aplicação e Entrega Estratégica"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. SEÇÃO — PARA QUEM É */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] text-center border-b border-zinc-200">
        <div className="max-w-[850px] w-full mx-auto flex flex-col gap-6 items-center">
          <span className="font-mono text-[20px] text-[#c5a880] uppercase font-semibold">
            Para quem é
          </span>
          <h2 className="text-[36px] sm:text-[47px] font-[100] tracking-[-0.01em] leading-tight text-black uppercase">
            PARA MARCAS QUE DESEJAM COMEÇAR COM UMA BASE VISUAL FORTE — OU RECONSTRUIR SUA IMAGEM COM MAIS PROFISSIONALISMO.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-zinc-600 font-light leading-relaxed max-w-[650px] mt-2">
            O Clean Essência é para negócios que desejam estruturar sua identidade visual com estratégia, clareza e coerência para transmitir mais confiança desde o primeiro contato.
          </p>
          <div className="h-[1px] w-full bg-black/5 my-6"></div>
          <ul className="flex flex-col gap-3.5 text-[16px] font-light text-zinc-700 text-left max-w-[550px]">
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>marcas que sentem que sua imagem atual parece improvisada;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>negócios que querem transmitir mais profissionalismo;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>empresas que precisam organizar logo, cores, fontes e elementos visuais;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>marcas que desejam deixar de parecer amadoras;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>negócios que precisam de uma base visual para Instagram, site e materiais comerciais.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 14. SEÇÃO FINAL — CTA */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] text-center border-b border-zinc-200">
        <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6">
          <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px] uppercase font-sans">
            IDENTIDADE VISUAL NÃO É APENAS ESTÉTICA. <br />
            <span className="text-[#c5a880]">É PERCEPÇÃO.</span>
          </h2>
          <p className="text-[13px] text-zinc-550 font-mono tracking-wider uppercase">
            Vagas limitadas — atendimento sob análise estratégica.
          </p>
          
          <a
            href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Clean%20Essência.%20Quero%20construir%20minha%20marca."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#1c1a17] text-white hover:bg-[#c5a880] dark:bg-white dark:text-black dark:hover:bg-[#c5a880] font-mono text-[10px] tracking-[0.2em] uppercase rounded-[2px] font-medium transition-all duration-300 text-center mt-6 shadow-md hover:shadow-lg"
          >
            QUERO CONSTRUIR MINHA MARCA COM A CLEAN
          </a>
        </div>
      </section>

      {/* 15. FOOTER DISCRETO */}
      <footer className="w-full border-t border-white/5 py-12 px-8 sm:px-16 lg:px-24 bg-[#0c0b09] flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[9px] text-zinc-500 tracking-wider uppercase">
        <span>© 2026 Clean Design. Todos os direitos reservados.</span>
        <a 
          href="https://instagram.com/cleandesignn" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#f4f4f5] hover:text-[#c5a880] transition-colors duration-300 cursor-pointer flex items-center gap-2 bg-transparent border-none font-mono text-[9px] tracking-wider"
        >
          Instagram da Clean <ArrowUpRight size={12} />
        </a>
      </footer>

    </div>
  );
}
