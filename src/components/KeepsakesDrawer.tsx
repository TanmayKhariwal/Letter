import { useDialogFocus } from './useDialogFocus';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2 } from 'lucide-react';
import { THINGS_I_LOVE } from '../utils/loveLetterData';

interface KeepsakesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCardIds: string[];
  onRemoveCard: (id: string) => void;
  onClearAll: () => void;
}

export function KeepsakesDrawer({
  isOpen,
  onClose,
  savedCardIds,
  onRemoveCard,
  onClearAll
}: KeepsakesDrawerProps) {
  const savedCards = THINGS_I_LOVE.filter(c => savedCardIds.includes(c.id));

  const dialogRef = useDialogFocus(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer Pane */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="keepsakes-title"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md bg-[#FFFDFB] h-full shadow-2xl border-l border-[#E6B8A2]/30 flex flex-col z-10 text-[#2A2A2A]"
          >
            {/* Header */}
            <div className="shrink-0 p-6 border-b border-[#2A2A2A]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-[#FFC6D9] text-[#FFC6D9]" />
                <h3 id="keepsakes-title" className="font-serif-luxury text-xl font-semibold">
                  Saved Keepsakes ({savedCards.length})
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 text-[#2A2A2A]/70 hover:text-[#2A2A2A]"
                aria-label="Close keepsakes drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 space-y-4">
              {savedCards.length === 0 ? (
                <div className="text-center py-12 text-[#2A2A2A]/50 font-sans-luxury text-sm">
                  <Heart className="w-8 h-8 mx-auto mb-3 text-[#2A2A2A]/20" />
                  <p>No saved keepsakes yet.</p>
                  <p className="text-xs mt-1">Tap "Save as Keepsake" on any card to collect them here.</p>
                </div>
              ) : (
                savedCards.map(card => (
                  <div
                    key={card.id}
                    className="p-4 rounded-2xl bg-white border border-[#E6B8A2]/30 shadow-xs flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{card.emoji}</span>
                        <h4 className="font-serif-luxury font-semibold text-lg text-[#2A2A2A]">
                          {card.title}
                        </h4>
                      </div>
                      <p className="font-sans-luxury text-xs text-[#2A2A2A]/70 line-clamp-2">
                        {card.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveCard(card.id)}
                      className="p-1.5 text-[#2A2A2A]/30 hover:text-red-500 rounded-lg transition-colors"
                      title="Remove from keepsakes"
                      aria-label={`Remove ${card.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {savedCards.length > 0 && (
              <div className="shrink-0 p-6 border-t border-[#2A2A2A]/10 flex items-center justify-between">
                <button
                  onClick={onClearAll}
                  className="text-xs font-sans-luxury text-[#2A2A2A]/50 hover:text-red-600 transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-sans-luxury font-medium bg-[#2A2A2A] text-white rounded-full hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
