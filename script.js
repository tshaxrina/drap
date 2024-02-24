const empties = document.querySelectorAll('.empty')
let create = document.querySelector('.create')
let modal = document.querySelector('.modal')
let modal_close = document.querySelector('.x')
create.onclick = () => {
    modal.style.display = "flex"
}
modal_close.onclick = () => {
    modal.style.display = "none"
}

let todos = []

let temp = []
let temp_id

for(let todo of todos) {
    let div = document.createElement('div')
    let b = document.createElement('b')
    let p = document.createElement('p')

    div.setAttribute('id', todo.id)
    div.setAttribute('class', 'fill')
    div.setAttribute('draggable', true)

    b.innerHTML = todo.title
    p.innerHTML = todo.description
    div.classList.add('font')
    div.append(b, p)
    empties[0].append(div)

    temp.push(div)
}

temp.forEach((item) => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

for(let empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}
function dragStart() {
    temp_id = this.id
    this.classList.add('hold')
    setTimeout(() => (this.className = 'invisible'), 0)
}

function dragEnd() {
    this.className = 'fill'
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    event.preventDefault()
    this.className += ' hovered'
}


function dragLeave() {
    this.className = 'empty'
}

function dragDrop() {
    this.className = 'empty'
    temp.forEach((item) => {
        if(item.id === temp_id) {
            this.append(item)
        }
    })
}
