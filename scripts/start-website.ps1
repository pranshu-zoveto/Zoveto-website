# Zoveto marketing site - reliable dev start on Windows
# Fixes: "npm is not recognized" and broken node_modules/.bin shims

$ErrorActionPreference = "Stop"

$NodeDirs = @(
    "${env:ProgramFiles}\nodejs",
    "${env:ProgramFiles(x86)}\nodejs",
    "C:\nvm4w\nodejs",
    "$env:LOCALAPPDATA\Programs\node"
)

$NodeHome = $null
foreach ($d in $NodeDirs) {
    if (Test-Path "$d\node.exe") {
        $NodeHome = $d
        break
    }
}

if (-not $NodeHome) {
    Write-Host "Node.js was not found. Install LTS from https://nodejs.org/ then re-run this script." -ForegroundColor Red
    exit 1
}

$env:Path = "$NodeHome;$env:Path"

Write-Host "Using Node from: $NodeHome" -ForegroundColor Cyan
& "$NodeHome\node.exe" -v
& "$NodeHome\npm.cmd" -v

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$NextBin = Join-Path $Root "node_modules\next\dist\bin\next"
if (-not (Test-Path $NextBin)) {
    Write-Host ""
    Write-Host "Dependencies missing or incomplete. Cleaning node_modules (1-2 min)..." -ForegroundColor Yellow
    if (Test-Path "$Root\node_modules") {
        cmd /c "rmdir /s /q `"$Root\node_modules`"" 2>$null
        Start-Sleep -Seconds 2
        if (Test-Path "$Root\node_modules") {
            Write-Host "First delete pass left files; retrying..." -ForegroundColor Yellow
            cmd /c "rmdir /s /q `"$Root\node_modules`"" 2>$null
        }
    }
    Write-Host "Running npm install..." -ForegroundColor Cyan
    & "$NodeHome\npm.cmd" install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm install failed. Close other programs using this folder and run again." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

if (-not (Test-Path $NextBin)) {
    Write-Host "next CLI still missing at $NextBin - run: npm install" -ForegroundColor Red
    exit 1
}

Write-Host ""
$port = 3002
$conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
foreach ($c in $conns) {
    if ($c.OwningProcess -gt 0) {
        Write-Host "Stopping process $($c.OwningProcess) using port $port..." -ForegroundColor Yellow
        Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
    }
}
Write-Host "Starting dev server at http://localhost:$port" -ForegroundColor Green
Write-Host ""
& "$NodeHome\npm.cmd" run dev
