"use client"

import { useState, useEffect } from 'react'

export function IntroOverlay() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible')

  useEffect(() => {
    // Brief pause to let the brand name breathe, then start fade
    const fadeTimer = setTimeout(() => setPhase('fading'), 2200)
    // Remove from DOM after the fade-out transition completes
    const doneTimer = setTimeout(() => setPhase('done'), 3200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13110f',
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      {/* Subtle ambient glow behind the logo */}
      <div
        style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'introGlow 2s ease-in-out forwards',
        }}
      />

      {/* Brand logo & timer container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <img
          src="/assets/clean.png"
          alt="Clean Design"
          style={{
            width: 'clamp(80px, 12vw, 120px)',
            height: 'auto',
            objectFit: 'contain',
            opacity: 0,
            animation: 'introFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
          }}
        />

        {/* Minimalist timer bar */}
        <div
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'rgba(197, 168, 128, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            opacity: 0,
            animation: 'introFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: '#c5a880',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
              animation: 'introProgress 1.8s linear 0.4s forwards',
            }}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes introFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes introFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes introProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes introGlow {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes introTextReveal {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
