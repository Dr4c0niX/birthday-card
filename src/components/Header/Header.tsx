import React from 'react';
import { Sparkles, Tv, PlusCircle, Lock, Calendar } from 'lucide-react';
import type { CountdownTime } from '../../types';
import './Header.css';

interface HeaderProps {
  countdown: CountdownTime;
  isSimulatedDayJ: boolean;
  isAdminAuthenticated: boolean;
  onToggleSimulatedDayJ: () => void;
  onOpenGuestForm: () => void;
  onOpenSlideshow: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  countdown,
  isSimulatedDayJ,
  isAdminAuthenticated,
  onToggleSimulatedDayJ,
  onOpenGuestForm,
  onOpenSlideshow,
  onOpenAdmin,
}) => {
  const isBirthdayDay = countdown.isExpired || isSimulatedDayJ;

  return (
    <header className="app-header">
      {/* Barre supérieure : actions et accès admin */}
      <div className="header-top-bar">
        <div className="header-actions-right header-actions-standalone">
          {/* Bouton simulation de date pour tester les deux modes (RESERVÉ À L'ADMINISTRATEUR) */}
          {isAdminAuthenticated && (
            <button
              type="button"
              className={`sim-toggle-btn ${isBirthdayDay ? 'active' : ''}`}
              onClick={onToggleSimulatedDayJ}
              title="[Mode Organisateur] Basculez entre le mode collecte et le mode Jour J"
            >
              <Sparkles size={14} />
              <span>[Admin] Mode : <strong>{isBirthdayDay ? 'Jour J (Célébration)' : 'Collecte (Avant 4 oct)'}</strong></span>
            </button>
          )}

          {/* Bouton Diaporama TV */}
          <button
            type="button"
            className="secondary-header-btn tv-btn"
            onClick={onOpenSlideshow}
            title="Lancer le diaporama plein écran pour la télévision"
          >
            <Tv size={16} />
            <span>Mode Diaporama</span>
          </button>

          {/* Accès discret Admin */}
          <button
            type="button"
            className={`admin-icon-btn ${isAdminAuthenticated ? 'logged-in' : ''}`}
            onClick={onOpenAdmin}
            title={isAdminAuthenticated ? "Administration (Connecté)" : "Panneau d'administration (Code PIN)"}
            aria-label="Accès administration"
          >
            <Lock size={15} />
            {isAdminAuthenticated && <span className="admin-status-dot" />}
          </button>
        </div>
      </div>

      {/* Titre principal et carte d'accueil */}
      <div className="hero-card">
        <div className="hero-title-group">
          <span className="party-icon">🚴‍♂️</span>
          <h1 className="hero-title">
            Joyeux 50ème Anniversaire Olivier !
          </h1>
          <span className="party-icon">🎂</span>
        </div>

        <p className="hero-subtitle">
          {isBirthdayDay
            ? "Joyeux 50 ans Olivier ! 🎉 Découvre tous les magnifiques souvenirs et petits mots d'amour préparés en secret par tes proches pour fêter ton demi-siècle !"
            : "Chaque proche muni de ce lien peut déposer un petit mot, une photo ou une vidéo souvenir pour célébrer les 50 ans d'Olivier. Tout est gardé secret jusqu'au 4 octobre !"}
        </p>

        {/* Section Compte à rebours OU Bandeau Célébration */}
        {!isBirthdayDay ? (
          <div className="countdown-container">
            <div className="countdown-header">
              <Calendar size={18} className="countdown-icon" />
              <span>Révélation des 50 ans dans :</span>
            </div>
            <div className="countdown-timer">
              <div className="countdown-unit">
                <span className="countdown-value">{countdown.days}</span>
                <span className="countdown-label">jours</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="countdown-label">heures</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">min</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">sec</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="birthday-banner">
            <Sparkles size={22} className="sparkle-anim" />
            <span className="birthday-banner-text">🎂 Joyeux 50 ans Olivier ! Tous les messages et souvenirs sont enfin révélés ! 🎉</span>
            <Sparkles size={22} className="sparkle-anim" />
          </div>
        )}

        {/* Bouton d'action principal */}
        <div className="hero-cta-container">
          {!isBirthdayDay ? (
            <button
              type="button"
              className="primary-cta-button"
              onClick={onOpenGuestForm}
            >
              <PlusCircle size={20} />
              <span>Ajoutes ton message</span>
            </button>
          ) : (
            <div className="form-closed-badge">
              <span>🎂 La boîte à souvenirs est fermée. Très bel anniversaire pour tes 50 ans Olivier !</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
