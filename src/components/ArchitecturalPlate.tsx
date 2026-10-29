import React from 'react';

interface ArchitecturalPlateProps {
  motif: 'aperture' | 'monolith' | 'axis' | 'strata' | 'hero-spatial' | 'portrait-study';
  label?: string;
  index?: string;
  accentColor?: string;
  className?: string;
}

/**
 * Bespoke, high-precision architectural & spatial plates rendered in crisp SVG + layered CSS planes.
 * Zero external image breakage, instantaneous load, no layout shift, and layered internal nodes
 * that respond to parent parallax and hover transforms.
 */
export const ArchitecturalPlate: React.FC<ArchitecturalPlateProps> = ({
  motif,
  label = 'SPATIAL PLATE',
  index = '01',
  accentColor = 'var(--color-accent)',
  className = '',
}) => {
  return (
    <div className={`arch-plate arch-plate--${motif} ${className}`} aria-hidden="true">
      <div className="arch-plate__bg-grain" />

      {motif === 'hero-spatial' && (
        <svg
          viewBox="0 0 800 960"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arch-plate__svg"
        >
          <defs>
            <linearGradient id="heroPlaneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#262421" />
              <stop offset="55%" stopColor="#171614" />
              <stop offset="100%" stopColor="#0E0E0D" />
            </linearGradient>
            <linearGradient id="heroLightBeam" x1="0%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#EDE8DF" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#EDE8DF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#EDE8DF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Deep architectural background frame */}
          <rect width="800" height="960" fill="url(#heroPlaneGrad)" />

          {/* Architectural grid lines */}
          <line x1="120" y1="0" x2="120" y2="960" stroke="#F4F0EA" strokeOpacity="0.08" />
          <line x1="400" y1="0" x2="400" y2="960" stroke="#F4F0EA" strokeOpacity="0.06" strokeDasharray="4 8" />
          <line x1="680" y1="0" x2="680" y2="960" stroke="#F4F0EA" strokeOpacity="0.08" />
          <line x1="0" y1="180" x2="800" y2="180" stroke="#F4F0EA" strokeOpacity="0.08" />
          <line x1="0" y1="520" x2="800" y2="520" stroke="#F4F0EA" strokeOpacity="0.08" />
          <line x1="0" y1="780" x2="800" y2="780" stroke="#F4F0EA" strokeOpacity="0.08" />

          {/* Spatial perspective corridor planes */}
          <polygon
            points="120,180 680,110 680,780 120,840"
            fill="url(#heroLightBeam)"
            stroke="#F4F0EA"
            strokeOpacity="0.18"
          />
          <polygon
            points="210,250 590,200 590,700 210,745"
            fill="#1D1C19"
            fillOpacity="0.72"
            stroke="#F4F0EA"
            strokeOpacity="0.24"
          />

          {/* Inner recessed aperture */}
          <rect
            x="290"
            y="310"
            width="220"
            height="320"
            fill="#11100F"
            stroke="#F4F0EA"
            strokeOpacity="0.32"
          />

          {/* Diagonal architectural light slice */}
          <polygon
            points="290,310 510,310 680,780 120,840"
            fill="#F4F0EA"
            fillOpacity="0.035"
          />

          {/* Vermilion focal calibration point & axis */}
          <line x1="250" y1="470" x2="550" y2="470" stroke={accentColor} strokeOpacity="0.75" strokeWidth="1.2" />
          <circle cx="400" cy="470" r="5" fill={accentColor} />
          <circle cx="400" cy="470" r="22" stroke={accentColor} strokeOpacity="0.4" />

          {/* Technical coordinate annotations */}
          <text x="136" y="164" fill="#F4F0EA" fillOpacity="0.55" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            PLANE Z-01 // PERSPECTIVE 1100PX
          </text>
          <text x="136" y="818" fill="#F4F0EA" fillOpacity="0.45" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
            Nisam SPATIAL MONOGRAPH — PLATE {index}
          </text>
        </svg>
      )}

      {motif === 'portrait-study' && (
        <svg
          viewBox="0 0 640 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arch-plate__svg"
        >
          <rect width="640" height="800" fill="#1B1A18" />
          <line x1="80" y1="0" x2="80" y2="800" stroke="#F4F0EA" strokeOpacity="0.09" />
          <line x1="560" y1="0" x2="560" y2="800" stroke="#F4F0EA" strokeOpacity="0.09" />
          <line x1="0" y1="120" x2="640" y2="120" stroke="#F4F0EA" strokeOpacity="0.09" />
          <line x1="0" y1="680" x2="640" y2="680" stroke="#F4F0EA" strokeOpacity="0.09" />

          {/* Layered editorial monoliths representing figure & space */}
          <rect x="140" y="160" width="280" height="440" fill="#252320" stroke="#F4F0EA" strokeOpacity="0.2" />
          <rect x="220" y="220" width="280" height="420" fill="#141312" stroke="#F4F0EA" strokeOpacity="0.28" />
          <circle cx="360" cy="360" r="88" stroke="#F4F0EA" strokeOpacity="0.22" />
          <circle cx="360" cy="360" r="4" fill={accentColor} />
          <line x1="140" y1="520" x2="500" y2="280" stroke="#F4F0EA" strokeOpacity="0.16" />

          <text x="96" y="102" fill="#F4F0EA" fillOpacity="0.5" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            FIG. 01 // STUDIO PORTRAIT PLACEHOLDER
          </text>
          <text x="96" y="712" fill="#F4F0EA" fillOpacity="0.45" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
            REPLACEABLE PHOTOGRAPHIC PLATE — Nisam
          </text>
        </svg>
      )}

      {motif === 'aperture' && (
        <svg
          viewBox="0 0 960 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arch-plate__svg"
        >
          <rect width="960" height="600" fill="#171615" />
          <rect x="70" y="50" width="820" height="500" stroke="#F4F0EA" strokeOpacity="0.12" />
          <rect x="180" y="95" width="600" height="410" fill="#211F1C" stroke="#F4F0EA" strokeOpacity="0.22" />
          <polygon points="310,95 650,95 580,505 240,505" fill="#121110" stroke="#F4F0EA" strokeOpacity="0.28" />
          <line x1="70" y1="300" x2="890" y2="300" stroke="#F4F0EA" strokeOpacity="0.1" />
          <circle cx="480" cy="300" r="6" fill={accentColor} />
          <text x="96" y="84" fill="#F4F0EA" fillOpacity="0.55" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            {label}
          </text>
          <text x="96" y="532" fill="#F4F0EA" fillOpacity="0.4" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
            INDEX {index} // DUAL-VELOCITY SHUTTER STUDY
          </text>
        </svg>
      )}

      {motif === 'axis' && (
        <svg
          viewBox="0 0 640 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arch-plate__svg"
        >
          <rect width="640" height="800" fill="#1E1D1B" />
          <line x1="0" y1="200" x2="640" y2="200" stroke="#F4F0EA" strokeOpacity="0.12" />
          <line x1="0" y1="400" x2="640" y2="400" stroke="#F4F0EA" strokeOpacity="0.2" />
          <line x1="0" y1="600" x2="640" y2="600" stroke="#F4F0EA" strokeOpacity="0.12" />
          <line x1="320" y1="60" x2="320" y2="740" stroke={accentColor} strokeOpacity="0.65" />
          <rect x="110" y="140" width="420" height="520" stroke="#F4F0EA" strokeOpacity="0.18" />
          <text
            x="320"
            y="435"
            textAnchor="middle"
            fill="#F4F0EA"
            fillOpacity="0.86"
            fontSize="128"
            fontFamily="Instrument Serif, serif"
            fontStyle="italic"
          >
            Aa
          </text>
          <text x="130" y="176" fill="#F4F0EA" fillOpacity="0.5" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            {label}
          </text>
          <text x="130" y="640" fill="#F4F0EA" fillOpacity="0.4" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
            OPTICAL AXIS & PROPORTION SPECIMEN
          </text>
        </svg>
      )}

      {motif === 'strata' && (
        <svg
          viewBox="0 0 960 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arch-plate__svg"
        >
          <rect width="960" height="520" fill="#141413" />
          <rect x="80" y="60" width="800" height="400" stroke="#F4F0EA" strokeOpacity="0.14" />
          <path d="M80 340 Q 320 220, 520 310 T 880 240" stroke="#F4F0EA" strokeOpacity="0.32" strokeWidth="1.5" fill="none" />
          <path d="M80 380 Q 340 260, 540 350 T 880 290" stroke="#F4F0EA" strokeOpacity="0.18" strokeWidth="1" fill="none" />
          <path d="M80 290 Q 300 180, 500 260 T 880 190" stroke={accentColor} strokeOpacity="0.65" strokeWidth="1.2" fill="none" />
          <line x1="480" y1="60" x2="480" y2="460" stroke="#F4F0EA" strokeOpacity="0.12" strokeDasharray="4 6" />
          <text x="108" y="96" fill="#F4F0EA" fillOpacity="0.55" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            {label}
          </text>
          <text x="108" y="436" fill="#F4F0EA" fillOpacity="0.4" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
            ACOUSTIC & DAYLIGHT CONTOUR PLANES
          </text>
        </svg>
      )}

      {motif === 'monolith' && (
        <svg
          viewBox="0 0 800 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arch-plate__svg"
        >
          <rect width="800" height="640" fill="#1A1917" />
          <polygon points="180,120 460,80 460,520 180,560" fill="#252320" stroke="#F4F0EA" strokeOpacity="0.25" />
          <polygon points="340,150 620,110 620,510 340,550" fill="#121110" fillOpacity="0.88" stroke="#F4F0EA" strokeOpacity="0.32" />
          <line x1="120" y1="320" x2="680" y2="320" stroke={accentColor} strokeOpacity="0.6" />
          <text x="120" y="72" fill="#F4F0EA" fillOpacity="0.5" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            {label}
          </text>
          <text x="120" y="602" fill="#F4F0EA" fillOpacity="0.4" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
            PERSPECTIVE CATALOG PLANE // {index}
          </text>
        </svg>
      )}
    </div>
  );
};
