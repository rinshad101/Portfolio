/** Lightweight static stand-in for the 3D processor (mobile, no WebGL, reduced motion, loading). */
export function HeroFallback({ animate = true }: { animate?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="absolute h-[70%] w-[70%] rounded-full bg-accent/25 blur-[80px]" />
      <svg viewBox="0 0 320 320" className={`relative w-[min(78%,22rem)] ${animate ? 'animate-float' : ''}`}>
        <defs>
          <linearGradient id="hf-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F5F7FF" stopOpacity="0.16" />
            <stop offset="1" stopColor="#F5F7FF" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="hf-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="#67E8F9" />
          </linearGradient>
          <radialGradient id="hf-core">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#67E8F9" />
            <stop offset="1" stopColor="#67E8F9" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="rotate(-8 160 160)">
          {Array.from({ length: 9 }).map((_, i) => {
            const p = 78 + i * 20.5
            return (
              <g key={i} fill="#A0A9BC" opacity="0.7">
                <rect x={p - 3} y="40" width="6" height="16" rx="1.5" />
                <rect x={p - 3} y="264" width="6" height="16" rx="1.5" />
                <rect x="40" y={p - 3} width="16" height="6" rx="1.5" />
                <rect x="264" y={p - 3} width="16" height="6" rx="1.5" />
              </g>
            )
          })}
          <rect x="56" y="56" width="208" height="208" rx="22" fill="url(#hf-glass)" stroke="url(#hf-edge)" strokeWidth="1.5" />
          {[-36, -12, 12, 36].map((o) => (
            <g key={o} stroke="var(--accent)" strokeWidth="1.5" opacity="0.8">
              <line x1="210" y1={160 + o} x2="252" y2={160 + o} />
              <line x1="68" y1={160 + o} x2="110" y2={160 + o} />
              <line x1={160 + o} y1="68" x2={160 + o} y2="110" />
              <line x1={160 + o} y1="210" x2={160 + o} y2="252" />
            </g>
          ))}
          <rect x="110" y="110" width="100" height="100" rx="8" fill="#121828" stroke="#263044" />
          <circle cx="160" cy="160" r="34" fill="url(#hf-core)" />
          <circle cx="160" cy="160" r="128" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  )
}
