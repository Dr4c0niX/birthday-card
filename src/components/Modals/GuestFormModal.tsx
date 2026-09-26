import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Film,
  Plus,
  StickyNote,
  Camera,
  Eye,
  Images,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createMessage } from '../../services/firebase';
import { compressImage } from '../../utils/imageCompression';
import type { PostItColor, CardStyle } from '../../types';
import './GuestFormModal.css';

interface GuestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface MediaDraft {
  id: string;
  file: File;
  previewUrl: string;
  type: 'image' | 'video';
  name: string;
}

const EMOJI_SHORTCUTS = ['🎂', '❤️', '🎉', '🥂', '🥳', '🚴‍♂️', '✨', '🌟'];

const POSTIT_COLORS: { id: PostItColor; label: string; bg: string }[] = [
  { id: 'yellow', label: 'Jaune Soleil', bg: '#fff48c' },
  { id: 'pink', label: 'Rose Poudré', bg: '#ffd0e0' },
  { id: 'green', label: 'Menthe Douce', bg: '#c9f7c9' },
  { id: 'blue', label: 'Bleu Ciel', bg: '#bae6fd' },
  { id: 'purple', label: 'Lilas', bg: '#e9d5ff' },
];

export const GuestFormModal: React.FC<GuestFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [style, setStyle] = useState<CardStyle>('post-it');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<PostItColor>('yellow');
  const [mediaDrafts, setMediaDrafts] = useState<MediaDraft[]>([]);
  const [previewMediaIndex, setPreviewMediaIndex] = useState(0);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadItemIndex, setUploadItemIndex] = useState(1);
  const [uploadTotalItems, setUploadTotalItems] = useState(1);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setStatusMessage('Optimisation des photos...');

    const newDrafts: MediaDraft[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith('image/')) {
        try {
          const compressed = await compressImage(file);
          newDrafts.push({
            id: 'draft_' + Math.random().toString(36).substring(2, 9),
            file: compressed,
            previewUrl: URL.createObjectURL(compressed),
            type: 'image',
            name: file.name,
          });
        } catch {
          newDrafts.push({
            id: 'draft_' + Math.random().toString(36).substring(2, 9),
            file,
            previewUrl: URL.createObjectURL(file),
            type: 'image',
            name: file.name,
          });
        }
      } else if (file.type.startsWith('video/')) {
        newDrafts.push({
          id: 'draft_' + Math.random().toString(36).substring(2, 9),
          file,
          previewUrl: URL.createObjectURL(file),
          type: 'video',
          name: file.name,
        });
      }
    }

    setMediaDrafts((prev) => [...prev, ...newDrafts]);
    setStatusMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveMedia = (idToRemove: string) => {
    setMediaDrafts((prev) => {
      const filtered = prev.filter((d) => d.id !== idToRemove);
      const target = prev.find((d) => d.id === idToRemove);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      if (previewMediaIndex >= filtered.length) {
        setPreviewMediaIndex(Math.max(0, filtered.length - 1));
      }
      return filtered;
    });
  };

  const addEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim()) {
      setError('Veuillez indiquer votre prénom, nom ou surnom.');
      return;
    }

    if (!content.trim()) {
      setError('Veuillez écrire un petit mot d\'anniversaire.');
      return;
    }

    if (style === 'polaroid' && mediaDrafts.length === 0) {
      setError('Veuillez ajouter au moins une photo ou une vidéo pour le format Polaroid.');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const filesToUpload = style === 'polaroid' ? mediaDrafts.map((d) => d.file) : [];
      setUploadTotalItems(filesToUpload.length);

      await createMessage({
        author,
        content,
        style,
        color,
        files: filesToUpload,
        onUploadProgress: (percent, currentItem, totalItems) => {
          setUploadProgress(percent);
          setUploadItemIndex(currentItem);
          setUploadTotalItems(totalItems);
        },
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const activeDraft = mediaDrafts[previewMediaIndex] || mediaDrafts[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide-modal" onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-badge-icon">📌</span>
            <div>
              <h2 className="modal-title">Épingler votre souvenir</h2>
              <p className="modal-subtitle">Personnalisez votre mot et admirez le rendu en direct.</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Corps de la modale en 2 colonnes */}
        <div className="modal-split-body">
          {/* Colonne gauche : Formulaire pas à pas */}
          <form onSubmit={handleSubmit} className="guest-form split-form">
            {error && (
              <div className="form-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* ÉTAPE 1 : Choix du Format (Mis en avant) */}
            <div className="form-group format-step-group">
              <label className="form-step-title">
                <span className="step-num">1</span>
                <span>Choisissez votre style de mot :</span>
              </label>

              <div className="format-cards-grid">
                <button
                  type="button"
                  className={`format-card-btn ${style === 'post-it' ? 'selected' : ''}`}
                  onClick={() => setStyle('post-it')}
                >
                  <div className="format-card-icon-wrap postit-icon-bg">
                    <StickyNote size={24} />
                  </div>
                  <div className="format-card-info">
                    <strong className="format-card-title">Post-it coloré</strong>
                    <span className="format-card-desc">Un petit mot doux, une anecdote ou des vœux chaleureux</span>
                  </div>
                  {style === 'post-it' && <CheckCircle2 size={18} className="format-check-icon" />}
                </button>

                <button
                  type="button"
                  className={`format-card-btn ${style === 'polaroid' ? 'selected' : ''}`}
                  onClick={() => setStyle('polaroid')}
                >
                  <div className="format-card-icon-wrap polaroid-icon-bg">
                    <Camera size={24} />
                  </div>
                  <div className="format-card-info">
                    <strong className="format-card-title">Polaroid Photo / Vidéo</strong>
                    <span className="format-card-desc">Une ou plusieurs photos/vidéos souvenirs avec votre mot</span>
                  </div>
                  {style === 'polaroid' && <CheckCircle2 size={18} className="format-check-icon" />}
                </button>
              </div>
            </div>

            {/* ÉTAPE 2 : Identité & Message */}
            <div className="form-group">
              <label className="form-step-title">
                <span className="step-num">2</span>
                <span>Vos informations :</span>
              </label>

              <div className="input-field-wrap">
                <label htmlFor="author-input" className="form-label">
                  Votre prénom et nom (ou surnom) *
                </label>
                <input
                  id="author-input"
                  type="text"
                  className="form-input"
                  placeholder="Ex: Lucas, Sophie & Marc, Tonton Jérôme..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  disabled={isUploading}
                  required
                />
              </div>

              <div className="input-field-wrap">
                <div className="label-with-emojis">
                  <label htmlFor="content-input" className="form-label">
                    Votre message d'anniversaire *
                  </label>
                  <div className="emoji-pills">
                    {EMOJI_SHORTCUTS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className="emoji-btn"
                        onClick={() => addEmoji(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  id="content-input"
                  rows={3}
                  className="form-textarea"
                  placeholder="Écrivez votre message pour Papa..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isUploading}
                  required
                />
              </div>
            </div>

            {/* ÉTAPE 3 : Personnalisation selon le format */}
            <div className="form-group">
              <label className="form-step-title">
                <span className="step-num">3</span>
                <span>{style === 'post-it' ? 'Couleur du post-it :' : 'Ajoutez vos photos ou vidéos :'}</span>
              </label>

              {style === 'post-it' ? (
                <div className="color-palette">
                  {POSTIT_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`color-bubble ${color === c.id ? 'selected' : ''}`}
                      style={{ backgroundColor: c.bg }}
                      onClick={() => setColor(c.id)}
                      title={c.label}
                    >
                      {color === c.id && <CheckCircle2 size={16} color="#374151" />}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="polaroid-uploader-section">
                  {mediaDrafts.length === 0 ? (
                    <div
                      className="dropzone compact-dropzone"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud size={28} className="dropzone-icon" />
                      <p className="dropzone-text">
                        Cliquez pour sélectionner vos <strong>photos</strong> ou <strong>vidéos</strong>
                      </p>
                      <p className="dropzone-sub">
                        Plusieurs fichiers possibles • Compression automatique
                      </p>
                    </div>
                  ) : (
                    <div className="multi-media-grid-container">
                      <div className="media-thumbnails-grid">
                        {mediaDrafts.map((draft, idx) => (
                          <div
                            key={draft.id}
                            className={`media-thumbnail-card ${idx === previewMediaIndex ? 'current-active-thumb' : ''}`}
                            onClick={() => setPreviewMediaIndex(idx)}
                            title="Cliquer pour afficher dans l'aperçu"
                          >
                            {draft.type === 'video' ? (
                              <div className="thumbnail-video-wrap">
                                <Film size={20} className="video-icon" />
                                <span className="video-label">Vidéo {idx + 1}</span>
                              </div>
                            ) : (
                              <img src={draft.previewUrl} alt={draft.name} className="thumbnail-image" />
                            )}
                            <button
                              type="button"
                              className="delete-thumb-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveMedia(draft.id);
                              }}
                              title="Retirer ce média"
                              aria-label="Supprimer"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="add-more-media-btn"
                          onClick={() => fileInputRef.current?.click()}
                          title="Ajouter d'autres photos ou vidéos"
                        >
                          <Plus size={18} />
                          <span>Ajouter</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden-file-input"
                    onChange={handleFilesSelect}
                  />

                  {statusMessage && <p className="status-hint">{statusMessage}</p>}
                </div>
              )}
            </div>

            {/* Progression lors de l'upload */}
            {isUploading && (
              <div className="progress-container">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="progress-text">
                  Envoi en cours {uploadTotalItems > 1 ? `(${uploadItemIndex}/${uploadTotalItems})` : ''} : {uploadProgress}%
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
                disabled={isUploading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={isUploading}
              >
                <Sparkles size={18} />
                <span>{isUploading ? 'Épinglage...' : 'Épingler sur le tableau'}</span>
              </button>
            </div>
          </form>

          {/* Colonne droite : APERÇU EN DIRECT (LIVE PREVIEW) */}
          <div className="live-preview-column">
            <div className="live-preview-header">
              <Eye size={16} />
              <span>Aperçu en direct sur le liège</span>
            </div>

            <div className="preview-cork-stage">
              {/* Punaise décorative */}
              <div className="preview-pushpin" />

              {/* Rendu Post-It */}
              {style === 'post-it' ? (
                <div className={`preview-postit-card color-${color}`}>
                  <div className="preview-content-box">
                    <p className="preview-handwriting-text">
                      {content.trim() || 'Votre petit mot doux s\'affichera ici avec une jolie écriture manuscrite...'}
                    </p>
                  </div>
                  <div className="preview-footer-box">
                    <span className="preview-author-name">
                      — {author.trim() || 'Votre prénom'}
                    </span>
                    <span className="preview-date-tag">Aujourd'hui</span>
                  </div>
                </div>
              ) : (
                /* Rendu Polaroid */
                <div className="preview-polaroid-card">
                  <div className="preview-polaroid-media-box">
                    {activeDraft ? (
                      activeDraft.type === 'video' ? (
                        <div className="preview-video-placeholder">
                          <Film size={36} color="#34d399" />
                          <span>Vidéo ({activeDraft.name})</span>
                        </div>
                      ) : (
                        <img src={activeDraft.previewUrl} alt="Aperçu" className="preview-polaroid-img" />
                      )
                    ) : (
                      <div className="preview-empty-media-box">
                        <Camera size={38} className="empty-cam-icon" />
                        <span>Votre photo apparaîtra ici</span>
                      </div>
                    )}

                    {mediaDrafts.length > 1 && (
                      <div className="preview-badge-count">
                        <Images size={12} />
                        <span>{previewMediaIndex + 1}/{mediaDrafts.length}</span>
                      </div>
                    )}
                  </div>

                  <div className="preview-polaroid-caption">
                    <p className="preview-handwriting-text">
                      {content.trim() || 'Votre légende souvenir...'}
                    </p>
                    <div className="preview-footer-box">
                      <span className="preview-author-name">
                        — {author.trim() || 'Votre prénom'}
                      </span>
                      <span className="preview-date-tag">Aujourd'hui</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="preview-hint">
              💡 Ce que vous voyez est exactement ce qui sera épinglé sur le tableau de Papa !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
