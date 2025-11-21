# Vercel CLI ile Deploy - Adım Adım

## ⚠️ Önemli: hadisler.json Dosyası

`hadisler.json` dosyası GitHub'a yüklenmedi (140 MB > 100 MB limit). Bu yüzden Vercel CLI ile deploy etmemiz gerekiyor.

## 🚀 Deploy Adımları

### 1. Vercel'e Giriş Yapın

PowerShell'de şu komutu çalıştırın:

```powershell
vercel login
```

Bu komut sizi tarayıcıda açılacak bir sayfaya yönlendirecek. GitHub hesabınızla giriş yapın.

### 2. İlk Deploy (Development)

```powershell
vercel
```

Bu komut size sorular soracak:
- **Set up and deploy?** → `Y` (Yes)
- **Which scope?** → GitHub kullanıcı adınızı seçin
- **Link to existing project?** → `N` (No - yeni proje)
- **What's your project's name?** → `hadis-arama-motoru` (veya istediğiniz isim)
- **In which directory is your code located?** → `./` (mevcut klasör)
- **Want to override the settings?** → `N` (No)

### 3. Production Deploy

İlk deploy başarılı olduktan sonra:

```powershell
vercel --prod
```

Bu komut production ortamına deploy edecek.

## ✅ Kontrol

Deploy tamamlandıktan sonra Vercel size bir URL verecek. Bu URL'yi tarayıcıda açarak sitenizi görebilirsiniz.

## 📝 Notlar

- İlk deploy biraz uzun sürebilir (hadisler.json dosyası büyük)
- Vercel'in dosya limiti GitHub'dan daha yüksektir
- Dosya local'den yükleneceği için hadisler.json dahil olacak

## 🔧 Sorun Giderme

Eğer deploy sırasında hata alırsanız:

1. `vercel login` ile tekrar giriş yapın
2. `vercel --prod --force` ile zorla deploy edin
3. Vercel Dashboard'dan logları kontrol edin

