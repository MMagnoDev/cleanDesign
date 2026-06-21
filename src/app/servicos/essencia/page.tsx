"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, X, Moon, Sun } from '@phosphor-icons/react';
import { ThemeToggle } from "@/components/ui/theme-toggle";

const activeTheme = {
  accent: '#c5a880',
  rgb: '197, 168, 128',
  glow1: 'rgba(197, 168, 128, 0.08)',
  glow2: 'rgba(94, 80, 63, 0.04)',
  bgBody: 'bg-[#13110f]',
};

export default function CleanEssenciaPage() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const orbCoords = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);

  // Force dark theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'dark');
    }
    setIsLightMode(false);
  }, []);

  // Sync theme with body class
  useEffect(() => {
    document.body.classList.remove('light-mode');
    document.body.classList.add(activeTheme.bgBody);
  }, []);

  // Theme toggle handler (disabled)
  const toggleTheme = () => {
    // disabled
  };

  // Scroll reveal setup (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Pointer Orb movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;

      if (!isMoving.current && orbRef.current) {
        orbRef.current.style.opacity = '1';
        isMoving.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (orbRef.current) {
        orbRef.current.style.opacity = '0';
      }
      isMoving.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    const animateOrb = () => {
      const ease = 0.06;
      orbCoords.current.x += (mouseCoords.current.x - orbCoords.current.x) * ease;
      orbCoords.current.y += (mouseCoords.current.y - orbCoords.current.y) * ease;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${orbCoords.current.x}px, ${orbCoords.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animateOrb);
    };
    animateOrb();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="w-full max-w-full min-h-screen relative flex flex-col font-sans antialiased overflow-x-hidden"
      style={{
        '--glow-color-1': activeTheme.glow1,
        '--glow-color-2': activeTheme.glow2,
        '--cursor-color-rgb': activeTheme.rgb
      } as React.CSSProperties}
    >
      {/* SEO Title Hack */}
      <title>Clean Essência | Construção Visual da Marca | Clean Design</title>
      <meta name="description" content="O Clean Essência é o pacote da Clean Design para marcas que desejam construir uma base visual profissional, coerente e percebida com mais valor desde o primeiro contato." />

      {/* Ambient Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div className="ambient-glow-mesh-1 absolute top-[15%] left-[20%] w-[60vw] h-[60vh] rounded-full blur-[100px] transition-all duration-[600ms] ease-out"></div>
        <div className="ambient-glow-mesh-2 absolute bottom-[10%] right-[15%] w-[50vw] h-[50vh] rounded-full blur-[120px] transition-all duration-[600ms] ease-out"></div>
      </div>

      {/* Custom Pointer Light Flare */}
      <div
        ref={orbRef}
        className="custom-cursor-orb fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-10 opacity-0 mix-blend-screen transition-opacity duration-500 ease-in-out will-change-transform"
      ></div>

      {/* 1. Header Minimalista */}
      <header className={`w-full z-[90] py-6 px-6 sm:px-12 flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-[0.25em] transition-all duration-300 border-b border-white/5 ${
        isLightMode ? 'bg-[#fbfaf8]/75 backdrop-blur-md border-black/5 text-[#1c1a17]' : 'bg-[#121215]/50 backdrop-blur-md text-white/90'
      }`}>
        <div className="flex items-center justify-between w-full md:hidden">
          <Link href="/" className="font-sans font-light tracking-[0.3em] text-[12px] text-current">CLEAN</Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 text-current hover:opacity-80 transition-colors font-mono text-[9px] tracking-widest bg-transparent border-none cursor-pointer"
            >
              {isMobileMenuOpen ? 'FECHAR' : 'MENU'}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 items-center">
          <Link href="/" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            CLEAN DESIGN
          </Link>
          <Link href="/portfolio" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            PROJETOS
          </Link>
          <Link href="/servicos" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            SERVIÇOS
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#coordinates" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            CONTATO
          </Link>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-white md:hidden`}>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white"
          >
            ✕ FECHAR
          </button>
          <nav className="flex flex-col space-y-8 text-center text-sm font-mono tracking-[0.25em] uppercase">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              CLEAN DESIGN
            </Link>
            <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              PROJETOS
            </Link>
            <Link href="/servicos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              SERVIÇOS
            </Link>
            <Link href="/#coordinates" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              CONTATO
            </Link>
          </nav>
        </div>
      )}

      {/* 2. Hero Escuro */}
      <section className="w-full relative min-h-[85vh] flex items-center justify-center py-20 px-6 sm:px-12 bg-[#0c0b09] text-white overflow-hidden border-b border-white/5">
        <div className="glass-border-refraction"></div>
        {/* Background Image with low opacity */}
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/posicionamentodealto.webp')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-transparent to-[#0c0b09]/80 z-[1]"></div>

        <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col items-start gap-6 animate-fade-in-up">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-[#c5a880] uppercase">
            2026 — POSICIONAMENTO ESTRATÉGICO
          </span>
          <h1 className="hero-title text-[44px] sm:text-[72px] lg:text-[88px] font-[100] tracking-[-0.03em] leading-[0.9] text-white">
            CLEAN <span className="text-[#c5a880]">ESSÊNCIA</span>
          </h1>
          <h2 className="text-[23px] sm:text-[31px] font-light tracking-[0.1em] text-zinc-300 uppercase">
            Construção Visual da Marca
          </h2>
          <div className="h-[1px] w-24 bg-white/20 my-2"></div>
          <p className="text-[14px] sm:text-[16px] text-zinc-400 font-light leading-relaxed max-w-[600px]">
            Um pacote da Clean Design criado para estruturar a base visual de marcas que desejam deixar de parecer improvisadas e passar a transmitir profissionalismo, confiança e valor desde o primeiro contato.
          </p>
        </div>
      </section>

      {/* 3. Seção 01 — O cenário */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6 reveal-on-scroll">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#c5a880] uppercase">
              01 — O cenário
            </span>
            <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-current">
              O mercado <span className="text-[#c5a880]">mudou.</span>
            </h2>
            <div className="flex flex-col gap-4 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p>
                Hoje, não basta ter um bom produto, um bom serviço ou uma boa entrega.
              </p>
              <p>
                Sua marca também precisa ser percebida como profissional antes mesmo do primeiro contato.
              </p>
              <p>
                A forma como uma marca se apresenta visualmente influencia a confiança, o desejo e a percepção de valor que o público cria sobre ela.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full reveal-on-scroll delay-100">
            <img
              src="/assets/servicos/idendidadevisual.jpg"
              alt="Identidade Visual Clean Design"
              className="w-full h-full object-cover rounded-[4px] shadow-lg border border-black/5 dark:border-white/5"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[9px] font-mono tracking-wider text-white/90 bg-black/40 backdrop-blur-md py-2 px-3 rounded-[2px]">
              <span>IDENTIDADE VISUAL ESTRATÉGICA</span>
              <span>APLICAÇÃO COM CONSISTÊNCIA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Seção 02 — O problema */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] w-full order-2 lg:order-1 reveal-on-scroll">
            <img
              src="/assets/posicionamento_teaser.png"
              alt="Composição Visual Sofisticada"
              className="w-full h-full object-cover rounded-[4px] shadow-lg border border-black/5 dark:border-white/5"
            />
          </div>
          <div className="flex flex-col gap-6 order-1 lg:order-2 reveal-on-scroll delay-100">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#c5a880] uppercase">
              02 — O problema
            </span>
            <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight text-current">
              Boas marcas, com imagens <span className="text-[#c5a880]">ainda improvisadas.</span>
            </h2>
            <div className="flex flex-col gap-4 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p>
                Muitos negócios têm qualidade, entrega e potencial, mas continuam sendo percebidos como menores, menos profissionais ou menos confiáveis porque sua identidade visual não acompanha o valor real da marca.
              </p>
              <p>
                Quando não existe uma base visual clara, tudo parece desconectado: o logo, as cores, as fontes, o Instagram, os materiais comerciais e a forma como o cliente percebe o negócio.
              </p>
            </div>
            <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-2 flex flex-col gap-3 font-mono text-[11px] tracking-wide text-[#c5a880]">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                Sem direção visual, a marca perde força.
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                Sem consistência, ela não é lembrada.
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                Sem percepção de valor, ela passa a competir por preço.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bloco de Impacto em Fundo Escuro */}
      <section className="w-full py-24 sm:py-36 px-6 sm:px-12 bg-[#0c0b09] text-white relative overflow-hidden border-b border-white/5 text-center">
        <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/brandingdealtopadrao.webp')" }}></div>
        <div className="max-w-[950px] w-full mx-auto relative z-10 flex flex-col items-center gap-6 reveal-on-scroll">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-[#c5a880] uppercase">
            IMAGINE UM POSICIONAMENTO ONDE
          </span>
          <h2 className="text-[26px] sm:text-[42px] lg:text-[47px] font-[100] tracking-[0.05em] leading-[1.4] text-white uppercase max-w-[850px] font-sans">
            "Sua identidade transmite confiança imediatamente, e cada ponto de contato reforça profissionalismo, clareza e reconhecimento antes mesmo de qualquer conversa com o cliente."
          </h2>
          <div className="h-[1px] w-16 bg-[#c5a880] mt-4"></div>
        </div>
      </section>

      {/* 6. Seção — O pacote */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-6 reveal-on-scroll">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#c5a880] uppercase">
            O pacote
          </span>
          <h2 className="text-[42px] sm:text-[62px] font-[100] tracking-[-0.02em] leading-tight text-current max-w-[800px]">
            Criamos as bases que sustentam uma marca visualmente <span className="text-[#c5a880]">consistente e reconhecível.</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-[650px] mt-2">
            Pensado para transformar negócios em marcas mais profissionais, coerentes e percebidas com mais valor. Conduzimos um processo completo de construção visual em 4 frentes integradas.
          </p>
        </div>
      </section>

      {/* FRENTE 01 */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] w-full reveal-on-scroll">
            <img
              src="/assets/servicos/naming.jpeg"
              alt="Diagnóstico e Direção Visual"
              className="w-full h-full object-cover rounded-[4px] shadow-md border border-black/5 dark:border-white/5"
            />
          </div>
          <div className="flex flex-col gap-6 reveal-on-scroll delay-100">
            <span className="font-mono text-[36px] font-[100] text-[#c5a880] leading-none block">
              01
            </span>
            <h3 className="text-[26px] sm:text-[32px] font-[100] tracking-[-0.02em] text-current">
              Diagnóstico e Direção Visual
            </h3>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Antes de criar a identidade, entendemos o momento da marca, seu público, seus objetivos, suas referências e a percepção que ela precisa transmitir.
            </p>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Essa etapa define o caminho criativo e estratégico para que a marca não seja construída apenas pela estética, mas por intenção.
            </p>
            <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                "Diagnóstico inicial da marca",
                "Análise do momento atual do negócio",
                "Definição da percepção desejada",
                "Direção criativa visual",
                "Organização de referências estéticas",
                "Alinhamento do estilo visual da marca"
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase">ENTREGA {index + 1}</span>
                  <span className="text-[12px] sm:text-[13px] text-current font-light tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FRENTE 02 */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1 reveal-on-scroll">
            <span className="font-mono text-[36px] font-[100] text-[#c5a880] leading-none block">
              02
            </span>
            <h3 className="text-[26px] sm:text-[32px] font-[100] tracking-[-0.02em] text-current">
              Sistema de Identidade Visual
            </h3>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Construção do sistema visual da marca, traduzindo a direção criativa em elementos capazes de gerar reconhecimento, profissionalismo e consistência.
            </p>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Essa etapa cria a base principal da identidade, garantindo que a marca tenha variações e recursos visuais para diferentes aplicações.
            </p>
            <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                "Logo principal",
                "Variações da marca",
                "Sublogo ou marca secundária",
                "Ícone ou símbolo da marca",
                "Marcas d’água",
                "Elementos gráficos de apoio"
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase">ENTREGA {index + 1}</span>
                  <span className="text-[12px] sm:text-[13px] text-current font-light tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full order-1 lg:order-2 reveal-on-scroll delay-100">
            <img
              src="/assets/logotipo.webp"
              alt="Sistema de Identidade Visual"
              className="w-full h-full object-cover rounded-[4px] shadow-md border border-black/5 dark:border-white/5"
            />
          </div>
        </div>
      </section>

      {/* FRENTE 03 */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] w-full reveal-on-scroll">
            <img
              src="/assets/servicos/socialmidia.webp"
              alt="Universo Visual da Marca"
              className="w-full h-full object-cover rounded-[4px] shadow-md border border-black/5 dark:border-white/5"
            />
          </div>
          <div className="flex flex-col gap-6 reveal-on-scroll delay-100">
            <span className="font-mono text-[36px] font-[100] text-[#c5a880] leading-none block">
              03
            </span>
            <h3 className="text-[26px] sm:text-[32px] font-[100] tracking-[-0.02em] text-current">
              Universo Visual da Marca
            </h3>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Definição dos elementos que sustentam a personalidade visual da marca e tornam sua comunicação mais consistente, reconhecível e profissional.
            </p>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Essa etapa organiza cores, tipografias e elementos gráficos para criar uma identidade visual coerente e aplicável.
            </p>
            <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                "Paleta de cores estratégica",
                "Tipografias da marca",
                "Combinações visuais",
                "Direção estética da identidade",
                "Elementos de apoio para aplicações digitais",
                "Orientação de coerência visual"
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase">ENTREGA {index + 1}</span>
                  <span className="text-[12px] sm:text-[13px] text-current font-light tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FRENTE 04 */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1 reveal-on-scroll">
            <span className="font-mono text-[36px] font-[100] text-[#c5a880] leading-none block">
              04
            </span>
            <h3 className="text-[26px] sm:text-[32px] font-[100] tracking-[-0.02em] text-current">
              Aplicação e Entrega Estratégica
            </h3>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Organizamos os arquivos e orientações essenciais para que a marca possa ser usada com consistência em materiais digitais, impressos e pontos de contato.
            </p>
            <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              A identidade não é criada para ficar salva em uma pasta. Ela é construída para ser aplicada, reconhecida e lembrada.
            </p>
            <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                "Manual básico de aplicação",
                "Arquivos finais para uso digital",
                "Arquivos finais para impressão",
                "Orientações de uso da marca",
                "Organização dos arquivos finais",
                "Direção para aplicação da identidade em futuros materiais"
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase">ENTREGA {index + 1}</span>
                  <span className="text-[12px] sm:text-[13px] text-current font-light tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full order-1 lg:order-2 reveal-on-scroll delay-100">
            <img
              src="/assets/servicos/servicosgraficos.webp"
              alt="Aplicação e Entrega Estratégica"
              className="w-full h-full object-cover rounded-[4px] shadow-md border border-black/5 dark:border-white/5"
            />
          </div>
        </div>
      </section>

      {/* 11. Seção — Para quem é */}
      <section className={`w-full py-24 sm:py-36 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      } text-center`}>
        <div className="max-w-[900px] w-full mx-auto flex flex-col items-center gap-6 reveal-on-scroll">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#c5a880] uppercase">
            Para quem é
          </span>
          <h2 className="text-[31px] sm:text-[47px] font-[100] tracking-[0.05em] leading-snug text-current uppercase max-w-[800px] font-sans">
            PARA MARCAS QUE DESEJAM COMEÇAR COM UMA BASE VISUAL FORTE — OU RECONSTRUIR SUA IMAGEM COM MAIS PROFISSIONALISMO.
          </h2>
          <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-[650px] mb-8">
            O Clean Essência é para negócios que desejam estruturar sua identidade visual com estratégia, clareza e coerência para transmitir mais confiança desde o primeiro contato.
          </p>

          <div className="h-[1px] w-full bg-black/5 dark:bg-white/5 my-4"></div>

          <div className="flex flex-col gap-5 max-w-[600px] text-left mx-auto">
            {[
              "marcas que sentem que sua imagem atual parece improvisada;",
              "negócios que querem transmitir mais profissionalismo;",
              "empresas que precisam organizar logo, cores, fontes e elementos visuais;",
              "marcas que desejam deixar de parecer amadoras;",
              "negócios que precisam de uma base visual para Instagram, site e materiais comerciais."
            ].map((bullet, idx) => (
              <div key={idx} className="flex gap-4 items-start text-[13px] sm:text-[14px] text-zinc-600 dark:text-zinc-400 font-light">
                <span className="font-mono text-[#c5a880] mt-0.5">—</span>
                <p>{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Seção — Duração */}
      <section className={`w-full py-20 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#fbfaf8] border-zinc-200' : 'bg-[#0d0c0a] border-white/5'
      } text-center`}>
        <div className="max-w-[600px] w-full mx-auto flex flex-col items-center gap-3 reveal-on-scroll">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#c5a880] uppercase">
            DURAÇÃO ESTIMADA
          </span>
          <h2 className="text-[36px] sm:text-[47px] font-[100] tracking-tight text-current">
            4 a 6 semanas
          </h2>
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
            [Definir com a equipe Clean]
          </span>
        </div>
      </section>

      {/* 13. Seção Escura — Powered by Clean Design */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#0c0b09] text-white relative overflow-hidden border-b border-white/5 text-center">
        <div className="absolute inset-0 z-0 opacity-15 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/iana_martins_mockup.png')" }}></div>
        <div className="absolute inset-0 bg-black/60 z-[1]"></div>
        <div className="max-w-[900px] w-full mx-auto relative z-10 flex flex-col items-center gap-6 reveal-on-scroll">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-[#c5a880] uppercase">
            Powered by Clean Design
          </span>
          <h2 className="text-[29px] sm:text-[42px] font-[100] tracking-[0.05em] leading-[1.4] text-white uppercase max-w-[800px] font-sans">
            PARA ALÉM DE UMA IDENTIDADE BONITA, CONSTRUÍMOS MARCAS VISUAIS COM INTENÇÃO, CONSISTÊNCIA E PERCEPÇÃO DE VALOR.
          </h2>
          <div className="h-[1px] w-12 bg-white/20 my-2"></div>
          <div className="flex flex-col gap-4 text-[14px] sm:text-[15px] font-light leading-relaxed text-zinc-300 max-w-[650px]">
            <p>
              A Clean Design já ajudou marcas de diferentes segmentos a saírem do improviso visual e se apresentarem com mais profissionalismo, clareza e desejo.
            </p>
            <p className="font-medium text-[#c5a880]">
              Não entregamos apenas arquivos. Criamos marcas para serem vistas, lembradas e escolhidas.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Seção Final — CTA */}
      <section className={`w-full py-28 sm:py-40 px-6 sm:px-12 border-b transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6] border-zinc-200' : 'bg-[#121215] border-white/5'
      } text-center`}>
        <div className="max-w-[900px] w-full mx-auto flex flex-col items-center gap-8 reveal-on-scroll">
          <h2 className="text-[36px] sm:text-[57px] lg:text-[68px] font-[100] tracking-[0.03em] leading-tight text-current uppercase max-w-[800px] font-sans">
            IDENTIDADE VISUAL NÃO É APENAS ESTÉTICA. <br />
            <span className="text-[#c5a880] lowercase">É</span> PERCEPÇÃO.
          </h2>
          <p className="text-[13px] sm:text-[14px] font-mono tracking-[0.15em] text-zinc-500 uppercase">
            Vagas limitadas — atendimento sob análise estratégica.
          </p>

          <a
            href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20construir%20minha%20marca%20com%20o%20Clean%20Essência."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-3 px-8 py-4 rounded-[2px] bg-[#1c1a17] text-white hover:bg-[#c5a880] dark:bg-white dark:text-black dark:hover:bg-[#c5a880] dark:hover:text-black font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
          >
            QUERO CONSTRUIR MINHA MARCA COM A CLEAN
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* 15. Footer Discreto */}
      <footer className={`w-full py-10 px-6 sm:px-12 transition-colors duration-300 ${
        isLightMode ? 'bg-[#faf9f6]' : 'bg-[#121215]'
      }`}>
        <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[9px] text-zinc-500 tracking-wider uppercase">
          <span>© 2026 Clean Design. Todos os direitos reservados.</span>
          <a
            href="https://www.instagram.com/clean.designn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c5a880] transition-colors duration-300"
          >
            Instagram da Clean
          </a>
        </div>
      </footer>
    </div>
  );
}
