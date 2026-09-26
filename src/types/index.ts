export type PostItColor = 'yellow' | 'pink' | 'green' | 'blue' | 'purple';

export type CardStyle = 'post-it' | 'polaroid';

export type MediaType = 'image' | 'video';

export interface MediaItem {
  url: string;
  type: MediaType;
  storagePath?: string;
  name?: string;
}

export interface BirthdayMessage {
  id: string;
  author: string;
  content: string;
  style: CardStyle;
  color: PostItColor;
  mediaList?: MediaItem[]; // Multi-médias (plusieurs photos et/ou vidéos)
  // Rétrocompatibilité avec les messages à média unique :
  mediaUrl?: string;
  mediaType?: MediaType;
  mediaStoragePath?: string;
  createdAt: number;
  rotation?: number; // Décalage visuel en degrés (-3° à +3°)
  pinColor?: 'red' | 'blue' | 'yellow' | 'green' | 'gold';
  tapeStyle?: 'stripes' | 'dots' | 'plain';
  hidden?: boolean; // Pour masquer un message via l'admin sans le supprimer
}

/**
 * Fonction utilitaire pour extraire la liste complète des médias d'un message
 */
export function getMessageMediaList(message: BirthdayMessage): MediaItem[] {
  if (message.mediaList && message.mediaList.length > 0) {
    return message.mediaList;
  }
  if (message.mediaUrl) {
    return [{
      url: message.mediaUrl,
      type: message.mediaType || 'image',
      storagePath: message.mediaStoragePath,
    }];
  }
  return [];
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export type ModalType = 'none' | 'guest-form' | 'media-zoom' | 'slideshow' | 'admin';
