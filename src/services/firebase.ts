import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  type Firestore,
  type Unsubscribe,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  type FirebaseStorage,
} from 'firebase/storage';
import type { BirthdayMessage, PostItColor, MediaItem } from '../types';

// Vérification de la présence de la configuration Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'your_api_key_here'
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('✅ Firebase connecté avec succès au projet :', firebaseConfig.projectId);
  } catch (error) {
    console.warn('⚠️ Erreur initialisation Firebase, passage en mode démo:', error);
  }
} else {
  console.log('ℹ️ Firebase non configuré : l\'application fonctionne en mode Démo / Local');
}

// Données démo initiales avec exemples multi-photos
const INITIAL_DEMO_MESSAGES: BirthdayMessage[] = [
  {
    id: 'demo-1',
    author: 'Sophie & Marc',
    content: 'Joyeux anniversaire Olivier ! Merci pour tous ces merveilleux souvenirs, tes blagues inimitables et ta bonne humeur légendaire ! On t\'aime fort ❤️🎂',
    style: 'polaroid',
    color: 'yellow',
    mediaList: [
      {
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        name: 'fete_famille.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        name: 'souvenir_resto.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        name: 'anniversaire_gateau.jpg',
      },
    ],
    createdAt: Date.now() - 86400000 * 2,
    rotation: -2,
    pinColor: 'red',
    tapeStyle: 'stripes',
  },
  {
    id: 'demo-2',
    author: 'Lucas',
    content: 'Un très bel anniversaire à Olivier, le meilleur coach de vélo du monde ! Prêt pour notre prochaine balade dans les collines ? 🚴‍♂️✨',
    style: 'post-it',
    color: 'yellow',
    createdAt: Date.now() - 86400000,
    rotation: 3,
    pinColor: 'gold',
  },
  {
    id: 'demo-3',
    author: 'Mamie & Papy',
    content: 'Que cette nouvelle année t\'apporte joie, santé et plein de beaux moments partagés en famille. Gros bisous affectueux.',
    style: 'post-it',
    color: 'pink',
    createdAt: Date.now() - 43200000,
    rotation: -1.5,
    pinColor: 'blue',
    tapeStyle: 'dots',
  },
  {
    id: 'demo-4',
    author: 'Camille',
    content: 'Regarde ce qu\'on a retrouvé dans les cartons ! Une super photo souvenir de nos vacances ensemble. Gros bisous Olivier ! ☀️🌴',
    style: 'polaroid',
    color: 'green',
    mediaList: [
      {
        url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        name: 'vacances_mer.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        name: 'coucher_soleil.jpg',
      },
    ],
    createdAt: Date.now() - 21600000,
    rotation: 2.5,
    pinColor: 'green',
  },
  {
    id: 'demo-5',
    author: 'Tonton Jérôme',
    content: 'Joyeux anniversaire frangin ! Hâte de trinquer avec toi au grand banquet familial ce week-end ! 🥂🍾',
    style: 'post-it',
    color: 'blue',
    createdAt: Date.now() - 7200000,
    rotation: -3,
    pinColor: 'red',
  }
];

const LOCAL_STORAGE_KEY = 'birthday_card_local_messages_v2';

function getLocalMessages(): BirthdayMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_MESSAGES));
      return INITIAL_DEMO_MESSAGES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_MESSAGES;
  }
}

function saveLocalMessages(msgs: BirthdayMessage[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(msgs));
  } catch (e) {
    console.error('Erreur sauvegarde locale:', e);
  }
}

const PIN_COLORS: ('red' | 'blue' | 'yellow' | 'green' | 'gold')[] = ['red', 'blue', 'yellow', 'green', 'gold'];
const TAPE_STYLES: ('stripes' | 'dots' | 'plain')[] = ['stripes', 'dots', 'plain'];

export function getRandomRotation(): number {
  return Number((Math.random() * 6 - 3).toFixed(1));
}

export function getRandomPin(): 'red' | 'blue' | 'yellow' | 'green' | 'gold' {
  return PIN_COLORS[Math.floor(Math.random() * PIN_COLORS.length)];
}

export function getRandomTape(): 'stripes' | 'dots' | 'plain' {
  return TAPE_STYLES[Math.floor(Math.random() * TAPE_STYLES.length)];
}

export function subscribeToMessages(callback: (messages: BirthdayMessage[]) => void): Unsubscribe {
  if (db && isFirebaseConfigured) {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const msgs: BirthdayMessage[] = [];
      snapshot.forEach((docSnap) => {
        msgs.push({ id: docSnap.id, ...(docSnap.data() as Omit<BirthdayMessage, 'id'>) });
      });
      callback(msgs);
    }, (error) => {
      console.error('Erreur Firestore onSnapshot:', error);
      callback(getLocalMessages());
    });
  }

  const update = () => {
    const msgs = getLocalMessages().sort((a, b) => b.createdAt - a.createdAt);
    callback(msgs);
  };

  update();

  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCAL_STORAGE_KEY) {
      update();
    }
  };

  window.addEventListener('storage', handleStorage);
  const handleCustomUpdate = () => update();
  window.addEventListener('local-messages-updated', handleCustomUpdate);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('local-messages-updated', handleCustomUpdate);
  };
}

export async function uploadMedia(
  file: File,
  messageId: string,
  onProgress?: (percent: number) => void
): Promise<{ mediaUrl: string; mediaStoragePath: string; type: 'image' | 'video'; name: string }> {
  const isVideo = file.type.startsWith('video/');
  const type = isVideo ? 'video' : 'image';

  if (storage && isFirebaseConfigured) {
    const fileExt = file.name.split('.').pop() || 'bin';
    const storagePath = `media/${messageId}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.${fileExt}`;
    const storageRef = ref(storage, storagePath);

    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          console.error('Erreur upload Firebase Storage:', error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            mediaUrl: downloadUrl,
            mediaStoragePath: storagePath,
            type,
            name: file.name,
          });
        }
      );
    });
  }

  // Simulation locale
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (onProgress) onProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(interval);
        const blobUrl = URL.createObjectURL(file);
        resolve({
          mediaUrl: blobUrl,
          mediaStoragePath: `local/${file.name}`,
          type,
          name: file.name,
        });
      }
    }, 120);
  });
}

/**
 * Création d'un message avec support de plusieurs fichiers (photos/vidéos)
 */
export async function createMessage(params: {
  author: string;
  content: string;
  style: 'post-it' | 'polaroid';
  color: PostItColor;
  files?: File[];
  onUploadProgress?: (percent: number, currentItem: number, totalItems: number) => void;
}): Promise<void> {
  const tempId = 'msg_' + Math.random().toString(36).substring(2, 10);
  const mediaList: MediaItem[] = [];

  const filesToUpload = params.files || [];
  const total = filesToUpload.length;

  for (let i = 0; i < total; i++) {
    const file = filesToUpload[i];
    const uploaded = await uploadMedia(file, tempId, (percent) => {
      if (params.onUploadProgress) {
        params.onUploadProgress(percent, i + 1, total);
      }
    });

    mediaList.push({
      url: uploaded.mediaUrl,
      type: uploaded.type,
      storagePath: uploaded.mediaStoragePath,
      name: uploaded.name,
    });
  }

/**
 * Nettoie un objet en retirant tous les champs 'undefined' pour Firestore
 */
function cleanFirestoreData<T extends Record<string, any>>(obj: T): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item && typeof item === 'object' ? cleanFirestoreData(item) : item
      );
    } else if (value !== null && typeof value === 'object') {
      result[key] = cleanFirestoreData(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

  const newMessage: Omit<BirthdayMessage, 'id'> = {
    author: params.author.trim(),
    content: params.content.trim(),
    style: params.style,
    color: params.color,
    mediaList,
    createdAt: Date.now(),
    rotation: getRandomRotation(),
    pinColor: getRandomPin(),
    tapeStyle: getRandomTape(),
    hidden: false,
  };

  // Rétrocompatibilité uniquement si un média est présent (évite les valeurs undefined rejetées par Firestore)
  if (mediaList.length > 0) {
    newMessage.mediaUrl = mediaList[0].url;
    newMessage.mediaType = mediaList[0].type;
    if (mediaList[0].storagePath) {
      newMessage.mediaStoragePath = mediaList[0].storagePath;
    }
  }

  if (db && isFirebaseConfigured) {
    const dataToSave = cleanFirestoreData(newMessage);
    await addDoc(collection(db, 'messages'), dataToSave);
    return;
  }

  const current = getLocalMessages();
  const withId: BirthdayMessage = { id: tempId, ...newMessage };
  current.unshift(withId);
  saveLocalMessages(current);
  window.dispatchEvent(new Event('local-messages-updated'));
}

export async function deleteMessage(messageId: string): Promise<void> {
  if (db && isFirebaseConfigured) {
    await deleteDoc(doc(db, 'messages', messageId));
    return;
  }

  const current = getLocalMessages().filter((m) => m.id !== messageId);
  saveLocalMessages(current);
  window.dispatchEvent(new Event('local-messages-updated'));
}

export async function toggleHideMessage(messageId: string, hidden: boolean): Promise<void> {
  if (db && isFirebaseConfigured) {
    await updateDoc(doc(db, 'messages', messageId), { hidden });
    return;
  }

  const current = getLocalMessages().map((m) =>
    m.id === messageId ? { ...m, hidden } : m
  );
  saveLocalMessages(current);
  window.dispatchEvent(new Event('local-messages-updated'));
}
