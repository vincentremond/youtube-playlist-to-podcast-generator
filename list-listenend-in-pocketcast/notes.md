# 2020.11.04-pocketcast

https://api.pocketcasts.com/user/podcast/episodes
https://podcasts.pocketcasts.com/63ec1fb0-594a-0138-97c9-0acc26574db2/episodes_full_1604481224.json
https://www.youtube.com/playlist?list=PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw

``` js
JSON.stringify(
    Array
        .from(document.querySelectorAll('ytd-playlist-video-list-renderer ytd-playlist-video-renderer'))
        .map(i => {
            const title = i.querySelector('#video-title').title;
            const link = i.querySelector('#content a#thumbnail').href;
            return { title: title, link: link};
        })
);
```

``` powershell
node index.js
```
