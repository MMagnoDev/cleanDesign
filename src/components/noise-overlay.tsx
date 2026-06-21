"use client"

export function NoiseOverlay() {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-[99999] pointer-events-none" style={{ minHeight: '100%' }}>
            {/* Digital Noise Layer */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.0' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    )
}
