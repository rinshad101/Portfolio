import { ImageResponse } from 'next/og'
import { profile } from '@/data/profile'

export const alt = `${profile.name} — ${profile.positioning}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(circle at 80% 20%, rgba(139,92,246,0.35), transparent 50%), #07090F',
          color: '#F5F7FF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#67E8F9', letterSpacing: 4 }}>
          {'> '}
          {profile.brand.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>ENGINEERING</div>
          <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
            THE&nbsp;<span style={{ color: '#8B5CF6' }}>FUTURE.</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#A0A9BC' }}>
          <span>{profile.name}</span>
          <span>{profile.headline}</span>
        </div>
      </div>
    ),
    size,
  )
}
