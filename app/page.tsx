import { Suspense } from 'react';
import { HadisSearch } from '@/components/hadis-search';
import { CategorySidebar } from '@/components/category-sidebar';

function SearchWrapper() {
  return <HadisSearch />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            DELAİLU'D-DİN KİTABI
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            SÜNNET • İCMA • KIYAS - TEKRARLARLA en az 90.000 HADİS
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <CategorySidebar />
          </aside>
          
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="text-center py-8">Yükleniyor...</div>}>
              <SearchWrapper />
            </Suspense>
          </div>
        </div>
      </main>

      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>ALLAH (C.C.) VE RESULÜ DOĞRU SÖYLER!!!</strong>
          </p>
          <p>
            SAHABE'NİN EN BİLİNEN ÖZELLİĞİ YALAN SÖYLEMEMELERİDİR! HADİSLER SAHABE TARAFINDAN YAZILDI, 
            TABİİN VE TEBEU'T-TABİİN TARAFINDAN YAZILDI VE ORJİNAL NÜSHALARI MEVCUD VE MUHAFAZA ALTINDADIR.
          </p>
          <p className="mt-2">
            HADİS KUR'ANI AÇIKLAR, ALLAH'IN EMİR, YASAK, TAVSİYE, MÜJDE VE UYARILARINI TAŞIR! 
            YANİ DİNDİR. UYDURMALARI SAYMAZSAK ZAYIFLARINA TEMKİNLİ BAKARSAK; CENNET'İN YOLUNU GÖSTERİR 
            CEHENNEM'DEN KORUNMAYI ÖĞRETİR.
          </p>
        </div>
      </footer>
    </div>
  );
}
