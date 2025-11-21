# Hızlı Başlangıç - GitHub ve Vercel

## Adım 1: GitHub'da Repository Oluşturun

1. https://github.com/new adresine gidin
2. Repository adı: `hadis-arama-motoru` (veya istediğiniz isim)
3. **Public** veya **Private** seçin
4. **"Create repository"** butonuna tıklayın
5. **ÖNEMLİ:** Repository'yi boş oluşturun (README, .gitignore, license eklemeyin)

## Adım 2: GitHub'a Push Edin

PowerShell'de şu komutu çalıştırın (YOUR_USERNAME'i GitHub kullanıcı adınızla değiştirin):

```powershell
.\push.ps1 -GitHubUsername "YOUR_USERNAME" -RepoName "hadis-arama-motoru"
```

VEYA manuel olarak:

```powershell
# Remote ekle (YOUR_USERNAME'i değiştirin)
git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/hadis-arama-motoru.git

# Branch'i main yap
git branch -M main

# Push et
git push -u origin main
```

## Adım 3: Vercel'e Deploy Edin

1. https://vercel.com adresine gidin
2. **"Sign Up"** ile GitHub hesabınızla giriş yapın
3. **"Add New Project"** butonuna tıklayın
4. GitHub repository'nizi seçin (`hadis-arama-motoru`)
5. Vercel otomatik olarak Next.js projesini algılayacak
6. **"Deploy"** butonuna tıklayın
7. Birkaç dakika içinde siteniz hazır olacak! 🎉

## Sorun Giderme

### Push hatası alıyorsanız:
- GitHub'da repository oluşturduğunuzdan emin olun
- Token'ın geçerli olduğundan emin olun
- Repository adının doğru olduğundan emin olun

### Vercel deploy hatası:
- `hadisler.json` dosyası çok büyük olabilir (100MB limit)
- Bu durumda Git LFS kullanmanız gerekebilir

## Git LFS Kullanımı (Eğer dosya çok büyükse)

```powershell
# Git LFS yükle
git lfs install

# hadisler.json'u LFS ile takip et
git lfs track "hadisler.json"

# Commit ve push
git add .gitattributes
git commit -m "Add Git LFS tracking"
git push
```

