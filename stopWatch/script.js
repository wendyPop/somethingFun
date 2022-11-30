let startTime
let elapsedTime = 0
let timerInterval

// 여기가 핵심
const start = () => {
  // 현재시간 - 경과시간 = 시작시간
  startTime = Date.now() - elapsedTime
  timerInterval = setInterval(function printTime() {
    // 현재시간 - 시작시간 = 경과시간
    elapsedTime = Date.now() - startTime
    print(timeToString(elapsedTime)) // 경과한 시간을 화면에 표시
  }, 10)
  showButton('PAUSE')
}

const pause = () => {
  clearInterval(timerInterval)
  showButton('PLAY')
}

const reset = () => {
  clearInterval(timerInterval)
  print('00:00:00')
  elapsedTime = 0
  showButton('PLAY')
}

let playButton = document.getElementById('playButton')
let pauseButton = document.getElementById('pauseButton')
let resetButton = document.getElementById('resetButton')

playButton.addEventListener('click', start)
pauseButton.addEventListener('click', pause)
resetButton.addEventListener('click', reset)





function print(txt) {
  document.getElementById('display').innerHTML = txt
}

function showButton( key ) {
  const buttonToShow = key === 'PLAY' ? playButton : pauseButton
  const buttonToHide = key === 'PLAY' ? pauseButton : playButton
  buttonToShow.style.display = 'block'
  buttonToHide.style.display = 'none'
}

function timeToString(time) {

  let diffInHrs = time / 3600000;

  // 분
  let hh = Math.floor(diffInHrs)
  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin)

  // 초
  let diffInSec = (diffInMin - mm) * 60
  let ss = Math.floor(diffInSec)

  // 밀리초
  let diffInMs = (diffInSec - ss) * 100
  let ms = Math.floor(diffInMs)

  let formattedMM = mm.toString().padStart(2, '0')
  let formattedSS = ss.toString().padStart(2, '0')
  let formattedMS = ms.toString().padStart(2, '0')

  return `${formattedMM} : ${formattedSS} : ${formattedMS}`
}
