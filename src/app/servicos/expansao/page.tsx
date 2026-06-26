"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, X } from "@phosphor-icons/react";

const servicesList = [
  { id: "essencia", label: "Clean Essência", active: false, href: "/servicos" },
  { id: "presenca", label: "Clean Presença", active: false, href: "/servicos/presenca" },
  { id: "expansao", label: "Clean Expansão", active: true, href: "/servicos/expansao" },
  { id: "autoridade", label: "Clean Autoridade", active: false, href: "/servicos/autoridade" },
  { id: "signature", label: "Clean Signature", active: false, href: "/servicos/signature" },
];

export default function CleanExpansaoPage() {
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
      <title>Clean Expansão | Identidade Visual e Presença Digital | Clean Design</title>
      <meta name="description" content="O Clean Expansão é o pacote da Clean Design para marcas que desejam construir uma identidade visual completa, aplicações profissionais e uma presença digital mais organizada para apresentar, atrair e converter melhor." />

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
        <div className="absolute inset-0 z-0 opacity-15 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/social_midea.webp')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#13110f] via-transparent to-[#0c0b09]/90 z-[1]"></div>

        <div className="max-w-[1100px] w-full relative z-10 flex flex-col items-start gap-6 text-left">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#c5a880] uppercase">
            2026 — PRESENÇA DIGITAL ESTRATÉGICA
          </span>
          <h1 className="text-[48px] sm:text-[76px] lg:text-[88px] tracking-[-0.03em] leading-[0.95] text-white font-sans font-bold">
            CLEAN EXPANSÃO
          </h1>
          <h2 className="text-[20px] sm:text-[28px] lg:text-[32px] font-sans font-[100] text-[#c5a880] tracking-wide mt-1">
            Identidade Visual + Papelaria + Presença Digital
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-400 font-light leading-relaxed max-w-[650px] mt-4">
            Um pacote da Clean Design criado para construir a identidade visual da marca, desenvolver aplicações profissionais e organizar uma presença digital inicial mais clara, consistente e pronta para gerar interesse.
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
              O digital virou o primeiro contato com a marca.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-750">
              <p>
                Hoje, antes de conversar, comprar ou pedir um orçamento, o cliente observa como a marca se apresenta. Ele entra no Instagram. Clica no link da bio. Analisa os materiais. Compara a percepção. E decide, muitas vezes em poucos segundos, se aquela marca parece profissional, confiável e preparada.
              </p>
              <p>
                Não basta ter uma identidade visual bonita. Ela precisa aparecer com consistência nos canais certos para transformar atenção em interesse.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/social_midea.webp"
                alt="Presença digital organizada"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
            <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono tracking-widest text-[#a39384] uppercase px-1">
              <span>Presença digital organizada</span>
              <span>Marca pronta para ser apresentada</span>
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
            <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-[-0.02em] leading-tight text-black">
              Marcas completas, mas ainda desconectadas no digital.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-750">
              <p>
                Muitas marcas têm logo, cores e fontes, mas continuam transmitindo uma imagem fraca porque não sabem como aplicar essa identidade nos pontos de contato que o cliente realmente acessa.
              </p>
              <p>
                O Instagram parece improvisado. O link da bio não apresenta a marca com clareza. Os materiais não seguem uma mesma direção visual. E a experiência do cliente fica fragmentada. Quando a presença digital não acompanha a identidade visual, a marca perde força, clareza e oportunidade de conversão.
              </p>
            </div>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <div className="flex flex-col gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#a18a6e] uppercase">
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem consistência, ela não é lembrada.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem organização, o cliente se perde.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem presença digital estratégica, a marca até aparece, mas não conduz.</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/iana_martins_mockup2.png"
                alt="Presença digital fragmentada"
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
            Criamos um ecossistema visual inicial para sua marca aparecer melhor no digital.
          </h2>
          <div className="flex flex-col gap-4 text-[14px] sm:text-[16px] text-zinc-650 font-light leading-relaxed max-w-[650px] mt-2">
            <p>
              Pensado para marcas que desejam ter uma identidade visual completa, aplicações profissionais e uma presença digital mais organizada para apresentar seus serviços, fortalecer a percepção de valor e gerar mais confiança.
            </p>
            <p>
              O Clean Expansão une construção visual, papelaria estratégica, templates para Instagram e mini site, criando uma base inicial para que a marca se apresente com mais profissionalismo em diferentes pontos de contato.
            </p>
            <p className="text-[#a18a6e] font-medium font-mono text-[11px] uppercase ">
              Mais do que identidade visual, o Clean Expansão entrega uma estrutura para sua marca aparecer, apresentar e conduzir melhor o cliente no digital.
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Identidade</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Construção Visual da Marca
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Estruturamos a base visual da marca com direção, intenção e coerência, criando um sistema capaz de transmitir profissionalismo, reconhecimento e valor percebido. Essa etapa garante que a marca tenha uma identidade completa antes de ser aplicada no Instagram, nos materiais comerciais e no ambiente digital.
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
                <span>Direção criativa visual</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Construção da identidade visual</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Logo principal &amp; variações</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Sublogo ou marca secundária</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Ícone, marcas d'água &amp; manual de uso</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/posicionamento_teaser.png"
                alt="Construção Visual da Marca"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Físico &amp; Digital</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Aplicações Profissionais
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Levamos a identidade visual para materiais que fortalecem a experiência da marca com o cliente, transmitindo mais cuidado, organização e credibilidade em cada detalhe. Essa etapa tira a marca do campo conceitual e começa a aplicá-la em pontos de contato reais, digitais ou impressos.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Cartão de visita personalizado</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>3 artes personalizadas para papelaria ou materiais institucionais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Aplicações visuais em mockups premium</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Arquivos finais prontos para impressão ou uso digital</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/brandingdealtopadrao.webp"
                alt="Aplicações Profissionais"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Redes Sociais</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Presença Visual no Instagram
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Criamos uma direção visual inicial para que a marca comece a aparecer no Instagram com mais consistência, clareza e profissionalismo. Os templates funcionam como uma base estratégica para organizar a comunicação visual, apresentar conteúdos importantes e fortalecer a percepção de valor da marca no digital.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Pack de templates estratégicos para Instagram (Posts, Reels e Stories)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Estrutura visual alinhada à identidade de marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção visual e orientações de aplicação dos templates</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/social_midea.webp"
                alt="Instagram Grid Layout"
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Conversão</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Mini Site e Pontos de Conversão
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Organizamos um ambiente digital inicial para que a marca tenha um ponto de apresentação mais claro, profissional e direcionado para ação. O mini site funciona como uma estrutura estratégica para reunir informações essenciais, apresentar a marca, direcionar para canais importantes e facilitar o próximo passo do cliente.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Mini site ou página estratégica de apresentação da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Organização dos principais pontos de contato digitais (WhatsApp, Instagram, etc.)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Estrutura visual focada em apresentação de serviços e chamada para ação</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/iana_martins_mockup.png"
                alt="Mini site e conversão"
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
            PARA MARCAS QUE PRECISAM DE UMA IDENTIDADE COMPLETA E UMA PRESENÇA DIGITAL MAIS CLARA, PROFISSIONAL E PRONTA PARA GERAR INTERESSE.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-zinc-650 font-light leading-snug max-w-[650px] mt-2">
            O Clean Expansão é para negócios que querem estruturar sua imagem visual, aplicar a marca em materiais profissionais e organizar os primeiros pontos de contato digitais para apresentar, atrair e converter melhor.
          </p>
          <div className="h-[1px] w-full bg-black/5 my-6"></div>
          <ul className="flex flex-col gap-3.5 text-[16px] font-light text-zinc-700 text-left max-w-[550px]">
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem uma identidade visual completa e aplicável;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam profissionalizar a apresentação no Instagram;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem templates alinhados à identidade da marca;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>desejam um mini site ou página estratégica de apresentação;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam conduzir clientes para WhatsApp, Instagram ou links importantes;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem uma presença digital mais organizada;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>sentem que a imagem atual não transmite o valor real do negócio;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>entendem que aparecer com clareza também faz parte da venda.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 14. SEÇÃO FINAL — CTA */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] text-center border-b border-zinc-200">
        <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6">
          <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px] uppercase font-sans">
            PRESENÇA DIGITAL NÃO É APENAS APARECER. <br />
            <span className="text-[#c5a880]">É CONDUZIR COM CLAREZA.</span>
          </h2>
          <p className="text-[13px] text-zinc-550 font-mono tracking-wider uppercase">
            Vagas limitadas — atendimento sob análise estratégica.
          </p>

          <a
            href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Clean%20Expansão.%20Quero%20expandir%20minha%20marca."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#1c1a17] text-white hover:bg-[#c5a880] dark:bg-white dark:text-black dark:hover:bg-[#c5a880] font-mono text-[10px] tracking-[0.2em] uppercase rounded-[2px] font-medium transition-all duration-300 text-center mt-6 shadow-md hover:shadow-lg"
          >
            QUERO EXPANDIR MINHA MARCA COM A CLEAN
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
