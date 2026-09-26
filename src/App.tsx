import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CountryRoadBackground } from './components/Background/CountryRoadBackground';
import { Header } from './components/Header/Header';
import { CorkBoard } from './components/CorkBoard/CorkBoard';
import { GuestFormModal } from './components/Modals/GuestFormModal';
import { MediaViewModal } from './components/Modals/MediaViewModal';
import { SlideshowModal } from './components/Modals/SlideshowModal';
import { AdminModal } from './components/Modals/AdminModal';
import { subscribeToMessages } from './services/firebase';
import type { BirthdayMessage, CountdownTime } from './types';
import './App.css';

// Date cible : 4 octobre à 00:00:00
const DEFAULT_TARGET_DATE = import.meta.env.VITE_TARGET_DATE || '2026-10-04T00:00:00';

export function App() {
  const [messages, setMessages] = useState<BirthdayMessage[]>([]);
  const [selectedMediaData, setSelectedMediaData] = useState<{ message: BirthdayMessage; initialIndex: number } | null>(null);
  const [isGuestFormOpen, setIsGuestFormOpen] = useState(false);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Simulation pour tester les deux modes (Avant le 4 oct vs Jour J)
  const [isSimulatedDayJ, setIsSimulatedDayJ] = useState(false);

  // État du compte à rebours
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  // Calcul dynamique du compte à rebours
  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(DEFAULT_TARGET_DATE).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Déclenchement de confettis festifs lorsque le Jour J est atteint ou simulé
  useEffect(() => {
    if (countdown.isExpired || isSimulatedDayJ) {
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [countdown.isExpired, isSimulatedDayJ]);

  // Abonnement aux messages (Firestore ou Mock local)
  useEffect(() => {
    const unsubscribe = subscribeToMessages((fetched) => {
      setMessages(fetched);
    });
    return () => unsubscribe();
  }, []);

  const isGloballyBlurred = !countdown.isExpired && !isSimulatedDayJ;

  return (
    <div className="app-container">
      {/* 1. Arrière-plan de route de campagne animée */}
      <CountryRoadBackground />

      <div className="app-content-wrapper">
        {/* 2. En-tête avec compte à rebours et actions */}
        <Header
          countdown={countdown}
          isSimulatedDayJ={isSimulatedDayJ}
          onToggleSimulatedDayJ={() => setIsSimulatedDayJ(!isSimulatedDayJ)}
          onOpenGuestForm={() => setIsGuestFormOpen(true)}
          onOpenSlideshow={() => setIsSlideshowOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          messageCount={messages.filter((m) => !m.hidden).length}
        />

        {/* 3. Le tableau de liège avec les souvenirs épinglés */}
        <CorkBoard
          messages={messages}
          isGloballyBlurred={isGloballyBlurred}
          onMediaClick={(msg, idx) => setSelectedMediaData({ message: msg, initialIndex: idx ?? 0 })}
          onOpenGuestForm={() => setIsGuestFormOpen(true)}
        />
      </div>

      {/* --- Modales --- */}
      <GuestFormModal
        isOpen={isGuestFormOpen}
        onClose={() => setIsGuestFormOpen(false)}
        onSuccess={() => setIsGuestFormOpen(false)}
      />

      <MediaViewModal
        message={selectedMediaData?.message ?? null}
        initialIndex={selectedMediaData?.initialIndex ?? 0}
        onClose={() => setSelectedMediaData(null)}
      />

      <SlideshowModal
        isOpen={isSlideshowOpen}
        onClose={() => setIsSlideshowOpen(false)}
        messages={messages}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        messages={messages}
      />
    </div>
  );
}

export default App;
