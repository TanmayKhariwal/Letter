import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LETTER_CONTENT_PARAGRAPHS,
  THINGS_I_LOVE,
  LITTLE_THINGS,
  WORLD_CITIES,
  calculateTotalWordCount,
  estimateReadingTimeMinutes,
  latLngToMercator,
  CONTINENT_POLYGONS
} from './loveLetterData';

test('letter content matches requested text structure', () => {
  assert.equal(LETTER_CONTENT_PARAGRAPHS.length, 8);
  assert.ok(LETTER_CONTENT_PARAGRAPHS[0].includes("My favorite part of every day is knowing that you're in it."));
  assert.ok(LETTER_CONTENT_PARAGRAPHS[LETTER_CONTENT_PARAGRAPHS.length - 1].includes("You are cherished."));
  assert.ok(LETTER_CONTENT_PARAGRAPHS[LETTER_CONTENT_PARAGRAPHS.length - 1].includes("special place in my heart. ❤️"));
});

test('continent polygons are defined with valid points', () => {
  assert.ok(CONTINENT_POLYGONS.length >= 5);
  for (const continent of CONTINENT_POLYGONS) {
    assert.ok(continent.points.length >= 4);
    for (const [x, y] of continent.points) {
      assert.ok(x >= 0 && x <= 1, `Continent point x out of range: ${x}`);
      assert.ok(y >= 0 && y <= 1, `Continent point y out of range: ${y}`);
    }
  }
});

test('things I love array contains 6 complete requested categories', () => {
  assert.equal(THINGS_I_LOVE.length, 6);
  const titles = THINGS_I_LOVE.map(t => t.title);
  assert.ok(titles.includes('Your smile'));
  assert.ok(titles.includes('Your kindness'));
  assert.ok(titles.includes('Your heart'));
  assert.ok(titles.includes('Your little habits'));
  assert.ok(titles.includes('Your laugh'));
  assert.ok(titles.includes('The way you make life brighter'));

  for (const card of THINGS_I_LOVE) {
    assert.ok(card.emoji.length > 0);
    assert.ok(card.content.length > 50, `Card ${card.title} should have substantial heartfelt content`);
    assert.ok(card.tags.length > 0);
  }
});

test('little things contains expandable entries', () => {
  assert.ok(LITTLE_THINGS.length >= 4);
  const titles = LITTLE_THINGS.map(l => l.title);
  assert.ok(titles.some(t => t.includes("smile when you're excited")));
  assert.ok(titles.some(t => t.includes("care about people")));
  assert.ok(titles.some(t => t.includes("remember small details")));
  assert.ok(titles.some(t => t.includes("messages make me smile")));
});

test('reading stats calculate valid positive metrics', () => {
  const words = calculateTotalWordCount();
  assert.ok(words > 200, `Total word count should be rich: ${words}`);
  const readingTime = estimateReadingTimeMinutes();
  assert.ok(readingTime >= 1 && readingTime <= 10, `Reading time should be between 1 and 10 mins: ${readingTime}`);
});

test('Mercator coordinates projection stays within 0..1 bounding box', () => {
  for (const city of WORLD_CITIES) {
    const coords = latLngToMercator(city.lat, city.lng);
    assert.ok(coords.x >= 0 && coords.x <= 1, `X out of bounds for ${city.name}: ${coords.x}`);
    assert.ok(coords.y >= 0 && coords.y <= 1, `Y out of bounds for ${city.name}: ${coords.y}`);
  }

  // Test equator / prime meridian
  const center = latLngToMercator(0, 0);
  assert.equal(center.x, 0.5);
  assert.ok(Math.abs(center.y - 0.5) < 0.01);
});
