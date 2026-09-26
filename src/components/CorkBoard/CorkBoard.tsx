import React, { useState } from 'react';
import { MessageCard } from './MessageCard';
import type { BirthdayMessage } from '../../types';
import { Image, MessageSquare, Layers, Filter } from 'lucide-react';
import './CorkBoard.css';

interface CorkBoardProps {
  messages: BirthdayMessage[];
  isGloballyBlurred: boolean;
  onMediaClick: (message: BirthdayMessage, initialIndex?: number) => void;
  onOpenGuestForm: () => void;
}

type FilterType = 'all' | 'media' | 'notes';

export const CorkBoard: React.FC<CorkBoardProps> = ({
  messages,
  isGloballyBlurred,
  onMediaClick,
  onOpenGuestForm,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filtrer les messages masqués par l'admin et selon le filtre actif
  const visibleMessages = messages.filter((m) => {
    if (m.hidden) return false;
    if (activeFilter === 'media') return Boolean(m.mediaUrl);
    if (activeFilter === 'notes') return !m.mediaUrl;
    return true;
  });

  return (
    <main className="corkboard-container">
      {/* Cadre en bois naturel avec relief */}
      <div className="wooden-frame">
        {/* Surface en liège texturée */}
        <div className="cork-surface">
          {/* Barre d'outils et filtres du tableau */}
          <div className="corkboard-toolbar">
            <div className="filter-group">
              <span className="filter-label">
                <Filter size={14} />
                <span>Affichage :</span>
              </span>
              <button
                type="button"
                className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                <Layers size={14} />
                <span>Tous ({messages.filter((m) => !m.hidden).length})</span>
              </button>
              <button
                type="button"
                className={`filter-pill ${activeFilter === 'media' ? 'active' : ''}`}
                onClick={() => setActiveFilter('media')}
              >
                <Image size={14} />
                <span>Photos & Vidéos ({messages.filter((m) => !m.hidden && m.mediaUrl).length})</span>
              </button>
              <button
                type="button"
                className={`filter-pill ${activeFilter === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveFilter('notes')}
              >
                <MessageSquare size={14} />
                <span>Petits mots ({messages.filter((m) => !m.hidden && !m.mediaUrl).length})</span>
              </button>
            </div>
          </div>

          {/* Grille de cartes épinglées */}
          {visibleMessages.length > 0 ? (
            <div className="cork-grid">
              {visibleMessages.map((msg) => (
                <MessageCard
                  key={msg.id}
                  message={msg}
                  isGloballyBlurred={isGloballyBlurred}
                  onMediaClick={onMediaClick}
                />
              ))}
            </div>
          ) : (
            <div className="empty-corkboard">
              <div className="empty-postit">
                <div className="empty-pin" />
                <p className="empty-title">Le tableau est encore tout propre !</p>
                <p className="empty-sub">Soyez le premier ou la première à épingler votre souvenir d'anniversaire.</p>
                <button
                  type="button"
                  className="empty-cta"
                  onClick={onOpenGuestForm}
                >
                  ✏️ Épingler le premier mot
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
