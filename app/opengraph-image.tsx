import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'KNICKOLAUS - Nicholaus C. Mills';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111827',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
        }}
      >
        {/* Green grass bar at top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#5cb85c', display: 'flex' }} />

        {/* Main title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#ffffff',
            letterSpacing: '12px',
            display: 'flex',
            marginBottom: 20,
          }}
        >
          KNICKOLAUS
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            color: '#9ca3af',
            letterSpacing: '4px',
            display: 'flex',
            marginBottom: 50,
          }}
        >
          Nicholaus C. Mills
        </div>

        {/* Gym badges */}
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { color: '#27ae60', name: 'Tour de Fore' },
            { color: '#d4a017', name: 'DoppelWriter' },
            { color: '#e07832', name: 'whatpeptidesdo' },
            { color: '#e8664a', name: "I'm Frustrated" },
            { color: '#2c3e6b', name: 'idonthaveawill' },
          ].map((gym) => (
            <div
              key={gym.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: gym.color,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid rgba(255,255,255,0.2)',
                }}
              />
              <span style={{ color: '#6b7280', fontSize: 12 }}>{gym.name}</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: '#fbbf24',
            letterSpacing: '3px',
            display: 'flex',
            marginTop: 40,
          }}
        >
          EXPLORE MY PROJECTS
        </div>

        {/* Green grass bar at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, background: '#5cb85c', display: 'flex' }} />
      </div>
    ),
    { ...size }
  );
}
