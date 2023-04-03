import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const STORAGE_KEY = 'videoplayer-current-time';
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt ) {
  const currentTime = evt.seconds;
  localStorage.setItem(STORAGE_KEY, currentTime);
};

const savedTime = localStorage.getItem(STORAGE_KEY);
console.log(savedTime);
if (savedTime) {
  player.setCurrentTime(savedTime).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
}

// player.setCurrentTime(30.456).then(function(seconds) {
//   // seconds = the actual time that the player seeked to
// }).catch(function(error) {
//   switch (error.name) {
//       case 'RangeError':
//           // the time was less than 0 or greater than the video’s duration
//           break;

//       default:
//           // some other error occurred
//           break;
//   }
// });
