import { Suspense } from 'react';
import { HadisSearch } from '@/components/hadis-search';

function SearchWrapper() {
  return <HadisSearch />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            DELAİLU&apos;D-DİN KİTABI
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            SÜNNET • İCMA • KIYAS - TEKRARLARLA en az 90.000 HADİS
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="w-full">
          <Suspense fallback={<div className="text-center py-8">Yükleniyor...</div>}>
            <SearchWrapper />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
