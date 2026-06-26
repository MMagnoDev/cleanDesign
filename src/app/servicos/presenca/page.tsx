"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, X } from "@phosphor-icons/react";

const servicesList = [
  { id: "essencia", label: "Clean Essência", active: false, href: "/servicos" },
  { id: "presenca", label: "Clean Presença", active: true, href: "/servicos/presenca" },
  { id: "expansao", label: "Clean Expansão", active: false, href: "/servicos/expansao" },
  { id: "autoridade", label: "Clean Autoridade", active: false, href: "/servicos/autoridade" },
  { id: "signature", label: "Clean Signature", active: false, href: "/servicos/signature" },
];

export default function CleanPresencaPage() {
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
      <title>Clean Presença | Identidade Visual e Aplicações Profissionais | Clean Design</title>
      <meta name="description" content="O Clean Presença é o pacote da Clean Design para marcas que desejam construir uma identidade visual profissional e aplicá-la com consistência nos primeiros pontos de contato com o cliente." />

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
        <div className="absolute inset-0 z-0 opacity-15 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/iana_martins_mockup.png')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#13110f] via-transparent to-[#0c0b09]/90 z-[1]"></div>

        <div className="max-w-[1100px] w-full relative z-10 flex flex-col items-start gap-6 text-left">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#c5a880] uppercase">
            2026 — PRESENÇA VISUAL ESTRATÉGICA
          </span>
          <h1 className="text-[48px] sm:text-[76px] lg:text-[88px] tracking-[-0.03em] leading-[0.95] text-white font-sans font-bold">
            CLEAN PRESENÇA
          </h1>
          <h2 className="text-[26px] sm:text-[36px] lg:text-[42px] font-sans font-[100] text-[#c5a880] tracking-wide mt-1">
            Identidade Visual + Aplicações Profissionais
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-400 font-light leading-relaxed max-w-[650px] mt-4">
            Um pacote da Clean Design criado para construir a identidade visual da marca e aplicá-la com profissionalismo nos primeiros pontos de contato com o cliente.
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
              A marca não vive apenas no logo.
            </h2>
            <div className="flex flex-col gap-5 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-750">
              <p>
                Hoje, a percepção de uma marca é construída em cada detalhe: no cartão entregue ao cliente, na proposta enviada, na embalagem, no material institucional, no documento, na assinatura de e-mail e em cada ponto de contato visual.
              </p>
              <p>
                Não basta ter uma identidade bonita. Ela precisa ser aplicada com consistência para que o público reconheça profissionalismo, cuidado e valor em tudo o que recebe da marca.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/iana_martins_mockup.png"
                alt="Identidade visual aplicada"
                className="w-full h-full object-cover grayscale-[0.05]"
              />
            </div>
            <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono tracking-widest text-[#a39384] uppercase px-1">
              <span>Identidade visual aplicada</span>
              <span>Presença profissional em cada detalhe</span>
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
              Marcas bonitas, mas pouco aplicadas.
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
                <span>Sem aplicação, a identidade perde presença.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem consistência, a marca parece improvisada.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                <span>Sem materiais profissionais, o cliente não percebe o valor em cada detalhe.</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/iana_martins_mockup2.png"
                alt="Identidade incompleta no papel"
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
            Criamos a identidade visual e levamos sua marca para os primeiros pontos de contato com o cliente.
          </h2>
          <div className="flex flex-col gap-4 text-[14px] sm:text-[16px] text-zinc-650 font-light leading-relaxed max-w-[650px] mt-2">
            <p>
              Pensado para marcas que desejam sair do campo conceitual e começar a se apresentar com mais profissionalismo no mundo real.
            </p>
            <p>
              O Clean Presença une a construção visual da marca com aplicações profissionais, criando uma base consistente para que a identidade seja usada com elegância, coerência e reconhecimento em materiais digitais e impressos.
            </p>
            <p className="text-[#a18a6e] font-medium font-mono text-[11px] uppercase ">
              Além da identidade visual, sua marca ganha aplicações profissionais que fortalecem a percepção de cuidado, organização e credibilidade em cada detalhe.
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Frente estratégica</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Base Estratégica da Marca
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Antes de aplicar a marca, estruturamos sua base visual com direção, intenção e clareza. Essa etapa organiza o caminho criativo para que a identidade represente o posicionamento, o público e a percepção desejada.
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
                src="/assets/posicionamento_teaser.png"
                alt="Base Estratégica da Marca"
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
              Construímos o sistema visual da marca com os elementos necessários para garantir reconhecimento, consistência e profissionalismo nas próximas aplicações. Essa etapa cria a base principal da identidade, permitindo que a marca seja usada com coerência em diferentes materiais e pontos de contato.
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
                <span>Paleta de cores estratégica</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Tipografias da marca</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Elementos gráficos de apoio</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Marcas d’água</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Manual básico de aplicação</span>
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
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Aplicações Reais</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Aplicações Profissionais
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Levamos a identidade visual para materiais que fazem parte da experiência da marca com o cliente, criando peças mais elegantes, organizadas e profissionais. Essa etapa transforma a marca em presença real, reforçando valor percebido em cada detalhe entregue, enviado ou apresentado.
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
                <span>Direção de uso da marca nas peças criadas</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Arquivos finais prontos para impressão ou uso digital</span>
              </li>
            </ul>

            <div className="mt-4 p-5 bg-[#faf9f6] border border-black/5 rounded-[2px]">
              <h5 className="font-mono text-[9px] tracking-widest text-[#a39384] uppercase font-semibold mb-3">Opções para as 3 artes personalizadas:</h5>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-light text-zinc-650">
                <span>— Papel timbrado</span>
                <span>— Cartão agradecimento</span>
                <span>— Tag</span>
                <span>— Adesivo</span>
                <span>— Pasta</span>
                <span>— Receituário</span>
                <span>— Certificado</span>
                <span>— Cartão fidelidade</span>
                <span>— Voucher</span>
                <span>— Assinatura de e-mail</span>
                <span className="col-span-2">— Capa para proposta comercial</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
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

      {/* FRENTE 04 */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] border-b border-zinc-200">
        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[24px] text-[#c5a880] font-semibold">04</span>
              <div className="h-[1px] w-8 bg-[#c5a880]/30"></div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">Finalização</span>
            </div>
            <h3 className="text-[28px] sm:text-[36px] font-[100] tracking-[-0.02em] text-black">
              Direção de Uso e Entrega Final
            </h3>
            <p className="text-[14px] text-zinc-650 font-light leading-relaxed">
              Organizamos os arquivos finais e orientamos a aplicação da marca nas peças criadas, para que a identidade visual seja usada com consistência, clareza e segurança. A marca não termina na aprovação do logo. Ela ganha força quando começa a aparecer de forma coerente nos materiais que representam o negócio.
            </p>
            <div className="h-[1px] w-full bg-black/5 my-2"></div>
            <h4 className="font-mono text-[12px] tracking-widest text-[#a39384] uppercase font-semibold">Entregáveis da etapa:</h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-zinc-700">
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Arquivos finais da identidade visual</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Arquivos finais das aplicações profissionais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Versões para impressão</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Versões para uso digital</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Orientação de uso da marca nas peças criadas</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Organização final dos arquivos</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#c5a880]">—</span>
                <span>Direção para futuras aplicações da identidade</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[3px] border border-black/5 aspect-[4/3] bg-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
              <img
                src="/assets/posicionamentodealto.webp"
                alt="Entrega Final"
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
            PARA MARCAS QUE DESEJAM SAIR DA IDENTIDADE CONCEITUAL E COMEÇAR A SE APRESENTAR COM PROFISSIONALISMO NO MUNDO REAL.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-zinc-600 font-light leading-relaxed max-w-[650px] mt-2">
            O Clean Presença é para negócios que querem construir uma identidade visual consistente e aplicá-la nos primeiros materiais que chegam até o cliente, fortalecendo a percepção de cuidado, organização e credibilidade.
          </p>
          <div className="h-[1px] w-full bg-black/5 my-6"></div>
          <ul className="flex flex-col gap-3.5 text-[16px] font-light text-zinc-700 text-left max-w-[550px]">
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem uma identidade visual completa e aplicável;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam de materiais profissionais para apresentar a marca;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>desejam causar uma boa impressão fora do Instagram;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem fortalecer a percepção de cuidado em cada detalhe;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>precisam de cartão de visita, papelaria ou materiais institucionais;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>querem uma marca mais consistente nos pontos de contato com o cliente;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c5a880] font-bold">—</span>
              <span>entendem que a experiência visual da marca vai além do digital.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 14. SEÇÃO FINAL — CTA */}
      <section className="w-full py-24 sm:py-32 px-8 sm:px-16 lg:px-24 bg-white text-[#1c1a17] text-center border-b border-zinc-200">
        <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6">
          <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-black max-w-[800px] uppercase font-sans">
            PRESENÇA VISUAL NÃO É DETALHE. <br />
            <span className="text-[#c5a880]">É PERCEPÇÃO EM CADA CONTATO.</span>
          </h2>
          <p className="text-[13px] text-zinc-550 font-mono tracking-wider uppercase">
            Vagas limitadas — atendimento sob análise estratégica.
          </p>

          <a
            href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Clean%20Presença.%20Quero%20aplicar%20minha%20marca."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#1c1a17] text-white hover:bg-[#c5a880] dark:bg-white dark:text-black dark:hover:bg-[#c5a880] font-mono text-[10px] tracking-[0.2em] uppercase rounded-[2px] font-medium transition-all duration-300 text-center mt-6 shadow-md hover:shadow-lg"
          >
            QUERO APLICAR MINHA MARCA COM A CLEAN
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
