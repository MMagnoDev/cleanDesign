"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable smooth scroll on admin panels
    if (typeof window === "undefined" || pathname?.startsWith("/admin")) {
      return;
    }

    // Set scroll-behavior to auto globally when Lenis is running to avoid conflicts
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    html.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;


    let animId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    };
    animId = requestAnimationFrame(raf);

    // Global interceptor for smooth scrolling hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          // If it's a hash link on the current page, smooth scroll to it
          e.preventDefault();
          const targetId = href.substring(1);
          if (targetId === "") {
            lenis.scrollTo(0);
          } else {
            const element = document.getElementById(targetId);
            if (element) {
              lenis.scrollTo(element);
            }
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
      document.removeEventListener("click", handleAnchorClick);
      html.classList.remove("lenis", "lenis-smooth");
      html.style.scrollBehavior = "";
    };
  }, [pathname]);

  return null;
}
