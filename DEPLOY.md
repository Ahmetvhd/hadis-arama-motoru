# GitHub ve Vercel Deployment Rehberi

## GitHub'a Yükleme

1. GitHub'da yeni bir repository oluşturun: https://github.com/new
2. Repository adını girin (örn: `hadis-arama-motoru`)
3. Repository'yi oluşturun

4. Terminal'de şu komutları çalıştırın:

```bash
# Remote repository ekle (YOUR_USERNAME ve REPO_NAME'i değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Branch'i main olarak değiştir (eğer master kullanıyorsanız)
git branch -M main

# GitHub'a push et
git push -u origin main
```

## Vercel'e Deploy

### Otomatik Deploy (Önerilen)

1. https://vercel.com adresine gidin
2. "Sign Up" ile GitHub hesabınızla giriş yapın
3. "Add New Project" butonuna tıklayın
4. GitHub repository'nizi seçin
5. Vercel otomatik olarak Next.js projesini algılayacak
6. "Deploy" butonuna tıklayın

### Manuel Deploy

Vercel CLI kullanarak:

```bash
# Vercel CLI yükle
npm i -g vercel

# Deploy et
vercel

# Production'a deploy et
vercel --prod
```

## Önemli Notlar

- `hadisler.json` dosyası çok büyük olduğu için ilk deploy biraz uzun sürebilir
- Vercel ücretsiz planında dosya boyutu limiti 100MB'dır
- Eğer `hadisler.json` 100MB'dan büyükse, dosyayı Git LFS ile yüklemeniz gerekebilir

## Git LFS Kullanımı (Eğer dosya çok büyükse)

```bash
# Git LFS yükle
git lfs install

# hadisler.json'u LFS ile takip et
git lfs track "hadisler.json"

# .gitattributes dosyasını commit et
git add .gitattributes
git commit -m "Add Git LFS tracking for hadisler.json"
git push
```

