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
// timer
let currentTimer
let totalDurationTimer
let sliderTimer

const trackAlbum = document.querySelector('.track-art')
const trackName = document.querySelector('.track-name')
const trackArtist = document.querySelector('.track-artist')
let currentTime = document.querySelector('.current-time')
let totalDuration = document.querySelector('.total-duration')
// const badge = document.querySelector('.badge')
const slider = document.querySelector('.seek_slider')
slider.addEventListener('change', function(event) {
  console.log(event.target.value)
  audioElem.currentTime = event.target.value;
})

/*const randomTrack = () => {
  alert('랜덤 뮤직 재생 구현하기')
}*/

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
  if (!audioElem) {
    return false
  }
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

  // 화면 요소 핸들링
  // 앨범 로드후 회전
  // 무한루프라면 다시 슬라이더 초기화
  slider.value = 0
  // badge.classList.add('hidden')
  trackAlbum.style.backgroundImage = `url(${musicList[currentPlay].album})`;
  trackAlbum.classList.add('rotate');
  // 버튼요소들 토글
  let playBtn = document.querySelector('.fa-play-circle')
  playBtn.classList.remove('fa-play-circle')
  playBtn.classList.add('fa-pause-circle')

  // Audio 요소를 통한 방법
  audioElem = document.createElement('audio');
  audioElem.src = musicList[currentPlay].music
  audioElem.loop = false

  // 오디오가 로드되면
  audioElem.addEventListener('loadedmetadata', function(){
    totalDuration.innerHTML = toMMSS(audioElem.duration)
    currentDuration = audioElem.duration
    slider.max = parseInt(audioElem.duration)
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


const setCurrentCountUp = () => {

  // 현재 구간 시계
  currentTimer = setInterval(function(){
    currentTime.innerHTML = toMMSS(audioElem.currentTime)
    if (audioElem.currentTime === audioElem.duration) {
      if(audioElem.loop) {
        console.log('다시 재생을 해야함 ? 가능 ?')
        // todo 현재 무한루프중이라면 다시 재생
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

  // 현재 슬라이더 위치
  sliderTimer = setInterval(function(){
    slider.value++
    if (slider.value === audioElem.duration) {
      alert('슬라이더 끝났다')
      slider.value = 0
      clearInterval(sliderTimer)
    }
  }, 1000)
}

const setTotalCountDown = () => {
  // 노래 전체 구간 카운트 다운
  totalDurationTimer = setInterval(function(){
    if( parseInt(currentDuration) <= 0) {
      clearInterval(totalDurationTimer)
    }
    totalDuration.innerHTML = toMMSS(currentDuration--)
  }, 1000)
}


const prevTrack = () => {

  if(!audioElem){
    return false
  }
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

/*const repeatTrack = () => {
  if(!audioElem) {
    return false
  }
  if(audioElem.loop){
    badge.classList.add('hidden')
    audioElem.loop = false
  } else {
    badge.classList.remove('hidden')
    audioElem.loop = true
  }
}*/

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
