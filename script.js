const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addToDo(todo))
}
form.addEventListener('submit', (e) => {
    e.preventDefault()

    addToDo()
})

function addToDo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li')

        if(todo && todo.completed) {
            todoEl.classList.add('completed')
            updateLS();
        }

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
        })
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoEl.remove()
        })

        todoEl.innerText = todoText

        todosUL.appendChild(todoEl)


        input.value = ''
        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')
    const todos = []
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

function showTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let time = `${hours}:${minutes}`;
    let timeEl = document.getElementById('time');
    timeEl.textContent = time;
}

setInterval(showTime, 1000)

