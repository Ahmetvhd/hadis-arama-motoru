'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, BookOpen, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Hadis } from '@/lib/types';

export function HadisSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Hadis[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const kitapId = searchParams.get('kitapId');
  const bolumId = searchParams.get('bolumId');

  const performSearch = useCallback(async (searchQuery: string, kitap?: string | null, bolum?: string | null) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) {
        params.append('q', searchQuery);
      }
      if (kitap) params.append('kitapId', kitap);
      if (bolum) params.append('bolumId', bolum);
      params.append('limit', '100');

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.results || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query, kitapId, bolumId);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, kitapId, bolumId, performSearch]);

  const clearFilters = () => {
    router.push('/');
    setQuery('');
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Hadis ara... (Türkçe veya Arapça)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {(kitapId || bolumId) && (
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="gap-2">
            {kitapId && `Kitap: ${kitapId}`}
            {bolumId && ` • Bölüm: ${bolumId}`}
            <button onClick={clearFilters} className="ml-1 hover:bg-muted rounded-full p-0.5">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      )}

      {!loading && (query || kitapId || bolumId) && (
        <div className="text-sm text-muted-foreground">
          {results.length} sonuç bulundu {total > 0 && `(Toplam: ${total})`}
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-4 pr-4">
          {results.map((hadis) => (
            <Card key={hadis.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">
                    {hadis.title || 'Hadis'}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    #{hadis.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {hadis.arabicText && (
                  <div className="text-right font-arabic text-lg leading-relaxed bg-muted/50 p-4 rounded-lg">
                    {hadis.arabicText}
                  </div>
                )}
                {hadis.turkishText && (
                  <div className="text-base leading-relaxed">
                    {hadis.turkishText.substring(0, 500)}
                    {hadis.turkishText.length > 500 && '...'}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Kitap: {hadis.kitapId}</span>
                  {hadis.bolumId && <span>• Bölüm: {hadis.bolumId}</span>}
                </div>
                <Link href={`/hadis/${hadis.id}`}>
                  <Button variant="outline" className="w-full">
                    Detaylı Oku
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {!loading && query && results.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Sonuç bulunamadı. Farklı kelimeler deneyin.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

