import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Bookmark, BookmarkCheck } from 'lucide-react';
import { useDialogFocus } from './useDialogFocus';
import { THINGS_I_LOVE, LoveCard } from '../utils/loveLetterData';

interface ThingsILoveSectionProps {
  savedCards: string[];
  onToggleSaveCard: (cardId: string) => void;
}

export function ThingsILoveSection({ savedCards, onToggleSaveCard }: ThingsILoveSectionProps) {
  const [selectedCard, setSelectedCard] = useState<LoveCard | null>(null);

  const dialogRef = useDialogFocus(!!selectedCard, () => setSelectedCard(null));

  const handleCardClick = (card: LoveCard) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <section
      id="things-i-love"
      className="relative py-28 px-6 bg-[#FFF9F5] border-t border-[#2A2A2A]/5 overflow-hidden scroll-mt-20"
    >
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#FFC6D9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#DCC6FF]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-sans-luxury text-[#2A2A2A]/60 mb-2">
            <span>Core Pillars</span>
            <span aria-hidden="true">·</span>
            <span>6 Precious Qualities</span>
            <span aria-hidden="true">·</span>
            <span>Tap to Reveal</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2A2A2A] tracking-tight mb-3">
            Things I Love About You
          </h2>

          <p className="font-sans-luxury text-sm sm:text-base text-[#2A2A2A]/70 leading-relaxed">
            Every day reveals a new reason, but these six are carved deeply into why you are irreplaceable.
          </p>
        </div>

        {/* Responsive Grid: 2 columns mobile, 3 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {THINGS_I_LOVE.map((card, index) => {
            const isSaved = savedCards.includes(card.id);

            return (
              <motion.button
                key={card.id}
                onClick={() => handleCardClick(card)}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.025,
                  boxShadow: '0 20px 30px -10px rgba(255, 198, 217, 0.45), 0 0 0 1px rgba(230, 184, 162, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col text-left p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/80 hover:bg-white backdrop-blur-md border border-[#E6B8A2]/30 transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC6D9]"
              >
                {/* Subtle top shimmer banner */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#FFC6D9]/60 to-transparent group-hover:via-[#FFC6D9] transition-all" />

                {/* Top Row: Emoji & Save indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {card.emoji}
                  </span>

                  {isSaved && (
                    <BookmarkCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E6B8A2]" />
                  )}
                </div>

                {/* Card Title */}
                <h3 className="font-serif-luxury text-base sm:text-xl lg:text-2xl font-semibold text-[#2A2A2A] tracking-tight mb-1.5 group-hover:text-black transition-colors">
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="font-sans-luxury text-[11px] sm:text-xs lg:text-sm text-[#2A2A2A]/70 leading-relaxed mb-3 line-clamp-2">
                  {card.subtitle}
                </p>

                {/* Tags (zero-pill: unboxed text with separators) */}
                <div className="mt-auto pt-2.5 border-t border-[#2A2A2A]/5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans-luxury text-[#2A2A2A]/50">
                  <span>{card.tags[0]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{card.tags[1]}</span>
                </div>

                {/* Hover prompt */}
                <div className="mt-2 text-[11px] font-sans-luxury text-[#FFB3C6] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Read note</span>
                  <span>→</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal / Card Details */}
      <AnimatePresence>
        {selectedCard && (
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-card-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#FFFDFB] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#E6B8A2]/50 text-[#2A2A2A] max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain"
            >
              {/* Soft interior background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#FFC6D9]/30 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#2A2A2A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC6D9]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedCard.emoji}</span>
                <div>
                  <h3 id="modal-card-title" className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#2A2A2A]">
                    {selectedCard.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-sans-luxury text-[#2A2A2A]/60">
                    {selectedCard.tags.map((tag, i) => (
                      <span key={tag}>
                        {tag}
                        {i < selectedCard.tags.length - 1 && <span className="ml-2">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="my-6 p-4 rounded-2xl bg-[#FFF9F5] border border-[#FFC6D9]/30 font-serif-luxury italic text-base text-[#2A2A2A]/85">
                "{selectedCard.subtitle}"
              </div>

              <p className="font-serif-luxury text-base sm:text-lg leading-relaxed text-[#2A2A2A]/90 mb-8">
                {selectedCard.content}
              </p>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2A2A2A]/10">
                <button
                  onClick={() => onToggleSaveCard(selectedCard.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-sans-luxury font-medium rounded-full transition-colors ${
                    savedCards.includes(selectedCard.id)
                      ? 'bg-[#FFC6D9]/40 text-[#2A2A2A] border border-[#FFC6D9]'
                      : 'bg-black/5 hover:bg-black/10 text-[#2A2A2A]'
                  }`}
                >
                  {savedCards.includes(selectedCard.id) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#2A2A2A]" />
                      <span>Saved in Keepsakes</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save as Keepsake</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2 text-xs font-sans-luxury font-medium rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
