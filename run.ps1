param (
    $playlistId = "PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw",
    $hostingBaseUrl = "https://pas-bien.net/wl-listen/"
)

# Try update youtube-dl
gsudo.exe choco upgrade youtube-dl -y

# Download playlist infos
Write-Host "Download playlist infos... (might be slow and without output)" --ForegroundColor Yellow
youtube-dl `
    --flat-playlist `
    -J `
    "https://www.youtube.com/playlist?list=$($playlistId)" `
| Out-File "data/$($playlistId)/playlist.json"

# Downloading videos
Write-Host "Downloading all not live videos... (might be very slow)" --ForegroundColor Yellow
youtube-dl `
  --match-filter "!is_live" `
  --download-archive "data/$($playlistId)/downloaded.txt" `
  --output "data/$($playlistId)/%(id)s/audio.%(ext)s" `
  --write-info-json `
  --extract-audio `
  --audio-format mp3  `
  --ignore-errors `
  https://www.youtube.com/playlist?list=$($playlistId)

# Downloading Lives
Write-Host "Downloading live videos... (might be very slow)" --ForegroundColor Yellow
$liveDateFilter = ([System.DateTime]::Now).AddDays(-2).ToString("yyyyMMdd")
youtube-dl `
  --match-filter "is_live" `
  --datebefore "$liveDateFilter" `
  --download-archive "data/$($playlistId)/downloaded.txt" `
  --output "data/$($playlistId)/%(id)s/audio.%(ext)s" `
  --write-info-json `
  --extract-audio `
  --audio-format mp3  `
  --ignore-errors `
  https://www.youtube.com/playlist?list=$($playlistId)

Write-Host "Generating Xml feed"
dotnet run `
    --project .\MakeRss\MakeRss\MakeRss.csproj `
    -- `
    --playlist-id "$($playlistId)" `
    --hosting-base-url "$($hostingBaseUrl)"
