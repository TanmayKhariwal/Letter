import { useState } from 'react';
import { Sparkles, Heart, Menu, X } from 'lucide-react';

interface NavbarProps {
  cursorTrailEnabled: boolean;
  onToggleCursorTrail: () => void;
  savedCount: number;
  onOpenKeepsakes: () => void;
}

export function Navbar({
  cursorTrailEnabled,
  onToggleCursorTrail,
  savedCount,
  onOpenKeepsakes
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#the-letter', label: 'The Letter' },
    { href: '#things-i-love', label: 'Things I Love' },
    { href: '#the-little-things', label: 'The Little Things' },
    { href: '#favorite-place', label: 'My Favorite Place' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#2A2A2A]/5 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="group flex items-center gap-2 text-xl font-serif-luxury font-semibold tracking-tight text-[#2A2A2A] whitespace-nowrap shrink-0"
        >
          <span>For You</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC6D9] group-hover:scale-125 transition-transform" />
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-sans-luxury font-medium text-[#2A2A2A]/70"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#2A2A2A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#FFC6D9]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Functional interactive actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Cursor Trail Toggle */}
          <button
            onClick={onToggleCursorTrail}
            aria-label={cursorTrailEnabled ? 'Disable heart cursor trail' : 'Enable heart cursor trail'}
            title="Heart cursor trail"
            className={`p-1.5 sm:p-2 rounded-full transition-colors ${
              cursorTrailEnabled
                ? 'bg-[#FFC6D9]/30 text-[#2A2A2A]'
                : 'bg-black/5 text-[#2A2A2A]/50 hover:text-[#2A2A2A]'
            }`}
          >
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          {/* Keepsakes Saved Drawer Toggle */}
          {savedCount > 0 && (
            <button
              onClick={onOpenKeepsakes}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-sans-luxury font-medium text-[#2A2A2A] bg-white border border-[#E6B8A2] rounded-full shadow-xs hover:bg-[#FFF9F5] transition-colors"
              aria-label={`View ${savedCount} saved keepsakes`}
            >
              <Heart className="w-3 h-3 fill-[#FFC6D9] text-[#FFC6D9]" />
              <span className="hidden xs:inline">{savedCount}</span>
              <span className="hidden sm:inline">Saved</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full hover:bg-black/5 text-[#2A2A2A] transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2A2A]/5 bg-[#FFFDFB]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif-luxury text-base font-medium text-[#2A2A2A] py-1.5 border-b border-[#2A2A2A]/5 last:border-0 hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
