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

      {/* Montgolfières poétiques flottant dans le ciel */}
      <div className="hot-air-balloon balloon-1" title="Montgolfière dans le ciel">
        <svg viewBox="0 0 50 70" width="48" height="66" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="balloonGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M25,2 C38,2 48,15 46,30 C44,40 33,48 29,52 L21,52 C17,48 6,40 4,30 C2,15 12,2 25,2 Z" fill="url(#balloonGrad1)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
          <path d="M17,3 C12,16 13,38 21,52 L29,52 C37,38 38,16 33,3 Z" fill="#ffffff" opacity="0.4" />
          <path d="M21,3 C18,16 18,38 23,52 L27,52 C32,38 32,16 29,3 Z" fill="#ef4444" opacity="0.45" />
          <line x1="21" y1="52" x2="22" y2="58" stroke="#78350f" strokeWidth="1" />
          <line x1="29" y1="52" x2="28" y2="58" stroke="#78350f" strokeWidth="1" />
          <rect x="21" y="58" width="8" height="6" rx="1.5" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="hot-air-balloon balloon-2" title="Montgolfière lointaine">
        <svg viewBox="0 0 50 70" width="32" height="44" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="balloonGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M25,2 C38,2 48,15 46,30 C44,40 33,48 29,52 L21,52 C17,48 6,40 4,30 C2,15 12,2 25,2 Z" fill="url(#balloonGrad2)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.12))" />
          <path d="M17,3 C12,16 13,38 21,52 L29,52 C37,38 38,16 33,3 Z" fill="#ffffff" opacity="0.45" />
          <line x1="21" y1="52" x2="22" y2="58" stroke="#64748b" strokeWidth="0.8" />
          <line x1="29" y1="52" x2="28" y2="58" stroke="#64748b" strokeWidth="0.8" />
          <rect x="21" y="58" width="8" height="6" rx="1.5" fill="#a16207" stroke="#78350f" strokeWidth="0.8" />
        </svg>
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

      {/* SVG des collines verdoyantes, des montagnes, de la route et du décor cycliste */}
      <svg
        className="landscape-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dégradés du paysage */}
          <linearGradient id="mountainFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b4cdef" />
            <stop offset="60%" stopColor="#9bbbe2" />
            <stop offset="100%" stopColor="#82a8d6" />
          </linearGradient>
          <linearGradient id="hillFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a5d187" />
            <stop offset="100%" stopColor="#7ba860" />
          </linearGradient>
          <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7bb258" />
            <stop offset="100%" stopColor="#558a36" />
          </linearGradient>
          <linearGradient id="hillNear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5e9b3d" />
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
          <linearGradient id="lavenderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="wheatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>

        {/* 1. CHAÎNE DE MONTAGNES LOINTAINES (Massif alpin / horizon brumeux) */}
        <path
          d="M0,450 L90,395 L160,420 L270,355 L360,405 L490,320 L590,390 L710,335 L840,400 L950,325 L1060,380 L1190,335 L1320,395 L1440,360 L1440,900 L0,900 Z"
          fill="url(#mountainFar)"
          opacity="0.6"
        />
        {/* Cimes avec reflets / crêtes ensoleillées */}
        <polygon points="270,355 250,380 290,380" fill="#ffffff" opacity="0.6" />
        <polygon points="490,320 465,350 515,350" fill="#ffffff" opacity="0.7" />
        <polygon points="710,335 690,360 730,360" fill="#ffffff" opacity="0.6" />
        <polygon points="950,325 925,355 975,355" fill="#ffffff" opacity="0.7" />
        <polygon points="1190,335 1165,365 1215,365" fill="#ffffff" opacity="0.6" />

        {/* 2. COLLINES D'ARRIÈRE-PLAN */}
        <path
          d="M0,480 Q320,380 640,430 T1280,390 Q1380,410 1440,430 L1440,900 L0,900 Z"
          fill="url(#hillFar)"
          opacity="0.9"
        />

        {/* PARCELLE DE CHAMP DE BLÉ DORÉ SUR LA COLLINE DE DROITE */}
        <path
          d="M930,440 Q1060,410 1200,430 L1180,485 Q1040,470 910,490 Z"
          fill="url(#wheatGrad)"
          opacity="0.85"
        />
        {/* Sillons du champ de blé */}
        <path d="M940,445 Q1060,420 1190,440" stroke="#ca8a04" strokeWidth="1.2" strokeDasharray="6 4" fill="none" opacity="0.7" />
        <path d="M930,460 Q1050,435 1180,455" stroke="#ca8a04" strokeWidth="1.2" strokeDasharray="6 4" fill="none" opacity="0.7" />
        <path d="M920,475 Q1040,450 1170,470" stroke="#ca8a04" strokeWidth="1.2" strokeDasharray="6 4" fill="none" opacity="0.7" />

        {/* BOTTES DE FOIN RONDES 3D DANS LE CHAMP */}
        <g className="hay-bales" transform="translate(1010, 450)">
          <ellipse cx="0" cy="5" rx="8" ry="5.5" fill="#ca8a04" />
          <ellipse cx="-2" cy="5" rx="6.5" ry="5" fill="#eab308" />
          <ellipse cx="-4" cy="5" rx="4" ry="4" fill="#facc15" />

          <ellipse cx="40" cy="18" rx="9" ry="6" fill="#ca8a04" />
          <ellipse cx="38" cy="18" rx="7.5" ry="5.5" fill="#eab308" />
          <ellipse cx="36" cy="18" rx="4.5" ry="4.5" fill="#facc15" />

          <ellipse cx="85" cy="8" rx="7.5" ry="5" fill="#ca8a04" />
          <ellipse cx="83" cy="8" rx="6" ry="4.5" fill="#eab308" />
          <ellipse cx="81" cy="8" rx="3.5" ry="3.5" fill="#facc15" />
        </g>

        {/* PARCELLE DE LAVANDE DE PROVENCE SUR LA COLLINE */}
        <path
          d="M380,450 Q480,425 570,440 L550,485 Q460,475 360,490 Z"
          fill="url(#lavenderGrad)"
          opacity="0.8"
        />
        {/* Rangées violettes de lavande parfumée */}
        <path d="M390,455 Q480,433 560,448" stroke="#5b21b6" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.8" />
        <path d="M380,465 Q470,445 550,460" stroke="#5b21b6" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.8" />
        <path d="M370,475 Q460,458 540,472" stroke="#5b21b6" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.8" />

        {/* VILLAGE PERCHÉ TRADITIONNEL AVEC CLOCHER & CYPRÈS */}
        <g className="hilltop-village" transform="translate(140, 415)">
          {/* Cyprès d'Italie élancés */}
          <path d="M-15,42 Q-17,18 -15,10 Q-13,18 -15,42 Z" fill="#1b431e" />
          <path d="M-7,45 Q-9,22 -7,16 Q-5,22 -7,45 Z" fill="#235327" />
          {/* Petites maisons en pierre ocre */}
          <rect x="0" y="26" width="16" height="18" fill="#fef3c7" stroke="#e2e8f0" strokeWidth="0.5" />
          <polygon points="-2,26 8,16 18,26" fill="#ea580c" />
          <rect x="4" y="32" width="4" height="6" rx="1" fill="#78350f" />

          <rect x="15" y="22" width="20" height="22" fill="#fffbeb" stroke="#e2e8f0" strokeWidth="0.5" />
          <polygon points="13,22 25,12 37,22" fill="#c2410c" />
          <rect x="21" y="28" width="4" height="4" fill="#334155" />

          {/* Clocher d'église de village */}
          <rect x="34" y="8" width="13" height="36" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5" />
          <polygon points="32,8 40.5,-6 49,8" fill="#9a3412" />
          <line x1="40.5" y1="-6" x2="40.5" y2="-10" stroke="#b45309" strokeWidth="1" />
          <line x1="38.5" y1="-8" x2="42.5" y2="-8" stroke="#b45309" strokeWidth="1" />
          <rect x="37.5" y="14" width="6" height="8" rx="3" fill="#1e293b" />
          <circle cx="40.5" cy="18" r="1.6" fill="#f59e0b" />

          <rect x="46" y="24" width="16" height="20" fill="#fef3c7" />
          <polygon points="44,24 54,16 64,24" fill="#ea580c" />

          {/* Cyprès à droite du village */}
          <path d="M66,42 Q64,20 66,12 Q68,20 66,42 Z" fill="#1b431e" />
          <path d="M73,45 Q71,28 73,20 Q75,28 73,45 Z" fill="#235327" />
        </g>

        {/* MOULIN À VENT TRADITIONNEL AVEC PALES ROTATIVES */}
        <g className="traditional-windmill" transform="translate(1335, 370)">
          <path d="M-8,32 L-5,0 L5,0 L8,32 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
          <polygon points="-7,0 0,-9 7,0" fill="#9a3412" />
          <rect x="-2.5" y="20" width="5" height="12" rx="1.5" fill="#78350f" />
          <circle cx="0" cy="8" r="2" fill="#334155" />
          <circle cx="0" cy="0" r="2.5" fill="#475569" />
          {/* Pales tournantes */}
          <g className="windmill-sails">
            <line x1="0" y1="0" x2="0" y2="-24" stroke="#475569" strokeWidth="1.2" />
            <rect x="1" y="-23" width="5" height="20" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="0.5" />

            <line x1="0" y1="0" x2="24" y2="0" stroke="#475569" strokeWidth="1.2" />
            <rect x="3" y="1" width="20" height="5" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="0.5" />

            <line x1="0" y1="0" x2="0" y2="24" stroke="#475569" strokeWidth="1.2" />
            <rect x="-6" y="3" width="5" height="20" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="0.5" />

            <line x1="0" y1="0" x2="-24" y2="0" stroke="#475569" strokeWidth="1.2" />
            <rect x="-23" y="-6" width="20" height="5" fill="#ffffff" opacity="0.85" stroke="#94a3b8" strokeWidth="0.5" />
          </g>
        </g>

        {/* 3. COLLINES DE SECOND PLAN */}
        <path
          d="M0,520 Q240,460 520,510 T1040,470 Q1240,450 1440,510 L1440,900 L0,900 Z"
          fill="url(#hillMid)"
        />

        {/* VIGNOBLE EN RANGÉES SUR LE VERSANT GAUCHE */}
        <g className="vineyard-rows" stroke="#365314" strokeWidth="1.8" strokeDasharray="8 5" opacity="0.65">
          <line x1="30" y1="525" x2="160" y2="505" />
          <line x1="25" y1="535" x2="170" y2="515" />
          <line x1="20" y1="545" x2="180" y2="525" />
          <line x1="15" y1="555" x2="190" y2="535" />
        </g>

        {/* Cycliste animé au loin pédalant sur la crête des collines */}
        <g className="cyclist-distant">
          {/* Roues */}
          <circle cx="0" cy="0" r="5" fill="none" stroke="#1f2937" strokeWidth="1.2" />
          <circle cx="14" cy="0" r="5" fill="none" stroke="#1f2937" strokeWidth="1.2" />
          {/* Cadre de vélo */}
          <path d="M0,0 L7,0 L12,-6 L5,-6 Z" fill="none" stroke="#eab308" strokeWidth="1.2" />
          <line x1="7" y1="0" x2="6" y2="-9" stroke="#eab308" strokeWidth="1.2" />
          <line x1="14" y1="0" x2="11" y2="-8" stroke="#1f2937" strokeWidth="1.2" />
          {/* Guidon et selle */}
          <line x1="4" y1="-9" x2="8" y2="-9" stroke="#334155" strokeWidth="1.5" />
          <path d="M10,-8 Q13,-10 12,-7" fill="none" stroke="#334155" strokeWidth="1.2" />
          {/* Silhouette du cycliste avec maillot à pois / jaune */}
          <circle cx="7" cy="-15" r="2.5" fill="#facc15" />
          <path d="M7,-12 L10,-7 L11,-8 L8,-12 Z" fill="#ef4444" />
        </g>

        {/* Bosquets d'arbres ronds cartoon sur les collines */}
        <g className="trees-distant" fill="#2d5219">
          <circle cx="210" cy="485" r="22" />
          <circle cx="230" cy="475" r="28" />
          <circle cx="255" cy="485" r="20" />
          <circle cx="680" cy="485" r="16" />
          <circle cx="700" cy="475" r="22" />
          <circle cx="720" cy="485" r="15" />
          <circle cx="890" cy="460" r="18" />
          <circle cx="910" cy="450" r="24" />
          <circle cx="930" cy="460" r="16" />
        </g>

        {/* 4. COLLINES DE PREMIER PLAN */}
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

        {/* Muret en pierres sèches sur le bas-côté droit */}
        <g className="stone-wall" fill="#94a3b8" stroke="#475569" strokeWidth="1">
          <rect x="760" y="650" width="22" height="10" rx="3" fill="#cbd5e1" />
          <rect x="780" y="648" width="24" height="12" rx="3" fill="#94a3b8" />
          <rect x="802" y="652" width="20" height="9" rx="2" fill="#cbd5e1" />
          <rect x="770" y="660" width="26" height="10" rx="3" fill="#64748b" />
          <rect x="794" y="659" width="25" height="11" rx="3" fill="#94a3b8" />
        </g>

        {/* Grand chêne champêtre majestueux sur la droite */}
        <g className="roadside-oak" transform="translate(1310, 640)">
          {/* Tronc noueux */}
          <path d="M20,120 Q15,60 30,20 Q45,60 40,120 Z" fill="#583111" stroke="#3e220a" strokeWidth="2" />
          {/* Branches */}
          <path d="M28,40 Q10,15 0,0" stroke="#583111" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M32,35 Q50,15 65,0" stroke="#583111" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Feuillage dense en couches */}
          <circle cx="28" cy="15" r="42" fill="#2d5219" opacity="0.95" />
          <circle cx="-5" cy="5" r="32" fill="#366620" />
          <circle cx="60" cy="5" r="34" fill="#3f7526" />
          <circle cx="25" cy="-20" r="38" fill="#4d8c30" />
          <circle cx="10" cy="-35" r="28" fill="#5ea53c" />
          <circle cx="45" cy="-30" r="26" fill="#6ab844" />
        </g>

        {/* Barrière en bois de campagne sur le bord de route */}
        <g stroke="#6e4f2b" strokeWidth="4" strokeLinecap="round">
          <line x1="530" y1="840" x2="530" y2="880" />
          <line x1="470" y1="850" x2="470" y2="890" />
          <line x1="450" y1="860" x2="550" y2="850" />
          <line x1="450" y1="875" x2="550" y2="865" />
        </g>

        {/* --- VÉLO VINTAGE RETRO appuyé contre la barrière --- */}
        <g className="vintage-bike" transform="translate(480, 835)">
          {/* Ombre portée au sol */}
          <ellipse cx="25" cy="46" rx="35" ry="4" fill="rgba(0,0,0,0.25)" />
          {/* Roue Arrière */}
          <circle cx="5" cy="38" r="14" fill="none" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="5" cy="38" r="12" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="5" cy="38" r="2.5" fill="#475569" />
          {/* Roue Avant */}
          <circle cx="45" cy="38" r="14" fill="none" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="45" cy="38" r="12" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="45" cy="38" r="2.5" fill="#475569" />
          {/* Cadre de course Vintage (Jaune Champion) */}
          <path d="M5,38 L22,38 L38,20 L16,20 Z" fill="none" stroke="#eab308" strokeWidth="2.8" strokeLinecap="round" />
          {/* Tube de selle et haubans */}
          <line x1="5" y1="38" x2="16" y2="20" stroke="#ca8a04" strokeWidth="2.2" />
          <line x1="22" y1="38" x2="15" y2="15" stroke="#eab308" strokeWidth="2.5" />
          {/* Fourche avant */}
          <line x1="45" y1="38" x2="38" y2="17" stroke="#ca8a04" strokeWidth="2.5" />
          {/* Selle en cuir vintage */}
          <path d="M11,15 Q15,13 20,15 L18,17 Q15,16 12,17 Z" fill="#78350f" />
          {/* Guidon course cintré */}
          <path d="M37,17 L40,15 Q43,15 42,19 Q41,22 38,21" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
          {/* Gourde rétro sur le cadre */}
          <rect x="23" y="27" width="5" height="9" rx="2" fill="#ef4444" transform="rotate(-30 23 27)" />
        </g>

        {/* GRANDS TOURNESOLS ÉPANOOUIS EN BORD DE ROUTE */}
        <g className="sunflowers" transform="translate(425, 825)">
          {/* Tournesol 1 */}
          <path d="M0,45 Q-3,25 0,0" stroke="#4d7c0f" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="0" r="10" fill="#facc15" stroke="#eab308" strokeWidth="1" />
          <circle cx="0" cy="0" r="5" fill="#78350f" />
          {/* Feuilles */}
          <path d="M-2,25 Q-12,20 -15,16 Q-8,28 -2,28 Z" fill="#65a30d" />
          
          {/* Tournesol 2 */}
          <path d="M18,48 Q22,28 16,5" stroke="#4d7c0f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="16" cy="5" r="8" fill="#facc15" stroke="#eab308" strokeWidth="1" />
          <circle cx="16" cy="5" r="4" fill="#78350f" />
          <path d="M19,25 Q28,22 32,18 Q25,29 19,29 Z" fill="#65a30d" />
        </g>

        {/* --- BORNE KILOMÉTRIQUE DE COL CYCLISTE sur le bas-côté --- */}
        <g className="mountain-pass-milestone" transform="translate(860, 810)">
          {/* Ombre au sol */}
          <ellipse cx="22" cy="65" rx="18" ry="4" fill="rgba(0,0,0,0.25)" />
          {/* Corps de la borne */}
          <path
            d="M8,22 Q22,8 36,22 L36,65 L8,65 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Chapeau jaune Tour de France / Col */}
          <path
            d="M8,22 Q22,8 36,22 L36,26 L8,26 Z"
            fill="#eab308"
          />
          {/* Gravure du Col */}
          <text x="22" y="38" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0f172a" fontFamily="'Outfit', sans-serif">
            COL DU
          </text>
          <text x="22" y="47" textAnchor="middle" fontSize="7" fontWeight="900" fill="#b45309" fontFamily="'Outfit', sans-serif">
            4 OCT.
          </text>
          <text x="22" y="56" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#15803d" fontFamily="'Outfit', sans-serif">
            50 ANS
          </text>
        </g>

        {/* TOURNESOLS À CÔTÉ DE LA BORNE KILOMÉTRIQUE */}
        <g className="sunflowers" transform="translate(905, 830)">
          <path d="M0,40 Q4,20 0,0" stroke="#4d7c0f" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="0" r="9" fill="#facc15" stroke="#eab308" strokeWidth="1" />
          <circle cx="0" cy="0" r="4.5" fill="#78350f" />
          <path d="M2,22 Q10,18 14,14 Q8,24 2,24 Z" fill="#65a30d" />
        </g>

        {/* Petites marguerites, coquelicots et fleurs champêtres au premier plan */}
        <g className="wildflowers">
          {/* Coquelicots rouges vifs */}
          <circle cx="360" cy="860" r="4" fill="#ef4444" />
          <circle cx="360" cy="860" r="1.5" fill="#0f172a" />
          <circle cx="430" cy="865" r="4.5" fill="#ef4444" />
          <circle cx="430" cy="865" r="1.5" fill="#0f172a" />
          <circle cx="950" cy="875" r="4" fill="#ef4444" />
          <circle cx="950" cy="875" r="1.5" fill="#0f172a" />

          {/* Marguerites blanches et dorées */}
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

      {/* Papillons voltigeant gracieusement près des fleurs */}
      <div className="butterfly butterfly-1" title="Papillon d'été">
        <span className="wing wing-left"></span>
        <span className="wing wing-right"></span>
      </div>
      <div className="butterfly butterfly-2" title="Papillon d'été">
        <span className="wing wing-left"></span>
        <span className="wing wing-right"></span>
      </div>

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
