import React from 'react';
import './CountryRoadBackground.css';

export const CountryRoadBackground: React.FC = () => {
  return (
    <div className="bucolic-background" aria-hidden="true">
      {/* Ciel et dégradé solaire */}
      <div className="sky-gradient" />

      {/* Soleil doux et rayons */}
      <div className="sun-container">
        <div className="sun-glow" />
        <div className="sun-core" />
      </div>

      {/* Nuages animés qui défilent */}
      <div className="cloud-layer">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud cloud-5" />
      </div>

      {/* Oiseaux lointains dans le ciel */}
      <div className="birds-container">
        <span className="bird bird-1"></span>
        <span className="bird bird-2"></span>
        <span className="bird bird-3"></span>
      </div>

      {/* SVG des collines verdoyantes et de la route de campagne */}
      <svg
        className="landscape-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hillFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9cc97f" />
            <stop offset="100%" stopColor="#7ba860" />
          </linearGradient>
          <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#75aa54" />
            <stop offset="100%" stopColor="#558a36" />
          </linearGradient>
          <linearGradient id="hillNear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5c963a" />
            <stop offset="100%" stopColor="#437726" />
          </linearGradient>
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c5b293" />
            <stop offset="100%" stopColor="#a38c6b" />
          </linearGradient>
          <linearGradient id="roadEdge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#879958" />
            <stop offset="100%" stopColor="#677b3b" />
          </linearGradient>
        </defs>

        {/* Collines d'arrière-plan */}
        <path
          d="M0,480 Q320,380 640,430 T1280,390 Q1380,410 1440,430 L1440,900 L0,900 Z"
          fill="url(#hillFar)"
          opacity="0.85"
        />

        {/* Collines de second plan */}
        <path
          d="M0,520 Q240,460 520,510 T1040,470 Q1240,450 1440,510 L1440,900 L0,900 Z"
          fill="url(#hillMid)"
        />

        {/* Petits bosquets d'arbres ronds cartoon sur les collines */}
        <g className="trees-distant" fill="#3d6c25">
          <circle cx="210" cy="485" r="22" />
          <circle cx="230" cy="475" r="28" />
          <circle cx="255" cy="485" r="20" />
          <circle cx="890" cy="460" r="18" />
          <circle cx="910" cy="450" r="24" />
          <circle cx="930" cy="460" r="16" />
          <circle cx="1200" cy="445" r="20" />
          <circle cx="1225" cy="435" r="26" />
        </g>

        {/* Collines de premier plan */}
        <path
          d="M0,600 Q360,540 720,620 T1440,580 L1440,900 L0,900 Z"
          fill="url(#hillNear)"
        />

        {/* Accotements d'herbe de la route de campagne */}
        <path
          d="M680,570 Q690,660 620,770 Q560,850 490,900 L950,900 Q880,850 820,770 Q750,660 740,570 Z"
          fill="url(#roadEdge)"
        />

        {/* La route de campagne sinueuse qui s'éloigne vers l'horizon */}
        <path
          d="M690,575 Q700,660 635,770 Q580,850 520,900 L920,900 Q860,850 805,770 Q740,660 730,575 Z"
          fill="url(#roadGrad)"
        />

        {/* Lignes de terre / gravillons sur la route de campagne */}
        <path
          d="M710,580 Q720,660 670,770 Q630,830 590,900"
          stroke="#7f694c"
          strokeWidth="3"
          strokeDasharray="16 12"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M715,580 Q725,660 770,770 Q810,830 850,900"
          stroke="#7f694c"
          strokeWidth="3"
          strokeDasharray="16 12"
          fill="none"
          opacity="0.6"
        />

        {/* Barrière en bois de campagne sur le bord de route */}
        <g stroke="#6e4f2b" strokeWidth="4" strokeLinecap="round">
          {/* Piquets */}
          <line x1="530" y1="840" x2="530" y2="880" />
          <line x1="470" y1="850" x2="470" y2="890" />
          {/* Lisses horizontales */}
          <line x1="450" y1="860" x2="550" y2="850" />
          <line x1="450" y1="875" x2="550" y2="865" />
        </g>

        {/* Petites marguerites et fleurs champêtres au premier plan */}
        <g className="wildflowers">
          <circle cx="380" cy="850" r="4" fill="#ffffff" />
          <circle cx="380" cy="850" r="2" fill="#ffd152" />
          <circle cx="395" cy="860" r="3.5" fill="#ffffff" />
          <circle cx="395" cy="860" r="1.5" fill="#ffd152" />
          <circle cx="410" cy="845" r="4" fill="#ff9ebb" />
          <circle cx="980" cy="860" r="4.5" fill="#ffffff" />
          <circle cx="980" cy="860" r="2" fill="#ffd152" />
          <circle cx="1020" cy="870" r="4" fill="#ffd152" />
          <circle cx="1040" cy="855" r="3.5" fill="#ff9ebb" />
        </g>
      </svg>

      {/* Particules légères de vent et pétales dans la brise */}
      <div className="breeze-particles">
        <span className="particle p-1"></span>
        <span className="particle p-2"></span>
        <span className="particle p-3"></span>
        <span className="particle p-4"></span>
        <span className="particle p-5"></span>
      </div>
    </div>
  );
};
