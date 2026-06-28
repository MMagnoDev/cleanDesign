"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, X } from "@phosphor-icons/react";

const servicesList = [
  { id: "essencia", label: "Clean Essência", active: false, href: "/servicos" },
  { id: "presenca", label: "Clean Presença", active: false, href: "/servicos/presenca" },
  { id: "expansao", label: "Clean Expansão", active: false, href: "/servicos/expansao" },
  { id: "autoridade", label: "Clean Autoridade", active: true, href: "/servicos/autoridade" },
  { id: "signature", label: "Clean Signature", active: false, href: "/servicos/signature" },
];

export default function CleanAutoridadePage() {
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
      <title>Clean Autoridade | Marca, Estratégia Digital e Análise de Mercado | Clean Design</title>
      <meta name="description" content="O Clean Autoridade é o pacote da Clean Design para marcas que desejam construir uma presença digital mais estratégica, com identidade visual, análise de mercado e direção de conteúdo." />

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
              className={`transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full ${service.active ? 'text-[#c5a880] font-medium' : 'text-zinc-400 hover:text-white'
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
            2026 — AUTORIDADE ESTRATÉGICA
          </span>
          <h1 className="text-[48px] sm:text-[76px] lg:text-[88px] tracking-[-0.03em] leading-[0.95] text-white font-sans font-bold uppercase">
            CLEAN AUTORIDADE
          </h1>
          <h2 className="text-[20px] sm:text-[28px] lg:text-[32px] font-sans font-[100] text-[#c5a880] tracking-wide mt-1">
            Marca + Estratégia Digital + Análise de Mercado
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-400 font-light leading-tight sm:leading-tight max-w-[650px] mt-4">
            Um pacote da Clean Design criado para desenvolver a identidade visual da marca, analisar seu mercado e estruturar uma direção digital mais estratégica, clara e preparada para comunicar valor com autoridade.
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
            <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-[-0.02em] leading-tight text-black">
              O mercado está mais visual, mais competitivo e mais exigente.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-tight sm:leading-tight text-zinc-700">
              <p>
                Hoje, marcas não disputam apenas atenção. Elas disputam percepção, confiança, clareza e espaço na mente do público.
              </p>
              <p>
                Ter uma identidade visual bonita já não é suficiente quando todos estão criando conteúdo, anunciando, postando e tentando se posicionar.
              </p>
              <p>
                A marca que se destaca é aquela que entende seu cenário, comunica seus diferenciais com intenção e constrói uma presença digital coerente com o valor que deseja transmitir.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/estrategiademercado.webp"
                alt="Análise de mercado estratégica"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
            <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono tracking-widest text-[#a39384] uppercase px-1">
              <span>Presença digital com estratégia</span>
              <span>Marca posicionada com intenção</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO 02 — O PROBLEMA */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6 text-left">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#c5a880] uppercase font-semibold">
              02 — O problema
            </span>
            <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-[-0.02em] leading-tight text-black">
              Marcas que aparecem muito, mas comunicam pouco.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-tight sm:leading-tight text-zinc-700">
              <p>
                Muitas marcas postam com frequência, investem em identidade visual e tentam estar presentes no digital, mas ainda não conseguem ocupar um espaço claro no mercado.
              </p>
              <p>
                O conteúdo parece solto. A comunicação não evidencia diferenciais. O perfil não constrói autoridade. A marca não se diferencia dos concorrentes. E a presença digital acaba sendo mais uma obrigação do que uma estratégia.
              </p>
              <p>
                Quando não existe análise, direção e posicionamento, a marca fala muito, mas não constrói percepção.
              </p>
            </div>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <div className="flex flex-col gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#a18a6e] uppercase">
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem estratégia, o conteúdo perde força.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem diferenciação, a marca vira mais uma.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem direção digital, a presença existe, mas não gera autoridade.</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/iana_martins_mockup2.png"
                alt="Comunicação desconectada"
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
          <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px]">
            Construímos a presença estratégica que sustenta uma marca com mais autoridade.
          </h2>
          <div className="flex flex-col gap-4 text-[14px] sm:text-[16px] text-zinc-650 font-light leading-tight sm:leading-tight max-w-[650px] mt-2">
            <p>
              Pensado para marcas que desejam ir além da identidade visual e começar a ocupar espaço no digital com mais clareza, coerência e diferenciação.
            </p>
            <p>
              O Clean Autoridade une marca, análise de mercado e estratégia digital para criar uma direção mais sólida de posicionamento, conteúdo e presença.
            </p>
            <p className="text-[#a18a6e] font-medium font-mono text-[11px] uppercase ">
              Não criamos apenas a parte visual. Entregamos uma direção estratégica para que a marca saiba como se comunicar, se diferenciar e ocupar espaço com mais autoridade.
            </p>
          </div>
        </div>
      </section>

      {/* FRENTE 01 */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[24px] text-[#c5a880] font-semibold">01</span>
              <div className="h-[1px] w-8 bg-[#c5a880]/30"></div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Imagem</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Marca e Identidade Visual
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-tight sm:leading-tight">
              Construímos la base visual da marca com clareza, intenção e consistência, criando uma identidade capaz de transmitir profissionalismo, reconhecimento e percepção de valor.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-tight sm:leading-tight">
              Essa etapa estrutura a imagem visual da marca para que ela tenha uma presença mais forte nos materiais, no Instagram, no mini site e nos pontos de contato com o cliente.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700 leading-tight sm:leading-tight">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Identidade visual completa</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Logo principal &amp; Variações da marca</span>
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
                <span>Paleta de cores estratégica</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Tipografias da marca &amp; Elementos gráficos de apoio</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Marcas d’água &amp; Manual básico de aplicação</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Cartão de visita personalizado &amp; 3 artes para papelaria</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Arquivos finais para uso digital e impressão</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/idendidadevisual.jpg"
                alt="Marca e Identidade Visual"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Posicionamento</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Análise de Mercado e Diferenciação
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-tight sm:leading-tight">
              Analisamos o cenário visual e comunicacional do nicho para identificar padrões, oportunidades e caminhos que podem destacar a marca com mais clareza e percepção premium.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-tight sm:leading-tight">
              Essa etapa ajuda a marca a sair do lugar comum e construir uma presença mais estratégica, consciente e alinhada ao espaço que deseja ocupar.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700 leading-tight sm:leading-tight">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Análise visual de concorrentes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Análise de comunicação do nicho</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Identificação de padrões comuns do mercado</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Oportunidades de diferenciação</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Pontos de percepção premium</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sugestão de caminhos para destacar a marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Indicação de diferenciais visuais e comunicacionais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção de posicionamento inicial</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/consultoria.webp"
                alt="Análise de Mercado e Diferenciação"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Digital</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Estratégia Digital e Conteúdo
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-tight sm:leading-tight">
              Estruturamos uma direção de conteúdo para que a marca deixe de postar por obrigação e comece a comunicar valor com intenção, coerência e autoridade.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-tight sm:leading-tight">
              Essa etapa organiza a narrativa da marca no Instagram, orientando temas, abordagens, formatos e caminhos visuais para fortalecer desejo, confiança e conversão.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700 leading-tight sm:leading-tight">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Estratégia para Instagram &amp; Direção de posts e Reels</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sugestão de linha editorial &amp; Pilares de conteúdo</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Ideias de posts &amp; Ideias de Reels</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sugestão de abordagem visual &amp; Tom de comunicação</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção de temas para autoridade, desejo e conversão</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sugestão de CTA estratégico</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Organização da narrativa da marca no perfil</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/socialmidia.webp"
                alt="Estratégia Digital e Conteúdo"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Presença</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Mini Site e Presença Estratégica
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-tight sm:leading-tight">
              Organizamos um ambiente digital inicial para que a marca tenha um ponto de apresentação claro, profissional e alinhado ao seu posicionamento.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-tight sm:leading-tight">
              O mini site funciona como uma estrutura estratégica para apresentar a marca, reunir links importantes, direcionar o cliente e transformar a presença digital em um caminho mais organizado de contato e conversão.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700 leading-tight sm:leading-tight">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Mini site estratégico</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Apresentação da marca &amp; Breve descrição dos serviços</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Chamada principal &amp; Botão para WhatsApp</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Link para Instagram &amp; Links importantes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Visual alinhado à identidade de marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Organização dos principais pontos de contato digitais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Orientação de presença digital</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/sites.webp"
                alt="Mini Site e Presença Estratégica"
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
          <h2 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.01em] leading-[1.1] text-black uppercase">
            PARA MARCAS QUE QUEREM PARAR DE APENAS APARECER E COMEÇAR A OCUPAR ESPAÇO COM MAIS AUTORIDADE.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-zinc-650 font-light leading-tight sm:leading-tight max-w-[650px] mt-2">
            O Clean Autoridade é para negócios que desejam entender melhor seu mercado, comunicar seus diferenciais com mais clareza e construir uma presença digital mais estratégica, coerente e preparada para gerar percepção de valor.
          </p>
          <div className="h-[1px] w-full bg-black/5 my-6"></div>
          <ul className="flex flex-col gap-3.5 text-[16px] font-light text-zinc-700 text-left max-w-[550px] leading-tight sm:leading-tight">
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem se posicionar com mais autoridade no mercado;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>sentem que postam muito, mas comunicam pouco;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam entender melhor os padrões do seu nicho e se diferenciar;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>desejam uma direção de conteúdo para Instagram e organizar a narrativa da marca;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam de uma identidade visual completa e estratégica;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>desejam um mini site alinhado à identidade e ao posicionamento;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>entendem que presença digital precisa de intenção, não apenas frequência.</span>
            </li>
          </ul>
        </div>
      </section>


      {/* 14. SEÇÃO FINAL — CTA */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] text-center border-b border-zinc-200">
        <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6">
          <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px] uppercase font-sans">
            AUTORIDADE NÃO SE CONSTRÓI COM POSTAGEM SOLTA. <br />
            <span className="text-[#c5a880]">SE CONSTRÓI COM DIREÇÃO.</span>
          </h2>
          <p className="text-[13px] text-zinc-550 font-mono tracking-wider uppercase">
            Vagas limitadas — atendimento sob análise estratégica.
          </p>

          <a
            href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Clean%20Autoridade.%20Quero%20construir%20autoridade."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#1c1a17] text-white hover:bg-[#c5a880] dark:bg-white dark:text-black dark:hover:bg-[#c5a880] font-mono text-[10px] tracking-[0.2em] uppercase rounded-[2px] font-medium transition-all duration-300 text-center mt-6 shadow-md hover:shadow-lg"
          >
            QUERO CONSTRUIR AUTORIDADE COM A CLEAN
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
