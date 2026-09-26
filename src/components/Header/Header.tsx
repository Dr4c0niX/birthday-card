import React from 'react';
import { Calendar, Sparkles, Tv, PlusCircle, Lock, ShieldCheck } from 'lucide-react';
import type { CountdownTime } from '../../types';
import './Header.css';

interface HeaderProps {
  countdown: CountdownTime;
  isSimulatedDayJ: boolean;
  onToggleSimulatedDayJ: () => void;
  onOpenGuestForm: () => void;
  onOpenSlideshow: () => void;
  onOpenAdmin: () => void;
  messageCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  countdown,
  isSimulatedDayJ,
  onToggleSimulatedDayJ,
  onOpenGuestForm,
  onOpenSlideshow,
  onOpenAdmin,
  messageCount,
}) => {
  const isBirthdayDay = countdown.isExpired || isSimulatedDayJ;

  return (
    <header className="app-header">
      {/* Barre supérieure : stats discrètes, switch de test et accès admin */}
      <div className="header-top-bar">
        <div className="status-badge">
          <span className="pulse-dot"></span>
          <span className="badge-text">{messageCount} souvenirs épinglés</span>
        </div>

        <div className="header-actions-right">
          {/* Bouton simulation de date pour tester les deux modes */}
          <button
            type="button"
            className={`sim-toggle-btn ${isBirthdayDay ? 'active' : ''}`}
            onClick={onToggleSimulatedDayJ}
            title="Basculez entre le mode collecte (avant le 4 oct) et le mode Jour J"
          >
            <Sparkles size={14} />
            <span>Mode : <strong>{isBirthdayDay ? 'Jour J (Célébration)' : 'Avant le 4 oct (Collecte)'}</strong></span>
          </button>

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
            className="admin-icon-btn"
            onClick={onOpenAdmin}
            title="Panneau d'administration (Code PIN)"
            aria-label="Accès administration"
          >
            <Lock size={15} />
          </button>
        </div>
      </div>

      {/* Titre principal et carte d'accueil */}
      <div className="hero-card">
        <div className="hero-title-group">
          <span className="party-icon">🎈</span>
          <h1 className="hero-title">
            Joyeux Anniversaire Papa !
          </h1>
          <span className="party-icon">🎂</span>
        </div>

        <p className="hero-subtitle">
          {isBirthdayDay
            ? "C'est le grand jour ! Voici tous les mots chaleureux, anecdotes et photos souvenirs préparés en secret par tes proches."
            : "Chaque proche muni de ce lien peut déposer un petit mot, une photo ou une vidéo. Les messages sont gardés secrets jusqu'au 4 octobre !"}
        </p>

        {/* Section Compte à rebours OU Bandeau Célébration */}
        {!isBirthdayDay ? (
          <div className="countdown-container">
            <div className="countdown-header">
              <Calendar size={18} className="countdown-icon" />
              <span>Grande révélation dans :</span>
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
            <span className="birthday-banner-text">✨ C'est aujourd'hui ! Tous les vœux sont désormais révélés ! ✨</span>
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
              <span>Épingler un mot ou une photo</span>
            </button>
          ) : (
            <div className="form-closed-badge">
              <ShieldCheck size={18} />
              <span>La boîte à souvenirs est maintenant fermée. Profite bien de ta journée Papa !</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
