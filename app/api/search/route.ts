import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseHadisData } from '@/lib/hadis-parser';
import { searchHadis, filterByCategory } from '@/lib/search';

// Hadis verilerini bir kez parse et ve cache'le
let cachedHadisler: any = null;
let cachedCategories: any = null;

function getHadisData() {
  if (!cachedHadisler) {
    try {
      const dataDir = join(process.cwd(), 'data');
      
      // Klasörün varlığını kontrol et
      let files: string[] = [];
      try {
        files = readdirSync(dataDir).filter(f => f.startsWith('hadisler-') && f.endsWith('.json')).sort();
      } catch (dirError) {
        console.error('Data directory not found, trying alternative paths:', dirError);
        // Alternatif yolları dene
        const altPaths = [
          join(process.cwd(), 'public', 'data'),
          join(process.cwd(), '..', 'data'),
        ];
        
        for (const altPath of altPaths) {
          try {
            files = readdirSync(altPath).filter(f => f.startsWith('hadisler-') && f.endsWith('.json')).sort();
            if (files.length > 0) {
              dataDir = altPath;
              break;
            }
          } catch {
            continue;
          }
        }
      }
      
      if (files.length === 0) {
        throw new Error('No hadis data files found');
      }
      
      let allHadisData: any[] = [];
      
      // Tüm parçaları oku
      for (const file of files) {
        const filePath = join(dataDir, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const chunkData = JSON.parse(fileContent);
        allHadisData = allHadisData.concat(chunkData);
      }
      
      const parsed = parseHadisData(allHadisData);
      cachedHadisler = parsed.hadisler;
      cachedCategories = parsed.categories;
    } catch (error) {
      console.error('Error loading hadis data:', error);
      cachedHadisler = [];
      cachedCategories = [];
    }
  }
  return { hadisler: cachedHadisler, categories: cachedCategories };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const kitapId = searchParams.get('kitapId');
    const bolumId = searchParams.get('bolumId');
    const altBolumId = searchParams.get('altBolumId');
    const limit = parseInt(searchParams.get('limit') || '50');

    const { hadisler, categories } = getHadisData();

    // Kategoriye göre filtrele
    let filteredHadisler = hadisler;
    if (kitapId || bolumId || altBolumId) {
      filteredHadisler = filterByCategory(hadisler, kitapId || undefined, bolumId || undefined, altBolumId || undefined);
    }

    // Arama yap
    let results = [];
    if (query.trim()) {
      const searchResults = searchHadis(filteredHadisler, query, limit);
      results = searchResults.map(r => ({
        ...r.hadis,
        score: r.score,
        matches: r.matches,
      }));
    } else {
      // Sorgu yoksa tüm hadisleri döndür (limit ile)
      results = filteredHadisler.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      results,
      total: filteredHadisler.length,
      categories,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Arama sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

