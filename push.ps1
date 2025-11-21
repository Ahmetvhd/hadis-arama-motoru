# GitHub Push Script
# Kullanım: .\push.ps1 -GitHubUsername "YOUR_USERNAME" -RepoName "hadis-arama-motoru"

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "hadis-arama-motoru",
    
    [Parameter(Mandatory=$false)]
    [string]$Token = "YOUR_GITHUB_TOKEN"
)

Write-Host "GitHub'a push ediliyor..." -ForegroundColor Green

# Remote kontrolü
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "Mevcut remote kaldırılıyor..." -ForegroundColor Yellow
    git remote remove origin
}

# Yeni remote ekle
$remoteUrl = "https://${Token}@github.com/${GitHubUsername}/${RepoName}.git"
Write-Host "Remote ekleniyor: https://github.com/${GitHubUsername}/${RepoName}.git" -ForegroundColor Cyan
git remote add origin $remoteUrl

# Branch'i main yap
git branch -M main

# Push et
Write-Host "Push ediliyor..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Başarıyla GitHub'a push edildi!" -ForegroundColor Green
    Write-Host "`nVercel'e deploy için:" -ForegroundColor Cyan
    Write-Host "1. https://vercel.com adresine gidin" -ForegroundColor White
    Write-Host "2. GitHub ile giriş yapın" -ForegroundColor White
    Write-Host "3. 'Add New Project' → '$RepoName' repository'sini seçin" -ForegroundColor White
    Write-Host "4. 'Deploy' butonuna tıklayın" -ForegroundColor White
} else {
    Write-Host "`n❌ Push sırasında bir hata oluştu!" -ForegroundColor Red
    Write-Host "Lütfen GitHub'da repository oluşturduğunuzdan emin olun: https://github.com/new" -ForegroundColor Yellow
}

