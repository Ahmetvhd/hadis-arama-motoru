# 🚀 GitHub ve Vercel Kurulum - Adım Adım

## ✅ ADIM 1: GitHub'da Repository Oluşturun

1. **https://github.com/new** adresine gidin
2. **Repository name:** `hadis-arama-motoru` (tam olarak bu isim)
3. **Description:** `DELAİLU'D-DİN KİTABI - Hadis Arama Motoru`
4. **Public** seçin (veya Private - isterseniz)
5. ⚠️ **ÇOK ÖNEMLİ:** 
   - ❌ "Add a README file" işaretlemeyin
   - ❌ "Add .gitignore" seçmeyin
   - ❌ "Choose a license" seçmeyin
   - ✅ **Boş repository oluşturun!**
6. **"Create repository"** butonuna tıklayın

## ✅ ADIM 2: Repository Oluşturduktan Sonra Bana "Hazır" Yazın

Repository'yi oluşturduktan sonra bana "hazır" yazın, ben otomatik olarak push işlemini yapacağım.

VEYA kendiniz yapmak isterseniz, PowerShell'de şu komutları çalıştırın:

```powershell
git remote add origin https://YOUR_TOKEN@github.com/Ahmetvhd/hadis-arama-motoru.git
git branch -M main
git push -u origin main
```

## ✅ ADIM 3: Vercel'e Deploy

1. **https://vercel.com** adresine gidin
2. **"Sign Up"** ile GitHub hesabınızla giriş yapın
3. **"Add New Project"** butonuna tıklayın
4. `hadis-arama-motoru` repository'sini seçin
5. Vercel otomatik olarak Next.js projesini algılayacak
6. **"Deploy"** butonuna tıklayın
7. 🎉 Birkaç dakika içinde siteniz hazır olacak!

---

**Repository URL:** https://github.com/Ahmetvhd/hadis-arama-motoru

