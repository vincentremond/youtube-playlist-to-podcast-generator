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

const cleanTitle = t => t.replace(/[\[\]]/gi, '');

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
const finishedStatus = 3;
const finishedEpisodesInPocketCastIds = userEpisodes
  .filter(e => e.playingStatus == finishedStatus)
  .map(e => e.uuid);

const episodesToRemove = podcastEpisodesInPocketCast
  .filter(pe => finishedEpisodesInPocketCastIds.includes(pe.uuid))
  ;

const jsonResult = episodesToRemove.map(e => e.videoId);


fs.writeFileSync('data/results.json', JSON.stringify(jsonResult));

console.log('done');
