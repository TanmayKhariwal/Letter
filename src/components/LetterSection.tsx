import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, BookOpen, Check } from 'lucide-react';
import { LETTER_CONTENT_PARAGRAPHS, estimateReadingTimeMinutes } from '../utils/loveLetterData';
import luxuryParchment from '../assets/images/luxury_parchment_texture_1793521570220.jpg';
import romanticWaxSeal from '../assets/images/romantic_wax_seal_1793521570967.jpg';

export function LetterSection() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasCopied, setHasCopied] = useState(false);
  const readingTime = estimateReadingTimeMinutes();

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(LETTER_CONTENT_PARAGRAPHS.join('\n\n'));
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2400);
  };

  return (
    <section
      id="the-letter"
      className="relative py-28 px-6 bg-[#FFF9F5] overflow-hidden scroll-mt-20"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FFC6D9]/25 via-[#DCC6FF]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-sans-luxury text-[#2A2A2A]/60 mb-2">
            <span>A Personal Letter</span>
            <span aria-hidden="true">·</span>
            <span>{readingTime} min intimate read</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted with Care</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#2A2A2A] font-semibold tracking-tight mb-3">
            The Letter
          </h2>
          <p className="font-sans-luxury text-sm text-[#2A2A2A]/70 max-w-md mx-auto">
            Written from the quietest, most honest part of my heart.
          </p>
        </div>

        {/* Luxury Stationery Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#DCC6FF]/30 border border-[#E6B8A2]/40 bg-white"
        >
          {/* Subtle luxury parchment texture background */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
            <img
              src={luxuryParchment}
              alt="Luxury paper texture"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Gold Foil Double Hairline Border */}
          <div className="absolute inset-3 rounded-2xl border border-[#E6B8A2]/30 pointer-events-none z-10" />

          {/* Top Wax Seal Ribbon Lockup */}
          <div className="relative z-20 pt-8 pb-4 px-8 sm:px-14 flex flex-col items-center border-b border-[#E6B8A2]/20 bg-gradient-to-b from-[#FFF9F5]/90 to-[#FFF9F5]/50">
            {/* Interactive Wax Seal */}
            <button
              onClick={handleToggleOpen}
              className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC6D9] rounded-full"
              aria-label={isOpen ? "Fold letter note" : "Unfold letter note"}
              title="Click to unfold / fold letter"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md shadow-[#E6B8A2]/50 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300">
                <img
                  src={romanticWaxSeal}
                  alt="Rose Gold Wax Seal"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating sparkles around seal */}
              <div className="absolute -top-1 -right-1 text-[#E6B8A2] opacity-80 group-hover:scale-125 transition-transform">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </button>

            <span className="mt-3 text-[11px] font-sans-luxury tracking-widest uppercase text-[#2A2A2A]/50 font-medium">
              {isOpen ? "Tap seal to close" : "Tap seal to unfold letter"}
            </span>
          </div>

          {/* Unfoldable Letter Paper Content */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, rotateX: -6 }}
                animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
                exit={{ opacity: 0, height: 0, rotateX: -6 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 px-8 py-10 sm:px-14 sm:py-14 bg-[#FFFDFB]/95 text-[#2A2A2A]"
              >
                {/* Letter Header Date / Salutation */}
                <div className="flex justify-between items-baseline mb-8 pb-4 border-b border-[#2A2A2A]/10 text-xs font-serif-luxury text-[#2A2A2A]/60 italic">
                  <span>To the one who holds my heart</span>
                  <span>Always &amp; Forever</span>
                </div>

                {/* Letter Body - Intimate Typography */}
                <div className="space-y-6 text-[16px] sm:text-[17px] leading-[1.8] font-serif-luxury text-[#2A2A2A] tracking-normal">
                  <p className="text-xl sm:text-2xl font-serif-luxury italic text-[#2A2A2A] font-medium leading-relaxed">
                    {LETTER_CONTENT_PARAGRAPHS[0]}
                  </p>

                  <p className="text-[#2A2A2A]/90">
                    {LETTER_CONTENT_PARAGRAPHS[1]}
                  </p>

                  <p className="text-[#2A2A2A]/90">
                    {LETTER_CONTENT_PARAGRAPHS[2]}
                  </p>

                  {/* Centered Poetic Stanza for the 4 pillars */}
                  <div className="py-4 my-3 px-6 sm:px-10 rounded-2xl bg-[#FFF9F5]/80 border border-[#FFC6D9]/40 text-center font-serif-luxury text-lg sm:text-xl italic text-[#2A2A2A] leading-loose space-y-1 shadow-xs">
                    <div>Your kindness.</div>
                    <div>Your heart.</div>
                    <div>Your smile.</div>
                    <div className="text-[#2A2A2A]/90 text-base sm:text-lg">
                      Your way of making people feel seen and understood.
                    </div>
                  </div>

                  <p className="text-[#2A2A2A]/90">
                    {LETTER_CONTENT_PARAGRAPHS[4]}
                  </p>

                  <p className="text-[#2A2A2A]/90">
                    {LETTER_CONTENT_PARAGRAPHS[5]}
                  </p>

                  <p className="text-[#2A2A2A]/95 font-medium">
                    {LETTER_CONTENT_PARAGRAPHS[6]}
                  </p>

                  {/* Climax Affirmation */}
                  <div className="pt-4 border-t border-[#E6B8A2]/30 space-y-2 text-center sm:text-left">
                    <p className="text-lg sm:text-xl font-serif-luxury italic text-[#2A2A2A]">
                      You are appreciated.
                    </p>
                    <p className="text-lg sm:text-xl font-serif-luxury italic text-[#2A2A2A]">
                      You are important.
                    </p>
                    <p className="text-lg sm:text-xl font-serif-luxury italic text-[#2A2A2A]">
                      You are cherished.
                    </p>
                    <p className="pt-2 text-xl sm:text-2xl font-script text-[#2A2A2A] font-semibold">
                      And you'll always have a special place in my heart. ❤️
                    </p>
                  </div>
                </div>

                {/* Bottom Card Utility Bar */}
                <div className="mt-12 pt-6 border-t border-[#2A2A2A]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans-luxury text-[#2A2A2A]/60">
                  <div className="flex items-center gap-1.5 text-xs text-[#2A2A2A]/70">
                    <Heart className="w-3.5 h-3.5 fill-[#FFC6D9] text-[#FFC6D9]" />
                    <span>Cherished keepsake note</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopyLetter}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2A]/15 hover:border-[#2A2A2A]/30 text-[#2A2A2A] transition-colors"
                      aria-label="Save or copy letter text"
                    >
                      {hasCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Copied with love</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Keep a Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
