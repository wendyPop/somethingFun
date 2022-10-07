const musicList = [
  {
    name: 'music no.1',
    artist: 'music no.1 artist',
    album: './album1.jpeg',
    time: '',
    music: './Before-I-Forget.mp3'
  },
  {
    name: 'music no.2',
    artist: 'music no.2 artist',
    album: './album2.jpeg',
    time: '',
    music: './Hard-Official-.mp3'
  },
  {
    name: 'music no.3',
    artist: 'music no.2 artist',
    album: './album3.jpeg',
    time: '',
    music: './Luke-Bergs-Good-Vibes.mp3'
  }
]

let currentPlay = 0
let currentAudio = null
let audioElem = null
let currentDuration
let currentTimer
let totalDurationTimer
const trackAlbum = document.querySelector('.track-art')
const trackName = document.querySelector('.track-name')
const trackArtist = document.querySelector('.track-artist')
let currentTime = document.querySelector('.current-time')
let totalDuration = document.querySelector('.total-duration')


function seekTo() {
  // todo 음악을 빨리감기, 뒤로감기 등등 ?
}

const randomTrack = () => {
  // todo 음악들 순서를 섞어주자
  alert('랜덤 뮤직')
}

// 음악 재생 또는 정지
const playAndPauseTrack = () => {
  // 음악 재생
  if(audioElem && !audioElem.paused) {
    musicPause()
  } else {
    musicStart()
  }
}

const musicPause = () => {
  // todo 정지를 하지만 정지한 구간을 기억하기
  trackAlbum.classList.remove('rotate')
  let playBtn = document.querySelector('.fa-pause-circle')
  playBtn.classList.remove('fa-pause-circle')
  playBtn.classList.add('fa-play-circle')

  // 1 Audio 요소를 통한 방법
  audioElem.pause()
  clearInterval(currentTimer)
  clearInterval(totalDurationTimer)
  // 2 Audio 생성자를 이용한 방법
  // currentAudio.pause()
}

const musicStart = () => {
  trackAlbum.style.backgroundImage = `url(${musicList[currentPlay].album})`;
  trackAlbum.classList.add('rotate');

  let playBtn = document.querySelector('.fa-play-circle')
  playBtn.classList.remove('fa-play-circle')
  playBtn.classList.add('fa-pause-circle')

  // Audio 요소를 통한 방법
  audioElem = document.createElement('audio');
  audioElem.src = musicList[currentPlay].music
  audioElem.addEventListener('loadedmetadata', function(){
    totalDuration.innerHTML = toMMSS(audioElem.duration)
    currentDuration = audioElem.duration
  })
  audioElem.play()
  setCurrentCountUp()
  setTotalCountDown()


  trackName.innerText = musicList[currentPlay].name;
  trackArtist.innerText = musicList[currentPlay].artist;

  // Audio 생성자를 통한 방법
  // currentAudio = new Audio(musicList[currentPlay].music);
  // currentAudio.volume = 1
  // currentAudio.play()
}



// todo 프로그래스바 change 음악 구간 변경

const setCurrentCountUp = () => {

  // todo 프로그래스바도 따라서 count up 하기
  currentTimer = setInterval(function(){
    currentTime.innerHTML = toMMSS(audioElem.currentTime)
    if (audioElem.currentTime === audioElem.duration) {
      if(audioElem.loop) {
        currentPlay = Number(currentPlay)
        clearInterval(currentTimer)
        musicStart()
      } else {
        currentPlay++
        clearInterval(currentTimer)
        musicStart()
      }
    }
  }, 1000)
}

const setTotalCountDown = () => {
  totalDurationTimer = setInterval(function(){
    if( parseInt(currentDuration) <= 0) {
      clearInterval(totalDurationTimer)
    }
    totalDuration.innerHTML = toMMSS(currentDuration--)
  }, 1000)
}

const musicReset = () => {
  trackAlbum.style.backgroundImage = null
  trackName.innerText = '';
  trackArtist.innerText = '';
  currentAudio = null;
}

const prevTrack = () => {
  if(currentPlay <= 0) {
    alert('첫번째 곡입니다.')
    return false
  }
  currentPlay--
  musicPause()
  musicStart()
}

const nextTrack = () => {
  if(currentPlay >= (musicList.length-1)) {
    alert('마지막 곡입니다.')
    return false
  }
  currentPlay++
  musicPause()
  musicStart()
}

const repeatTrack = () => {
  // todo 화면에 작은 툴팁 같은거 토글
  audioElem.loop = !!audioElem.loop;
}

const toMMSS = (param) => {
  var sec_num = parseInt(param, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes+':'+seconds;
}
