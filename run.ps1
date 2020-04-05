param (
    $playlistId = "PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw",
    $hostingBaseUrl = "https://pas-bien.net/wl-listen/"
)


# Download playlist infos
Write-Host "Download playlist infos... (might be slow and without output)" --ForegroundColor Yellow
youtube-dl `
    --flat-playlist `
    -J `
    "https://www.youtube.com/playlist?list=$($playlistId)" `
| Out-File "data/$($playlistId)/playlist.json"

# Downloading videos
Write-Host "Downloading all videos... (might be very slow)" --ForegroundColor Yellow
youtube-dl `
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
