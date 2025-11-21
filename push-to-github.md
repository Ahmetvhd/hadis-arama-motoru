# GitHub'a Push Etme Adımları

## 1. GitHub'da Repository Oluşturun

1. https://github.com/new adresine gidin
2. Repository adı: `hadis-arama-motoru` (veya istediğiniz bir isim)
3. Public veya Private seçin
4. "Create repository" butonuna tıklayın

## 2. Token ile Push Etme

Aşağıdaki komutları çalıştırın (YOUR_USERNAME'i GitHub kullanıcı adınızla değiştirin):

```bash
# Remote ekle
git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/hadis-arama-motoru.git

# Branch'i main yap
git branch -M main

# Push et
git push -u origin main
```

VEYA daha güvenli yöntem (token'ı environment variable olarak):

```bash
# Token'ı environment variable olarak ayarla
$env:GITHUB_TOKEN="YOUR_GITHUB_TOKEN"

# Remote ekle (token olmadan)
git remote add origin https://github.com/YOUR_USERNAME/hadis-arama-motoru.git

# Push et (token environment variable'dan alınacak)
git push -u origin main
```

## 3. Vercel'e Deploy

1. https://vercel.com adresine gidin
2. GitHub ile giriş yapın
3. "Add New Project" → Repository'nizi seçin
4. "Deploy" butonuna tıklayın

