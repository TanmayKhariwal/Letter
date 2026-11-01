/**
 * Core content, structural data, and calculation logic for the luxury love letter experience.
 */

export interface LoveCard {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
}

export interface LittleThing {
  id: string;
  title: string;
  preview: string;
  content: string;
}

export interface CityCoordinate {
  name: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
}

export const LETTER_CONTENT_PARAGRAPHS = [
  "My favorite part of every day is knowing that you're in it.",
  "You make ordinary moments feel special, simple conversations feel memorable, and difficult days feel lighter.",
  "There are so many things I admire about you, but what I appreciate most is simply who you are.",
  "Your kindness.\nYour heart.\nYour smile.\nYour way of making people feel seen and understood.",
  "You bring warmth into places without even trying.\nYou make memories out of ordinary moments.",
  "And whether I always say it or not, you mean so much more to me than words could ever properly describe.",
  "Thank you for being exactly who you are.",
  "You are appreciated.\nYou are important.\nYou are cherished.\nAnd you'll always have a special place in my heart. ❤️"
];

export const THINGS_I_LOVE: LoveCard[] = [
  {
    id: 'smile',
    emoji: '❤️',
    title: 'Your smile',
    subtitle: 'The light that disarms every heavy moment',
    content: "There is something utterly transformative about your smile. It isn't just an expression; it's a quiet warmth that fills the room, making even the most stressful days feel bearable and calm. When you smile with your whole face, the world just feels right.",
    tags: ['Warmth', 'Light', 'Unforgettable']
  },
  {
    id: 'kindness',
    emoji: '🌷',
    title: 'Your kindness',
    subtitle: 'Gentle, genuine, and deeply felt',
    content: "The way you treat people—especially when you think no one is watching—is one of the rarest qualities I have ever seen. You give grace easily, listen with genuine patience, and care with an openness that is truly inspiring.",
    tags: ['Grace', 'Empathy', 'Pure']
  },
  {
    id: 'heart',
    emoji: '✨',
    title: 'Your heart',
    subtitle: 'Generous beyond measure',
    content: "You possess an immense capacity for love, compassion, and understanding. You protect the people you care about, forgive readily, and carry a rare emotional courage that leaves me in absolute awe of you.",
    tags: ['Courage', 'Compassion', 'Devotion']
  },
  {
    id: 'habits',
    emoji: '🌙',
    title: 'Your little habits',
    subtitle: 'The nuances that make you uniquely you',
    content: "The subtle rhythm of how you hum when you're focused, the way you tuck your hair back, the excitement in your voice when you share something new you learned. These small, fleeting moments are the ones I quietly cherish the most.",
    tags: ['Nuance', 'Authenticity', 'Precious']
  },
  {
    id: 'laugh',
    emoji: '💖',
    title: 'Your laugh',
    subtitle: 'My favorite sound in the universe',
    content: "Your authentic laugh is infectious and completely uninhibited. Hearing it makes whatever we were doing instantly memorable. It's the sweetest melody, and knowing I made you laugh is always the greatest victory of my day.",
    tags: ['Joy', 'Melody', 'Pure Delight']
  },
  {
    id: 'brighten',
    emoji: '🌸',
    title: 'The way you make life brighter',
    subtitle: 'Turning the mundane into gold',
    content: "Ordinary grocery runs, quiet drives with music playing, late-night talks—everything takes on richer color and deeper meaning when you're there. You turn the mundane into poetry simply by existing in it.",
    tags: ['Magic', 'Presence', 'Wonder']
  }
];

export const LITTLE_THINGS: LittleThing[] = [
  {
    id: 'excited',
    title: "The way you smile when you're excited",
    preview: "That sudden, radiant spark in your eyes...",
    content: "Whenever you talk about something that ignites your passion, your entire expression lights up. Your eyes sparkle, your speech quickens, and you gesture with such pure enthusiasm that it's impossible not to be completely captivated by you."
  },
  {
    id: 'care',
    title: "The way you care about people",
    preview: "Your instinct to check in, comfort, and stand up...",
    content: "You never take anyone for granted. You notice when someone is quiet or carrying an unseen burden, and you step in not for praise or recognition, but simply because having empathy is as natural to you as breathing."
  },
  {
    id: 'details',
    title: "The way you remember small details",
    preview: "Things said in passing weeks ago...",
    content: "You remember the little things that most people overlook: an offhand comment about a favorite snack, a passing worry about an upcoming meeting, or a memory from years ago. Being remembered by you feels like being truly known."
  },
  {
    id: 'messages',
    title: "The way your messages make me smile",
    preview: "A random notification that changes my whole day...",
    content: "In the middle of a chaotic or mundane day, seeing your name appear on my screen brings an instant sense of relief and happiness. A simple text from you has the uncanny power to reset my whole mood."
  },
  {
    id: 'presence',
    title: "The calm you bring into any room",
    preview: "An unspoken stillness that softens the world...",
    content: "Whenever you walk into a room or sit beside me, the ambient noise of life quiets down. You don't have to say a single word; just your gentle presence creates an immediate sanctuary of peace and comfort."
  }
];

export const WORLD_CITIES: CityCoordinate[] = [
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, description: 'City of lights & romance' },
  { name: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, description: 'Tranquil cherry blossom gardens' },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, description: 'Endless starlit skyline' },
  { name: 'Venice', country: 'Italy', lat: 45.4408, lng: 12.3155, description: 'Timeless bridges & canals' },
  { name: 'Santorini', country: 'Greece', lat: 36.3932, lng: 25.4615, description: 'White terraces on azure seas' },
  { name: 'Bali', country: 'Indonesia', lat: -8.3405, lng: 115.0920, description: 'Emerald hills & ocean breezes' }
];

/**
 * Calculate total word count of the entire love letter experience.
 */
export function calculateTotalWordCount(): number {
  const letterWords = LETTER_CONTENT_PARAGRAPHS.join(' ').split(/\s+/).filter(Boolean).length;
  const cardsWords = THINGS_I_LOVE.map(c => c.content).join(' ').split(/\s+/).filter(Boolean).length;
  const littleThingsWords = LITTLE_THINGS.map(l => l.content).join(' ').split(/\s+/).filter(Boolean).length;
  return letterWords + cardsWords + littleThingsWords;
}

/**
 * Estimate reading time in minutes (based on 150 wpm intimate thoughtful pacing).
 */
export function estimateReadingTimeMinutes(): number {
  const total = calculateTotalWordCount();
  return Math.max(1, Math.ceil(total / 150));
}

export interface MapPolygon {
  name: string;
  points: [number, number][]; // normalized [x, y] in 0..1
}

export const CONTINENT_POLYGONS: MapPolygon[] = [
  // North America
  {
    name: 'North America',
    points: [
      [0.08, 0.18], [0.15, 0.14], [0.22, 0.14], [0.28, 0.22], [0.26, 0.32],
      [0.22, 0.38], [0.21, 0.45], [0.18, 0.44], [0.15, 0.38], [0.08, 0.32]
    ]
  },
  // South America
  {
    name: 'South America',
    points: [
      [0.21, 0.48], [0.26, 0.49], [0.30, 0.55], [0.28, 0.68], [0.24, 0.76],
      [0.22, 0.72], [0.20, 0.58], [0.20, 0.50]
    ]
  },
  // Europe & Asia (Eurasia)
  {
    name: 'Eurasia',
    points: [
      [0.45, 0.22], [0.55, 0.18], [0.70, 0.16], [0.85, 0.20], [0.88, 0.28],
      [0.82, 0.38], [0.75, 0.42], [0.65, 0.42], [0.58, 0.38], [0.50, 0.35],
      [0.46, 0.30]
    ]
  },
  // Africa
  {
    name: 'Africa',
    points: [
      [0.46, 0.36], [0.55, 0.36], [0.59, 0.46], [0.56, 0.60], [0.52, 0.68],
      [0.47, 0.55], [0.43, 0.46]
    ]
  },
  // Australia
  {
    name: 'Australia',
    points: [
      [0.78, 0.64], [0.85, 0.62], [0.88, 0.70], [0.84, 0.76], [0.76, 0.74]
    ]
  }
];

/**
 * Convert lat/long to Mercator projection X/Y coordinates in a normalized 0..1 space.
 */
export function latLngToMercator(lat: number, lng: number): { x: number; y: number } {
  const x = (lng + 180) / 360;
  const latRad = (lat * Math.PI) / 180;
  // Mercator formula clamped between -85 and +85 deg
  const clampedLat = Math.max(-85, Math.min(85, lat));
  const mercN = Math.log(Math.tan(Math.PI / 4 + (clampedLat * Math.PI) / 360));
  const y = 0.5 - mercN / (2 * Math.PI);
  return {
    x: Math.max(0, Math.min(1, x)),
    y: Math.max(0, Math.min(1, y))
  };
}
