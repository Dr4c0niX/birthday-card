import React, { useState } from 'react';
import { Eye, EyeOff, Play, ZoomIn, Heart, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getMessageMediaList, type BirthdayMessage } from '../../types';
import './MessageCard.css';

interface MessageCardProps {
  message: BirthdayMessage;
  isGloballyBlurred: boolean;
  onMediaClick: (message: BirthdayMessage, initialIndex?: number) => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isGloballyBlurred,
  onMediaClick,
}) => {
  const [isIndividuallyRevealed, setIsIndividuallyRevealed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const isBlurred = isGloballyBlurred && !isIndividuallyRevealed;
  const mediaList = getMessageMediaList(message);
  const hasMedia = mediaList.length > 0;
  const isPolaroid = message.style === 'polaroid' && hasMedia;
  const currentMedia = mediaList[currentMediaIndex] || mediaList[0];

  const toggleReveal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsIndividuallyRevealed((prev) => !prev);
  };

  const handleMediaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBlurred) {
      setIsIndividuallyRevealed(true);
      return;
    }
    onMediaClick(message, currentMediaIndex);
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const formattedDate = new Date(message.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <article
      className={`cork-card-wrapper style-${message.style} color-${message.color} ${isBlurred ? 'is-blurred' : 'is-revealed'}`}
      style={{
        '--card-rotation': `${message.rotation ?? 0}deg`,
      } as React.CSSProperties}
    >
      {/* Punaise réaliste en relief */}
      <div className={`pushpin pin-${message.pinColor || 'red'}`} aria-hidden="true">
        <div className="pin-head">
          <div className="pin-highlight" />
        </div>
        <div className="pin-shadow" />
      </div>

      {/* Washi tape optionnel */}
      {message.tapeStyle && (
        <div className={`washi-tape tape-${message.tapeStyle}`} aria-hidden="true" />
      )}

      {/* Carte Polaroid */}
      {isPolaroid ? (
        <div className="polaroid-card">
          <div className="polaroid-media-container" onClick={handleMediaClick}>
            {currentMedia?.type === 'video' ? (
              <div className="polaroid-video-wrapper">
                <video
                  src={currentMedia.url}
                  className="polaroid-media"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="video-play-badge">
                  <Play size={20} fill="#ffffff" />
                  <span>Vidéo</span>
                </div>
              </div>
            ) : (
              <img
                src={currentMedia?.url}
                alt={`Photo souvenir de ${message.author}`}
                className="polaroid-media"
                loading="lazy"
              />
            )}

            {/* Badge multi-médias si plusieurs fichiers */}
            {mediaList.length > 1 && (
              <div className="multi-media-badge" title={`${mediaList.length} photos/vidéos`}>
                <Images size={13} />
                <span>{currentMediaIndex + 1}/{mediaList.length}</span>
              </div>
            )}

            {/* Flèches de défilement rapide sur la photo */}
            {mediaList.length > 1 && (
              <>
                <button
                  type="button"
                  className="media-nav-arrow arrow-left"
                  onClick={handlePrevMedia}
                  aria-label="Photo précédente"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="media-nav-arrow arrow-right"
                  onClick={handleNextMedia}
                  aria-label="Photo suivante"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            <div className="media-zoom-hint">
              <ZoomIn size={16} />
              <span>Agrandir</span>
            </div>
          </div>

          <div className="polaroid-caption">
            <p className="polaroid-text">{message.content}</p>
            <div className="card-footer">
              <span className="card-author">— {message.author}</span>
              <span className="card-date">{formattedDate}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Post-It coloré */
        <div className="postit-card">
          <div className="postit-content">
            <p className="postit-text">{message.content}</p>
          </div>

          <div className="card-footer">
            <span className="card-author">— {message.author}</span>
            <div className="footer-actions">
              <button
                type="button"
                className={`like-heart-btn ${liked ? 'liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                title="Aimer ce souvenir"
                aria-label="Cœur"
              >
                <Heart size={15} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : '#6b7280'} />
              </button>
              <span className="card-date">{formattedDate}</span>
            </div>
          </div>
        </div>
      )}

      {/* Voile de flou (Phase 1 avant le 4 octobre) avec bouton Spoil */}
      {isBlurred && (
        <div className="blur-overlay" onClick={toggleReveal}>
          <div className="blur-card-badge">
            <Eye size={20} className="blur-icon" />
            <span className="blur-text">Surprise de <strong>{message.author}</strong></span>
            {mediaList.length > 0 && (
              <span className="blur-media-pill">
                📸 {mediaList.length} souvenir{mediaList.length > 1 ? 's' : ''}
              </span>
            )}
            <button
              type="button"
              className="spoil-button"
              onClick={toggleReveal}
            >
              👀 Découvrir quand même
            </button>
          </div>
        </div>
      )}

      {/* Petit bouton pour re-masquer */}
      {isGloballyBlurred && isIndividuallyRevealed && (
        <button
          type="button"
          className="re-blur-btn"
          onClick={toggleReveal}
          title="Re-masquer ce message pour préserver la surprise"
        >
          <EyeOff size={13} />
          <span>Re-masquer</span>
        </button>
      )}
    </article>
  );
};
