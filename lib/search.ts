import { Hadis, SearchResult } from './types';
import { normalizeText } from './hadis-parser';

export function searchHadis(
  hadisler: Hadis[],
  query: string,
  limit: number = 50
): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
  const results: SearchResult[] = [];

  for (const hadis of hadisler) {
    let score = 0;
    const matches: string[] = [];

    // Tüm metinleri birleştir
    const searchableText = normalizeText(
      `${hadis.title} ${hadis.arabicText} ${hadis.turkishText} ${hadis.explanation}`
    );

    // Tam eşleşme kontrolü
    if (searchableText.includes(normalizedQuery)) {
      score += 100;
      matches.push('tam-eslesme');
    }

    // Kelime bazlı eşleşme
    for (const word of queryWords) {
      if (searchableText.includes(word)) {
        score += 10;
        matches.push(word);
      }
    }

    // Başlıkta eşleşme bonusu
    const normalizedTitle = normalizeText(hadis.title);
    if (normalizedTitle.includes(normalizedQuery)) {
      score += 50;
      matches.push('baslik');
    }

    // Türkçe metinde eşleşme
    const normalizedTurkish = normalizeText(hadis.turkishText);
    if (normalizedTurkish.includes(normalizedQuery)) {
      score += 30;
      matches.push('turkce');
    }

    // Arapça metinde eşleşme
    const normalizedArabic = normalizeText(hadis.arabicText);
    if (normalizedArabic.includes(normalizedQuery)) {
      score += 20;
      matches.push('arapca');
    }

    if (score > 0) {
      results.push({ hadis, score, matches });
    }
  }

  // Skora göre sırala
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

// Kategoriye göre filtreleme
export function filterByCategory(
  hadisler: Hadis[],
  kitapId?: string,
  bolumId?: string,
  altBolumId?: string
): Hadis[] {
  return hadisler.filter((hadis) => {
    if (kitapId && hadis.kitapId !== kitapId) return false;
    if (bolumId && hadis.bolumId !== bolumId) return false;
    if (altBolumId && hadis.altBolumId !== altBolumId) return false;
    return true;
  });
}

