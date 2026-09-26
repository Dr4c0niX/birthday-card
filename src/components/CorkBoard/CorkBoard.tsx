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

  const visibleMessages = messages.filter((m) => {
    if (m.hidden) return false;
    if (activeFilter === 'media') return Boolean(m.mediaUrl || (m.mediaList && m.mediaList.length > 0));
    if (activeFilter === 'notes') return !m.mediaUrl && (!m.mediaList || m.mediaList.length === 0);
    return true;
  });

  return (
    <main className="corkboard-container">
      {/* Cadre en bois naturel avec relief */}
      <div className="wooden-frame">
        {/* Surface en liège texturée */}
        <div className="cork-surface">
          {/* Haut du tableau : Dossard officiel de course d'Olivier & Barre d'outils */}
          <div className="corkboard-top-section">
            {/* Dossard officiel de vélo d'Olivier épinglé */}
            <div className="vintage-race-bib" title="Dossard officiel de course d'Olivier">
              <div className="bib-pin pin-tl" />
              <div className="bib-pin pin-tr" />
              <div className="bib-header">
                <span className="bib-stars">★ ★ ★</span>
                <span>TOUR DES 50 ANS • ÉTAPE DU 4 OCTOBRE</span>
                <span className="bib-stars">★ ★ ★</span>
              </div>
              <div className="bib-body">
                <span className="bib-bike-icon">🚴‍♂️</span>
                <span className="bib-number">50</span>
                <span className="bib-trophy-icon">🏆</span>
              </div>
            </div>

            {/* Filtres d'affichage */}
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
                  <span>Photos & Vidéos ({messages.filter((m) => !m.hidden && (m.mediaUrl || (m.mediaList && m.mediaList.length > 0))).length})</span>
                </button>
                <button
                  type="button"
                  className={`filter-pill ${activeFilter === 'notes' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('notes')}
                >
                  <MessageSquare size={14} />
                  <span>Petits mots ({messages.filter((m) => !m.hidden && !m.mediaUrl && (!m.mediaList || m.mediaList.length === 0)).length})</span>
                </button>
              </div>
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
                <p className="empty-title">Le peloton est en route ! 🚴‍♂️</p>
                <p className="empty-sub">Soyez le premier ou la première à déposer un mot d'encouragement pour Olivier.</p>
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
