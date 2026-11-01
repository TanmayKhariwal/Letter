import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalMessageSectionProps {
  onReadAgain: () => void;
}

export function FinalMessageSection({ onReadAgain }: FinalMessageSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated stars, floating fireflies & glowing particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Fireflies that gently drift and glow
    const fireflies = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1.2,
      baseAlpha: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2
    }));

    // Twinkling background stars
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.008
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Stars
      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 0.9 || s.alpha < 0.2) s.speed = -s.speed;
        ctx.fillStyle = `rgba(255, 245, 238, ${Math.max(0.1, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Floating Fireflies
      fireflies.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;
        f.phase += f.pulseSpeed;

        if (f.x < -10) f.x = canvas.width + 10;
        if (f.x > canvas.width + 10) f.x = -10;
        if (f.y < -10) f.y = canvas.height + 10;
        if (f.y > canvas.height + 10) f.y = -10;

        const currentAlpha = f.baseAlpha + Math.sin(f.phase) * 0.3;
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 6);
        glow.addColorStop(0, `rgba(255, 218, 185, ${Math.max(0.05, currentAlpha)})`);
        glow.addColorStop(0.4, `rgba(255, 198, 217, ${Math.max(0.02, currentAlpha * 0.5)})`);
        glow.addColorStop(1, 'rgba(255, 198, 217, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core bright spark
        ctx.fillStyle = `rgba(255, 255, 240, ${Math.max(0.2, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleReadAgainClick = () => {
    // Warm rose & gold celebratory heart confetti
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#FFC6D9', '#E6B8A2', '#DCC6FF', '#FFFFFF']
      });
    } catch {
      // safe fallback if confetti fails
    }

    onReadAgain();
  };

  return (
    <section
      id="final-message"
      className="relative min-h-[900px] pt-48 pb-36 px-6 bg-[#0E0716] text-white flex flex-col items-center justify-center overflow-hidden text-center select-none scroll-mt-24"
    >
      {/* Background starlit fireflies canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Gentle ambient colored glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC6D9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DCC6FF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Sparkle kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 text-xs font-sans-luxury tracking-widest uppercase text-[#FFC6D9] mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>With All My Heart</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Center Primary Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight mb-8 leading-tight"
        >
          Thank you for being part of my story.
        </motion.h2>

        {/* Continuation Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6 text-base sm:text-lg md:text-xl font-serif-luxury italic text-white/80 leading-relaxed max-w-xl mx-auto"
        >
          <p>
            Every conversation, every laugh, every memory has become something I genuinely treasure.
          </p>

          <p>
            No matter where life takes us, you'll always have a very special place in my heart.
          </p>

          <p className="text-[#FFC6D9] font-normal not-italic font-serif-luxury text-lg sm:text-xl">
            And if you ever forget how amazing you are, I hope this little website reminds you.
          </p>
        </motion.div>

        {/* Display Heart ❤️ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="my-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              filter: [
                'drop-shadow(0 0 12px rgba(255, 198, 217, 0.4))',
                'drop-shadow(0 0 26px rgba(255, 198, 217, 0.9))',
                'drop-shadow(0 0 12px rgba(255, 198, 217, 0.4))'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut'
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFC6D9] to-[#DCC6FF] flex items-center justify-center text-white shadow-xl shadow-[#FFC6D9]/40"
          >
            <Heart className="w-8 h-8 fill-current text-white stroke-white" />
          </motion.div>
        </motion.div>

        {/* Final Button: "Read Again" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={handleReadAgainClick}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-[#2A2A2A] hover:bg-[#FFF9F5] font-sans-luxury font-medium text-sm tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC6D9]"
          >
            <ArrowUp className="w-4 h-4 text-[#2A2A2A] group-hover:-translate-y-1 transition-transform" />
            <span>Read Again</span>
          </button>
        </motion.div>

        {/* Quiet Footer Note */}
        <div className="mt-20 pt-8 border-t border-white/10 text-xs font-sans-luxury text-white/40 flex flex-col sm:flex-row items-center gap-2">
          <span>Crafted with infinite care</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>A timeless digital keepsake</span>
        </div>
      </div>
    </section>
  );
}
