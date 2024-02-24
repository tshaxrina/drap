import { v4 as uuidv4 } from 'uuid';
const empties = document.querySelectorAll<HTMLDivElement>('.empty')
let create = document.querySelector<HTMLButtonElement>('.create')
let modal: any = document.querySelector<HTMLDivElement>('.modal')
let modal_close = document.querySelector<HTMLButtonElement>('.x')
let add_todos = document.querySelector<HTMLButtonElement>('.add_todos')
// let form = document.forms.add_task
let form = document.forms.namedItem('add_task') as HTMLFormElement
let places = document.querySelectorAll<HTMLDivElement>('.empty .col')
let todos: any = []

let temp: any = []
let temp_id: any
add_todos.onclick = () => {
    modal.style.display = "none"
form.onsubmit = (event: Event) => {
    event.preventDefault()
    const fm = new FormData(form)

    const todo = {
        id: uuidv4(),
        title: fm.get('title'),
        description: fm.get('description'),
        status: fm.get('status'),
        created_at: new Date().toLocaleDateString('uz-Uz', {hour12: false})
    }
    console.log(todo);

    const {title,description,status} = todo

    if(!title || !description || !status) return

    postData ('/todos', todo)
    .then((res:any) => {
        if(res.status === 200 || res.status === 201) {
            getData('/todos')
            .then((res:any) => {
                if(res.status === 200 || res.status === 201) {
                    reloadTasks({arr: res.data, places})
                }
            })
        }
    })
    
}
}
create.onclick = () => {
    modal.style.display = "flex"
}
modal_close.onclick = () => {
    modal.style.display = "none"
}



// for(let todo of todos) {
//     let div = document.createElement('div')
//     let b = document.createElement('b')
//     let p = document.createElement('p')

//     div.setAttribute('id', todo.id)
//     div.setAttribute('class', 'fill')
//     div.setAttribute('draggable', true)

//     b.innerHTML = todo.title
//     p.innerHTML = todo.description
//     div.classList.add('font')
//     div.append(b, p)
//     empties[0].append(div)

//     temp.push(div)
// }

// temp.forEach((item) => {
//     item.addEventListener('dragstart', dragStart)
//     item.addEventListener('dragend', dragEnd)
// })

// for(let empty of empties) {
//     empty.addEventListener('dragover', dragOver)
//     empty.addEventListener('dragenter', dragEnter)
//     empty.addEventListener('dragleave', dragLeave)
//     empty.addEventListener('drop', dragDrop)
// }
// function dragStart() {
//     temp_id = this.id
//     this.classList.add('hold')
//     setTimeout(() => (this.className = 'invisible'), 0)
// }

// function dragEnd() {
//     this.className = 'fill'
// }

// function dragOver(event) {
//     event.preventDefault()
// }

// function dragEnter(event) {
//     event.preventDefault()
//     this.className += ' hovered'
// }


// function dragLeave() {
//     this.className = 'empty'
// }

// function dragDrop() {
//     this.className = 'empty'
//     temp.forEach((item) => {
//         if(item.id === temp_id) {
//             this.append(item)
//         }
//     })
// }``