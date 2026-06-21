import type { Metadata } from "next";
import { Instrument_Serif, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/noise-overlay";
import { IntroOverlay } from "@/components/intro-overlay";
import { PageWrapper } from "@/components/page-wrapper";
import { SmoothScroll } from "@/components/smooth-scroll";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acesse.cleandesignn.com.br"),
  title: {
    default: "Clean Design — Agência de Identidade Visual & Branding de Prestígio",
    template: "%s | Clean Design Studio",
  },
  description:
    "Criamos identidades visuais de alto padrão para marcas que buscam se destacar com sofisticação, minimalismo e materialidade autoral. Branding conceitual de luxo silencioso.",
  keywords: [
    "Design de marcas",
    "Identidade visual",
    "Branding de luxo",
    "Design minimalista",
    "Clean Design",
    "Agência de branding",
    "Papelaria conceitual",
    "Design de prestígio",
  ],
  authors: [{ name: "Clean Design Studio", url: "https://acesse.cleandesignn.com.br" }],
  creator: "Clean Design Studio",
  publisher: "Clean Design Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://acesse.cleandesignn.com.br",
    title: "Clean Design — Agência de Identidade Visual & Branding",
    description: "Identidades visuais de alto padrão para marcas que buscam se destacar com sofisticação, minimalismo e materialidade autoral.",
    siteName: "Clean Design Studio",
    images: [
      {
        url: "/assets/idvisual.webp",
        width: 1200,
        height: 630,
        alt: "Clean Design Studio Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clean Design — Agência de Identidade Visual & Branding",
    description: "Identidades visuais de alto padrão para marcas que buscam se destacar com sofisticação e minimalismo.",
    images: ["/assets/idvisual.webp"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${outfit.variable} ${poppins.variable} antialiased min-h-[100dvh] flex flex-col overflow-x-hidden`}
        suppressHydrationWarning
        style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
      >
        <SmoothScroll />
        <PageWrapper>
          <div className="relative min-h-[100dvh]">
            <NoiseOverlay />
            {children}
            
            {/* FLOATING WHATSAPP BUTTON */}
            <a
              href="https://wa.me/5521981940538?text=Olá!%20Gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-[90] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.3)] group bg-[#25D366] border border-[#25D366]"
              title="Falar no WhatsApp"
            >
              <span className="absolute inset-0 rounded-full animate-whatsapp-ripple-1 pointer-events-none" style={{ backgroundColor: '#25D366', opacity: 0.15 }} />
              <span className="absolute inset-0 rounded-full animate-whatsapp-ripple-2 pointer-events-none" style={{ backgroundColor: '#25D366', opacity: 0.15 }} />
              <span className="absolute right-14 font-mono text-[9px] tracking-widest text-[#a1a1aa] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none uppercase"
                style={{
                  color: '#a1a1aa',
                  backgroundColor: 'rgba(9,9,11,0.85)',
                  borderColor: 'rgba(255,255,255,0.05)'
                }}>
                WhatsApp
              </span>
              <svg
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-[12deg]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.37 5.028L2 22l5.13-1.313A9.97 9.97 0 0 0 12.01 22c5.506 0 9.987-4.478 9.989-9.985C22.001 6.507 17.518 2 12.012 2zm5.727 14.122c-.254.717-1.477 1.374-2.022 1.43-.497.052-1.146.069-1.846-.156-.456-.145-1.011-.345-1.637-.62a9.122 9.122 0 0 1-3.905-3.416c-.47-.625-.794-1.353-.794-2.122 0-1.558 1.2-1.838 1.478-1.838.254 0 .405.006.497.017.14.017.25.029.358.26.12.26.474 1.156.514 1.237.04.081.069.174.012.29-.058.115-.087.19-.174.29-.086.098-.18.22-.254.295-.087.087-.179.18-.076.353.104.173.463.763.995 1.237.682.607 1.254.797 1.433.878.179.081.283.069.387-.052.104-.121.445-.515.56-.693.116-.18.232-.15.393-.093.162.058 1.023.48 1.2.566.173.087.29.127.33.197.04.07.04.405-.214 1.122z" />
              </svg>
            </a>
          </div>
        </PageWrapper>
        <IntroOverlay />
      </body>
    </html>
  );
}
