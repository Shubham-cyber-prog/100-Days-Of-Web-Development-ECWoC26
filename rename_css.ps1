# PowerShell script to standardize CSS file names in daily project directories
# Renames 'styles.css' to 'style.css' and updates references in HTML files

Get-ChildItem -Path "public" -Directory | ForEach-Object {
    $dayDir = $_.FullName
    $stylesFile = Join-Path $dayDir "styles.css"
    $styleFile = Join-Path $dayDir "style.css"
    $htmlFile = Join-Path $dayDir "index.html"

    # Rename styles.css to style.css if it exists
    if (Test-Path $stylesFile) {
        Rename-Item $stylesFile $styleFile
        Write-Host "Renamed $stylesFile to $styleFile"
    }

    # Update reference in index.html if it exists
    if (Test-Path $htmlFile) {
        $content = Get-Content $htmlFile -Raw
        if ($content -match 'href="styles\.css"') {
            $newContent = $content -replace 'href="styles\.css"', 'href="style.css"'
            Set-Content $htmlFile $newContent
            Write-Host "Updated reference in $htmlFile"
        }
    }
}

Write-Host "CSS file standardization complete."
