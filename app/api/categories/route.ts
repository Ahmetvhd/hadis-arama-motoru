import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseHadisData } from '@/lib/hadis-parser';

let cachedCategories: any = null;

export async function GET() {
  try {
    if (!cachedCategories) {
      try {
        const filePath = join(process.cwd(), 'hadisler.json');
        const fileContent = readFileSync(filePath, 'utf-8');
        const hadisData = JSON.parse(fileContent);
        const parsed = parseHadisData(hadisData);
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

