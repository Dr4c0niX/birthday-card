/**
 * Synthétiseur Web Audio API pour reproduire le son d'une vraie sonnette de vélo "Dring Dring !"
 * Aucun fichier externe requis, fonctionne instantanément et sans latence.
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playBicycleBell(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playChime = (timeOffset: number, baseFreq: number) => {
      const now = ctx.currentTime + timeOffset;

      // Fréquences harmoniques métalliques d'une cloche en laiton
      const freqs = [baseFreq, baseFreq * 1.58, baseFreq * 2.32];
      const gains = [0.25, 0.12, 0.08];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(gains[idx], now);
        // Attaque percussive puis décroissance naturelle de cloche
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      });
    };

    // Double carillon caractéristique "Dring - Dring !"
    playChime(0, 2400);
    playChime(0.09, 2700);
    playChime(0.22, 2400);
    playChime(0.31, 2700);
  } catch (err) {
    // Si l'audio n'est pas autorisé par le navigateur avant interaction, ignorer en silence
    console.warn('Audio non disponible ou bloqué:', err);
  }
}
