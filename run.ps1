param (
$playlistId = "PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw"
)

youtube-dl `
    --flat-playlist `
    -J `
    --playlist-items 1-10 `
    "https://www.youtube.com/playlist?list=$($playlistId)" `
    | Out-File "data/$($playlistId)/playlist.json"

# youtube-dl `
#     --download-archive "data/$($playlistId)/downloaded.txt" `
#     --output "data/$($playlistId)/%(id)s/audio.%(ext)s" `
#     --write-info-json `
#     --extract-audio `
#     --audio-format mp3  `
#     --playlist-items 1-10 `
#     https://www.youtube.com/playlist?list=$($playlistId)

dotnet run --project .\MakeRss\MakeRss\MakeRss.csproj -- --playlist-id "$($playlistId)"
