'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Category } from '@/lib/types';

const KITAP_NAMES: Record<string, string> = {
  '1': 'SAHİH-İ BUHARİ',
  '2': 'SAHİH-İ MÜSLİM',
  '3': 'SÜNEN-İ TİRMİZİ',
  '4': 'SÜNEN EBU DAVUD',
  '5': 'NESÂÎ S. KÜBRA',
  '6': 'SÜNEN İBN-İ MACE',
  '7': 'İBN-İ MACE',
  '8': 'MALİK MUVATTA',
  '9': 'İBN-İ HİBBAN ZVD',
  '10': 'MÜSNED-İ HANBEL',
};

export function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Category[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedKitaplar, setExpandedKitaplar] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.categories || []);
        setGrouped(data.grouped || {});
        // İlk kitabı açık tut
        const firstKitap = Object.keys(data.grouped || {})[0];
        if (firstKitap) {
          setExpandedKitaplar(new Set([firstKitap]));
        }
      }
    } catch (error) {
      console.error('Categories error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleKitap = (kitapId: string) => {
    const newExpanded = new Set(expandedKitaplar);
    if (newExpanded.has(kitapId)) {
      newExpanded.delete(kitapId);
    } else {
      newExpanded.add(kitapId);
    }
    setExpandedKitaplar(newExpanded);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Kategoriler
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-2">
            {Object.entries(grouped).map(([kitapId, cats]) => (
              <div key={kitapId} className="space-y-1">
                <button
                  onClick={() => toggleKitap(kitapId)}
                  className="w-full text-left p-2 hover:bg-muted rounded-md flex items-center justify-between font-semibold"
                >
                  <span className="text-sm">
                    {KITAP_NAMES[kitapId] || `Kitap ${kitapId}`}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {cats.length}
                  </Badge>
                </button>
                {expandedKitaplar.has(kitapId) && (
                  <div className="ml-4 space-y-1 border-l-2 pl-2">
                    {cats.slice(0, 20).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/?kitapId=${cat.kitapId}&bolumId=${cat.bolumId}`}
                        className="block p-2 text-sm hover:bg-muted rounded-md"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

