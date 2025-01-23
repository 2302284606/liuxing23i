# Set console encoding to UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Git configuration
git config --global user.email "LIUXING23I@2025.com"
git config --global user.name "2302284606"

# Check if new_files folder exists
if (-not (Test-Path "new_files")) {
    Write-Host "[Info] Creating new_files folder..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "new_files"
    Write-Host "[Action Required] Please put your files in the new_files folder and press any key to continue..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
}

# Check if new_files folder is empty
if ((Get-ChildItem -Path "new_files" -Force | Measure-Object).Count -eq 0) {
    Write-Host "[Error] new_files folder is empty! Please add files first." -ForegroundColor Red
    exit 1
}

# Clone repository
Write-Host "[Info] Cloning repository..." -ForegroundColor Blue
git clone https://github.com/2302284606/liuxing23i.git
Set-Location -Path "liuxing23i"

# Checkout main branch
Write-Host "[Info] Checking out main branch..." -ForegroundColor Blue
git checkout main

# Remove existing files
Write-Host "[Info] Removing existing files..." -ForegroundColor Blue
Get-ChildItem -Path . -Exclude .git | Remove-Item -Recurse -Force

# Copy new files
Write-Host "[Info] Copying new files..." -ForegroundColor Blue
Copy-Item -Path "..\new_files\*" -Destination "." -Recurse

# Git operations
Write-Host "[Info] Committing changes..." -ForegroundColor Blue
git add .
git commit -m "Update files"

Write-Host "[Info] Pushing to remote..." -ForegroundColor Blue
git push origin main

Write-Host "[Success] Files have been uploaded to GitHub successfully!" -ForegroundColor Green

# Return to original directory
Set-Location .. 