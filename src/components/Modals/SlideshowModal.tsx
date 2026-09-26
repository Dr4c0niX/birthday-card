import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getMessageMediaList, type BirthdayMessage } from '../../types';
import './SlideshowModal.css';

interface SlideshowModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: BirthdayMessage[];
}

export const SlideshowModal: React.FC<SlideshowModalProps> = ({
  isOpen,
  onClose,
  messages,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeMessages = messages.filter((m) => !m.hidden);

  const timerRef = useRef<number | null>(null);

  // Réinitialiser le sous-index média quand on change de diapositive
  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [currentIndex]);

  // Changement automatique de diapositive toutes les 7 secondes
  useEffect(() => {
    if (!isOpen || !isPlaying || activeMessages.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, activeMessages.length]);

  // Support des touches clavier (Flèches, Espace, Echap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + activeMessages.length) % activeMessages.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeMessages.length, onClose]);

  if (!isOpen || activeMessages.length === 0) return null;

  const current = activeMessages[currentIndex];
  const mediaList = getMessageMediaList(current);
  const activeMedia = mediaList[currentMediaIndex] || mediaList[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeMessages.length) % activeMessages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeMessages.length);
  };

  return (
    <div className="slideshow-backdrop">
      {/* Barre de contrôle supérieure */}
      <div className="slideshow-header">
        <div className="slideshow-counter">
          <span>{currentIndex + 1} / {activeMessages.length}</span>
        </div>

        <div className="slideshow-controls">
          <button
            type="button"
            className="slideshow-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            type="button"
            className="slideshow-btn close-slideshow"
            onClick={onClose}
            title="Quitter le plein écran"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Barre de progression du timer */}
      {isPlaying && (
        <div className="slideshow-progress-bar" key={currentIndex} />
      )}

      {/* Zone centrale de la diapositive */}
      <div className="slideshow-stage">
        <button
          type="button"
          className="slideshow-nav-btn prev-btn"
          onClick={handlePrev}
          aria-label="Souvenir précédent"
        >
          <ChevronLeft size={36} />
        </button>

        <div className="slideshow-card-container">
          <div className={`slideshow-card style-${current.style} color-${current.color}`}>
            {activeMedia ? (
              <div className="slideshow-media-section">
                {activeMedia.type === 'video' ? (
                  <video
                    key={activeMedia.url}
                    src={activeMedia.url}
                    className="slideshow-media-element"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    key={activeMedia.url}
                    src={activeMedia.url}
                    alt={current.author}
                    className="slideshow-media-element"
                  />
                )}

                {mediaList.length > 1 && (
                  <div className="slideshow-media-pills">
                    {mediaList.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`slideshow-media-dot ${idx === currentMediaIndex ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMediaIndex(idx);
                        }}
                        aria-label={`Photo ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            <div className="slideshow-text-section">
              <span className="slideshow-quote-mark">“</span>
              <p className="slideshow-quote">{current.content}</p>
              <div className="slideshow-author-badge">
                <span className="author-name">— {current.author}</span>
                {mediaList.length > 1 && (
                  <span className="slideshow-count-badge">
                    <Images size={14} />
                    <span>{mediaList.length} souvenirs</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="slideshow-nav-btn next-btn"
          onClick={handleNext}
          aria-label="Souvenir suivant"
        >
          <ChevronRight size={36} />
        </button>
      </div>

      {/* Raccourcis clavier d'aide */}
      <div className="slideshow-footer-hint">
        <span>Espace pour Pause/Lecture • Flèches pour naviguer • Échap pour quitter</span>
      </div>
    </div>
  );
};
