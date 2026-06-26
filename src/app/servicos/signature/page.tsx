"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, X } from "@phosphor-icons/react";

const servicesList = [
  { id: "essencia", label: "Clean Essência", active: false, href: "/servicos" },
  { id: "presenca", label: "Clean Presença", active: false, href: "/servicos/presenca" },
  { id: "expansao", label: "Clean Expansão", active: false, href: "/servicos/expansao" },
  { id: "autoridade", label: "Clean Autoridade", active: false, href: "/servicos/autoridade" },
  { id: "signature", label: "Clean Signature", active: true, href: "/servicos/signature" },
];

export default function CleanSignaturePage() {
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
      <title>Clean Signature | Direção Executiva de Marca | Clean Design</title>
      <meta name="description" content="O Clean Signature é o projeto premium da Clean Design para marcas que desejam construção visual, posicionamento estratégico, presença digital e direção executiva de marca por Rafael." />

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
            2026 — DIREÇÃO ESTRATÉGICA DE MARCA
          </span>
          <h1 className="text-[48px] sm:text-[76px] lg:text-[88px] tracking-[-0.03em] leading-[0.95] text-white font-sans font-bold uppercase">
            CLEAN SIGNATURE
          </h1>
          <h2 className="text-[26px] sm:text-[36px] lg:text-[42px] font-sans font-[100] text-[#c5a880] tracking-wide mt-1">
            Construção visual e posicionamento estratégico com direção executiva de Rafael.
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-400 font-light leading-relaxed max-w-[650px] mt-4">
            Um projeto premium da Clean Design criado para marcas que desejam uma construção mais profunda, autoral e competitiva — unindo identidade visual, presença digital, análise de mercado e direção estratégica de marca.
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
              Marcas maduras precisam de mais do que uma boa identidade.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-750">
              <p>
                Em mercados cada vez mais competitivos, a percepção de uma marca não é construída apenas pelo logo, pelo site ou pelo conteúdo publicado.
              </p>
              <p>
                Ela nasce da forma como a marca se posiciona, se apresenta, comunica seus diferenciais e organiza sua presença nos principais pontos de contato.
              </p>
              <p>
                Hoje, marcas que desejam crescer com mais valor precisam de direção. Direção visual. Direção estratégica. Direção digital. E clareza sobre o espaço que desejam ocupar no mercado.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/posicionamentodealto.webp"
                alt="Direção criativa executiva"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
            <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono tracking-widest text-[#a39384] uppercase px-1">
              <span>Direção estratégica de marca</span>
              <span>Presença institucional refinada</span>
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
            <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black">
              Marcas com potencial, mas sem uma direção clara de presença.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-700">
              <p>
                Muitas marcas chegam a um ponto em que apenas atualizar a identidade visual já não é suficiente.
              </p>
              <p>
                Elas precisam entender melhor o mercado, organizar sua narrativa, fortalecer seus diferenciais, profissionalizar sua presença digital e construir uma imagem capaz de sustentar um novo nível de posicionamento.
              </p>
              <p>
                Quando não existe uma direção estratégica, a marca pode até parecer bonita, mas continua sem clareza, sem diferenciação e sem força institucional.
              </p>
            </div>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <div className="flex flex-col gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#a18a6e] uppercase">
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem direção, a marca se dispersa.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem posicionamento, ela se mistura aos concorrentes.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem presença estratégica, ela aparece, mas não ocupa espaço.</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/posicionamento_teaser.png"
                alt="Problemas de posicionamento de marca"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO — O PROJETO */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto flex flex-col gap-6 text-left">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#c5a880] uppercase font-semibold">
            O projeto
          </span>
          <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px]">
            Uma construção estratégica de marca conduzida com direção executiva.
          </h2>
          <div className="flex flex-col gap-4 text-[14px] sm:text-[16px] text-zinc-650 font-light leading-relaxed max-w-[650px] mt-2">
            <p>
              O Clean Signature é o projeto premium da Clean Design para marcas que precisam de uma construção mais profunda, personalizada e orientada por estratégia.
            </p>
            <p>
              Mais do que desenvolver uma identidade visual, conduzimos uma direção completa para fortalecer a forma como a marca se apresenta, comunica valor, organiza sua presença digital e ocupa espaço no mercado.
            </p>
            <p className="text-[#a18a6e] font-medium font-mono text-[11px] uppercase ">
              Aqui, a diferença não está apenas no volume de entregas. Está na condução estratégica do projeto, com direção executiva de Rafael em decisões essenciais de marca, presença e posicionamento.
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Direção Executiva</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Direção Executiva e Diagnóstico Profundo
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Nesta etapa, a marca passa por uma leitura mais aprofundada para entender seu momento, seus desafios, seus objetivos e a percepção que precisa construir para sustentar um posicionamento mais forte.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-relaxed">
              A direção executiva de Rafael entra como camada estratégica para orientar decisões visuais, comunicacionais e institucionais do projeto.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção executiva de marca por Rafael</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Diagnóstico aprofundado da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Leitura do momento atual do negócio</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Indicação de posicionamento estratégico</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção de diferenciação no mercado</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Recomendações de narrativa comercial</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Recomendações de presença digital</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Orientação de aplicação da marca nos principais canais</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/team.webp"
                alt="Direção Executiva por Rafael"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Imagem</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Identidade Visual e Sistema de Marca
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Desenvolvemos uma identidade visual completa, refinada e aplicável, traduzindo a direção estratégica em um sistema visual capaz de sustentar reconhecimento, profissionalismo e percepção de valor.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-relaxed">
              A identidade é construída para funcionar de forma consistente nos materiais institucionais, no ambiente digital, no site e nos principais pontos de contato da marca.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
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
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/idendidadevisual.jpg"
                alt="Identidade Visual e Sistema de Marca"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Estratégia</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Mercado, Posicionamento e Estratégia Digital
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Analisamos o cenário em que a marca está inserida e estruturamos uma direção digital para que sua comunicação tenha mais intenção, diferenciação e clareza.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-relaxed">
              Essa etapa organiza caminhos para que a marca saiba como se comunicar, quais temas explorar, como apresentar seus diferenciais e como fortalecer sua percepção de autoridade no digital.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Análise de mercado &amp; Análise visual de concorrentes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Análise de comunicação do nicho &amp; Padrões de mercado</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Oportunidades de diferenciação &amp; Pontos premium</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sugestão de caminhos para destacar a marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Estratégia para Instagram &amp; Direção de posts e Reels</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sugestão de linha editorial &amp; Direção de temas</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sugestão de CTA &amp; Organização da narrativa no perfil</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/estrategiademercado.webp"
                alt="Mercado e Posicionamento"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Institucional</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Site Institucional Estratégico
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              O site institucional estratégico é o ambiente onde a marca organiza sua apresentação, fortalece sua credibilidade e conduz o visitante com mais clareza.
            </p>
            <p className="text-[14px] text-zinc-600 font-light leading-relaxed">
              Mais do que um site, essa etapa entrega uma estrutura digital alinhada à identidade e ao posicionamento, pensada para apresentar a marca, seus serviços, diferenciais e caminhos de contato de forma profissional.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Site institucional estratégico (Página inicial)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Apresentação da marca &amp; Seção sobre</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Seção de serviços &amp; Diferenciais da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Provas, portfólio ou elements de credibilidade</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Chamada para WhatsApp &amp; Organização da jornada do visitante</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Estrutura visual alinhada à identidade de marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção de texto institucional &amp; Apresentação estratégica do projeto</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/servicos/sites.webp"
                alt="Site Institucional Estratégico"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO — INDICAÇÃO DE POSICIONAMENTO ESTRATÉGICO */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-zinc-50 text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#c5a880] uppercase font-semibold">
              Direção estratégica
            </span>
            <h2 className="text-[36px] sm:text-[47px] font-[100] tracking-[-0.02em] leading-tight text-black">
              A marca recebe mais do que uma identidade.
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-6 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-700 text-left pt-2 lg:pt-8 lg:pl-12">
            <p className="font-medium text-black text-[16px] sm:text-[18px]">
              Recebe uma direção para se apresentar com mais clareza.
            </p>
            <p>
              O Clean Signature inclui uma direção estratégica com recomendações sobre como a marca deve se apresentar, comunicar seus diferenciais, organizar sua presença digital e fortalecer sua percepção de valor no mercado.
            </p>
            <p>
              Essa etapa orienta decisões importantes sobre narrativa, presença, posicionamento inicial e caminhos de diferenciação, para que a marca tenha mais clareza sobre como ocupar espaço com consistência.
            </p>
          </div>
        </div>
      </section>

      {/* 11. SEÇÃO — PARA QUEM É */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] text-center border-b border-zinc-200">
        <div className="max-w-[850px] w-full mx-auto flex flex-col gap-6 items-center">
          <span className="font-mono text-[20px] text-[#c5a880] uppercase font-semibold">
            Para quem é
          </span>
          <h2 className="text-[36px] sm:text-[47px] font-[100] tracking-[-0.01em] leading-[1.1] text-black uppercase">
            PARA MARCAS QUE NÃO QUEREM APENAS UMA NOVA IDENTIDADE. QUEREM UMA DIREÇÃO MAIS CLARA PARA UM NOVO POSICIONAMENTO.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-zinc-650 font-light leading-snug max-w-[650px] mt-2">
            O Clean Signature é para marcas que desejam uma construção mais madura, estratégica e personalizada, conduzida diretamente pela direção criativa da Clean.
          </p>
          <div className="h-[1px] w-full bg-black/5 my-6"></div>
          <ul className="flex flex-col gap-3.5 text-[16px] font-light text-zinc-700 text-left max-w-[550px]">
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem elevar sua percepção de valor no mercado;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam de uma identidade visual mais refinada e estratégica;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>desejam uma presença digital mais clara, forte e coerente;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam entender melhor seu cenário competitivo;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem organizar sua narrativa comercial;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>desejam um site institucional estratégico;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam de recomendações sobre posicionamento e diferenciação;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem construir uma imagem mais autoral, madura e competitiva;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>entendem que presença de marca exige direção, não apenas entregáveis.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 14. SEÇÃO FINAL — CTA */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] text-center border-b border-zinc-200">
        <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6">
          <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px] uppercase font-sans">
            MARCAS FORTES NÃO NASCEM DE ENTREGÁVEIS SOLTOS. <br />
            <span className="text-[#c5a880]">NASCEM DE DIREÇÃO.</span>
          </h2>
          <p className="text-[13px] text-zinc-550 font-mono tracking-wider uppercase">
            Projeto premium — atendimento sob curadoria estratégica.
          </p>

          <a
            href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Clean%20Signature.%20Quero%20construir%20minha%20marca."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#1c1a17] text-white hover:bg-[#c5a880] dark:bg-white dark:text-black dark:hover:bg-[#c5a880] font-mono text-[10px] tracking-[0.2em] uppercase rounded-[2px] font-medium transition-all duration-300 text-center mt-6 shadow-md hover:shadow-lg"
          >
            QUERO CONSTRUIR MINHA MARCA COM DIREÇÃO EXECUTIVA
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
