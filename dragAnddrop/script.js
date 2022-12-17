let dragged;

/*
* document 에 drag, dragstart, dragend 이벤트 리스너를 부착
* */
document.addEventListener('drag', event => {
  // dragging 중인 element 가 event.target 에 들어있다.
})

// drag, dragover 이벤트는 드래그중에 계속 발생함
document.addEventListener("dragover", event => {
  event.preventDefault();
}, false)

document.addEventListener('dragstart', event => {
  // drag 가 시작되면 변수에 dragging 중인 요소를 담아둔다. drop 시 옮겨줄거라
  dragged = event.target;
  event.target.classList.add('dragging')
})
document.addEventListener('dragend', event => {
  event.target.classList.remove('dragging')
})



/* 드롭 대상 dragenter dragleave, drop 이벤트 리스너를 부착  */
document.addEventListener('dragenter', event => {
  if(event.target.classList.contains('dropzone')){
	event.target.classList.add('dragover')
  }
})
document.addEventListener('dragleave', event => {
  console.log('dragleave')
  if(event.target.classList.contains('dropzone')){
	event.target.classList.remove('dragover')
  }
})

document.addEventListener('drop', event => {
  // event.preventDefault()
  if(event.target.classList.contains('dropzone')){
	event.target.classList.remove('dragover')
	console.log(dragged)
	dragged.parentNode.removeChild(dragged)
	event.target.appendChild(dragged)
  }
})
