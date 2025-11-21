# GitHub ve Vercel Kurulum Adımları

## ⚡ Hızlı Kurulum

### 1. GitHub'da Repository Oluşturun

1. **https://github.com/new** adresine gidin
2. Repository adı: `hadis-arama-motoru`
3. Description: `DELAİLU'D-DİN KİTABI - Hadis Arama Motoru`
4. **Public** seçin (veya Private)
5. **ÖNEMLİ:** README, .gitignore, license **EKLEMEYİN** (boş repository oluşturun)
6. **"Create repository"** butonuna tıklayın

### 2. GitHub'a Push Edin

PowerShell'de şu komutları çalıştırın:

```powershell
# Remote ekle
git remote add origin https://YOUR_TOKEN@github.com/Ahmetvhd/hadis-arama-motoru.git

# Branch'i main yap
git branch -M main

# Push et
git push -u origin main
```

### 3. Vercel'e Deploy Edin

1. **https://vercel.com** adresine gidin
2. **"Sign Up"** ile GitHub hesabınızla giriş yapın
3. **"Add New Project"** butonuna tıklayın
4. `hadis-arama-motoru` repository'sini seçin
5. Vercel otomatik olarak Next.js projesini algılayacak
6. **"Deploy"** butonuna tıklayın
7. Birkaç dakika içinde siteniz hazır olacak! 🎉

## 📝 Notlar

- İlk deploy biraz uzun sürebilir (hadisler.json dosyası büyük)
- Vercel ücretsiz planında 100MB dosya limiti vardır
- Eğer hadisler.json 100MB'dan büyükse, Git LFS kullanmanız gerekebilir

## 🔗 Repository URL

Repository oluşturduktan sonra: **https://github.com/Ahmetvhd/hadis-arama-motoru**

