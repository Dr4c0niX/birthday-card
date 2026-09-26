import React, { useState, useEffect } from 'react';
import { X, Calendar, User, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { getMessageMediaList, type BirthdayMessage } from '../../types';
import './MediaViewModal.css';

interface MediaViewModalProps {
  message: BirthdayMessage | null;
  initialIndex?: number;
  onClose: () => void;
}

export const MediaViewModal: React.FC<MediaViewModalProps> = ({
  message,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Synchroniser l'index lors de l'ouverture
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, message]);

  // Support des touches clavier (Flèches et Échap)
  useEffect(() => {
    if (!message) return;

    const mediaList = getMessageMediaList(message);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && mediaList.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % mediaList.length);
      } else if (e.key === 'ArrowLeft' && mediaList.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [message, onClose]);

  if (!message) return null;

  const mediaList = getMessageMediaList(message);
  const currentMedia = mediaList[currentIndex] || mediaList[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const formattedDate = new Date(message.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="media-modal-backdrop" onClick={onClose}>
      <div className="media-modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="media-close-btn" onClick={onClose} aria-label="Fermer">
          <X size={22} />
        </button>

        {/* Zone d'affichage du média actif */}
        <div className="media-display-area">
          {mediaList.length > 1 && (
            <button
              type="button"
              className="media-view-nav-btn prev"
              onClick={handlePrev}
              aria-label="Média précédent"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {currentMedia?.type === 'video' ? (
            <video
              key={currentMedia.url}
              src={currentMedia.url}
              className="media-modal-player"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              key={currentMedia?.url}
              src={currentMedia?.url}
              alt={`Souvenir de ${message.author}`}
              className="media-modal-image"
            />
          )}

          {mediaList.length > 1 && (
            <button
              type="button"
              className="media-view-nav-btn next"
              onClick={handleNext}
              aria-label="Média suivant"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Galerie miniature si plusieurs photos/vidéos */}
        {mediaList.length > 1 && (
          <div className="media-modal-filmstrip">
            {mediaList.map((item, idx) => (
              <button
                key={item.url + idx}
                type="button"
                className={`filmstrip-thumb ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {item.type === 'video' ? (
                  <div className="filmstrip-video-placeholder">
                    <Film size={16} />
                  </div>
                ) : (
                  <img src={item.url} alt={`Miniature ${idx + 1}`} />
                )}
              </button>
            ))}
            <span className="filmstrip-counter">
              {currentIndex + 1} / {mediaList.length}
            </span>
          </div>
        )}

        {/* Légende et informations */}
        <div className="media-modal-info">
          <div className="media-modal-header">
            <span className="media-modal-author">
              <User size={16} />
              <span>{message.author}</span>
            </span>
            <span className="media-modal-date">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </span>
          </div>

          <p className="media-modal-caption">{message.content}</p>
        </div>
      </div>
    </div>
  );
};
