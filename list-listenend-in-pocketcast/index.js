'use strict';

const fs = require('fs');

const getJson = function (name) {
  const path = `data/${name}.json`;
  const content = fs.readFileSync(path);
  const parsed = JSON.parse(content);
  return parsed;
}

const extractYoutubeInfo = function (url) {
  const { groups } = /^https\:\/\/pas\-bien\.net\/wl\-listen\/(?<playlistId>PL.+?)\/(?<videoId>.+?)\/audio\.mp3$/.exec(url);
  return groups;
}

// return console.log(extractYoutubeInfo('https://pas-bien.net/wl-listen/PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw/ZiovoWa2DPw/audio.mp3'));

const cleanTitle = t => t.replace(/[\[\]]/gi, '');

const displayResult = episode => `- [ ] https://www.youtube.com/watch?v=${episode.videoId}&list=${episode.playlistId}[${episode.title}]`

const podcastEpisodesInPocketCast = getJson("episodes_full_1604481224")
  .podcast
  .episodes
  .map(e => {
    const yt = extractYoutubeInfo(e.url);
    return {
      uuid: e.uuid,
      videoId: yt.videoId,
      playlistId: yt.playlistId,
      title: cleanTitle(e.title)
    }
  });
const userEpisodes = getJson("episodes").episodes;
const inYoutubePlaylistIds = getJson('inplaylist').map(e => {
  console.log(e.link);
  const { groups: { videoId } } = /^https:\/\/www.youtube.com\/watch\?v=(?<videoId>.+?)&list=(?<playlistId>.+?)&index=(?<index>\d+)(&t=(?<timestamp>\d+s))?$/.exec(e.link);
  return videoId;
});

const finishedStatus = 3;

const finishedEpisodesInPocketCastIds = userEpisodes
  .filter(e => e.playingStatus == finishedStatus)
  .map(e => e.uuid);

const episodesToRemove = podcastEpisodesInPocketCast
  .filter(pe => finishedEpisodesInPocketCastIds.includes(pe.uuid))
  .filter(pe => inYoutubePlaylistIds.includes(pe.videoId));

const result = episodesToRemove.map(displayResult).join('\n');

fs.writeFileSync('results.adoc', result);

console.log('done');

