/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { Navbar } from './components/Navbar';
import { HeartCursorTrail } from './components/HeartCursorTrail';
import { HeroSection } from './components/HeroSection';
import { LetterSection } from './components/LetterSection';
import { ThingsILoveSection } from './components/ThingsILoveSection';
import { LittleThingsSection } from './components/LittleThingsSection';
import { FavoritePlaceSection } from './components/FavoritePlaceSection';
import { FinalMessageSection } from './components/FinalMessageSection';
import { KeepsakesDrawer } from './components/KeepsakesDrawer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorTrailEnabled, setCursorTrailEnabled] = useState(true);
  const [savedCardIds, setSavedCardIds] = useState<string[]>(['smile', 'heart']);
  const [isKeepsakesOpen, setIsKeepsakesOpen] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleToggleCursorTrail = () => {
    setCursorTrailEnabled(prev => !prev);
  };

  const handleToggleSaveCard = (cardId: string) => {
    setSavedCardIds(prev =>
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  const handleRemoveCard = (cardId: string) => {
    setSavedCardIds(prev => prev.filter(id => id !== cardId));
  };

  const handleClearAllKeepsakes = () => {
    setSavedCardIds([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F5] text-[#2A2A2A] overflow-x-hidden">
      {/* Intro Loading Experience */}
      {isLoading && <IntroLoader onComplete={handleLoadingComplete} />}

      {/* Heart Cursor Trail (Toggleable) */}
      <HeartCursorTrail enabled={cursorTrailEnabled && !isLoading} />

      {/* Top Bar Header */}
      <Navbar
        cursorTrailEnabled={cursorTrailEnabled}
        onToggleCursorTrail={handleToggleCursorTrail}
        savedCount={savedCardIds.length}
        onOpenKeepsakes={() => setIsKeepsakesOpen(true)}
      />

      <main>
        {/* Section 1: Hero */}
        <HeroSection onBeginClick={() => scrollToSection('the-letter')} />

        {/* Section 2: The Letter */}
        <LetterSection />

        {/* Section 3: Things I Love About You */}
        <ThingsILoveSection
          savedCards={savedCardIds}
          onToggleSaveCard={handleToggleSaveCard}
        />

        {/* Section 4: The Little Things */}
        <LittleThingsSection />

        {/* Section 5: My Favorite Place */}
        <FavoritePlaceSection />

        {/* Section 6: Final Message */}
        <FinalMessageSection onReadAgain={() => scrollToSection('hero')} />
      </main>

      {/* Keepsakes Saved Drawer */}
      <KeepsakesDrawer
        isOpen={isKeepsakesOpen}
        onClose={() => setIsKeepsakesOpen(false)}
        savedCardIds={savedCardIds}
        onRemoveCard={handleRemoveCard}
        onClearAll={handleClearAllKeepsakes}
      />
    </div>
  );
}
