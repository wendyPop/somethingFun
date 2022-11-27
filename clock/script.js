const $hourEl = document.querySelector('.hour')
const $minuteEl = document.querySelector('.minute')
const $secondEl = document.querySelector('.second')
const $timeEl = document.querySelector('.time')
const $dateEl = document.querySelector('.date')
const $toggle = document.querySelector('.toggle')

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]
const months = [
  "Jan", "Fed", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
]

// exchange mode
$toggle.addEventListener('click', (e) => {
	const html = document.querySelector('html')
	if (html.classList.contains('dark')) {
	  html.classList.remove('dark')
	  e.target.innerHTML = 'Dark Mode'
	} else {
	  html.classList.add('dark')
	  e.target.innerHTML = 'Light Mode'
	}
})

function setTime() {

  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours(); // 24시간제
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  $hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`
  $minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
  $secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`
  $timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0` + minutes : minutes + ampm}`
  $dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  // ( 3 - 0 ) * (360 - 0) / ( 12 - 0 ) + 0 === 3 * 360 / 12 + 0 = 90 deg ( 3시면 90도 )
  // ( 5 - 0 ) * ( 360 - 0) / ( 12 - 0 ) + 0 === 5 * 360 / 12 + 0 = 150 deg ( 5시면 150도 )
  // 6시면 180도
  // 7시면 200도
  // 8시면 250도
  // 10시면 300도
  // 12시면 360도
  return (num - in_min) * (out_max - out_min) / ( in_max - in_min ) + out_min;
}

setTime()
setInterval(setTime, 1000)
