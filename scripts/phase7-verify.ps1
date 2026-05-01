# Phase 7 verification helper. Run from anywhere:
#   pwsh -File d:\WORK\ZOVETO\zoveto-website\scripts\phase7-verify.ps1
param(
  [switch] $SkipDocker,
  [switch] $SkipCos
)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $root

function Write-Step($msg) { Write-Host "`n=== $msg ===" -ForegroundColor Cyan }

Write-Step "typecheck"
npm run typecheck

Write-Step "lint"
npm run lint

Write-Step "build"
npm run build

if (-not $SkipDocker) {
  Write-Step "docker (optional)"
  if (Get-Command docker -ErrorAction SilentlyContinue) {
    docker version 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
      docker build -t zoveto-website-test $root
      if ($LASTEXITCODE -eq 0) {
        Write-Host "Docker build OK." -ForegroundColor Green
      }
    } else {
      Write-Host "SKIP: Docker CLI cannot reach the engine (start Docker Desktop)." -ForegroundColor Yellow
    }
  } else {
    Write-Host "SKIP: docker not in PATH." -ForegroundColor Yellow
  }
}

if (-not $SkipCos) {
  Write-Step "COS POST /api/leads (optional)"
  $body = '{"fullName":"WebsiteTest","email":"test@zoveto.com","organization":"Audit Co"}'
  $out = curl.exe -s -w "`nHTTP_CODE:%{http_code}" -X POST "http://localhost:3000/api/leads" -H "Content-Type: application/json" -d $body 2>&1
  Write-Host $out
  if ($out -match "HTTP_CODE:000") {
    Write-Host "SKIP: nothing listening on localhost:3000 (start COS Nest backend)." -ForegroundColor Yellow
  }
}

Write-Host "`nPhase 7 script finished." -ForegroundColor Green
