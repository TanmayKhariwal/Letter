import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, MapPin, RotateCcw, Heart } from 'lucide-react';
import { WORLD_CITIES, latLngToMercator, CONTINENT_POLYGONS, CityCoordinate } from '../utils/loveLetterData';

export function FavoritePlaceSection() {
  const [stage, setStage] = useState<'map' | 'zooming' | 'revealed'>('map');
  const [selectedCity, setSelectedCity] = useState<CityCoordinate>(WORLD_CITIES[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render stylized celestial map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 480;
    };
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw subtle grid lines (parallels and meridians)
      ctx.strokeStyle = 'rgba(230, 184, 162, 0.18)';
      ctx.lineWidth = 1;

      // Longitude curves
      for (let i = 0; i <= 10; i++) {
        const x = (w / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Latitude curves
      for (let j = 0; j <= 6; j++) {
        const y = (h / 6) * j;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw stylized continent landmass silhouettes
      ctx.fillStyle = 'rgba(230, 184, 162, 0.1)';
      ctx.strokeStyle = 'rgba(230, 184, 162, 0.32)';
      ctx.lineWidth = 1.2;
      CONTINENT_POLYGONS.forEach((continent) => {
        if (continent.points.length === 0) return;
        ctx.beginPath();
        continent.points.forEach(([px, py], idx) => {
          const x = px * w;
          const y = py * h;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Draw stylized glowing cities
      angle += 0.03;
      WORLD_CITIES.forEach((city) => {
        const pos = latLngToMercator(city.lat, city.lng);
        const cx = pos.x * w;
        const cy = pos.y * h;

        const isCurrent = city.name === selectedCity.name;
        const pulse = Math.sin(angle) * 3;

        // Outer glow
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, isCurrent ? 24 + pulse : 12);
        glow.addColorStop(0, isCurrent ? 'rgba(255, 198, 217, 0.8)' : 'rgba(220, 198, 255, 0.4)');
        glow.addColorStop(1, 'rgba(255, 198, 217, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, isCurrent ? 24 + pulse : 12, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = isCurrent ? '#FFB3C6' : '#E6B8A2';
        ctx.beginPath();
        ctx.arc(cx, cy, isCurrent ? 4.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();

        // City label
        ctx.fillStyle = isCurrent ? '#2A2A2A' : 'rgba(42, 42, 42, 0.5)';
        ctx.font = isCurrent ? 'bold 11px Plus Jakarta Sans' : '10px Plus Jakarta Sans';
        ctx.fillText(city.name, cx + 8, cy - 4);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [selectedCity]);

  const handleStartReveal = () => {
    setStage('zooming');
    setZoomLevel(3);

    // Zooming progression
    setTimeout(() => {
      setZoomLevel(8);
    }, 900);

    // Fade out to emotional stillness
    setTimeout(() => {
      setStage('revealed');
    }, 2000);
  };

  const handleReset = () => {
    setStage('map');
    setZoomLevel(1);
  };

  return (
    <section
      id="favorite-place"
      className="relative min-h-[800px] py-32 px-6 bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F5] to-[#120B1D] text-[#2A2A2A] overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-sans-luxury text-[#2A2A2A]/60 mb-2">
            <span>Coordinates &amp; Geography</span>
            <span aria-hidden="true">·</span>
            <span>A Search Across the World</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2A2A2A] tracking-tight mb-3">
            My Favorite Place
          </h2>

          <p className="font-sans-luxury text-sm text-[#2A2A2A]/70 max-w-md mx-auto">
            Out of eight billion people and millions of destinations...
          </p>
        </div>

        {/* Dynamic State Container */}
        <div className="relative min-h-[480px] rounded-3xl overflow-hidden border border-[#E6B8A2]/40 bg-white/70 backdrop-blur-md shadow-2xl flex items-center justify-center">
          {/* STAGE 1: Map & Zooming */}
          {stage !== 'revealed' && (
            <div className="relative w-full h-full min-h-[480px] flex flex-col items-center justify-center overflow-hidden p-6">
              {/* Map Canvas with animated zoom transform */}
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-out origin-center"
                style={{
                  transform: `scale(${zoomLevel})`,
                  opacity: stage === 'zooming' ? 0.35 : 1
                }}
              >
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>

              {/* Map UI Overlay */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-md bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#E6B8A2]/30 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-sans-luxury text-[#2A2A2A]/60 mb-3 uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-[#E6B8A2] animate-spin" style={{ animationDuration: '14s' }} />
                  <span>Searching Global Coordinates...</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {WORLD_CITIES.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => setSelectedCity(city)}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        selectedCity.name === city.name
                          ? 'bg-[#FFC6D9] text-[#2A2A2A] font-medium'
                          : 'bg-black/5 text-[#2A2A2A]/70 hover:bg-black/10'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>

                <p className="font-serif-luxury text-base text-[#2A2A2A]/80 italic mb-6">
                  {selectedCity.name}, {selectedCity.country} — "{selectedCity.description}"
                </p>

                {/* Primary Action Button */}
                <button
                  onClick={handleStartReveal}
                  disabled={stage === 'zooming'}
                  className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#2A2A2A] text-white hover:bg-black font-sans-luxury text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FFC6D9]" />
                  <span>{stage === 'zooming' ? 'Locating...' : 'Reveal Favorite Place'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: Deep Stillness Emotional Reveal */}
          <AnimatePresence>
            {stage === 'revealed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-b from-[#120B1D] via-[#1F122B] to-[#0D0616] text-white flex flex-col items-center justify-center p-8 sm:p-14 text-center select-none"
              >
                {/* Floating soft ethereal glow */}
                <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#FFC6D9]/25 to-[#DCC6FF]/25 blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-xl mx-auto space-y-6">
                  {/* Line 1 */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal tracking-wide drop-shadow-sm"
                  >
                    My favorite place isn't a city.
                  </motion.p>

                  {/* Line 2 */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.2 }}
                    className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal tracking-wide drop-shadow-sm"
                  >
                    It isn't a country.
                  </motion.p>

                  {/* Line 3 */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 2.2 }}
                    className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal tracking-wide drop-shadow-sm"
                  >
                    It isn't somewhere on a map.
                  </motion.p>

                  {/* Line 4 - The Climax */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 3.2 }}
                    className="pt-6"
                  >
                    <p className="font-script text-4xl sm:text-6xl md:text-7xl text-[#FFC6D9] font-normal leading-relaxed drop-shadow-[0_0_24px_rgba(255,198,217,0.9)]">
                      It's wherever you are.
                    </p>

                    <div className="flex justify-center mt-6">
                      <motion.div
                        animate={{
                          scale: [1, 1.25, 1],
                          filter: [
                            'drop-shadow(0 0 12px rgba(255,198,217,0.5))',
                            'drop-shadow(0 0 28px rgba(255,198,217,1))',
                            'drop-shadow(0 0 12px rgba(255,198,217,0.5))'
                          ]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Heart className="w-10 h-10 fill-[#FFC6D9] text-[#FFC6D9]" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Replay action */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 4.4 }}
                    className="pt-8"
                  >
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-sans-luxury text-xs tracking-widest uppercase transition-all duration-200 border border-white/20 hover:scale-105 active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Explore Coordinates Again</span>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
