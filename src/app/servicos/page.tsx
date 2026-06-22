"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X, ArrowLeft } from '@phosphor-icons/react';
import { PortfolioItem } from "@/lib/supabase";

const atmospheres = {
  champagne: {
    name: 'Mocha Classic',
    accent: '#c5a880',
    rgb: '197, 168, 128',
    glow1: 'rgba(197, 168, 128, 0.08)',
    glow2: 'rgba(94, 80, 63, 0.04)',
    bgBody: 'bg-[#13110f]',
  }
};
const isVideoUrl = (url: string) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].toLowerCase();
  return (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.ogg') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.endsWith('.m4v') ||
    cleanUrl.endsWith('.3gp') ||
    cleanUrl.endsWith('.quicktime')
  );
};

const activeTheme = atmospheres.champagne;

export default function ServicosPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedNiche, setSelectedNiche] = useState('ALL');
  const [selectedService, setSelectedService] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState<any>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLightMode(localStorage.getItem('theme') === 'light');
    }

    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        if (data.ok && data.items) {
          setPortfolioItems(data.items);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('bg-[#13110f]');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add(activeTheme.bgBody);
    }
  }, [isLightMode]);

  // Lista completa de nichos disponíveis para filtro
  const uniqueNiches = [
    'ALL',
    'Odontologia',
    'Medicina',
    'Dermatologia',
    'Beleza & Estética',
    'Saúde & Bem-Estar',
    'Advocacia',
    'Arquitetura',
    'Design de Interiores',
    'Engenharia',
    'Imobiliário',
    'Moda',
    'Joalheria & Luxo',
    'E-commerce',
    'Corporativo',
    'Gastronomia',
    'Alimentação Saudável',
    'Tecnologia',
    'Educação',
    'Automotivo',
    'Hotelaria & Turismo',
    'Finanças',
    'Consultoria',
    'Eventos',
    'Agronegócio',
    'Arte & Cultura',
    'Outros'
  ];
  
  // Clean service mapping to portfolio categories
  const services = [
    { id: 'ALL', label: 'Todos os Serviços' },
    { id: 'Identidade Visual', label: 'Identidade Visual', category: 'BRANDING' },
    { id: 'Naming', label: 'Naming', category: 'BRANDING' },
    { id: 'Social Media', label: 'Social Media', category: 'EDITORIAL' },
    { id: 'Sites', label: 'Sites', category: '3D' },
    { id: 'Assessoria', label: 'Assessoria', category: 'BRANDING' },
    { id: 'Impressões Gráficas', label: 'Impressões Gráficas', category: 'EDITORIAL' },
    { id: 'Ensaio Fotográfico com IA', label: 'Ensaio Fotográfico com IA', category: 'BRANDING' }
  ];

  // Filtering logic
  const filteredItems = portfolioItems.filter(item => {
    const matchesNiche = selectedNiche === 'ALL' || item.nicho === selectedNiche;
    if (!matchesNiche) return false;
    
    if (selectedService === 'ALL') return true;
    if (item.categoria === selectedService) return true;
    
    // Legacy mapping compatibility
    if (selectedService === 'Identidade Visual' && item.categoria === 'BRANDING') return true;
    if (selectedService === 'Naming' && item.categoria === 'BRANDING') return true;
    if (selectedService === 'Assessoria' && item.categoria === 'BRANDING') return true;
    if (selectedService === 'Ensaio Fotográfico com IA' && item.categoria === 'BRANDING') return true;
    if (selectedService === 'Social Media' && item.categoria === 'EDITORIAL') return true;
    if (selectedService === 'Impressões Gráficas' && item.categoria === 'EDITORIAL') return true;
    if (selectedService === 'Sites' && item.categoria === '3D') return true;
    
    return false;
  });

  return (
    <div
      className="w-full max-w-full min-h-screen relative flex flex-col font-sans antialiased overflow-y-auto px-6 py-12 sm:px-12 sm:py-20 text-left"
      style={{
        '--glow-color-1': activeTheme.glow1,
        '--glow-color-2': activeTheme.glow2,
        '--cursor-color-rgb': activeTheme.rgb
      } as React.CSSProperties}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[10%] left-[25%] w-[45vw] h-[45vh] rounded-full blur-[120px] bg-[#c5a880]/5 transition-colors duration-500" style={{ backgroundColor: `rgba(${activeTheme.rgb}, 0.03)` }}></div>
      </div>

      {/* Header */}
      <div className="max-w-[1400px] w-full mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
        <div className="flex flex-col gap-1.5 animate-fade-in-up">
          <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase">
            ARQUIVOS E DIRETÓRIO DE SERVIÇOS // AGÊNCIA CLEAN
          </span>
          <h2 className="text-[36px] sm:text-[47px] font-[100] tracking-[-0.02em] text-[#f4f4f5] leading-none" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>
            Nossos Serviços & <span className="text-[#c5a880]" style={{ color: activeTheme.accent }}>Nichos de Atuação</span>
          </h2>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 px-6 py-3 rounded-[2px] border border-white/10 hover:border-[#c5a880]/40 text-[#a1a1aa] hover:text-[#f4f4f5] transition-all duration-300 group font-mono text-[10px] tracking-[0.2em] uppercase bg-black/20"
          style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.1)' : undefined, color: isLightMode ? '#5e5045' : undefined }}
        >
          <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
          VOLTAR PARA A HOME
        </Link>
      </div>

      {/* Split filter column */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16 items-start">
        {/* Left Side: Filter Menus */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* Nossos Serviços Filter */}
          <div className="border border-white/5 rounded-[4px] p-6 bg-black/20" style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : undefined, backgroundColor: isLightMode ? '#faf9f6' : undefined }}>
            <h4 className="font-mono text-[11px] tracking-widest text-[#c5a880] uppercase mb-4 pb-2 border-b border-white/5" style={{ color: activeTheme.accent, borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : undefined }}>
              Filtrar por Serviço
            </h4>
            <div className="flex flex-col gap-2">
              {services.map((service) => {
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`text-left py-2 px-3 rounded-[2px] transition-all duration-300 font-mono text-[10px] tracking-wider uppercase cursor-pointer ${
                      isSelected ? 'bg-[#c5a880]/15 text-[#c5a880] border-l-2 border-[#c5a880]' : 'text-zinc-500 hover:text-[#f4f4f5] hover:bg-white/5'
                    }`}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nicho de Atuação Filter */}
          <div className="border border-white/5 rounded-[4px] p-6 bg-black/20" style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : undefined, backgroundColor: isLightMode ? '#faf9f6' : undefined }}>
            <h4 className="font-mono text-[11px] tracking-widest text-[#c5a880] uppercase mb-4 pb-2 border-b border-white/5" style={{ color: activeTheme.accent, borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : undefined }}>
              Filtrar por Nicho
            </h4>
            <div className="flex flex-col gap-2">
              {uniqueNiches.map((nicho) => {
                const isSelected = selectedNiche === nicho;
                const label = nicho === 'ALL' ? 'Todos os Nichos' : nicho;
                return (
                  <button
                    key={nicho}
                    onClick={() => setSelectedNiche(nicho)}
                    className={`text-left py-2 px-3 rounded-[2px] transition-all duration-300 font-mono text-[10px] tracking-wider uppercase cursor-pointer ${
                      isSelected ? 'bg-[#c5a880]/15 text-[#c5a880] border-l-2 border-[#c5a880]' : 'text-zinc-500 hover:text-[#f4f4f5] hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Grid of portfolio items */}
        <div className="lg:col-span-3">
          {filteredItems.length === 0 ? (
            <div className="w-full text-center py-20 border border-white/5 rounded-[4px] bg-black/10">
              <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
                Nenhum case disponível para este filtro
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalProject(item)}
                  className="bg-[#121215] rounded-[2px] border border-white/5 overflow-hidden relative aspect-[3/4] portfolio-card cursor-pointer group"
                  style={{ borderColor: `rgba(${activeTheme.rgb}, 0.05)` }}
                >
                  <div className="glass-border-refraction rounded-[2px]"></div>

                  {isVideoUrl(item.imagem_url) ? (
                    <video
                      src={item.imagem_url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover image-border grayscale-[0.05] group-hover:scale-[1.03] transition-all duration-[700ms] ease-out absolute inset-0 z-0"
                    />
                  ) : (
                    <img
                      src={item.imagem_url}
                      alt={item.titulo}
                      className="w-full h-full object-cover image-border grayscale-[0.05] group-hover:scale-[1.03] transition-all duration-[700ms] ease-out absolute inset-0 z-0"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#c5a880]/15 via-transparent to-[#c5a880]/04 z-1 pointer-events-none md:group-hover:opacity-0 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-md p-8 flex flex-col justify-between z-10 opacity-0 md:group-hover:opacity-100 transition-all duration-[450ms] ease-out text-left">
                    <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-[450ms] ease-out">
                      <span className="font-mono text-[9px] tracking-[0.25em] text-[#c5a880] uppercase block mb-3" style={{ color: activeTheme.accent }}>
                        {item.categoria} {item.nicho && `// ${item.nicho}`}
                      </span>
                      <h3 className="text-[18px] sm:text-[20px] font-[100] tracking-[-0.01em] text-[#f4f4f5] mb-3">
                        {item.titulo}
                      </h3>
                      <p className="text-[12px] text-[#a1a1aa] font-light leading-relaxed line-clamp-3">
                        {item.descricao}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono font-medium text-zinc-500 transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-[450ms] ease-out delay-75" style={{ color: activeTheme.accent }}>
                      <span>VER DETALHES</span>
                      <ArrowRight size={14} className="transition-transform duration-300 md:group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1400px] w-full mx-auto border-t border-white/5 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[9px] text-zinc-500 tracking-wider uppercase" style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.05)' : undefined }}>
        <span>© AGÊNCIA CLEAN — ARQUIVO DIGITAL DE PRESTÍGIO</span>
        <a
          href="https://wa.me/5521981940538?text=Quero%20mais%20informa%C3%A7%C3%B5es!"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f4f4f5] hover:text-[#c5a880] transition-colors duration-300 cursor-pointer flex items-center gap-2 bg-transparent border-none font-mono text-[9px] tracking-wider"
          style={{ color: isLightMode ? "#1c1a17" : "#f4f4f5" }}
        >
          SOLICITAR CONSULTORIA DE MARCA <ArrowRight size={12} />
        </a>
      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-center">
          <div
            onClick={() => setActiveModalProject(null)}
            className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-2xl transition-opacity duration-500"
          ></div>

          <button
            onClick={() => setActiveModalProject(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-[2px] border border-white/5 text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#f4f4f5] flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 cursor-pointer bg-[#09090b]/50"
          >
            <X size={18} />
          </button>

          <div
            className="width-[90%] max-w-[1100px] h-[85vh] max-h-[700px] bg-[#121215] rounded-[2px] border border-white/5 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.9)] overflow-hidden relative z-2 animate-fade-in-up md:h-[80vh] w-[90%]"
            style={{ borderColor: `rgba(${activeTheme.rgb}, 0.06)` }}
          >
            <div className="glass-border-refraction rounded-[2px]"></div>

            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] h-full overflow-y-auto md:overflow-hidden">
              <div className="relative h-[300px] md:h-full bg-black/30 overflow-hidden text-[#f4f4f5]">
                <div className="w-full h-full flex justify-center items-center">
                  {isVideoUrl(activeModalProject.imagem_url) ? (
                    <video
                      src={activeModalProject.imagem_url}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover image-border"
                    />
                  ) : (
                    <img src={activeModalProject.imagem_url} alt={activeModalProject.titulo} className="w-full h-full object-cover image-border" />
                  )}
                </div>
              </div>

              <div className="p-8 md:p-14 flex flex-col justify-between h-full overflow-y-auto text-left">
                <div>
                  <span className="text-[#c5a880] font-mono text-[10px] tracking-[0.2em] mb-4 inline-block uppercase" style={{ color: activeTheme.accent }}>
                    {activeModalProject.categoria}
                  </span>
                  <h2 className="text-[36px] sm:text-[42px] font-[100] tracking-[-0.01em] text-[#f4f4f5] mb-6">
                    {activeModalProject.titulo}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-[#a1a1aa] font-light leading-relaxed mb-10 max-w-[450px]">
                    {activeModalProject.descricao}
                  </p>

                  <div className="flex flex-col gap-4">
                    {activeModalProject.material && (
                      <div className="flex flex-col border-b border-white/5 pb-4">
                        <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 mb-1 uppercase">MATERIALIDADE</span>
                        <span className="text-[12px] sm:text-[13px] text-[#f4f4f5] font-light tracking-wide">{activeModalProject.material}</span>
                      </div>
                    )}
                    {activeModalProject.coords && (
                      <div className="flex flex-col border-b border-white/5 pb-4">
                        <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 mb-1 uppercase">COORDENADAS</span>
                        <span className="text-[12px] sm:text-[13px] text-[#f4f4f5] font-light tracking-wide">{activeModalProject.coords}</span>
                      </div>
                    )}
                    {activeModalProject.cliente && (
                      <div className="flex flex-col border-b border-white/5 pb-4">
                        <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 mb-1 uppercase">CLIENTE</span>
                        <span className="text-[12px] sm:text-[13px] text-[#f4f4f5] font-light tracking-wide">{activeModalProject.cliente}</span>
                      </div>
                    )}
                    {activeModalProject.nicho && (
                      <div className="flex flex-col border-b border-white/5 pb-4">
                        <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 mb-1 uppercase">NICHO</span>
                        <span className="text-[12px] sm:text-[13px] text-[#f4f4f5] font-light tracking-wide">{activeModalProject.nicho}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex justify-end items-end w-full">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-600 uppercase">
                    AGÊNCIA CLEAN // ARQUIVO RESTRITO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
