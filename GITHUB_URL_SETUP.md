# GitHub Repository URL Ayarlama

## GitHub'da "Visit site" Butonunu Aktif Etme

GitHub repository'nizde "Visit site" butonunun çalışması için repository ayarlarına site URL'ini eklemeniz gerekiyor.

### Adımlar:

1. **GitHub Repository'nize gidin:**
   - https://github.com/Ahmetvhd/hadis-arama-motoru

2. **Settings'e gidin:**
   - Repository sayfasında sağ üstte **"Settings"** butonuna tıklayın

3. **Pages bölümüne gidin:**
   - Sol menüden **"Pages"** seçeneğine tıklayın

4. **Custom domain veya URL ekleyin:**
   - **"Source"** bölümünde **"Deploy from a branch"** seçin
   - Veya **"Custom domain"** kısmına Vercel URL'nizi ekleyin:
     ```
     hadis-arama-motoru.vercel.app
     ```

### Alternatif: Repository About Bölümüne URL Ekleme

1. Repository ana sayfasında sağ üstte **⚙️ (Settings ikonu)** yanındaki **"⚙️"** butonuna tıklayın
2. **"About"** bölümünde **"Website"** kısmına Vercel URL'nizi ekleyin:
   ```
   https://hadis-arama-motoru.vercel.app
   ```

### Vercel URL'nizi Bulma

Vercel'de deploy ettikten sonra:
1. Vercel Dashboard'a gidin: https://vercel.com/dashboard
2. Projenizi seçin
3. **"Domains"** bölümünden URL'nizi kopyalayın
4. Genellikle şu formatta olur: `hadis-arama-motoru-xxxxx.vercel.app` veya `hadis-arama-motoru.vercel.app`

### Örnek URL Formatları:

- Production: `https://hadis-arama-motoru.vercel.app`
- Preview: `https://hadis-arama-motoru-git-main-ahmetvhd.vercel.app`
- Custom Domain: `https://hadisler.example.com` (eğer custom domain eklediyseniz)

### Not:

Eğer Vercel'de henüz deploy etmediyseniz:
1. Önce Vercel'e deploy edin
2. URL'yi alın
3. GitHub repository ayarlarına ekleyin

