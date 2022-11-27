const date = new Date();
console.log(date)
const renderCalendar = () => {

  const monthDays = document.querySelector('.days')
  // 이번 달 마지막 일자 구하기
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  // 지난 달 마지막 일자 구하기
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  // 오늘날짜의 요일! 0(일) ~ 6(토)
  const firstDayIndex = date.getDay()
  // 이번달 마지막 날짜의 요일
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

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

  // 지난달 : 오늘이 10월 8일이라 치면
  // 6 부터 1까지 25, 26, 27, 28, 29, 30까지 출력.
  // x, firstDayIndex: 6
  // prevLastDay: 30
  // 30 - 6 + 1 : 25
  // 30 - 5 + 1 : 26
  // 30 - 4 + 1 : 27
  // 30 - 3 + 1 : 28
  // 30 - 2 + 1 : 29
  // 30 - 1 + 1 : 30
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="previous-days day">${prevLastDay - x + 1}</div>`
  }

  // 이번달
  // 1부터 lastDay 까지
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
