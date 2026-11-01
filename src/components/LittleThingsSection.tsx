import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Eye, Sparkles } from 'lucide-react';
import { LITTLE_THINGS } from '../utils/loveLetterData';

export function LittleThingsSection() {
  const [expandedId, setExpandedId] = useState<string | null>('excited');

  const handleToggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="the-little-things"
      className="relative py-28 px-6 bg-[#FFFDFB] border-t border-[#2A2A2A]/5 overflow-hidden scroll-mt-20"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FFC6D9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#DCC6FF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-sans-luxury text-[#2A2A2A]/60 mb-2">
            <span>Quiet Observations</span>
            <span aria-hidden="true">·</span>
            <span>Unspoken Moments</span>
            <span aria-hidden="true">·</span>
            <span>{LITTLE_THINGS.length} Discoveries</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2A2A2A] tracking-tight mb-4">
            The Things You Probably Don't Realize I Notice
          </h2>

          <p className="font-sans-luxury text-sm sm:text-base text-[#2A2A2A]/70 max-w-lg mx-auto leading-relaxed">
            You do so many beautiful things without even trying. Here are a few I quietly carry in my thoughts.
          </p>
        </div>

        {/* Expandable Entries Accordion List */}
        <div className="space-y-4">
          {LITTLE_THINGS.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const contentId = `little-thing-content-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-white shadow-lg shadow-[#FFC6D9]/15 border-[#E6B8A2]/60'
                    : 'bg-white/60 hover:bg-white/90 border-[#2A2A2A]/8'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC6D9]"
                >
                  <div className="flex items-center gap-4 sm:gap-6 pr-4">
                    {/* Natural editorial numerical index */}
                    <span className="font-serif-luxury text-sm sm:text-base font-semibold text-[#E6B8A2] shrink-0">
                      0{idx + 1}.
                    </span>

                    <div>
                      <h3 className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#2A2A2A] tracking-tight">
                        {item.title}
                      </h3>
                      {!isExpanded && (
                        <p className="font-sans-luxury text-xs text-[#2A2A2A]/50 mt-1 line-clamp-1">
                          {item.preview}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                      isExpanded ? 'bg-[#FFC6D9]/30 rotate-180 text-[#2A2A2A]' : 'text-[#2A2A2A]/40'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Body Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={contentId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-[#2A2A2A]/5"
                    >
                      <div className="pt-4 flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-[#FFC6D9] mt-1 shrink-0" />
                        <p className="font-serif-luxury text-base sm:text-lg leading-relaxed text-[#2A2A2A]/85">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
