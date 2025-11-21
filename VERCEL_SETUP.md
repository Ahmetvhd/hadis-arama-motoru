# Vercel Deployment - hadisler.json Dosyası

## ⚠️ Önemli Not

`hadisler.json` dosyası 140 MB olduğu için GitHub'a yüklenemedi. Vercel'de deploy ederken dosyayı manuel olarak eklemeniz gerekiyor.

## Çözüm 1: Vercel'de Dosyayı Manuel Ekleme (Önerilen)

1. **Vercel Dashboard**'a gidin: https://vercel.com/dashboard
2. Projenizi seçin (`hadis-arama-motoru`)
3. **Settings** → **Environment Variables** bölümüne gidin
4. Dosyayı **Vercel CLI** ile yükleyin:

```bash
# Vercel CLI yükle (eğer yoksa)
npm i -g vercel

# Projeye bağlan
cd C:\Users\akoca\OneDrive\Masaüstü\hadisarama
vercel login

# Dosyayı yükle (Vercel File Storage kullanarak)
# Veya dosyayı proje klasörüne kopyalayın ve tekrar deploy edin
```

## Çözüm 2: Dosyayı Bölme (Alternatif)

Dosyayı daha küçük parçalara bölebiliriz. İsterseniz bunu yapabilirim.

## Çözüm 3: External Storage (En İyi Çözüm)

Dosyayı başka bir yerde host edip runtime'da indirebiliriz:
- Google Drive
- Dropbox
- AWS S3
- Vercel Blob Storage

## Çözüm 4: Vercel'de Build Sırasında Ekleme

Vercel'de build sırasında dosyayı eklemek için:

1. Dosyayı bir cloud storage'a yükleyin
2. Build script'inde dosyayı indirin
3. Veya Vercel'in file upload özelliğini kullanın

## Hızlı Çözüm

En kolay yol: Dosyayı proje klasöründe tutup, Vercel'e deploy ederken dosyayı da dahil edin. Vercel'in file size limiti daha yüksek olabilir.

**Öneri:** Vercel'de projeyi deploy edin, sonra `hadisler.json` dosyasını proje klasörüne ekleyip tekrar deploy edin. Vercel build sırasında dosyayı görecektir.

