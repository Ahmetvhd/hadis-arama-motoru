# GitHub Repository Oluşturma ve Push Script
param(
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "hadis-arama-motoru",
    
    [Parameter(Mandatory=$false)]
    [string]$Token = "YOUR_GITHUB_TOKEN",
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubUsername = "Ahmetvhd"
)

Write-Host "GitHub Repository Oluşturuluyor..." -ForegroundColor Green

# GitHub API ile repository oluştur
$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = $RepoName
    description = "DELAİLU'D-DİN KİTABI - Hadis Arama Motoru - SÜNNET • İCMA • KIYAS"
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "✅ Repository başarıyla oluşturuldu: $($response.html_url)" -ForegroundColor Green
    
    # Remote kontrolü
    $remoteExists = git remote get-url origin 2>$null
    if ($remoteExists) {
        Write-Host "Mevcut remote kaldırılıyor..." -ForegroundColor Yellow
        git remote remove origin
    }
    
    # Remote ekle
    $remoteUrl = "https://${Token}@github.com/${GitHubUsername}/${RepoName}.git"
    Write-Host "Remote ekleniyor..." -ForegroundColor Cyan
    git remote add origin $remoteUrl
    
    # Branch'i main yap
    git branch -M main
    
    # Push et
    Write-Host "Push ediliyor..." -ForegroundColor Green
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Başarıyla GitHub'a push edildi!" -ForegroundColor Green
        Write-Host "`nRepository URL: $($response.html_url)" -ForegroundColor Cyan
        Write-Host "`nVercel'e deploy için:" -ForegroundColor Yellow
        Write-Host "1. https://vercel.com adresine gidin" -ForegroundColor White
        Write-Host "2. GitHub ile giriş yapın" -ForegroundColor White
        Write-Host "3. 'Add New Project' → '$RepoName' repository'sini seçin" -ForegroundColor White
        Write-Host "4. 'Deploy' butonuna tıklayın" -ForegroundColor White
    }
} catch {
    Write-Host "`n❌ Hata: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response.StatusCode -eq 422) {
        Write-Host "Repository zaten mevcut olabilir. Push ediliyor..." -ForegroundColor Yellow
        # Repository zaten varsa sadece push et
        $remoteExists = git remote get-url origin 2>$null
        if ($remoteExists) {
            git remote remove origin
        }
        $remoteUrl = "https://${Token}@github.com/${GitHubUsername}/${RepoName}.git"
        git remote add origin $remoteUrl
        git branch -M main
        git push -u origin main
    }
}

