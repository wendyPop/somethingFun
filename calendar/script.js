const date = new Date();

const renderCalendar = () => {

  // 1일 세팅
  date.setDate(1)

  const monthDays = document.querySelector('.days')
  // 이번 달 마지막 일자 구하기
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()

  const firstDayIndex = date.getDay()
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  // 다음달 1,2,3~
  const nextDays = 7 - lastDayIndex - 1;
  const months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]

  document.querySelector('.content h1').innerHTML = months[date.getMonth()]
  document.querySelector('.content p').innerHTML = new Date().toDateString()

  let days = '';

  // 지난달
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="previous-days day">${prevLastDay - x + 1}</div>`
  }

  // 이번달
  for (let i = 1; i <= lastDay; i++) {
    if ( i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today day"> ${i} </div>`
    } else {
      days += `<div class="day"> ${i} </div>`
    }
  }

  // 다음달
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-days day"> ${j} </div>`
    monthDays.innerHTML = days;
  }
}


document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() -1);
  renderCalendar()
})

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar()
})

// 라이브 이벤트 핸들러 부착
document.addEventListener('click', e => {
  if (e.target.closest('.day')) {
    let all = document.querySelectorAll('.day')
    for ( let elem of all) {
      elem.classList.remove('today')
    }
    e.target.classList.add('today')
  }
})

renderCalendar()
