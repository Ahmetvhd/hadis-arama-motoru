import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseHadisData } from '@/lib/hadis-parser';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

import { readdirSync } from 'fs';
import { Hadis } from '@/lib/types';

export default async function HadisDetailPage({ params }: PageProps) {
  const { id } = await params;
  let hadisler: Hadis[] = [];
  
  try {
    const dataDir = join(process.cwd(), 'data');
    const files = readdirSync(dataDir).filter((f: string) => f.startsWith('hadisler-') && f.endsWith('.json')).sort();
    
    let allHadisData: unknown[] = [];
    
    // Tüm parçaları oku
    for (const file of files) {
      const filePath = join(dataDir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      const chunkData = JSON.parse(fileContent);
      allHadisData = allHadisData.concat(chunkData);
    }
    
    const parsed = parseHadisData(allHadisData);
    hadisler = parsed.hadisler;
  } catch (error) {
    console.error('Error loading hadis data:', error);
  }
  
  const hadis = hadisler.find((h) => h.id === id);

  if (!hadis) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Hadis Detayı</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-2xl">{hadis.title || 'Hadis'}</CardTitle>
              <Badge variant="secondary" className="text-lg">
                #{hadis.id}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {hadis.arabicText && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Arapça Metin
                </h2>
                <div className="text-right font-arabic text-xl leading-relaxed bg-muted/50 p-6 rounded-lg">
                  {hadis.arabicText.replace(/\n/g, ' ').replace(/\s+/g, ' ')}
                </div>
              </div>
            )}

            {hadis.turkishText && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Türkçe Çeviri</h2>
                <div className="text-base leading-relaxed bg-muted/30 p-6 rounded-lg whitespace-pre-wrap">
                  {hadis.turkishText}
                </div>
              </div>
            )}

            {hadis.explanation && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Açıklama</h2>
                <div className="text-base leading-relaxed bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg whitespace-pre-wrap">
                  {hadis.explanation}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Kitap ID: {hadis.kitapId}</span>
              </div>
              {hadis.bolumId && (
                <div className="text-sm text-muted-foreground">
                  Bölüm ID: {hadis.bolumId}
                </div>
              )}
              {hadis.altBolumId && (
                <div className="text-sm text-muted-foreground">
                  Alt Bölüm ID: {hadis.altBolumId}
                </div>
              )}
              {hadis.siraNo && (
                <div className="text-sm text-muted-foreground">
                  Sıra: {hadis.siraNo}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

