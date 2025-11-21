import { NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseHadisData } from '@/lib/hadis-parser';

let cachedCategories: any = null;

export async function GET() {
  try {
    if (!cachedCategories) {
      try {
        let dataDir = join(process.cwd(), 'data');
        
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
        cachedCategories = parsed.categories;
      } catch (error) {
        console.error('Error loading hadis data:', error);
        cachedCategories = [];
      }
    }

    // Kategorileri grupla
    const grouped = cachedCategories.reduce((acc: any, cat: any) => {
      if (!acc[cat.kitapId]) {
        acc[cat.kitapId] = [];
      }
      acc[cat.kitapId].push(cat);
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      categories: cachedCategories,
      grouped,
    });
  } catch (error) {
    console.error('Categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Kategoriler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

