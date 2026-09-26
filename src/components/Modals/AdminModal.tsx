import React, { useState } from 'react';
import { X, Lock, KeyRound, Trash2, Eye, EyeOff, Download, LogOut } from 'lucide-react';
import { deleteMessage, toggleHideMessage } from '../../services/firebase';
import type { BirthdayMessage } from '../../types';
import './AdminModal.css';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: BirthdayMessage[];
  isAuthenticated: boolean;
  onSetIsAuthenticated: (val: boolean) => void;
  isSimulatedDayJ: boolean;
  onToggleSimulatedDayJ: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  messages,
  isAuthenticated,
  onSetIsAuthenticated,
  isSimulatedDayJ,
  onToggleSimulatedDayJ,
}) => {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [hidingId, setHidingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  if (!isOpen) return null;

  const expectedPin = import.meta.env.VITE_ADMIN_PIN || '1234';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === expectedPin) {
      onSetIsAuthenticated(true);
      setPinError(false);
      setPin('');
      setActionError(null);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    onSetIsAuthenticated(false);
    setPin('');
    setActionError(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer définitivement ce message ?')) {
      try {
        setActionError(null);
        setDeletingId(id);
        await deleteMessage(id);
      } catch (err: unknown) {
        console.error('Erreur suppression message:', err);
        const msg = err instanceof Error ? err.message : 'Erreur inconnue';
        if (msg.toLowerCase().includes('permission')) {
          setActionError('Action refusée par Firestore (Permissions insuffisantes) : Vérifiez que vos règles Firestore autorisent "allow update, delete: if true;".');
        } else {
          setActionError(`Erreur lors de la suppression : ${msg}`);
        }
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleToggleHide = async (id: string, currentHidden: boolean | undefined) => {
    try {
      setActionError(null);
      setHidingId(id);
      await toggleHideMessage(id, !currentHidden);
    } catch (err: unknown) {
      console.error('Erreur masquage message:', err);
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      if (msg.toLowerCase().includes('permission')) {
        setActionError('Action refusée par Firestore (Permissions insuffisantes) : Vérifiez que vos règles Firestore autorisent "allow update, delete: if true;".');
      } else {
        setActionError(`Erreur lors du masquage : ${msg}`);
      }
    } finally {
      setHidingId(null);
    }
  };

  const exportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sauvegarde_carte_anniversaire_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="admin-backdrop" onClick={onClose}>
      <div className="admin-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <div className="admin-title-wrap">
            <Lock size={20} className="admin-lock-icon" />
            <div>
              <h2 className="admin-title">Panneau d'Administration</h2>
              <p className="admin-sub">Gestion des souvenirs et modération</p>
            </div>
          </div>
          <div className="admin-header-actions">
            {isAuthenticated && (
              <button
                type="button"
                className="admin-logout-btn"
                onClick={handleLogout}
                title="Se déconnecter de l'administration"
              >
                <LogOut size={14} />
                <span>Déconnexion</span>
              </button>
            )}
            <button type="button" className="close-btn" onClick={onClose} aria-label="Fermer">
              <X size={20} />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Formulaire de code PIN */
          <form onSubmit={handlePinSubmit} className="pin-form">
            <div className="pin-icon-wrap">
              <KeyRound size={36} color="#d97706" />
            </div>
            <p className="pin-instruction">
              Entrez le code PIN secret à 4 chiffres pour accéder à la modération :
            </p>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setPinError(false);
              }}
              placeholder="••••"
              className={`pin-input ${pinError ? 'pin-error' : ''}`}
              autoFocus
            />
            {pinError && (
              <span className="pin-error-text">Code PIN incorrect</span>
            )}
            <button type="submit" className="pin-submit-btn">
              Déverrouiller
            </button>
          </form>
        ) : (
          /* Vue authentifiée : Tableau de gestion */
          <div className="admin-content">
            {/* Outil de simulation de date réservé à l'organisateur */}
            <div className="admin-sim-section">
              <div className="admin-sim-info">
                <span className="admin-sim-title">Simulation de date (Prévisualisation) :</span>
                <span className="admin-sim-desc">
                  Testez en direct ce que verront vos proches avant et pendant le Jour J.
                </span>
              </div>
              <div className="admin-sim-btns">
                <button
                  type="button"
                  className={`admin-mode-pill ${!isSimulatedDayJ ? 'active' : ''}`}
                  onClick={() => isSimulatedDayJ && onToggleSimulatedDayJ()}
                  title="Activer la vue Collecte (avant le 4 oct)"
                >
                  🔒 Collecte (Avant 4 oct)
                </button>
                <button
                  type="button"
                  className={`admin-mode-pill ${isSimulatedDayJ ? 'active' : ''}`}
                  onClick={() => !isSimulatedDayJ && onToggleSimulatedDayJ()}
                  title="Activer la vue Célébration (Jour J)"
                >
                  🎉 Révélation (Jour J)
                </button>
              </div>
            </div>

            {actionError && (
              <div className="admin-action-error">
                <span>{actionError}</span>
                <button
                  type="button"
                  onClick={() => setActionError(null)}
                  className="error-dismiss-btn"
                  title="Fermer l'alerte"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="admin-actions-bar">
              <span className="admin-stats">
                Total : <strong>{messages.length} messages</strong> (
                {messages.filter((m) => m.hidden).length} masqués)
              </span>
              <button
                type="button"
                className="export-backup-btn"
                onClick={exportBackup}
              >
                <Download size={15} />
                <span>Télécharger la sauvegarde</span>
              </button>
            </div>

            <div className="messages-table-wrap">
              <table className="messages-table">
                <thead>
                  <tr>
                    <th>Auteur</th>
                    <th>Message</th>
                    <th>Média</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id} className={msg.hidden ? 'row-hidden' : ''}>
                      <td className="author-cell">
                        <strong>{msg.author}</strong>
                      </td>
                      <td className="message-cell">
                        <span className="msg-preview">{msg.content}</span>
                      </td>
                      <td className="media-cell">
                        {msg.mediaList && msg.mediaList.length > 0 ? (
                          <a
                            href={msg.mediaList[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="media-link"
                          >
                            {msg.mediaList.length > 1
                              ? `📎 ${msg.mediaList.length} médias`
                              : msg.mediaList[0].type === 'video'
                              ? '🎬 Vidéo'
                              : '🖼️ Photo'}
                          </a>
                        ) : msg.mediaUrl ? (
                          <a
                            href={msg.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="media-link"
                          >
                            {msg.mediaType === 'video' ? '🎬 Vidéo' : '🖼️ Photo'}
                          </a>
                        ) : (
                          <span className="no-media">—</span>
                        )}
                      </td>
                      <td>
                        {msg.hidden ? (
                          <span className="badge-status hidden">Masqué</span>
                        ) : (
                          <span className="badge-status visible">Visible</span>
                        )}
                      </td>
                      <td className="actions-cell">
                        <button
                          type="button"
                          className="action-icon-btn"
                          onClick={() => handleToggleHide(msg.id, msg.hidden)}
                          disabled={hidingId === msg.id}
                          title={msg.hidden ? 'Rendre visible' : 'Masquer du tableau'}
                        >
                          {msg.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          type="button"
                          className="action-icon-btn delete-btn"
                          onClick={() => handleDelete(msg.id)}
                          disabled={deletingId === msg.id}
                          title="Supprimer définitivement"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
