import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import celestialBackdrop from '../assets/images/celestial_starlit_backdrop_1793521571003.jpg';

interface HeroSectionProps {
  onBeginClick: () => void;
}

export function HeroSection({ onBeginClick }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Stars & light bokeh orbs
    const stars = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    }));

    const bokehOrbs = Array.from({ length: 14 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 40 + 20,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.12 + 0.04,
      hue: Math.random() > 0.5 ? 'rgba(255, 198, 217,' : 'rgba(220, 198, 255,'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render drifting soft bokeh
      bokehOrbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -50) orb.x = canvas.width + 50;
        if (orb.x > canvas.width + 50) orb.x = -50;
        if (orb.y < -50) orb.y = canvas.height + 50;
        if (orb.y > canvas.height + 50) orb.y = -50;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `${orb.hue} ${orb.alpha})`);
        grad.addColorStop(1, `${orb.hue} 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render twinkling celestial stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.direction = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.direction = 1;
        }

        ctx.fillStyle = `rgba(255, 249, 245, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16 select-none"
    >
      {/* Background starlit cinematic artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src={celestialBackdrop}
          alt="Atmospheric celestial night sky backdrop"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim to ensure high-contrast legibility and dreamy rose-gold tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120B1D]/75 via-[#1D1226]/65 to-[#FFF9F5] backdrop-blur-[1px]" />
      </div>

      {/* Dynamic star & bokeh canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Center Content */}
      <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Floating slowly animated heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0]
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 4.5,
              ease: 'easeInOut'
            },
            duration: 1.2
          }}
          className="relative mb-6"
        >
          {/* Luminous halo */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FFC6D9] to-[#DCC6FF] rounded-full blur-xl opacity-60 animate-soft-pulse pointer-events-none" />

          <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-center text-[#FFC6D9]">
            <svg
              className="w-9 h-9 fill-[#FFC6D9] drop-shadow-[0_2px_10px_rgba(255,198,217,0.7)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] mb-4"
        >
          Hey Beautiful ❤️
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-luxury italic text-lg sm:text-xl md:text-2xl text-[#FFC6D9] max-w-xl font-normal leading-relaxed drop-shadow-sm mb-10"
        >
          I made this little corner of the internet just for you.
        </motion.p>

        {/* CTA "Begin" button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <button
            onClick={onBeginClick}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#2A2A2A] font-sans-luxury font-medium text-sm tracking-wide shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/50 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#E6B8A2] group-hover:rotate-12 transition-transform" />
            <span>Begin</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll hint animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className="absolute bottom-8 z-20 flex flex-col items-center text-xs font-sans-luxury tracking-widest text-[#2A2A2A]/70 uppercase"
      >
        <span className="mb-1 text-[11px] font-medium">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-[#2A2A2A]/70 animate-bounce" />
      </motion.div>
    </section>
  );
}
