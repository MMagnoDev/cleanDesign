"use client";
import { supabase, PortfolioItem } from "@/lib/supabase";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MobileMenu from "./components/MobileMenu";

import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  X,
  MapPin,
  EnvelopeSimple,
  PhoneCall,
  Check
} from '@phosphor-icons/react';
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Simplified portfolio cases with extremely clean and concise copy
const projectDetails = {
  lumina: {
    id: 'AMANDA FAQUINI',
    title: 'Amanda Faquini — Dermatologia & Alta Estética',
    tag: 'LOGOTIPO AUTORAL & BRANDING CONCEITUAL',
    desc: 'Identidade de marca minimalista desenvolvida para uma das clínicas de estética mais exclusivas de São Paulo. Papelaria gravada em relevo seco (blind debossing) sobre papel de algodão 600g e suportes conceituais esculpidos em pedra travertino romana.',
    img: '/assets/2.png',
    material: 'MONOGRAMA AUTORAL / PEDRA / RELEVO SECO',
    coords: '23.5505° S, 46.6333° W',
    specs: [
      { key: 'LINHA DIRETORA', val: 'Purismo Visual & Luxo Silencioso' },
      { key: 'PALETA DE MATÉRIA', val: 'Areia / Café / Gesso texturizado' },
      { key: 'ACABAMENTOS', val: 'Blind Debossing & Papel Algodão' },
      { key: 'SÍMBOLO', val: 'Monograma Linear Customizado' },
      { key: 'LOCALIZAÇÃO', val: 'São Paulo, Brasil (Clean Design)' }
    ]
  },
  basalt: {
    id: 'SUELLEN DANTA',
    title: 'Dantas & Associados — Advocacia de Prestígio',
    tag: 'EDITORIAL BRANDING & SISTEMA DE MARCA',
    desc: 'Direção de arte e design de identidade de prestígio para advocacia contemporânea. Brochuras e relatórios com acabamento nobre, tipografia serifada autoral sob medida e encadernação artesanal em linho rústico.',
    img: '/assets/5.png',
    material: 'PAPELARIA CONCEITUAL / AREIA / EDITORIAL',
    coords: '22.9068° S, 43.1729° W',
    specs: [
      { key: 'LINHA DIRETORA', val: 'Sobriedade Acadêmica & Modernismo' },
      { key: 'PALETA DE MATÉRIA', val: 'Tons de Terra / Gesso / Carbono' },
      { key: 'ACABAMENTOS', val: 'Encadernação Manual & Hot Stamping' },
      { key: 'TIPOGRAFIA', val: 'Serif Autoral Desenvolvida Sob Medida' },
      { key: 'LOCALIZAÇÃO', val: 'Rio de Janeiro, Brasil' }
    ]
  },
  pedestal: {
    id: 'AMANDA FAQUINI',
    title: 'Amanda Faquini — Suportes Orgânicos',
    tag: 'DIREÇÃO DE ARTE & ESTUDO DE MATERIALIDADE',
    desc: 'Estudo de suportes sustentáveis e ecologia estética aplicados a sacolas promocionais de linho rústico de alta gramatura. Monograma blind-debossed afunilado e detalhes em costura reforçada de alta durabilidade.',
    img: '/assets/6.png',
    material: 'LINHO RÚSTICO / ECO-PRESTÍGIO / COSTURA',
    coords: '23.5505° S, 46.6333° W',
    specs: [
      { key: 'LINHA DIRETORA', val: 'Materialidade Orgânica' },
      { key: 'DESIGN DE SUPERFÍCIE', val: 'Monograma Monocromático' },
      { key: 'ACABAMENTO', val: 'Alças Tecidas em Tons de Cinza' },
      { key: 'DIREÇÃO DE ARTE', val: 'Clean Minimalist Organic' },
      { key: 'LOCALIZAÇÃO', val: 'São Paulo, Brasil' }
    ]
  },
  stationery: {
    id: 'AGÊNCIA CLEAN',
    title: 'Coleção de Papelaria de Prestígio',
    tag: 'EDITORIAL BRANDING & IDENTIDADE VISUAL',
    desc: 'Conjunto completo de papelaria corporativa com acabamento hot-stamping ouro fosco, envelopes sob medida em papel artesanal de algodão 600g e cartões de visita com relevo seco de alta definição.',
    img: '/assets/stationery_mockup.png',
    material: 'PAPEL ALGODÃO / HOT STAMPING / RELEVO',
    coords: '23.5505° S, 46.6333° W',
    specs: [
      { key: 'LINHA DIRETORA', val: 'Design Editorial de Alta Costura' },
      { key: 'PALETA DE MATÉRIA', val: 'Gesso / Mocha / Ouro fosco' },
      { key: 'ACABAMENTOS', val: 'Hot Stamping & Debossing' },
      { key: 'PAPELARIA', val: 'Algodão de Alta Gramatura (600g)' },
      { key: 'LOCALIZAÇÃO', val: 'São Paulo, Brasil' }
    ]
  }
};

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

const activeTheme = {
  accent: '#c5a880',
  rgb: '197, 168, 128',
  glow1: 'rgba(197, 168, 128, 0.08)',
  glow2: 'rgba(94, 80, 63, 0.04)',
  accentClass: 'text-[#c5a880]',
  borderClass: 'border-[#c5a880]/30',
  bgPillClass: 'bg-[#c5a880]/10 text-[#c5a880]',
  bgBody: 'bg-[#13110f]', // Rich deep coffee brown
};

export default function HomePage() {
  const [activeModalProject, setActiveModalProject] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Project Carousel States & Swipe Gestures
  const [visibleItems, setVisibleItems] = useState(3);
  const [projectSlideIndex, setProjectSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Method Carousel States & Swipe Gestures (Mobile only)
  const [methodActiveIndex, setMethodActiveIndex] = useState(0);
  const [methodTouchStart, setMethodTouchStart] = useState<number | null>(null);
  const [methodTouchEnd, setMethodTouchEnd] = useState<number | null>(null);

  // Google Reviews Drag & Auto-Scroll
  const reviewsRef = useRef<HTMLDivElement>(null);
  const isDraggingReview = useRef(false);
  const startXReview = useRef(0);
  const scrollLeftReview = useRef(0);
  const isHoveringReview = useRef(false);

  // Team Carousel Drag
  const teamCarouselRef = useRef<HTMLDivElement>(null);
  const isDraggingTeam = useRef(false);
  const startXTeam = useRef(0);
  const scrollLeftTeam = useRef(0);
  const isHoveringTeam = useRef(false);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const scrollLoop = (time: number) => {
      const container = reviewsRef.current;
      if (container && !isDraggingReview.current && !isHoveringReview.current) {
        const delta = time - lastTime;
        container.scrollLeft += (30 * delta) / 1000;

        const halfScrollWidth = container.scrollWidth / 2;
        if (halfScrollWidth > 0) {
          if (container.scrollLeft >= halfScrollWidth) {
            container.scrollLeft -= halfScrollWidth;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += halfScrollWidth;
          }
        }
      }

      const teamContainer = teamCarouselRef.current;
      if (teamContainer && !isDraggingTeam.current && !isHoveringTeam.current) {
        const delta = time - lastTime;
        teamContainer.scrollLeft += (30 * delta) / 1000;

        const halfScrollWidth = teamContainer.scrollWidth / 2;
        if (halfScrollWidth > 0) {
          if (teamContainer.scrollLeft >= halfScrollWidth) {
            teamContainer.scrollLeft -= halfScrollWidth;
          } else if (teamContainer.scrollLeft <= 0) {
            teamContainer.scrollLeft += halfScrollWidth;
          }
        }
      }

      lastTime = time;
      animId = requestAnimationFrame(scrollLoop);
    };
    animId = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleReviewMouseDown = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const container = reviewsRef.current;
    if (!container) return;
    isDraggingReview.current = true;
    startXReview.current = e.pageX - container.offsetLeft;
    scrollLeftReview.current = container.scrollLeft;
  };

  const handleReviewMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingReview.current) return;
    const container = reviewsRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXReview.current) * 1.5;
    container.scrollLeft = scrollLeftReview.current - walk;
  };

  const handleReviewMouseUp = () => {
    isDraggingReview.current = false;
  };

  const handleReviewMouseLeave = () => {
    isDraggingReview.current = false;
    isHoveringReview.current = false;
  };

  const handleReviewMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    isHoveringReview.current = true;
  };

  const handleReviewTouchStart = () => {
    isHoveringReview.current = true;
  };

  const handleReviewTouchEnd = () => {
    setTimeout(() => {
      isHoveringReview.current = false;
    }, 1500);
  };

  const handleTeamMouseDown = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const container = teamCarouselRef.current;
    if (!container) return;
    isDraggingTeam.current = true;
    startXTeam.current = e.pageX - container.offsetLeft;
    scrollLeftTeam.current = container.scrollLeft;
  };

  const handleTeamMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingTeam.current) return;
    const container = teamCarouselRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXTeam.current) * 1.5;
    container.scrollLeft = scrollLeftTeam.current - walk;
  };

  const handleTeamMouseUp = () => {
    isDraggingTeam.current = false;
  };

  const handleTeamMouseLeave = () => {
    isDraggingTeam.current = false;
    isHoveringTeam.current = false;
  };

  const handleTeamMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    isHoveringTeam.current = true;
  };

  const handleTeamTouchStart = () => {
    isHoveringTeam.current = true;
  };

  const handleTeamTouchEnd = () => {
    setTimeout(() => {
      isHoveringTeam.current = false;
    }, 1500);
  };

  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    if (portfolioItems.length > 0) {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('resize'));
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [portfolioItems]);

  useEffect(() => {
    fetch('/api/admin/logout', { method: 'POST' }).catch(() => { });

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

  const displayItems = portfolioItems.slice(0, 6);

  const [isContactCardOpen, setIsContactCardOpen] = useState(false);

  // Refs for tracking mouse coordinate positions (Pointer Orb)
  const orbRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const orbCoords = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);

  useEffect(() => {
    const checkResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);

      if (width < 640) {
        setVisibleItems(1);
      } else if (width < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    checkResize();
    window.addEventListener('resize', checkResize);
    return () => window.removeEventListener('resize', checkResize);
  }, []);

  const maxSlideIndex = Math.max(0, displayItems.length - visibleItems);

  const prevSlide = () => {
    setProjectSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setProjectSlideIndex((prev) => Math.min(maxSlideIndex, prev + 1));
  };

  useEffect(() => {
    if (projectSlideIndex > maxSlideIndex) {
      setProjectSlideIndex(maxSlideIndex);
    }
  }, [maxSlideIndex, projectSlideIndex]);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (displayItems.length === 0) return;
    const timer = setInterval(() => {
      setProjectSlideIndex((prev) => {
        if (prev >= maxSlideIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [maxSlideIndex, displayItems.length, projectSlideIndex]);

  const handleMethodTouchStart = (e: React.TouchEvent) => {
    setMethodTouchEnd(null);
    setMethodTouchStart(e.targetTouches[0].clientX);
  };

  const handleMethodTouchMove = (e: React.TouchEvent) => {
    setMethodTouchEnd(e.targetTouches[0].clientX);
  };

  const handleMethodTouchEnd = () => {
    if (!methodTouchStart || !methodTouchEnd) return;
    const distance = methodTouchStart - methodTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setMethodActiveIndex((prev) => (prev === 2 ? 0 : prev + 1));
    } else if (isRightSwipe) {
      setMethodActiveIndex((prev) => (prev === 0 ? 2 : prev - 1));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setMethodActiveIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'dark');
    }
    setIsLightMode(false);
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    // disabled
  };

  useEffect(() => {
    document.body.classList.remove('light-mode');
    document.body.classList.add(activeTheme.bgBody);
  }, []);

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    const handleGlobalMouseUp = () => {
      isDraggingReview.current = false;
      isDraggingTeam.current = false;
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.02
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
  }, [portfolioItems]);

  return (
    <div
      className="w-full max-w-full min-h-screen relative flex flex-col font-sans antialiased overflow-x-hidden"
      style={{
        '--glow-color-1': activeTheme.glow1,
        '--glow-color-2': activeTheme.glow2,
        '--cursor-color-rgb': activeTheme.rgb
      } as React.CSSProperties}
    >
      {/* SEO Tags */}
      <title>Clean Design | Identidade Visual e Presença Digital Estratégica</title>
      <meta name="description" content="A Clean Design cria identidades visuais e presenças digitais estratégicas para marcas que querem transmitir autoridade, profissionalismo e valor desde o primeiro contato." />

      {/* Ambient Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div className="ambient-glow-mesh-1 absolute top-[10%] left-[15%] w-[60vw] h-[60vh] rounded-full blur-[100px] transition-all duration-[600ms] ease-out"></div>
        <div className="ambient-glow-mesh-2 absolute bottom-[15%] right-[10%] w-[50vw] h-[50vh] rounded-full blur-[120px] transition-all duration-[600ms] ease-out"></div>
      </div>

      {/* Custom Pointer Light Flare */}
      <div
        ref={orbRef}
        className="custom-cursor-orb fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-10 opacity-0 mix-blend-screen transition-opacity duration-500 ease-in-out will-change-transform"
      ></div>

      {/* HEADER MINIMALISTA */}
      <header className={`fixed top-0 left-0 w-full z-[90] py-6 px-8 sm:px-16 lg:px-24 flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-[0.25em] transition-all duration-300 ${scrolled
        ? (isLightMode ? 'bg-[#fbfaf8]/90 backdrop-blur-md border-b border-black/5 text-[#1c1a17]' : 'bg-[#0c0b09]/90 backdrop-blur-md border-b border-white/5 text-white/90')
        : (isLightMode ? 'bg-transparent border-b border-transparent text-[#1c1a17]' : 'bg-transparent border-b border-transparent text-white/90')
        }`}>
        <div className="flex items-center justify-between w-full md:hidden">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img src="/assets/clean.png" alt="CLEAN Logo" className="h-3 w-auto object-contain " />
          </Link>
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
          <Link href="/" className="hover:opacity-80 transition-opacity py-1 flex items-center mr-4">
            <img src="/assets/clean.png" alt="CLEAN Logo" className="h-3.5 w-auto object-contain " />
          </Link>
          <a href="#vitrine" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            PROJETOS
          </a>
          <Link href="/servicos" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            SERVIÇOS
          </Link>
          <Link href="/produtos" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            PRODUTOS
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#coordinates" className="hover:text-[#c5a880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#c5a880] after:transition-all after:duration-300 after:w-0 hover:after:w-full">
            CONTATO
          </a>
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
            <a href="#vitrine" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              PROJETOS
            </a>
            <Link href="/servicos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              SERVIÇOS
            </Link>
            <Link href="/produtos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              PRODUTOS
            </Link>
            <a href="#coordinates" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors">
              CONTATO
            </a>
          </nav>
        </div>
      )}

      {/* SEÇÃO 1 — HERO / TOPO PRINCIPAL */}
      <section className="w-full relative min-h-screen flex flex-col justify-end items-start bg-[#0c0b09] text-white overflow-hidden border-b border-white/5 px-8 sm:px-16 lg:px-24 pb-20 sm:pb-28 pt-32">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/carrossel_hero/carr1.webp"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none"
        >
          <source src="/assets/video_hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-transparent to-[#0c0b09]/90 z-[1]"></div>

        {/* Content Container (Bottom-Left Aligned) */}
        <div className="relative z-10 flex flex-col items-start justify-end text-left max-w-[1100px] w-full animate-fade-in-up mt-auto">
          <h1 className="text-[42px] sm:text-[72px] lg:text-[92px] font-sans font-[100] tracking-[-0.04em] leading-[0.85] text-white mb-8 text-left">
            Não fazemos apenas identidade visual. <br className="hidden sm:inline" />
            <span className="whitespace-nowrap">Construímos reputação.</span>
          </h1>
        </div>

        {/* Ambient Arrow (Bottom-Right Aligned) */}
        <div className="absolute bottom-10 right-8 sm:right-16 lg:right-24 z-10 hidden sm:block">
          <a
            href="#clientes-autoridade"
            className="flex flex-col items-center gap-1 text-white/30 hover:text-[#c5a880] transition-colors font-mono text-[8px] tracking-[0.25em] uppercase"
          >
            <span>descer</span>
            <span className="animate-bounce text-[10px]">↓</span>
          </a>
        </div>
      </section>

      <section id="clientes-autoridade" className="w-full py-16 sm:py-24 px-6 sm:px-12 border-b border-zinc-200 bg-white text-[#1c1a17]">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-16 reveal-on-scroll">
          {/* Numbers / Key results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 border-b border-zinc-200 pb-16">
            {[
              { num: "+8.000", label: "Marcas Criadas" },
              { num: "+5", label: "Países Atendidos" },
              { num: "98.7%", label: "Índice de Satisfação" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-[36px] sm:text-[54px] font-sans font-light text-[#c5a880] tracking-tight">{stat.num}</span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#1c1a17] uppercase mt-2">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Minimal Logos representation */}
          <div className="flex flex-col items-center gap-8">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full mt-4">
              {[
                { name: "LUMINA CLÍNICA", img: "/assets/servicos/ensaioIA.webp" },
                { name: "VOSS ADVOCACIA", img: "/assets/servicos/consultoria.webp" },
                { name: "AURÊ ESTÉTICA", img: "/assets/branding/bruna.webp" },
                { name: "BASALT ARQUITETURA", img: "/assets/img2.webp" },
                { name: "PETRA IMÓVEIS", img: "/assets/img1.webp" },
                { name: "VELOUR MODA", img: "/assets/branding/vanessa.webp" }
              ].map((company, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-full aspect-square overflow-hidden rounded-[2px] border border-zinc-100 bg-[#fbfaf8] mb-4 shadow-sm">
                    <img
                      src={company.img}
                      alt={company.name}
                      loading="lazy"
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                  <span className="font-sans font-light tracking-[0.15em] text-[11px] sm:text-[12px] text-[#5e5045] group-hover:text-[#c5a880] transition-colors duration-300">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* SEÇÃO 4C — PROBLEMA DO CLIENTE */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${isLightMode ? 'bg-[#faf9f6] border-zinc-200 text-[#1c1a17]' : 'bg-[#121215] border-white/5 text-white'
        }`}>
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-6 text-left reveal-on-scroll">

            <h2 className="text-[42px] sm:text-[55px] font-[100] tracking-[-0.02em] leading-tight" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>
              Talvez sua marca já seja boa. <br />
              <span className="text-bold">Mas ela ainda não está sendo percebida assim.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4 justify-center reveal-on-scroll delay-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { text: "sua marca parece menos profissional do que realmente é", mobile: true },
                { text: "seu Instagram não transmite autoridade", mobile: true },
                { text: "sua identidade visual não tem consistência", mobile: true },
                { text: "você sente dificuldade de cobrar mais", mobile: true }
              ].map((dor, i) => (
                <div
                  key={i}
                  className={`gap-3 items-start p-4 border rounded-[2px] ${dor.mobile ? 'flex' : 'hidden sm:flex'}`}
                  style={{
                    borderColor: isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.03)',
                    backgroundColor: isLightMode ? '#fdfdfd' : '#141417'
                  }}
                >
                  <span className="text-[#c5a880] font-mono mt-0.5">✕</span>
                  <span className="text-[13px] font-light text-zinc-300 dark:text-zinc-300">{dor.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4C-2 — PARA QUEM É A CLEAN */}
      <section className="w-full py-20 sm:py-32 px-6 sm:px-12 border-b bg-white border-zinc-200 text-[#1c1a17]">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-12">
          <div className="text-left max-w-[800px] reveal-on-scroll">
            <h2 className="text-[42px] sm:text-[55px] font-[100] tracking-[-0.02em] leading-tight text-[#1c1a17] mt-4">
              Para quem quer ser <span className="text-[#c5a880]">referência</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Já cresceu. Agora precisa parecer.",
                desc: "Seu negócio evoluiu, mas sua marca ainda não transmite o nível que você entrega."
              },
              {
                title: "Quer parar de disputar preço.",
                desc: "Entende que valor percebido influencia diretamente quem compra e quanto paga."
              },
              {
                title: "Busca um posicionamento premium.",
                desc: "Quer atrair clientes melhores e ocupar um espaço mais valorizado no mercado."
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="border p-10 sm:p-12 rounded-[4px] flex flex-col justify-between transition-all duration-300 hover:border-[#c5a880] group bg-[#faf9f6] border-zinc-200 min-h-[300px]"
              >
                <div>
                  <h3 className="text-[26px] sm:text-[30px] font-sans font-semibold text-[#1c1a17] tracking-tight leading-tight mb-4 group-hover:text-[#c5a880] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-zinc-500 font-light leading-snug">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4C-3 — TRANSFORMAÇÕES */}
      <section className="w-full py-20 sm:py-32 px-6 sm:px-12 border-b bg-[#121215] border-white/5 text-white">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-12">
          <div className="text-right max-w-[800px] ml-auto reveal-on-scroll">
            <h2 className="text-[42px] sm:text-[55px] font-[100] tracking-[-0.02em] leading-[1.05] text-white mt-4">
              Antes você precisava convencer. <br />
              <span >Agora sua marca convence por você.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Antes */}
            <div className="border border-white/5 p-8 sm:p-12 rounded-[4px] bg-[#161619] flex flex-col gap-6">
              <span className="font-mono text-[11px] sm:text-[12px] tracking-widest text-red-400 uppercase border-b border-white/5 pb-4">
                ANTES
              </span>
              <div className="flex flex-col gap-5">
                {[
                  "Parece igual aos concorrentes",
                  "Precisa justificar o preço",
                  "Comunicação sem direção"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-[16px] sm:text-[18px] mt-0.5 flex-shrink-0">✕</span>
                    <span className="text-[16px] sm:text-[18px] font-light text-zinc-400 leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Depois */}
            <div className="border border-[#c5a880]/30 p-8 sm:p-12 rounded-[4px] bg-[#1d1b18] flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none"></div>
              <span className="font-mono text-[11px] sm:text-[12px] tracking-widest text-[#c5a880] uppercase border-b border-[#c5a880]/20 pb-4">
                DEPOIS
              </span>
              <div className="flex flex-col gap-5">
                {[
                  "Marca percebida como premium",
                  "Mais valor percebido",
                  "Autoridade que transmite confiança"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-[#c5a880] mt-1 flex-shrink-0" />
                    <span className="text-[16px] sm:text-[18px] font-normal text-zinc-200 leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — PORTFÓLIO / TRABALHOS */}
      <section className="py-20 sm:py-28 relative overflow-hidden" id="vitrine">
        <div className="max-w-[1200px] w-full mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 reveal-on-scroll">
            <div className="flex flex-col items-start text-left">
              <h2 className="text-[47px] sm:text-[57px] font-[100] tracking-[-0.03em] leading-tight" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>
                Marcas que ganharam presença, <br />
                <span className="text-[#c5a880]">clareza e valor percebido.</span>
              </h2>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-light mt-4 max-w-[600px]">
                Projetos criados para transformar negócios em marcas mais profissionais, memoráveis e desejáveis.
              </p>
            </div>

            {/* Elegant Carousel Controls */}
            {displayItems.length > 0 && (
              <div className="flex items-center gap-6 font-mono text-[11px] tracking-widest text-[#a1a1aa] select-none pointer-events-auto">
                <span className="text-[12px] sm:text-[13px] font-serif italic text-[#c5a880]">
                  {String(projectSlideIndex + 1).padStart(2, '0')} / {String(maxSlideIndex + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    disabled={projectSlideIndex === 0}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${projectSlideIndex === 0 ? 'border-white/5 text-zinc-600 cursor-not-allowed' : 'border-white/10 text-[#c5a880] hover:border-[#c5a880] cursor-pointer'}`}
                  >
                    ←
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={projectSlideIndex === maxSlideIndex}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${projectSlideIndex === maxSlideIndex ? 'border-white/5 text-zinc-600 cursor-not-allowed' : 'border-white/10 text-[#c5a880] hover:border-[#c5a880] cursor-pointer'}`}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Carousel Viewport Wrapper */}
          <div
            className="w-full max-w-full overflow-hidden relative cursor-grab active:cursor-grabbing select-none py-2 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translate3d(-${displayItems.length > 0 ? (projectSlideIndex / displayItems.length) * 100 : 0}%, 0, 0)`,
                width: `${(displayItems.length / visibleItems) * 100}%`
              }}
            >
              {displayItems.map((item) => {
                const cardClass = "bg-[#121215] rounded-[2px] border border-white/5 overflow-hidden relative h-[380px] portfolio-card cursor-pointer group flex-shrink-0";

                return (
                  <div
                    key={item.id}
                    className="flex-shrink-0"
                    style={{ width: `${100 / displayItems.length}%` }}
                  >
                    <div className="pr-8 h-full">
                      <div
                        onClick={() => setActiveModalProject(item)}
                        className={cardClass}
                        style={{ borderColor: `rgba(${activeTheme.rgb}, 0.05)` }}
                      >
                        <div className="glass-border-refraction rounded-[2px]"></div>
                        <img loading="lazy" decoding="async" src={item.imagem_url}
                          alt={item.titulo}
                          className="w-full h-full object-cover image-border grayscale-[0.05] group-hover:scale-[1.03] transition-all duration-[700ms] ease-out absolute inset-0 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#c5a880]/15 via-transparent to-[#c5a880]/04 z-1 pointer-events-none md:group-hover:opacity-0 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-md p-8 sm:p-12 flex flex-col justify-between z-10 opacity-0 md:group-hover:opacity-100 transition-all duration-[450ms] ease-out text-left">
                          <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-[450ms] ease-out">
                            <span className="font-mono text-[9px] tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
                              {item.categoria}
                            </span>
                            <h3 className="text-[22px] sm:text-[28px] font-[100] tracking-[-0.02em] text-[#f4f4f5] mb-4">
                              {item.titulo}
                            </h3>
                            <p className="text-[13px] text-[#a1a1aa] font-light leading-relaxed max-w-[500px]">
                              {item.descricao}
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono font-medium text-[#c5a880] transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-[450ms] ease-out delay-75">
                            <span>VER DETALHES</span>
                            <ArrowRight size={14} className="transition-transform duration-300 md:group-hover:translate-x-1.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center mt-12 gap-4">
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-transparent border border-white/10 hover:border-[#c5a880]/30 rounded-[2px] font-mono text-[10px] tracking-[0.2em] text-zinc-400 hover:text-white transition-all duration-300 flex items-center gap-3 group uppercase cursor-pointer"
            >
              VER PORTFÓLIO COMPLETO
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4D — GRANDE VIRADA ESTRATÉGICA */}
      <section className="w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 bg-white border-zinc-200 text-[#1c1a17]">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-6 text-left max-w-[850px] reveal-on-scroll">
            <h2 className="text-[42px] sm:text-[60px] font-[100] tracking-[-0.02em] leading-[1.05] text-[#1c1a17]">
              A Clean entrega uma marca pronta para ser vista, lembrada e desejada.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* O que o mercado vende */}
            <div
              className="border p-8 rounded-[2px] reveal-on-scroll"
              style={{
                borderColor: 'rgba(0,0,0,0.08)',
                backgroundColor: '#ffffff'
              }}
            >
              <h3 className="font-mono text-[11px] sm:text-[12px] tracking-widest text-zinc-400 uppercase mb-6 border-b border-black/5 pb-4">
                O que o mercado costuma vender:
              </h3>
              <ul className="flex flex-col gap-4 text-[16px] sm:text-[18px] font-light text-zinc-600">
                {["logo", "paleta de cores", "tipografia genérica", "papelaria básica", "templates comuns", "site padrão", "social media sem direção"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-zinc-400 text-[16px] sm:text-[18px]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* O que a Clean constrói */}
            <div
              className="border p-8 rounded-[2px] relative overflow-hidden reveal-on-scroll delay-100"
              style={{
                borderColor: '#c5a880',
                backgroundColor: '#f6f3eb'
              }}
            >
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#c5a880]/5 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="font-mono text-[11px] sm:text-[12px] tracking-widest text-[#c5a880] uppercase mb-6 border-b border-[#c5a880]/20 pb-4">
                O que a Clean constrói:
              </h3>
              <ul className="flex flex-col gap-4 text-[16px] sm:text-[18px] font-normal text-zinc-800">
                {["percepção de valor instantânea", "autoridade visual incontestável", "presença digital estratégica e marcante", "confiança antes mesmo da venda", "marca memorável na mente do público", "imagem profissional de alto padrão", "diferenciação clara frente aos concorrentes"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check size={18} className="text-[#c5a880] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4F — DIFERENCIAIS DA CLEAN */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${isLightMode ? 'bg-[#faf9f6] border-zinc-200 text-[#1c1a17]' : 'bg-[#121215] border-white/5 text-white'
        }`}>
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-12">
          <div className="text-right max-w-[750px] ml-auto reveal-on-scroll">
            <h2 className="text-[42px] sm:text-[55px] font-[100] tracking-[-0.02em] leading-tight mt-4">
              Por que marcas <br />escolhem a Clean
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { title: "Estética premium e estratégica", desc: "Criamos marcas visualmente sofisticadas, mas sempre com intenção e clareza comercial." },
              { title: "Processo autoral", desc: "Cada projeto segue um direcionamento visual pensado exclusivamente para o posicionamento de sua empresa." },
              { title: "Presença digital aplicável", desc: "A identidade não fica apenas no manual. Ela ganha vida no Instagram, materiais comerciais, papelarias e pontos de contato." }
            ].map((diff, idx) => (
              <div
                key={idx}
                className="border p-8 sm:p-12 rounded-[4px] min-h-[280px] flex flex-col justify-start transition-all duration-300 hover:border-[#c5a880] reveal-on-scroll"
                style={{
                  borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)',
                  backgroundColor: isLightMode ? '#fbfaf8' : '#141417'
                }}
              >
                <h4 className="text-[18px] sm:text-[22px] font-sans font-bold tracking-wider uppercase mb-6" style={{ color: isLightMode ? '#1c1a17' : '#ffffff' }}>
                  {diff.title}
                </h4>
                <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SEÇÃO 4E — MÉTODO CLEAN DE PRESENÇA VISUAL */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${isLightMode ? 'bg-[#faf9f6] border-zinc-200 text-[#1c1a17]' : 'bg-[#121215] border-white/5 text-white'
        }`}>
        <div className="max-w-[900px] w-full mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-6 text-center reveal-on-scroll">

            <h2 className="text-[42px] sm:text-[57px] font-[100] tracking-[-0.02em] leading-tight">
              Método Clean
            </h2>

          </div>

          {/* Visual Timeline component */}
          <div className="relative border-l border-[#c5a880]/30 pl-8 sm:pl-12 ml-4 sm:ml-8 mt-12 flex flex-col gap-16">
            {[
              {
                num: "01",
                title: "Diagnóstico da Marca",
                desc: "Entendemos o momento atual do negócio, público-alvo, concorrentes, objetivos de faturamento e a percepção visual desejada no mercado."
              },
              {
                num: "02",
                title: "Direção Estratégica",
                desc: "Definimos o estilo visual, tom de voz da marca, referências artísticas, diferenciais claros de valor e o posicionamento editorial."
              },
              {
                num: "03",
                title: "Construção da Identidade Visual",
                desc: "Criamos o logotipo autoral, paleta cromática personalizada, tipografia, elementos de suporte gráfico e todo o universo da marca."
              }
            ].map((etapa, idx) => (
              <div key={idx} className="relative reveal-on-scroll">
                {/* Timeline Dot Indicator */}
                <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-6 h-6 rounded-full bg-[#121215] border-2 border-[#c5a880] flex items-center justify-center font-mono text-[9px] text-[#c5a880] font-bold shadow-[0_0_10px_rgba(197,168,128,0.2)]">
                  {etapa.num}
                </span>

                <h4 className="text-[18px] sm:text-[22px] font-sans font-bold tracking-wider uppercase mb-3 text-white">
                  {etapa.title}
                </h4>
                <p className="text-[13px] sm:text-[14px] text-zinc-400 font-light leading-relaxed max-w-[700px]">
                  {etapa.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — SOBRE A MARCA */}
      <section className="w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 bg-white border-zinc-200 text-[#1c1a17]" id="sobre-mim">
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Coluna da Foto (Esquerda) */}
          <div className="lg:col-span-6 relative w-full aspect-[4/5] rounded-[2px] border overflow-hidden reveal-on-scroll delay-100" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <div className="glass-border-refraction rounded-[2px] z-10 pointer-events-none"></div>
            <img
              loading="lazy"
              decoding="async"
              src="/assets/sobre_clean.jpg"
              alt="Sobre a Clean"
              className="w-full h-full object-cover grayscale-[0.05] hover:scale-[1.02] transition-all duration-[700ms] ease-out"
            />
          </div>

          {/* Coluna do Texto (Direita) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left reveal-on-scroll">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#c5a880] uppercase mb-2">
              Um Pouco
            </span>
            <h2 className="text-[36px] sm:text-[46px] font-[100] tracking-[-0.02em] leading-tight text-[#1c1a17] mb-6">
              Sobre a <span className="text-[#c5a880]">Clean</span>
            </h2>

            <p className="text-[13px] font-light leading-relaxed mb-6 text-[#5e5045]">
              A Clean Design é referência em identidade visual minimalista e branding estratégico de alto padrão, liderada por Rafael Fajardo e Julie Fajardo. <br /> <br />Com mais de 8 mil marcas criadas no Brasil e no exterior, nossa empresa constrói posicionamentos sólidos que geram autoridade visual imediata, traduzindo o verdadeiro valor de negócios de elite em marcas memoráveis.
            </p>

            <p className="font-serif italic text-[#c5a880] text-[16px] sm:text-[18px] mb-8">
              Nosso propósito é claro: transformar sonhos em marcas inesquecíveis.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — NOSSA EQUIPE */}
      <section className={`w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 ${isLightMode ? 'bg-[#faf9f6] border-zinc-200 text-[#1c1a17]' : 'bg-[#121215] border-white/5 text-white'}`} id="equipe">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 reveal-on-scroll">
            <h2 className="text-[47px] sm:text-[55px] font-[100] tracking-[-0.02em] leading-tight" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>
              Nossa <span className="text-[#c5a880]">Equipe</span>
            </h2>
          </div>

          <div
            ref={teamCarouselRef}
            className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none py-2 touch-auto"
            onMouseDown={handleTeamMouseDown}
            onMouseMove={handleTeamMouseMove}
            onMouseUp={handleTeamMouseUp}
            onMouseLeave={handleTeamMouseLeave}
            onMouseEnter={handleTeamMouseEnter}
            onTouchStart={handleTeamTouchStart}
            onTouchEnd={handleTeamTouchEnd}
          >
            <div className="flex flex-row flex-nowrap w-max gap-6 py-2 will-change-transform">
              {[
                { src: "/assets/TIME/RAFAEL.webp", name: "Rafael Fajardo", role: "CEO & Designer Principal", desc: "Direção de Arte & Branding Conceitual" },
                { src: "/assets/TIME/JULIE.webp", name: "Julie Fajardo", role: "CEO & Gestão Estratégica", desc: "Operações & Parcerias de Prestígio" },
                { src: "/assets/TIME/ALICE.webp", name: "Alice", role: "Supervisora de Operações", desc: "Qualidade & Fluxo de Entrega" },
                { src: "/assets/TIME/RAQUEL.webp", name: "Raquel", role: "Supervisora de Criação", desc: "Direção Criativa & Tipografia" },
                { src: "/assets/TIME/JUNIOR.webp", name: "Junior", role: "Consultor Comercial Sr.", desc: "Diagnóstico & Análise de Negócio" },
                { src: "/assets/TIME/GUSTAVO.webp", name: "Gustavo", role: "Planejamento Comercial", desc: "Consultoria e Propostas de Valor" },
                { src: "/assets/TIME/MAGNO.webp", name: "Magno", role: "Web Design & Frontend", desc: "Presença Digital & Experiência UX" },
                { src: "/assets/TIME/GABRIEL.webp", name: "Gabriel", role: "Estrategista de Conteúdo", desc: "Direção Editorial & Redação" },
                { src: "/assets/TIME/STEFANI.webp", name: "Stefanie", role: "Customer Success", desc: "Atendimento & Onboarding Premium" },
                { src: "/assets/TIME/MARIANA.webp", name: "Mariana", role: "Suporte & Garantia", desc: "Relacionamento pós-entrega" },
                // Duplicate for infinite carousel
                { src: "/assets/TIME/RAFAEL.webp", name: "Rafael Fajardo", role: "CEO & Designer Principal", desc: "Direção de Arte & Branding Conceitual" },
                { src: "/assets/TIME/JULIE.webp", name: "Julie Fajardo", role: "CEO & Gestão Estratégica", desc: "Operações & Parcerias de Prestígio" },
                { src: "/assets/TIME/ALICE.webp", name: "Alice", role: "Supervisora de Operações", desc: "Qualidade & Fluxo de Entrega" },
                { src: "/assets/TIME/RAQUEL.webp", name: "Raquel", role: "Supervisora de Criação", desc: "Direção Criativa & Tipografia" },
                { src: "/assets/TIME/JUNIOR.webp", name: "Junior", role: "Consultor Comercial Sr.", desc: "Diagnóstico & Análise de Negócio" },
                { src: "/assets/TIME/GUSTAVO.webp", name: "Gustavo", role: "Planejamento Comercial", desc: "Consultoria e Propostas de Valor" },
                { src: "/assets/TIME/MAGNO.webp", name: "Magno", role: "Web Design & Frontend", desc: "Presença Digital & Experiência UX" },
                { src: "/assets/TIME/GABRIEL.webp", name: "Gabriel", role: "Estrategista de Conteúdo", desc: "Direção Editorial & Redação" },
                { src: "/assets/TIME/STEFANI.webp", name: "Stefanie", role: "Customer Success", desc: "Atendimento & Onboarding Premium" },
                { src: "/assets/TIME/MARIANA.webp", name: "Mariana", role: "Suporte & Garantia", desc: "Relacionamento pós-entrega" }
              ].map((member, i) => (
                <div key={i} className="w-[280px] sm:w-[320px] shrink-0 flex flex-col group cursor-pointer relative overflow-hidden rounded-[2px] border portfolio-card transition-all duration-500"
                  style={{
                    borderColor: isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)',
                    backgroundColor: isLightMode ? '#faf9f6' : '#121215'
                  }}
                >
                  <div className="relative h-[380px] sm:h-[460px] overflow-hidden w-full">
                    <div className="glass-border-refraction rounded-[2px] z-20"></div>
                    <img loading="lazy" decoding="async" src={member.src} alt={member.name} className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col z-30 pointer-events-none text-left">
                    <h4 className="text-[20px] sm:text-[24px] font-sans font-medium text-white mb-1.5">{member.name}</h4>
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#c5a880] uppercase leading-tight">{member.role}</span>
                    {member.desc && (
                      <span className="font-sans text-[10px] text-zinc-400 mt-1 font-light tracking-wide">{member.desc}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — ALINHAMENTO DE EXPECTATIVAS (PARA QUEM É / NÃO É) */}
      <section className="w-full py-20 sm:py-32 px-6 sm:px-12 border-b transition-colors duration-300 bg-white border-zinc-200 text-[#1c1a17]">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-12">
          <div className="text-left max-w-[750px] reveal-on-scroll mb-4">
            <h2 className="text-[42px] sm:text-[55px] font-[100] tracking-[-0.02em] leading-tight mt-4 text-[#1c1a17]">
              Alinhamento de Expectativas
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* COLUNA 1 — PARA QUEM É */}
            <div className="flex flex-col gap-6 reveal-on-scroll">
              <h3 className="text-[18px] sm:text-[20px] font-sans font-light tracking-tight text-black border-b border-black/5 pb-4 flex items-center gap-3">
                <Check size={20} className="text-[#c5a880] flex-shrink-0" /> A Clean Design é para você que:
              </h3>
              <div className="flex flex-col gap-1">
                {[
                  "sente que sua marca não transmite o valor real do seu negócio",
                  "quer profissionalizar sua presença no Instagram",
                  "deseja atrair clientes mais qualificados",
                  "quer parar de depender de artes improvisadas",
                  "quer vender com mais confiança e autoridade"
                ].map((itemText, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 py-3 border-b border-zinc-100 last:border-none transition-all duration-300 hover:translate-x-1 group"
                  >
                    <Check size={16} className="text-[#c5a880] mt-0.5 flex-shrink-0 transition-transform duration-350 group-hover:scale-110" />
                    <p className="text-[14px] font-light text-zinc-700 leading-relaxed">{itemText}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUNA 2 — PARA QUEM NÃO É */}
            <div className="flex flex-col gap-6 reveal-on-scroll">
              <h3 className="text-[18px] sm:text-[20px] font-sans font-light tracking-tight text-black border-b border-black/5 pb-4 flex items-center gap-3">
                <span className="text-red-500 font-mono text-[18px] flex-shrink-0 w-5 text-center">✕</span> A Clean Design não é para quem:
              </h3>
              <div className="flex flex-col gap-1">
                {[
                  "procura apenas uma logo rápida",
                  "quer escolher tudo sem estratégia",
                  "não pretende aplicar a marca depois",
                  "busca apenas o menor preço",
                  "não vê valor em construção de imagem"
                ].map((itemText, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 py-3 border-b border-zinc-100 last:border-none transition-all duration-300 hover:translate-x-1 group"
                  >
                    <span className="text-red-500 font-mono mt-0.5 flex-shrink-0 text-[14px] w-4 text-center transition-transform duration-350 group-hover:scale-110">✕</span>
                    <p className="text-[14px] font-light text-zinc-700 leading-relaxed">{itemText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9 — PROVAS SOCIAIS / AVALIAÇÕES */}
      <section className="py-20 sm:py-28 border-t border-b border-zinc-200 bg-white relative overflow-hidden reveal-on-scroll text-[#1c1a17]" id="avaliacoes">
        <div className="max-w-[1200px] w-full mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 reveal-on-scroll">
            <div className="flex flex-col items-start text-left">

              <h2 className="text-[47px] sm:text-[57px] font-[100] tracking-[-0.03em] leading-tight text-[#1c1a17]">
                A percepção muda quando a marca <br />
                <span className="text-[#c5a880]">se apresenta com profissionalismo.</span>
              </h2>

            </div>

            {/* Improved aggregated Trust Score note */}
            <div className="flex items-center gap-3.5 font-mono text-[10px] tracking-widest rounded-[2px] py-3 px-5 border bg-white border-zinc-200 text-[#5e5045] shadow-sm">
              <span className="text-yellow-500 text-[12px] flex gap-0.5">★★★★★</span>
              <span className="font-semibold text-zinc-800"> (4.9 / 5.0)</span>


            </div>
          </div>

          <div
            ref={reviewsRef}
            className="relative w-full overflow-x-auto no-scrollbar my-12 cursor-grab active:cursor-grabbing select-none py-2 touch-auto"
            onMouseDown={handleReviewMouseDown}
            onMouseMove={handleReviewMouseMove}
            onMouseUp={handleReviewMouseUp}
            onMouseLeave={handleReviewMouseLeave}
            onMouseEnter={handleReviewMouseEnter}
            onTouchStart={handleReviewTouchStart}
            onTouchEnd={handleReviewTouchEnd}
          >
            <div className="flex flex-row flex-nowrap w-max gap-6 py-2 will-change-transform">
              {[
                { name: "Arq. Ana Karina Costa", text: "Vocês foram ótimos em atender as minhas expectativas em relação ao desenvolvimento da minha marca. Agradeço o profissionalismo e a criatividade dos profissionais da Clean!!! Obrigadaaaaa", avatar: "/assets/reviews/avatar_ana.png" },
                { name: "Patricia Hage", text: "Gostaria de agradecer pela atenção e pelo cuidado que vocês tiveram em cada detalhe, desde o início até a finalização do projeto de reposicionamento visual da minha empresa.", avatar: "/assets/reviews/avatar_patricia.png" },
                { name: "Julia Cândido", text: "muuuito satisfeita com o resultado, a equipe é muito atenciosa!! Minha nova identidade visual no Instagram e site gerou ótimos comentários dos meus clientes.", avatar: "/assets/reviews/avatar_julia.png" },
                { name: "Keila", text: "Tive um experiência maravilhosa desde o primeiro atendimento! Trabalho excelente da equipe!! Recomendo muito para quem quer um visual sofisticado e premium.", avatar: "/assets/reviews/avatar_keila.png" },
                { name: "Danilo Sousa", text: "Trabalho fantástico, fui bem tratado em todo o processo e bem atendido... amei o meu resultado! Agora me apresento com muito mais segurança comercial.", avatar: "/assets/reviews/avatar_danilo.png" },
                // Duplicate reviews for loop
                { name: "Arq. Ana Karina Costa", text: "Vocês foram ótimos em atender as minhas expectativas em relação ao desenvolvimento da minha marca. Agradeço o profissionalismo e a criatividade dos profissionais da Clean!!! Obrigadaaaaa", avatar: "/assets/reviews/avatar_ana.png" },
                { name: "Patricia Hage", text: "Gostaria de agradecer pela atenção e pelo cuidado que vocês tiveram em cada detalhe, desde o início até a finalização do projeto de reposicionamento visual da minha empresa.", avatar: "/assets/reviews/avatar_patricia.png" },
                { name: "Julia Cândido", text: "muuuito satisfeita com o resultado, a equipe é muito atenciosa!! Minha nova identidade visual no Instagram e site gerou ótimos comentários dos meus clientes.", avatar: "/assets/reviews/avatar_julia.png" },
                { name: "Keila", text: "Tive um experiência maravilhosa desde o primeiro atendimento! Trabalho excelente da equipe!! Recomendo muito para quem quer um visual sofisticado e premium.", avatar: "/assets/reviews/avatar_keila.png" },
                { name: "Danilo Sousa", text: "Trabalho fantástico, fui bem tratado em todo o processo e bem atendido... amei o meu resultado! Agora me apresento com muito mais segurança comercial.", avatar: "/assets/reviews/avatar_danilo.png" }
              ].map((rev, index) => (
                <div
                  key={index}
                  className="border rounded-[4px] p-6 sm:p-8 flex flex-col justify-between relative w-[320px] sm:w-[380px] shrink-0 transition-all duration-300 bg-[#ffffff] border-black/5 hover:border-[#c5a880]/40"
                  style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                >
                  <div>
                    <div className="flex items-start gap-3.5 mb-4">
                      <img loading="lazy" decoding="async" src={rev.avatar}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full border border-black/5 object-cover"
                      />
                      <div className="text-left flex-1">
                        <h4 className="font-sans text-[14px] font-medium leading-tight text-[#1c1a17]">{rev.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-yellow-500 text-[11px] flex gap-0.5">★★★★★</span>
                          <span className="font-sans text-[10px] text-zinc-500">Google Review</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[13px] font-light leading-relaxed text-left text-[#5e5045]">
                      {rev.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9B — FAQ (PERGUNTAS FREQUENTES) */}
      <section className="py-20 sm:py-32 px-6 sm:px-12 bg-[#121215] border-b border-white/5 text-white">
        <div className="max-w-[800px] mx-auto flex flex-col gap-12">
          <div className="text-center reveal-on-scroll">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#c5a880] uppercase">
              Dúvidas Frequentes
            </span>
            <h2 className="text-[42px] sm:text-[52px] font-[100] tracking-[-0.02em] leading-tight mt-4">
              Perguntas <span className="text-[#c5a880]">Frequentes</span>
            </h2>
            <p className="text-[13px] text-zinc-400 font-light mt-4">
              Esclareça suas principais dúvidas sobre o desenvolvimento da identidade visual de sua marca.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/5 mt-6 reveal-on-scroll">
            {[
              {
                q: "O que está incluso no projeto de Identidade Visual?",
                a: "O projeto completo inclui o logotipo principal, variações horizontais e verticais, assinaturas de marca, manual de uso da identidade visual (regras de aplicação, paleta de cores e tipografia), design de papelaria institucional básica e mockups realistas de aplicação digital."
              },
              {
                q: "Qual o prazo de desenvolvimento do projeto?",
                a: "O prazo médio de entrega varia entre 15 e 25 dias úteis. Esse tempo nos permite mergulhar no diagnóstico do negócio, desenvolver caminhos conceituais com direção de arte exclusiva e realizar acabamentos impecáveis."
              },
              {
                q: "Como funciona o processo de aprovação?",
                a: "Apresentamos uma solução de design fechada, fundamentada na estratégia de posicionamento validada na etapa de moodboard. Se houver necessidade de ajustes, trabalhamos em conjunto até alcançar o alinhamento de 100% de satisfação."
              },
              {
                q: "Como é realizado o pagamento e início?",
                a: "Para iniciar o projeto, solicitamos um sinal de 50% e o restante na entrega final, ou parcelado via cartão de crédito. Logo após a confirmação, agendamos o seu Diagnóstico Estratégico para iniciarmos o briefing."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-white/5 text-left">
                  <div
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex justify-between items-center py-6 cursor-pointer hover:opacity-85 transition-opacity"
                  >
                    <h4 className={`text-[14px] sm:text-[16px] font-normal transition-colors duration-300 ${isOpen ? 'text-[#c5a880]' : 'text-zinc-300'}`}>
                      {faq.q}
                    </h4>
                    <span className={`font-mono text-[14px] transition-transform duration-400 ${isOpen ? 'rotate-45 text-[#c5a880]' : 'text-zinc-500'}`}>
                      <Plus size={14} />
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-[400ms] ease-in-out"
                    style={{
                      maxHeight: isOpen ? '160px' : '0px',
                      paddingBottom: isOpen ? '24px' : '0px'
                    }}
                  >
                    <p className="text-[12px] sm:text-[13px] text-zinc-400 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 10A — CTA FINAL */}
      <section className={`w-full py-28 sm:py-36 px-6 sm:px-12 border-b transition-colors duration-300 ${isLightMode ? 'bg-[#faf9f6] border-zinc-200 text-[#1c1a17]' : 'bg-[#121215] border-white/5 text-white'
        } text-center`} id="coordinates">
        <div className="max-w-[950px] w-full mx-auto flex flex-col items-center gap-8 reveal-on-scroll">
          <h2 className="text-[42px] sm:text-[62px] lg:text-[73px] font-[100] tracking-[-0.03em] leading-tight max-w-[850px] uppercase font-serif">
            Sua marca já parece <br className="hidden sm:inline" />
            o <span className="text-[#c5a880] uppercase">valor</span> que entrega?
          </h2>
          <p className="text-[14px] sm:text-[16px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-[650px]">
            Agende uma conversa e descubra como posicionar sua marca para crescer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center">
            <a
              href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20agendar%20um%20diagnóstico%20com%20a%20Clean%20Design."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#c5a880] text-white hover:bg-[#b3956d] font-mono text-[10px] tracking-[0.2em] uppercase rounded-[2px] font-semibold transition-all duration-300"
            >
              Agendar Diagnóstico
            </a>
            <a
              href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20conversar%20sobre%20o%20atendimento%20da%20Clean%20Design."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border border-black/10 dark:border-white/20 hover:border-[#c5a880] font-mono text-[10px] tracking-[0.2em] uppercase rounded-[2px] font-semibold transition-all duration-300"
            >
              Falar com a Clean no WhatsApp
            </a>
          </div>


        </div>
      </section>

      {/* ACCORDION DE FILOSOFIA & DIÁLOGO */}
      <section className="py-20 px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col items-start text-left reveal-on-scroll">
            <h2 className="text-[42px] sm:text-[49px] font-[100] tracking-[-0.02em] leading-tight mb-6" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>
              Diálogo & <span className="text-[#c5a880]">Consultoria</span>
            </h2>

            <div className="flex flex-col gap-6 mt-8 font-mono text-[10px] tracking-wider uppercase">
              <div className="flex flex-col gap-1.5"><span className="text-zinc-600 text-[9px] flex items-center gap-2"><MapPin size={10} /> LOCALIZAÇÃO</span>
                <span className="text-[13px] font-light tracking-[0.05em] normal-case" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>
                  Av. Ator José Wilker, 605, Rio de janeiro, RJ.
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-600 text-[9px] flex items-center gap-2"><EnvelopeSimple size={10} /> CONTATO</span>
                <span className="text-[13px] font-light tracking-[0.05em] normal-case border-b hover:border-gold w-fit transition-colors duration-300" style={{ borderColor: isLightMode ? 'rgba(28,26,23,0.1)' : 'rgba(255,255,255,0.05)' }}>
                  <a href="mailto:socialmediaclean@gmail.com" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>socialmediaclean@gmail.com</a>
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-600 text-[9px] flex items-center gap-2"><PhoneCall size={10} /> WHATSAPP</span>
                <span className="text-[13px] font-light tracking-[0.05em] border-b hover:border-gold w-fit transition-colors duration-300" style={{ borderColor: isLightMode ? 'rgba(28,26,23,0.1)' : 'rgba(255,255,255,0.05)' }}>
                  <a href="https://wa.me/5521981940538?text=Quero%20mais%20informa%C3%A7%C3%B5es!" target="_blank" rel="noopener noreferrer" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>+55 (21) 98194-0538</a>
                </span>
                <button
                  onClick={() => setIsContactCardOpen(true)}
                  className="text-[#c5a880] text-[10px] tracking-[0.1em] cursor-pointer hover:underline uppercase font-mono w-fit mt-1 text-left bg-transparent border-none p-0"
                >
                  Quero mais informações!
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-left reveal-on-scroll delay-100">

            <div className="flex flex-col border-t border-black/5 dark:border-white/5">
              {[
                {
                  title: 'Posicionamento com Intenção',
                  text: 'Definir com clareza como a marca deseja ser percebida, por quem e por qual motivo deve ser escolhida.'
                },
                {
                  title: 'Identidade que Sustenta Valor',
                  text: 'Criar uma linguagem visual consistente, sofisticada e alinhada à essência, ao mercado e ao público da marca.'
                },
                {
                  title: 'Presença que Gera Autoridade',
                  text: 'Transformar cada ponto de contato em uma experiência coerente, memorável e capaz de fortalecer a percepção de valor.'
                }
              ].map((item, idx) => {
                const isOpen = activeAccordion === idx;
                return (
                  <div key={idx} className="border-b border-black/5 dark:border-white/5">
                    <div
                      onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                      className="flex justify-between items-center py-6 cursor-pointer hover:opacity-85 transition-opacity"
                    >
                      <h4 className={`text-[14px] sm:text-[15px] font-normal transition-colors duration-300 ${isOpen ? (isLightMode ? 'text-[#1c1a17]' : 'text-white') : 'text-zinc-500'}`}>
                        {item.title}
                      </h4>
                      <span className={`font-mono text-[14px] transition-transform duration-400 ${isOpen ? 'rotate-45 text-[#c5a880]' : 'text-zinc-500'}`}>
                        <Plus size={14} />
                      </span>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-[400ms] ease-in-out"
                      style={{
                        maxHeight: isOpen ? '120px' : '0px',
                        paddingBottom: isOpen ? '20px' : '0px'
                      }}
                    >
                      <p className="text-[12px] sm:text-[13px] text-zinc-500 dark:text-[#a1a1aa] font-light leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-16 pb-12 bg-[#09090b]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="flex flex-col gap-2.5 text-left">
              <h4 className="font-sans font-extrabold text-[15px] text-[#f4f4f5] tracking-widest uppercase">
                AGÊNCIA CLEAN.
              </h4>

            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.2em] uppercase text-left">
              <a href="#vitrine" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                PROJETOS
              </a>
              <a href="#sobre-mim" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                SOBRE
              </a>
              <a href="#coordinates" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                DIÁLOGO
              </a>
              <a href="https://www.instagram.com/clean.designn/" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-300">
                INSTAGRAM
              </a>
              <a href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20mais%20informações." target="_blank" rel="noopener noreferrer" className="text-[#c5a880] hover:text-white transition-colors duration-300">
                WHATSAPP
              </a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] text-zinc-500 tracking-wider uppercase gap-4">
            <span>© {new Date().getFullYear()} CLEAN DESIGN CO. TODOS OS DIREITOS RESERVADOS.</span>
            <div className="flex items-center gap-4">
              <span>DESIGN POR CLEAN</span>
              <span className="text-zinc-700">/</span>
              <a href="#" className="hover:text-gold transition-colors duration-300" style={{ color: isLightMode ? "#1c1a17" : "#f4f4f5" }}>
                IR AO TOPO ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* DETAIL MODAL POPUP FOR CASE PORTFOLIO */}
      {activeModalProject && (() => {
        let title = '';
        let tag = '';
        let desc = '';
        let img = '';
        let specs: { key: string; val: string }[] = [];

        const detail = projectDetails[activeModalProject.id as keyof typeof projectDetails];
        if (detail) {
          title = detail.title;
          tag = detail.tag;
          desc = detail.desc;
          img = detail.img;
          specs = detail.specs || [];
        } else {
          title = activeModalProject.titulo;
          tag = activeModalProject.categoria;
          desc = activeModalProject.descricao || '';
          img = activeModalProject.imagem_url;

          if (activeModalProject.cliente) specs.push({ key: 'CLIENTE', val: activeModalProject.cliente });
          if (activeModalProject.nicho) specs.push({ key: 'NICHO', val: activeModalProject.nicho });
          if (activeModalProject.material) specs.push({ key: 'MATERIALIDADE', val: activeModalProject.material });
          if (activeModalProject.coords) specs.push({ key: 'COORDENADAS', val: activeModalProject.coords });
          specs.push({ key: 'CATEGORIA', val: activeModalProject.categoria });
        }

        return (
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
              className="w-[90%] max-w-[1100px] h-[85vh] max-h-[700px] bg-[#121215] rounded-[2px] border border-white/5 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.9)] overflow-hidden relative z-2 animate-fade-in-up w-[90%]"
              style={{ borderColor: `rgba(${activeTheme.rgb}, 0.06)` }}
            >
              <div className="glass-border-refraction rounded-[2px]"></div>

              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] h-full overflow-y-auto md:overflow-hidden">
                <div className="relative h-[300px] md:h-full bg-black/30 overflow-hidden text-[#f4f4f5]">
                  <img loading="lazy" decoding="async" src={img} alt={title} className="w-full h-full object-cover image-border" />
                </div>
                <div className="p-8 md:p-14 flex flex-col justify-between h-full overflow-y-auto text-left">
                  <div>
                    <span className="text-[#c5a880] font-mono text-[10px] tracking-[0.2em] mb-4 inline-block uppercase">
                      {tag}
                    </span>
                    <h2 className="text-[28px] sm:text-[32px] font-[100] tracking-[-0.01em] text-[#f4f4f5] mb-6">
                      {title}
                    </h2>
                    <div className="flex flex-col gap-3.5 mb-8 font-mono text-[10px] tracking-wider uppercase">
                      {specs.map((spec, sidx) => (
                        <div key={sidx} className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-[#a1a1aa]">{spec.key}</span>
                          <span className="text-[#f4f4f5] font-medium">{spec.val}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-[#a1a1aa] font-light leading-relaxed mb-10">
                      {desc}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3.5 mt-auto">
                    <button
                      onClick={() => {
                        window.open(`https://wa.me/5521981940538?text=Olá!%20Quero%20solicitar%20um%20orçamento%20personalizado%20para%20o%20case%20de%20identividade%20visual:%20${encodeURIComponent(title)}`, '_blank');
                      }}
                      className="w-full inline-flex justify-center items-center gap-3 px-7 py-4 rounded-[2px] bg-[#f4f4f5] text-[#09090b] text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-transparent hover:text-[#f4f4f5] hover:border-[#c5a880] transition-all duration-300 cursor-pointer"
                    >
                      <span>Solicitar Orçamento Personalizado</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* CONTACT CARD MODAL */}
      {isContactCardOpen && (
        <div className="fixed inset-0 z-[2000] flex justify-center items-center px-4">
          <div
            onClick={() => setIsContactCardOpen(false)}
            className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-xl transition-opacity duration-300"
          ></div>
          <div
            className="relative max-w-[480px] w-full bg-[#121215] border border-white/10 rounded-[3px] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] z-10 flex flex-col items-center text-center animate-zoom-in"
            style={{
              borderColor: `rgba(${activeTheme.rgb}, 0.15)`,
              backgroundColor: isLightMode ? '#f2ebd9' : '#121215'
            }}
          >
            <button
              onClick={() => setIsContactCardOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors duration-300 w-8 h-8 rounded-full border border-white/5 flex items-center justify-center cursor-pointer bg-black/20"
              style={{
                color: isLightMode ? '#1c1a17' : '#a1a1aa',
                borderColor: isLightMode ? 'rgba(28,26,23,0.1)' : 'rgba(255,255,255,0.05)'
              }}
            >
              <X size={14} />
            </button>
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase mb-4">
              DIÁLOGO PRIVADO // DIGITAL CARD
            </span>
            <div className="w-full relative aspect-[1.58] overflow-hidden rounded-[2px] border border-white/10 mb-6 shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
              style={{ borderColor: isLightMode ? 'rgba(28,26,23,0.08)' : 'rgba(255,255,255,0.1)' }}>
              <img loading="lazy" decoding="async" src="/assets/clean_contact_card.png"
                alt="Cartão de Visita Agência Clean"
                className="w-full h-full object-cover image-border"
              />
            </div>
            <h3 className="text-[20px] font-sans font-light tracking-[-0.01em] mb-2" style={{ color: isLightMode ? '#1c1a17' : '#f4f4f5' }}>
              Atendimento Exclusivo
            </h3>
            <p className="text-[12px] font-light leading-relaxed mb-6 max-w-[320px]" style={{ color: isLightMode ? '#8a7b6e' : '#c0b2a0' }}>
              Inicie uma conversa imediata no WhatsApp para o desenvolvimento do seu sistema de marca ou redirecionamento de posicionamento de prestígio.
            </p>
            <a
              href="https://wa.me/5521981940538?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20atendimento%20da%20Clean%20Design."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-3 px-6 py-4 rounded-[2px] text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-transparent hover:text-[#c5a880] transition-all duration-300"
              style={{
                backgroundColor: '#c5a880',
                color: '#ffffff'
              }}
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
