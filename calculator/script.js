const clearScreen = () => {
  document.getElementById("result").value = 0
}

const display = (val) => {
  if(document.getElementById("result").value === '0'){
    document.getElementById("result").value = '';
  }
  document.getElementById("result").value += val
}

const calculate = () => {
  let p = document.getElementById("result").value
  if (p) {
    try{
      document.getElementById("result").value = eval(p)
    }catch(e){
      document.getElementById("result").value = '입력오류';
    }
  } else {
    alert('계산할 수치를 입력해주세요')
  }
}

const removeTail = () => {
  let temp = document.getElementById("result").value
  let poppedArray = temp && [...temp]
  poppedArray.pop()
  document.getElementById("result").value = poppedArray.join('')
}

document.addEventListener('keydown', function(keyEvent){
  let numbers = [
    '1', '2', '3', '/',
    '4', '5', '6', '-',
    '7', '8', '9', '+',
    '.', '0', '*', '=',
    'Enter', 'Escape', 'Backspace'
  ]
  if (numbers.includes(keyEvent.key)) {
    keyEvent.key === 'Enter' ? calculate() :
      keyEvent.key === '=' ? calculate() :
      keyEvent.key === 'Escape' ? clearScreen() :
        keyEvent.key === 'Backspace' ? removeTail() :
          display(keyEvent.key)
  }
})
