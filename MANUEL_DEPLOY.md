# Vercel Manuel Deployment - Adım Adım

## ⚠️ ÖNEMLİ: Vercel Dashboard'dan Manuel Deployment Oluşturun

Vercel otomatik olarak yeni commit'leri çekmiyor. Manuel olarak deployment oluşturmanız gerekiyor.

## 📋 Adım Adım

### 1. Vercel Dashboard'a Gidin
- https://vercel.com/dashboard
- Projenizi seçin: `hadis-arama-motoru`

### 2. Manuel Deployment Oluşturun
1. **"Deployments"** sekmesine gidin
2. Sağ üstte **"Create Deployment"** butonuna tıklayın (mavi buton)
3. Açılan pencerede:
   - **"Select Branch"** → `main` seçin
   - **"Select Commit"** → En son commit'i seçin (e729230 veya daha yeni)
   - Commit listesinde en üstteki commit'i seçin
4. **"Deploy"** butonuna tıklayın

### 3. Build'i İzleyin
- Build başladığında logları görebilirsiniz
- Build tamamlanana kadar bekleyin (2-5 dakika)

### 4. Build Başarılı Olduğunda
- Deployment details sayfasında üstte **URL** görünecek
- URL: `https://hadis-arama-motoru.vercel.app` (veya benzeri)
- Bu URL'yi kopyalayın

### 5. GitHub'a URL Ekleyin
1. GitHub → Repository → About bölümünü düzenle (⚙️)
2. "Website" alanına: `https://hadis-arama-motoru.vercel.app`
3. "Save changes"

## 🔍 Commit Hash Kontrolü

Deployment oluştururken commit hash'inin **e729230** veya daha yeni olduğundan emin olun.

Eski commit (ef9b4e4) seçiliyse, build başarısız olacaktır!

