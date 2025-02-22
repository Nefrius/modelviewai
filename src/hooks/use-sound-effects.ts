import { useEffect, useCallback, useRef, useState } from 'react';

export function useSoundEffects() {
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const transitionSound = useRef<HTMLAudioElement | null>(null);
  const wooshSound = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Ses nesnelerini client-side'da oluştur
    clickSound.current = new Audio('/click.mp3');
    transitionSound.current = new Audio('/transition.mp3');
    wooshSound.current = new Audio('/woosh.mp3');

    // Ses seviyelerini ayarla
    [clickSound.current, transitionSound.current, wooshSound.current].forEach(sound => {
      if (sound) sound.volume = 0.5;
    });

    // Kullanıcı etkileşimini dinle
    const handleInteraction = () => {
      setHasInteracted(true);
      // Event listener'ı kaldır
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Genel tıklama sesi
  const playClickSound = useCallback(() => {
    if (clickSound.current && hasInteracted) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(() => {});
    }
  }, [hasInteracted]);

  // Sayfa geçiş sesi
  const playTransitionSound = useCallback(() => {
    if (transitionSound.current && hasInteracted) {
      transitionSound.current.currentTime = 0;
      transitionSound.current.play().catch(() => {});
    }
  }, [hasInteracted]);

  // Etkileşim sesi (beğeni, favori, takip)
  const playWooshSound = useCallback(() => {
    if (wooshSound.current && hasInteracted) {
      wooshSound.current.currentTime = 0;
      wooshSound.current.play().catch(() => {});
    }
  }, [hasInteracted]);

  return {
    playClickSound,
    playTransitionSound,
    playWooshSound,
    hasInteracted
  };
} 