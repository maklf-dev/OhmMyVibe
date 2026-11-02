# Optional ONE-TIME installation for the official Driver.js distribution.
# Only run on a computer with Internet when preparing the presentation.
# The app itself does not require the network, even without Driver.js.
param([switch]$RebuildStandalone)
$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
$target = Join-Path $project 'vendor'
New-Item -ItemType Directory -Force -Path $target | Out-Null
$version = '1.10.2'
$base = "https://cdn.jsdelivr.net/npm/driver.js@$version"
$files = @(
  @{url="$base/dist/driver.js.iife.min.js"; name='driver.js.iife.min.js'; min=5000},
  @{url="$base/dist/driver.min.css"; name='driver.min.css'; min=1000},
  @{url="$base/license"; name='LICENSE.driver-js.txt'; min=100}
)
$tempFiles = @()
try {
  foreach ($item in $files) {
    $tmp = Join-Path $env:TEMP ('pspice-driver-'+[guid]::NewGuid().ToString('N'))
    Invoke-WebRequest -Uri $item.url -OutFile $tmp -UseBasicParsing -TimeoutSec 40
    $content = [System.IO.File]::ReadAllText($tmp)
    if ((Get-Item $tmp).Length -lt $item.min -or $content.TrimStart().StartsWith('<')) {
      throw "Invalid response for $($item.name)"
    }
    $tempFiles += @{path=$tmp; name=$item.name}
  }
  foreach ($f in $tempFiles) { Move-Item -LiteralPath $f.path -Destination (Join-Path $target $f.name) -Force }
  Write-Host "Driver.js $version successfully downloaded into vendor/." -ForegroundColor Green
  Write-Host 'The modular index.html now uses official Driver.js fully offline.'
  if ($RebuildStandalone) {
    $py = Get-Command py -ErrorAction SilentlyContinue
    if ($py) { & py (Join-Path $PSScriptRoot 'build_standalone.py') }
    else { Write-Warning 'Python launcher missing. Modular index.html still works; standalone keeps the built-in guide.' }
  }
} finally {
  foreach ($f in $tempFiles) { if (Test-Path $f.path) { Remove-Item $f.path -Force } }
}
