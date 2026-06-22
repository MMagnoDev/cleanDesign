"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  MapPin,
  EnvelopeSimple,
  PhoneCall,
  X,
  ArrowUpRight,
  ArrowLeft
} from '@phosphor-icons/react';

// Theme configuration matching page.tsx
const activeTheme = {
  accent: '#c5a880',
  rgb: '197, 168, 128',
  glow1: 'rgba(197, 168, 128, 0.08)',
  glow2: 'rgba(94, 80, 63, 0.04)',
  bgBody: 'bg-[#13110f]',
};

// Flags SVGs used in page.tsx
const flagComponents = {
  br: (className: string) => (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#009739" />
      <polygon points="320,40 600,240 320,440 40,240" fill="#FEDF00" />
      <circle cx="320" cy="240" r="100" fill="#002776" />
      <path d="M190,265 C220,250 280,230 400,268 C380,260 300,240 190,265 Z" fill="#FFF" />
    </svg>
  ),
  pt: (className: string) => (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="480" fill="#006600" />
      <rect x="256" width="384" height="480" fill="#FF0000" />
      <circle cx="256" cy="240" r="75" fill="#FFCC00" stroke="#000" strokeWidth="2" />
      <path d="M241,215 H271 V255 C271,265 241,265 241,255 Z" fill="#FF0000" stroke="#FFF" strokeWidth="2" />
    </svg>
  ),
  ao: (className: string) => (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="240" fill="#FF0000" />
      <rect y="240" width="640" height="240" fill="#000000" />
      <path d="M280,240 A 55,55 0 1,1 360,240" fill="none" stroke="#FFCC00" strokeWidth="8" strokeLinecap="round" strokeDasharray="15,8" />
      <polygon points="320,195 325,210 340,210 328,220 332,235 320,225 308,235 312,220 300,210 315,210" fill="#FFCC00" />
      <line x1="285" y1="280" x2="310" y2="255" stroke="#FFCC00" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),
  us: (className: string) => (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#B22234" />
      <rect y="37" width="640" height="37" fill="#FFF" />
      <rect y="111" width="640" height="37" fill="#FFF" />
      <rect y="185" width="640" height="37" fill="#FFF" />
      <rect y="259" width="640" height="37" fill="#FFF" />
      <rect y="333" width="640" height="37" fill="#FFF" />
      <rect y="407" width="640" height="37" fill="#FFF" />
      <rect width="256" height="259" fill="#3C3B6E" />
      <polygon points="50,45 52,50 57,50 53,53 55,58 50,55 45,58 47,53 43,50 48,50" fill="#FFF" />
      <polygon points="100,45 102,50 107,50 103,53 105,58 100,55 95,58 97,53 93,50 98,50" fill="#FFF" />
      <polygon points="150,45 152,50 157,50 153,53 155,58 150,55 145,58 147,53 143,50 148,50" fill="#FFF" />
      <polygon points="200,45 202,50 207,50 203,53 205,58 200,55 195,58 197,53 193,50 198,50" fill="#FFF" />
      <polygon points="75,95 77,100 82,100 78,103 80,108 75,105 70,108 72,103 68,100 73,100" fill="#FFF" />
      <polygon points="125,95 127,100 132,100 128,103 130,108 125,105 120,108 122,103 118,100 123,100" fill="#FFF" />
      <polygon points="175,95 177,100 182,100 178,103 180,108 175,105 170,108 172,103 168,100 173,100" fill="#FFF" />
      <polygon points="50,145 52,150 57,150 53,153 55,158 50,155 45,158 47,153 43,150 48,150" fill="#FFF" />
      <polygon points="100,145 102,150 107,150 103,153 105,158 100,155 95,158 97,153 93,150 98,150" fill="#FFF" />
      <polygon points="150,145 152,150 157,150 153,153 155,158 150,155 145,158 147,153 143,150 148,150" fill="#FFF" />
      <polygon points="200,145 202,150 207,150 203,153 205,158 200,155 195,158 197,153 193,150 198,150" fill="#FFF" />
    </svg>
  ),
  mz: (className: string) => (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="140" fill="#009A49" />
      <rect y="140" width="640" height="20" fill="#FFF" />
      <rect y="160" width="640" height="160" fill="#000000" />
      <rect y="320" width="640" height="20" fill="#FFF" />
      <rect y="340" width="640" height="140" fill="#FCD116" />
      <polygon points="0,0 240,240 0,480" fill="#D21034" />
      <polygon points="75,205 80,220 95,220 83,230 87,245 75,235 63,245 67,230 55,220 70,220" fill="#FCD116" />
    </svg>
  )
};

export default function ApresentacaoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactCardOpen, setIsContactCardOpen] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);

  // Teams lists with roles & descriptions
  const teamMembers = [
    { src: "/assets/TIME/JULIE.webp", name: "Julie Fajardo", role: "CEO & Gestão Estratégica" },
    { src: "/assets/TIME/RAFAEL.webp", name: "Rafael Fajardo", role: "CEO & Designer Principal" },
    { src: "/assets/TIME/ALICE.webp", name: "Alice", role: "Supervisora Geral" },
    { src: "/assets/TIME/RAQUEL.webp", name: "Raquel", role: "Supervisora Geral" },
    { src: "/assets/TIME/MAGNO.webp", name: "Magno", role: "Web Design" },
    { src: "/assets/TIME/GABRIEL.webp", name: "Gabriel", role: "Social Midia" },
    { src: "/assets/TIME/JUNIOR.webp", name: "Junior", role: "Consultor Comercial Sr." },
    { src: "/assets/TIME/GUSTAVO.webp", name: "Gustavo", role: "Consultor Comercial Sr." },
    { src: "/assets/TIME/STEFANI.webp", name: "Stefanie", role: "Consultora Comercial" },
    { src: "/assets/TIME/MARIANA.webp", name: "Mariana", role: "Suporte" },
  ];

  // 6 preview mockups showing how drafts / options work
  const previewGalleries = [
    { src: "/assets/img1.webp", title: "Amanda Faquini — Alta Estética", tag: "Logotipo Autoral" },
    { src: "/assets/img2.webp", title: "Dantas & Associados", tag: "Branding Editorial" },
    { src: "/assets/img3.webp", title: "Amanda Faquini — Sacolas", tag: "Estudo de Materialidade" },
    { src: "/assets/servicos/idendidadevisual.jpg", title: "Kairos Clínica", tag: "Identidade Integradora" },
    { src: "/assets/servicos/ensaioIA.webp", title: "Lumina Estética", tag: "Colorimetria e Textura" },
    { src: "/assets/servicos/consultoria.webp", title: "Voss Advocacia", tag: "Sistema Visual" },
  ];

  // Selected Google Reviews
  const reviews = [
    { name: "Arq. Ana Karina Costa", text: "Vocês foram ótimos em atender as minhas expectativas em relação ao desenvolvimento da minha marca. Agradeço o profissionalismo e a criatividade dos profissionais da Clean!!!", avatar: "/assets/reviews/avatar_ana.png" },
    { name: "Patricia Hage", text: "Gostaria de agradecer pela atenção e pelo cuidado que vocês tiveram em cada detalhe, desde o início até a finalização do projeto de reposicionamento visual da minha empresa.", avatar: "/assets/reviews/avatar_patricia.png" },
    { name: "Julia Cândido", text: "muuuito satisfeita com o resultado, a equipe é muito atenciosa!! Minha nova identidade visual no Instagram e site gerou ótimos comentários dos meus clientes.", avatar: "/assets/reviews/avatar_julia.png" },
    { name: "Keila", text: "Tive um experiência maravilhosa desde o primeiro atendimento! Trabalho excelente da equipe!! Recomendo muito para quem quer um visual sofisticado e premium.", avatar: "/assets/reviews/avatar_keila.png" },
    { name: "Danilo Sousa", text: "Trabalho fantástico, fui bem tratado em todo o processo... amei o meu resultado! Agora me apresento com muito mais segurança comercial nas propostas.", avatar: "/assets/reviews/avatar_danilo.png" }
  ];

  // Packages configurations
  const packages = [
    {
      id: "essencia",
      name: "Clean Essência",
      tag: "O COMEÇO ESTRATÉGICO",
      desc: "Ideal para estruturar a base visual da sua marca de maneira profissional, deixando de parecer amador e passando a transmitir confiança imediata.",
      features: [
        "Direção Criativa & Diagnóstico Visual",
        "Logo Principal & Variações",
        "Ícone / Símbolo Customizado",
        "Paleta de Cores Estratégica",
        "Manual Básico de Aplicação",
        "Arquivos Finais Vetorizados"
      ],
      whatsapp: "Olá! Gostaria de mais informações sobre o pacote Clean Essência."
    },
    {
      id: "presenca",
      name: "Clean Presença",
      tag: "IDENTIDADE & PONTOS DE CONTATO",
      desc: "Desenvolvido para criar a identidade visual e aplicá-la com consistência nos primeiros e principais pontos de contato com o cliente.",
      features: [
        "Tudo incluso no Clean Essência",
        "Design de Papelaria Institucional",
        "Cartão de Visita Premium (Frente/Verso)",
        "Design de Envelopes e Timbrados",
        "Identidade Visual Básica para Instagram",
        "Suporte Prioritário na Entrega"
      ],
      whatsapp: "Olá! Gostaria de mais informações sobre o pacote Clean Presença."
    },
    {
      id: "expansao",
      name: "Clean Expansão",
      tag: "IDENTIDADE COMPLETA & PLATAFORMAS",
      desc: "Para marcas prontas para expandir, estruturando toda a papelaria, materiais institucionais e presença digital organizada.",
      features: [
        "Tudo incluso no Clean Presença",
        "Ficha de Anamnese ou Pasta Comercial",
        "Materiais de Apoio Personalizados",
        "Apresentação Comercial em PDF Estruturada",
        "Direção de Imagem / Mockups Realistas",
        "Suporte completo pós-entrega"
      ],
      whatsapp: "Olá! Gostaria de mais informações sobre o pacote Clean Expansão."
    },
    {
      id: "autoridade",
      name: "Clean Autoridade",
      tag: "O NÍVEL MÁXIMO DE REPUTAÇÃO",
      desc: "Nossa solução mais abrangente de posicionamento. Unimos a identidade visual com diagnóstico de mercado e direção estratégica digital.",
      features: [
        "Tudo incluso no Clean Expansão",
        "Análise de Mercado & Posicionamento",
        "Direção Estratégica de Conteúdo",
        "Frentes integradas de Marca e Comunicação",
        "Acompanhamento personalizado em cada etapa",
        "Consultoria direta com os diretores de design"
      ],
      whatsapp: "Olá! Gostaria de mais informações sobre o pacote Clean Autoridade."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.remove('light-mode');
    document.body.classList.add('bg-[#0d0c0a]');
  }, []);

  return (
    <div
      className="w-full max-w-full min-h-screen relative flex flex-col font-sans antialiased overflow-x-hidden bg-[#0d0c0a] text-zinc-300"
      style={{
        '--glow-color-1': activeTheme.glow1,
        '--glow-color-2': activeTheme.glow2,
        '--cursor-color-rgb': activeTheme.rgb
      } as React.CSSProperties}
    >
      <title>Apresentação Institucional & Pacotes | Clean Design</title>
      <meta name="description" content="Apresentação institucional completa da Clean Design. Conheça nossa equipe, nossa sede física, nosso método passo a passo de desenvolvimento e nossos pacotes comerciais premium." />

      {/* Ambient Blur Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div className="absolute top-[10%] left-[10%] w-[60vw] h-[60vh] rounded-full blur-[130px] bg-[#c5a880]/5"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vh] rounded-full blur-[160px] bg-[#c5a880]/3"></div>
      </div>

      {/* HEADER MINIMALISTA */}
      <header className={`fixed top-0 left-0 w-full z-[90] py-6 px-8 sm:px-16 lg:px-24 flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-[0.25em] transition-all duration-300 ${scrolled
        ? 'bg-[#0c0b09]/90 backdrop-blur-md border-b border-white/5 text-white/90'
        : 'bg-transparent border-b border-transparent text-white/90'
        }`}>
        <div className="flex items-center justify-between w-full md:hidden">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img src="/assets/clean.png" alt="CLEAN Logo" className="h-5 w-auto object-contain " />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-current hover:opacity-80 transition-colors font-mono text-[9px] tracking-widest bg-transparent border-none cursor-pointer"
          >
            {isMobileMenuOpen ? 'FECHAR' : 'MENU'}
          </button>
        </div>

        {/* Desktop Logo */}
        <Link href="/" className="hidden md:flex hover:opacity-80 transition-opacity py-1 items-center mr-4">
          <img src="/assets/clean.png" alt="CLEAN Logo" className="h-6 w-auto object-contain " />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 items-center">
          <a href="#equipe" className="hover:text-[#c5a880] transition-colors relative py-1">EQUIPE</a>
          <a href="#sede" className="hover:text-[#c5a880] transition-colors relative py-1">SEDE</a>
          <a href="#depoimentos" className="hover:text-[#c5a880] transition-colors relative py-1">DEPOIMENTOS</a>
          <a href="#processo" className="hover:text-[#c5a880] transition-colors relative py-1">PROCESSO</a>
          <a href="#pacotes" className="hover:text-[#c5a880] transition-colors relative py-1 text-[#c5a880] font-semibold">PACOTES</a>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-[2px] border border-white/10 hover:border-[#c5a880]/40 text-[#a1a1aa] hover:text-[#f4f4f5] transition-all duration-300 font-mono text-[10px] tracking-[0.2em] uppercase bg-black/20">
            <ArrowLeft size={12} /> HOME
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
          <nav className="flex flex-col space-y-8 text-center text-sm font-mono tracking-[0.25em] uppercase">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              INÍCIO
            </Link>
            <a href="#equipe" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              EQUIPE
            </a>
            <a href="#sede" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              SEDE
            </a>
            <a href="#depoimentos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              DEPOIMENTOS
            </a>
            <a href="#processo" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              PROCESSO
            </a>
            <a href="#pacotes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors text-[#c5a880]">
              PACOTES
            </a>
          </nav>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="w-full relative min-h-[70vh] flex flex-col justify-center items-center bg-[#0c0b09] text-white overflow-hidden border-b border-white/5 px-8 sm:px-16 lg:px-24 pb-20 pt-40 text-center">
        <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/brandingdealtopadrao.webp')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-[#0c0b09]/90 z-[1]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center max-w-[900px] w-full">

          <h1 className="text-[38px] sm:text-[68px] lg:text-[84px] font-sans font-light tracking-[-0.03em] leading-[0.95] text-white mb-6">
            Luz, Design & <br />
            Posicionamento
          </h1>
          <p className="text-[14px] sm:text-[16px] text-zinc-400 font-light leading-relaxed max-w-[650px] mt-4">
            Abaixo apresentamos a estrutura da nossa equipe, nosso alcance global, sede física, feedbacks de clientes reais, a jornada de desenvolvimento passo a passo e nossos pacotes comerciais.
          </p>
          <div className="h-[1px] w-16 bg-[#c5a880] mt-8"></div>
        </div>
      </section>

      {/* SEÇÃO 1: APRESENTAÇÃO DA EQUIPE */}
      <section id="equipe" className="w-full py-24 px-8 sm:px-16 lg:px-24 border-b border-white/5">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="flex flex-col items-start gap-4 mb-16 text-left">

            <h2 className="text-[32px] sm:text-[48px] font-sans font-[100] tracking-tight text-white leading-tight">
              Profissionais Especializados
            </h2>
            <p className="text-[14px] text-zinc-400 font-light leading-relaxed max-w-[600px]">
              Por trás de cada projeto de prestígio, existe uma equipe real, estruturada e qualificada. Unimos especialistas de diferentes áreas para materializar marcas consistentes.
            </p>
          </div>

          {/* Grid de Profissionais */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] overflow-hidden rounded-[2px] border border-white/5 bg-zinc-900/40 group transition-all duration-500 hover:border-[#c5a880]/30 shadow-md"
              >
                <img
                  loading="lazy"
                  src={member.src}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-transform duration-[600ms] group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/20 to-transparent transition-opacity duration-500"></div>

                <div className="absolute bottom-4 left-4 right-4 text-left z-10 pointer-events-none">
                  <h4 className="text-[15px] sm:text-[17px] font-sans font-medium text-white mb-1.5 leading-tight">
                    {member.name}
                  </h4>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#c5a880] uppercase block leading-tight">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: PAÍSES DE ATUAÇÃO */}
      <section className="w-full py-20 px-8 sm:px-16 lg:px-24 bg-[#0a0a08] border-b border-white/5">
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">

            <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-tight leading-none text-white">
              Atuação Global de Prestígio
            </h2>
            <p className="text-[14px] text-zinc-400 font-light leading-relaxed">
              Atendemos clientes com exigências de sofisticação e profissionalismo em múltiplos territórios. Nossa estrutura de comunicação e metodologias estão alinhadas com as tendências estéticas dos principais centros urbanos.
            </p>
            <div className="h-[1px] w-12 bg-[#c5a880]/30 mt-2"></div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-6">
            {[
              { id: "br", name: "Brasil", flag: flagComponents.br },
              { id: "pt", name: "Portugal", flag: flagComponents.pt },
              { id: "us", name: "Estados Unidos", flag: flagComponents.us },
              { id: "ao", name: "Angola", flag: flagComponents.ao },
              { id: "mz", name: "Moçambique", flag: flagComponents.mz },
            ].map((country, idx) => (
              <div key={idx} className="bg-[#121215] border border-white/5 p-5 rounded-[2px] flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-9 overflow-hidden rounded-[2px] border border-white/10 shadow-sm">
                  {country.flag("w-full h-full object-cover")}
                </div>
                <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: SEDE FÍSICA */}
      <section id="sede" className="w-full py-24 px-8 sm:px-16 lg:px-24 border-b border-white/5">
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Imagem da Sede */}
          <div className="lg:col-span-6 relative w-full aspect-[4/3] rounded-[2px] border border-white/5 overflow-hidden shadow-2xl bg-black/25">
            <img
              loading="lazy"
              src="/assets/sobre_clean.jpg"
              alt="Sede Física Clean Design"
              className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[800ms] hover:scale-102 hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <MapPin size={16} className="text-[#c5a880]" />
              <span className="font-mono text-[9px] tracking-widest text-[#f5efe6] uppercase">Estúdio Físico Registrado</span>
            </div>
          </div>

          {/* Conteúdo Textual */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-tight text-white leading-tight mb-6">
              Nossa Sede Física
            </h2>
            <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed mb-8 max-w-[500px]">
              Diferente de agências puramente virtuais ou freelancers isolados, a Clean Design oferece a solidez de uma estrutura física estruturada. Contamos com um espaço próprio, planejado para o desenvolvimento criativo e reuniões de alinhamento com máxima segurança comercial.
            </p>

            <div className="border-l border-[#c5a880] pl-6 py-2 text-left mb-6">
              <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 uppercase block mb-1">Endereço Comercial</span>
              <p className="text-[13px] text-zinc-300 font-light max-w-[400px]">
                Av. Ator José Wilker, 605, Rio de Janeiro, RJ, Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: FEEDBACKS DE CLIENTES */}
      <section id="depoimentos" className="w-full py-24 px-8 sm:px-16 lg:px-24 bg-white text-black border-b border-zinc-200">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 text-left">
            <div className="flex flex-col items-start">

              <h2 className="text-[32px] sm:text-[48px] font-sans font-[100] tracking-tight text-black mt-2">
                A Voz dos Nossos Clientes
              </h2>
            </div>

            <div className="flex items-center gap-3.5 font-mono text-[10px] tracking-widest rounded-[2px] py-3 px-5 border bg-zinc-50 border-gray-200 text-gray-600 shadow-sm">
              <span className="text-yellow-500 text-[12px] flex gap-0.5">★★★★★</span>
              <span className="font-semibold text-gray-800"> (4.9 / 5.0 no Google)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev, index) => (
              <div
                key={index}
                className="border rounded-[4px] p-8 flex flex-col justify-between relative bg-zinc-50 border-black/5 hover:border-gray-300 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-start gap-4 mb-5">
                    <img
                      loading="lazy"
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-11 h-11 rounded-full border border-black/5 object-cover"
                    />
                    <div className="text-left flex-1">
                      <h4 className="font-sans text-[14px] font-semibold leading-tight text-black">{rev.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-500 text-[11px] flex gap-0.5">★★★★★</span>
                        <span className="font-sans text-[10px] text-gray-500">Google Review</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] font-light leading-relaxed text-left text-gray-600">
                    "{rev.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: LINHA DO TEMPO DO PROCESSO */}
      <section id="processo" className="w-full py-24 px-8 sm:px-16 lg:px-24 border-b border-white/5">
        <div className="max-w-[1100px] w-full mx-auto">
          <div className="flex flex-col items-start gap-4 mb-16 text-left">

            <h2 className="text-[32px] sm:text-[48px] font-sans font-[100] tracking-tight text-white leading-tight">
              Linha do Tempo do Processo
            </h2>
            <p className="text-[14px] text-zinc-400 font-light leading-relaxed max-w-[600px]">
              O desenvolvimento de uma marca de prestígio segue etapas claras, lógicas e testadas para garantir o alinhamento com a sua expectativa de negócio.
            </p>
          </div>

          {/* Timeline Process */}
          <div className="relative border-l border-[#c5a880]/30 pl-8 sm:pl-12 ml-4 sm:ml-8 mt-12 flex flex-col gap-16 text-left">

            {/* ETAPA 1: BRIEFING */}
            <div className="relative">
              <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-6 h-6 rounded-full border-2 border-[#c5a880] flex items-center justify-center font-mono text-[9px] text-[#c5a880] font-bold bg-[#0d0c0a] shadow-[0_0_10px_rgba(197,168,128,0.2)]">
                01
              </span>
              <h4 className="text-[18px] sm:text-[22px] font-sans font-medium text-white mb-2 uppercase tracking-wide">
                Briefing Estrutural
              </h4>
              <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed max-w-[700px]">
                O projeto se inicia pelo preenchimento do nosso questionário de Briefing. É nele que mapeamos os objetivos de negócio, concorrentes, referências visuais e a direção estratégica da marca. Este documento serve como bússola para todo o projeto.
              </p>
            </div>

            {/* ETAPA 2: PRÉVIAS */}
            <div className="relative">
              <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-6 h-6 rounded-full border-2 border-[#c5a880] flex items-center justify-center font-mono text-[9px] text-[#c5a880] font-bold bg-[#0d0c0a] shadow-[0_0_10px_rgba(197,168,128,0.2)]">
                02
              </span>
              <h4 className="text-[18px] sm:text-[22px] font-sans font-medium text-white mb-2 uppercase tracking-wide">
                Desenvolvimento de Prévias
              </h4>
              <div className="font-mono text-[9px] text-[#c5a880] uppercase tracking-wider mb-2">
                Prazo: 5 a 7 Dias Úteis
              </div>
              <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed max-w-[700px] mb-6">
                Com base no briefing, criamos as alternativas conceituais da marca. Mostramos abaixo exemplos de prévias visuais criadas pelo nosso estúdio para servir de referência do nível estético e acabamento final que oferecemos:
              </p>

              {/* Grid de 6 Prévias de Referência */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 mb-6">
                {previewGalleries.map((preview, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedPreviewImage(preview.src)}
                    className="relative aspect-square rounded-[2px] overflow-hidden border border-white/5 cursor-pointer group transition-all duration-300 hover:border-[#c5a880]"
                  >
                    <img
                      src={preview.src}
                      alt={preview.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-2 text-center">
                      <span className="text-white text-[10px] font-medium leading-tight">{preview.title}</span>
                      <span className="text-[#c5a880] text-[8px] font-mono mt-1 uppercase">{preview.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ETAPA 3: ALTERAÇÕES */}
            <div className="relative">
              <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-6 h-6 rounded-full border-2 border-[#c5a880] flex items-center justify-center font-mono text-[9px] text-[#c5a880] font-bold bg-[#0d0c0a] shadow-[0_0_10px_rgba(197,168,128,0.2)]">
                03
              </span>
              <h4 className="text-[18px] sm:text-[22px] font-sans font-medium text-white mb-2 uppercase tracking-wide">
                Processo de Alterações
              </h4>
              <div className="font-mono text-[9px] text-[#c5a880] uppercase tracking-wider mb-2">
                Prazo por rodada: 2 a 4 Dias Úteis
              </div>
              <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed max-w-[700px]">
                Garantimos um processo colaborativo e seguro. Você tem direito a **até 4 alterações** nos caminhos apresentados nas prévias, ajustando pequenos detalhes tipográficos, layouts e alinhamentos conforme a sua visão.
              </p>
            </div>

            {/* ETAPA 4: LOGO APROVADA */}
            <div className="relative">
              <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-6 h-6 rounded-full border-2 border-[#c5a880] flex items-center justify-center font-mono text-[9px] text-[#c5a880] font-bold bg-[#0d0c0a] shadow-[0_0_10px_rgba(197,168,128,0.2)]">
                04
              </span>
              <h4 className="text-[18px] sm:text-[22px] font-sans font-medium text-white mb-2 uppercase tracking-wide">
                Aprovação da Logo
              </h4>
              <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed max-w-[700px]">
                Após aprovação da logo principal, consolidamos a espinha dorsal da marca. Os arquivos finais vetorizados e em alta resolução da logo principal e suas variações são disponibilizados e organizados na nuvem no dia útil seguinte.
              </p>
            </div>

            {/* ETAPA 5: PALETA DE CORES */}
            <div className="relative">
              <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-6 h-6 rounded-full border-2 border-[#c5a880] flex items-center justify-center font-mono text-[9px] text-[#c5a880] font-bold bg-[#0d0c0a] shadow-[0_0_10px_rgba(197,168,128,0.2)]">
                05
              </span>
              <h4 className="text-[18px] sm:text-[22px] font-sans font-medium text-white mb-2 uppercase tracking-wide">
                Definição da Paleta de Cores
              </h4>
              <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed max-w-[700px]">
                Tratamos as cores como elemento estratégico individual. Apenas após a definição estrutural do símbolo partimos para o estudo técnico de contrastes, harmonias e códigos cromáticos específicos (RGB, CMYK e Pantone) adequados para o seu segmento.
              </p>
            </div>

            {/* ETAPA 6: APRESENTAÇÃO DO PROJETO */}
            <div className="relative">
              <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-6 h-6 rounded-full border-2 border-[#c5a880] flex items-center justify-center font-mono text-[9px] text-[#c5a880] font-bold bg-[#0d0c0a] shadow-[0_0_10px_rgba(197,168,128,0.2)]">
                06
              </span>
              <h4 className="text-[18px] sm:text-[22px] font-sans font-medium text-white mb-2 uppercase tracking-wide">
                Apresentação da Identidade Visual
              </h4>
              <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed max-w-[700px]">
                Esta etapa conclui a criação da identidade visual. O projeto é apresentado com Mockups aplicados e conceitos autorais. A partir deste alinhamento, a marca visual principal está completa e pronta para uso nas próximas frentes contratadas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 6: MATERIAIS DE APOIO */}
      <section className="w-full py-24 px-8 sm:px-16 lg:px-24 bg-[#0a0a08] border-b border-white/5">
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">

            <h2 className="text-[32px] sm:text-[44px] font-[100] tracking-tight leading-none text-white">
              Desenvolvimento de Materiais de Apoio
            </h2>
            <p className="text-[14px] text-zinc-400 font-light leading-relaxed">
              Dependendo do pacote de identidade selecionado, iniciamos a fase de desdobramento de materiais institucionais adicionais. Isso separa a lógica criativa do logo de suas diversas aplicações físicas e digitais cotidianas.
            </p>

            <div className="h-[1px] w-full bg-white/5 my-2"></div>

            <div className="grid grid-cols-2 gap-4 text-left">
              {[
                { title: "Cartão de Visita", desc: "Design focado em acabamentos nobres (relevos e vernizes)." },
                { title: "Papelaria", desc: "Envelopes, timbrados e pastas de apresentação do negócio." },
                { title: "Ficha de Anamnese", desc: "Materiais técnicos organizados e padronizados com a nova marca." },
                { title: "Peças Institucionais", desc: "Direção de templates digitais e assinaturas de e-mail corporativas." },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-wider text-[#c5a880] uppercase">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-zinc-500 font-light leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-[2px] border border-white/5 bg-zinc-900 shadow-xl">
            <img
              src="/assets/stationery_mockup.png"
              alt="Papelaria de Prestígio Clean"
              className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[600ms] hover:scale-102"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: APRESENTAÇÃO DOS PACOTES */}
      <section id="pacotes" className="w-full py-24 px-8 sm:px-16 lg:px-24 bg-white text-black border-b border-zinc-200">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-16">

            <h2 className="text-[32px] sm:text-[48px] font-sans font-[100] tracking-tight text-black">
              Escolha seu Nível de Presença
            </h2>
            <p className="text-[14px] text-gray-500 font-light max-w-[600px]">
              Selecione o plano ideal para estruturar a identidade e a comunicação visual do seu negócio de acordo com os seus objetivos.
            </p>
          </div>

          {/* Cards dos Pacotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 border border-gray-200 rounded-[4px] p-8 flex flex-col justify-between hover:border-gray-400 transition-all duration-300 shadow-sm relative group hover:shadow-md"
              >
                <div>
                  <span className="font-mono text-[8px] tracking-[0.25em] text-gray-400 uppercase block mb-1">
                    {pkg.tag}
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] font-sans font-light tracking-tight text-black mb-4">
                    {pkg.name}
                  </h3>
                  <p className="text-[12.5px] text-gray-500 font-light leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  <div className="h-[1px] w-full bg-gray-200 mb-6"></div>

                  <ul className="flex flex-col gap-3.5 text-left mb-8">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[12px] text-gray-600 font-light">
                        <Check size={14} className="text-[#c5a880] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/5521981940538?text=${encodeURIComponent(pkg.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 py-3 bg-black text-white hover:bg-[#c5a880] text-[10px] font-mono tracking-[0.15em] uppercase rounded-[2px] transition-all duration-300 font-medium cursor-pointer"
                >
                  <span>Solicitar Proposta</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-20 pb-12 bg-[#09090b]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Coluna 1 */}
            <div className="md:col-span-4 flex flex-col items-start gap-4 text-left">
              <h4 className="font-sans font-extrabold text-[15px] text-[#f4f4f5] tracking-widest uppercase">
                AGÊNCIA CLEAN.
              </h4>
            </div>

            {/* Coluna 2 */}
            <div className="md:col-span-5 flex flex-col gap-6 font-mono text-[10px] tracking-wider uppercase text-zinc-400 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-600 text-[9px] flex items-center gap-2"><MapPin size={10} /> LOCALIZAÇÃO</span>
                <span className="text-[13px] font-light tracking-[0.05em] normal-case text-zinc-300">
                  Av. Ator José Wilker, 605, Rio de Janeiro, RJ.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-600 text-[9px] flex items-center gap-2"><EnvelopeSimple size={10} /> CONTATO</span>
                <span className="text-[13px] font-light tracking-[0.05em] normal-case border-b border-white/5 hover:border-[#c5a880] w-fit transition-colors duration-300 text-zinc-300">
                  <a href="mailto:socialmediaclean@gmail.com">socialmediaclean@gmail.com</a>
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-600 text-[9px] flex items-center gap-2"><PhoneCall size={10} /> WHATSAPP</span>
                <span className="text-[13px] font-light tracking-[0.05em] border-b border-white/5 hover:border-[#c5a880] w-fit transition-colors duration-300 text-zinc-300">
                  <a href="https://wa.me/5521981940538?text=Quero%20mais%20informa%C3%A7%C3%B5es!" target="_blank" rel="noopener noreferrer">+55 (21) 98194-0538</a>
                </span>
                <button
                  onClick={() => setIsContactCardOpen(true)}
                  className="text-[#c5a880] text-[10px] tracking-[0.1em] cursor-pointer hover:underline uppercase font-mono w-fit mt-1 text-left bg-transparent border-none p-0"
                >
                  Quero mais informações!
                </button>
              </div>
            </div>

            {/* Coluna 3 */}
            <div className="md:col-span-3 flex flex-col gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-left">
              <span className="text-[#c5a880] text-[9px] tracking-widest font-bold">NAVEGAÇÃO</span>
              <div className="flex flex-col gap-3">
                <Link href="/" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                  HOME
                </Link>
                <a href="#equipe" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                  EQUIPE
                </a>
                <a href="#sede" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                  SEDE
                </a>
                <a href="#depoimentos" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                  DEPOIMENTOS
                </a>
                <a href="#processo" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                  PROCESSO
                </a>
                <a href="#pacotes" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300 text-[#c5a880]">
                  PACOTES
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] text-zinc-500 tracking-wider uppercase gap-4">
            <span>© {new Date().getFullYear()} AGÊNCIA CLEAN. TODOS OS DIREITOS RESERVADOS.</span>
            <div className="flex items-center gap-4">
              <span>DESIGN POR CLEAN</span>
            </div>
          </div>
        </div>
      </footer>

      {/* POPUP PREVIEW MODAL */}
      {selectedPreviewImage && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-center">
          <div
            onClick={() => setSelectedPreviewImage(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500"
          ></div>
          <button
            onClick={() => setSelectedPreviewImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-[2px] border border-white/5 text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#f4f4f5] flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 cursor-pointer bg-[#09090b]/50"
          >
            <X size={18} />
          </button>
          <div className="max-w-[90vw] max-h-[85vh] relative z-2 overflow-hidden border border-white/10 rounded-[2px]">
            <img
              src={selectedPreviewImage}
              alt="Visual Preview"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* DIÁLOGO PRIVADO DIGITAL CARD */}
      {isContactCardOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-center">
          <div
            onClick={() => setIsContactCardOpen(false)}
            className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-2xl transition-opacity duration-500"
          ></div>

          <button
            onClick={() => setIsContactCardOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-[2px] border border-white/5 text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#f4f4f5] flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 cursor-pointer bg-[#09090b]/50"
          >
            <X size={14} />
          </button>

          <div
            className="w-[90%] max-w-[420px] bg-[#121215] rounded-[2px] border border-white/10 p-8 sm:p-12 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.9)] relative z-2 animate-fade-in-up flex flex-col items-center"
            style={{
              borderColor: 'rgba(255,255,255,0.1)'
            }}
          >
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase mb-4">
              DIÁLOGO PRIVADO // DIGITAL CARD
            </span>
            <div className="w-full relative aspect-[1.58] overflow-hidden rounded-[2px] border border-white/10 mb-6 shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
              <img src="/assets/clean_contact_card.png"
                alt="Cartão de Visita Agência Clean"
                className="w-full h-full object-cover image-border"
              />
            </div>
            <h3 className="text-[20px] font-sans font-light tracking-[-0.01em] mb-2 text-[#f4f4f5]">
              Atendimento Exclusivo
            </h3>
            <p className="text-[12px] font-light leading-relaxed mb-6 max-w-[320px] text-[#c0b2a0]">
              Inicie uma conversa imediata no WhatsApp para o desenvolvimento do seu sistema de marca ou redirecionamento de posicionamento de prestígio.
            </p>
            <a
              href="https://wa.me/5521981940538?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20atendimento%20da%20Clean%20Design."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-3 px-6 py-4 rounded-[2px] text-[11px] font-semibold tracking-[0.15em] uppercase bg-[#c5a880] text-white hover:bg-transparent hover:text-[#c5a880] transition-all duration-300"
            >
              <span>Falar no WhatsApp</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
