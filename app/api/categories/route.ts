import { NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseHadisData } from '@/lib/hadis-parser';

let cachedCategories: any = null;

export async function GET() {
  try {
    if (!cachedCategories) {
      try {
        const dataDir = join(process.cwd(), 'data');
        const files = readdirSync(dataDir).filter(f => f.startsWith('hadisler-') && f.endsWith('.json')).sort();
        
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

