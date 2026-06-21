"use client"

import { useState, useEffect } from 'react'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [blurPhase, setBlurPhase] = useState<'blurred' | 'focusing' | 'sharp'>('blurred')

  useEffect(() => {
    // Start focusing right as the intro begins fading
    const focusTimer = setTimeout(() => setBlurPhase('focusing'), 2300)
    // Done quickly
    const sharpTimer = setTimeout(() => setBlurPhase('sharp'), 3200)

    return () => {
      clearTimeout(focusTimer)
      clearTimeout(sharpTimer)
    }
  }, [])

  return (
    <div
      style={
        blurPhase === 'sharp'
          ? {}
          : {
              filter: blurPhase === 'blurred' ? 'blur(14px)' : 'blur(0px)',
              transform: blurPhase === 'blurred' ? 'scale(1.03)' : 'scale(1)',
              opacity: blurPhase === 'blurred' ? 0.6 : 1,
              transition: blurPhase === 'focusing'
                ? 'filter 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out'
                : 'none',
              willChange: 'filter, transform, opacity',
            }
      }
    >
      {children}
    </div>
  )
}
