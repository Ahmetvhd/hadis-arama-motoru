import { Hadis, Category } from './types';

// JSON'dan hadis verilerini parse eder
export function parseHadisData(jsonData: any[]): { hadisler: Hadis[]; categories: Category[] } {
  const hadisler: Hadis[] = [];
  const categories: Category[] = [];
  const categoryMap = new Map<string, Category>();

  for (const item of jsonData) {
    if (!Array.isArray(item)) continue;

    // Kategori kontrolü (4 elemanlı array'ler: [id, kitapId, bolumId, name])
    if (item.length === 4) {
      const categoryId = item[0];
      const kitapId = item[1] || '';
      const bolumId = item[2] || '';
      const name = item[3] || '';

      // Kategori adı varsa ve hadis içeriği değilse (kısa ve Arapça karakter içermeyen)
      if (name && typeof name === 'string' && name.length > 0 && 
          name.length < 200 && 
          !name.includes('حَدّثَنا') && !name.includes('قَالَ') && 
          !name.includes('رَسُول') && !/[\u0600-\u06FF]/.test(name)) {
        const categoryKey = `${kitapId}-${bolumId}-${categoryId}`;
        if (!categoryMap.has(categoryKey)) {
          categories.push({
            id: bolumId || categoryId, // Bölüm ID'si kategori ID'si olarak kullanılır
            name: name.trim().replace(/\\r\\n/g, ' ').replace(/\s+/g, ' '),
            kitapId,
            bolumId: categoryId, // İlk eleman aslında kategori sıra numarası
          });
          categoryMap.set(categoryKey, categories[categories.length - 1]);
        }
      }
      continue;
    }

    // 15'ten az eleman varsa kategori olabilir ama hadis değildir
    if (item.length < 15) continue;

    // Hadis kontrolü - gerçek hadis içeriği olanlar
    const hadisId = item[0];
    const fullContent = item[2] || '';
    const explanation = item[3] || '';
    const kitapId = item[6] || '';
    const bolumId = item[7] || '';
    const altBolumId = item[8] || '';
    const siraNo = item[10] || '';
    const date = item[14] || '';

    // Hadis içeriği yoksa veya ID yoksa atla
    if (!hadisId || !fullContent || fullContent.length < 10) continue;

    // Arapça karakter kontrolü
    const hasArabic = /[\u0600-\u06FF]/.test(fullContent);
    
    // Hadis içeriğini ayır (Arapça ve Türkçe)
    let arabicText = '';
    let turkishText = '';
    let title = '';

    // İçeriği satırlara böl
    const lines = fullContent.split(/\\r\\n|\\n|\r\n|\n/).filter((l: string) => l.trim());
    
    let arabicStarted = false;
    let turkishStarted = false;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      // Başlık kontrolü (genellikle ilk satır veya numaralı başlık)
      if (!title && (trimmedLine.match(/^\d+\./) || trimmedLine.length < 100)) {
        if (!hasArabic || !/[\u0600-\u06FF]/.test(trimmedLine)) {
          title = trimmedLine.substring(0, 200);
        }
      }

      // Arapça metin kontrolü
      if (/[\u0600-\u06FF]/.test(trimmedLine) || trimmedLine.includes('حَدّثَنا') || trimmedLine.includes('قَالَ')) {
        arabicText += trimmedLine + ' ';
        arabicStarted = true;
      } 
      // Türkçe metin (Arapça karakter yoksa ve açıklama değilse)
      else if (!trimmedLine.includes('AÇIKLAMA:') && !trimmedLine.match(/^\d+\./)) {
        // Eğer Türkçe karakterler varsa veya Arapça başladıysa
        if (arabicStarted || /[çğıöşüÇĞIİÖŞÜ]/.test(trimmedLine)) {
          turkishText += trimmedLine + ' ';
          turkishStarted = true;
        }
      }
    }

    // Eğer açıklama varsa ve ayrı bir alandaysa
    let cleanExplanation = '';
    if (explanation) {
      cleanExplanation = explanation.replace(/AÇIKLAMA:\s*/g, '').trim();
    }

    // Başlık yoksa ilk satırdan oluştur
    if (!title && fullContent) {
      const firstLine = fullContent.split(/\\r\\n|\\n|\r\n|\n/)[0] || fullContent.substring(0, 100);
      title = firstLine.replace(/[\u0600-\u06FF]/g, '').trim().substring(0, 200) || 'Hadis';
    }

    // Sadece gerçek hadis içeriği olanları ekle
    if (hadisId && (arabicText.trim() || turkishText.trim() || fullContent.length > 50)) {
      hadisler.push({
        id: hadisId,
        title: title || 'Hadis',
        arabicText: arabicText.trim(),
        turkishText: turkishText.trim() || (fullContent.length > 200 ? fullContent.substring(0, 500) : fullContent),
        explanation: cleanExplanation,
        kitapId,
        bolumId,
        altBolumId,
        siraNo,
        date,
      });
    }
  }

  return { hadisler, categories };
}

// Text normalization için
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

