$coursesDir = "d:\Parashari website new\AB_AI\courses"
$files = Get-ChildItem "$coursesDir\*.html"
$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'max-width: 1400px') {
        $content = $content -replace 'max-width: 1400px', 'max-width: 100%'
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)"
        $count++
    }
}

Write-Host "`nTotal files updated: $count"
