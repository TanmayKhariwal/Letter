import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check autostart query param
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setIsVisible(false);
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 600);
          }, 350);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9F5] px-6 text-center select-none"
        >
          {/* Subtle warm ambient radial glow */}
          <div className="absolute inset-0 bg-radial from-[#FFC6D9]/30 via-[#DCC6FF]/20 to-transparent pointer-events-none" />

          {/* Floating decorative sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${(i * 19) % 95}vw`,
                  y: `${(i * 23) % 90}vh`,
                  scale: 0.5,
                  opacity: 0.2
                }}
                animate={{
                  y: [`${(i * 23) % 90}vh`, `${((i * 23) % 90) - 20}vh`],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.6, 1.1, 0.6]
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2
                }}
                className="absolute text-[#E6B8A2]"
              >
                <Sparkles className="w-4 h-4 opacity-70" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
            {/* Gentle Heartbeat Pulse Icon */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1, 1.25, 1],
                filter: [
                  'drop-shadow(0 0 12px rgba(255, 198, 217, 0.4))',
                  'drop-shadow(0 0 24px rgba(255, 198, 217, 0.8))',
                  'drop-shadow(0 0 12px rgba(255, 198, 217, 0.4))'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-16 h-16 mb-8 rounded-full bg-gradient-to-tr from-[#FFC6D9] to-[#DCC6FF] flex items-center justify-center text-white shadow-lg shadow-[#FFC6D9]/40"
            >
              <Heart className="w-8 h-8 fill-current text-white stroke-white" />
            </motion.div>

            {/* Prompt exact text requirement */}
            <h1 className="text-xl md:text-2xl font-serif-luxury font-medium text-[#2A2A2A] tracking-wide mb-3">
              Loading something made with love ❤️
            </h1>

            <p className="text-xs text-[#2A2A2A]/60 font-sans-luxury mb-6 tracking-wider">
              A private moment crafted just for you
            </p>

            {/* Subtle progress track */}
            <div className="w-48 h-1 bg-[#2A2A2A]/5 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFC6D9] via-[#E6B8A2] to-[#DCC6FF] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Quick skip button */}
            <button
              onClick={handleSkip}
              className="mt-4 text-[11px] font-sans-luxury tracking-widest uppercase text-[#2A2A2A]/40 hover:text-[#2A2A2A]/80 transition-colors py-1 px-3 rounded hover:bg-black/5"
            >
              Enter Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
