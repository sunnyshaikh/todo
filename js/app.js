// selectors here
const tasks = document.querySelector('.tasks');
const addTaskBtn = document.querySelector('.add-task-btn');
const input = document.querySelector('.add-task-input');

// events here
document.addEventListener('DOMContentLoaded', getTodos);
addTaskBtn.addEventListener('click', addTask);
tasks.addEventListener('click', deleteCheck);

// functions here

// add task function
function addTask(event)
{
    if(input.value != "")
    {
        // to prevent form from submitting
        event.preventDefault();

        // create todo div
        const todo = document.createElement('div');
        todo.classList.add('todo');

        // create li and append to todo
        const li = document.createElement('li');
        li.innerText = input.value;
        li.classList.add('task-name');
        todo.appendChild(li);

        // save to local
        saveToLocal(input.value);

        // create completed button and append to todo
        const compBtn = document.createElement('button');
        compBtn.innerHTML = '<i class="fas fa-check icon"></i>';
        compBtn.classList.add('btn', 'complete-btn');
        todo.appendChild(compBtn);
        
        // create trash button and append to todo
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash icon"></i>';
        trashBtn.classList.add('btn', 'trash-btn');
        todo.appendChild(trashBtn);

        // add todo to ul
        tasks.appendChild(todo);

        // reset input
        input.value = "";
        input.autoFocus = true;
    }
}


// Delete or checked functions
function deleteCheck()
{
    let e = event.target;
    if(e.classList[1] === 'complete-btn')
    {
        e.parentElement.classList.toggle('completed');
    }

    if(e.classList[1] === 'trash-btn')
    {
        e.parentElement.classList.add('deleted');
        removeFromLocal(e.parentElement);
        e.parentElement.addEventListener('transitionend', function(){
            e.parentElement.remove();
        });
        
    }
}

// save to local storage
function saveToLocal(todo)
{
    let todos;
    if(localStorage.getItem('todos') == null)
        todos = [];
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos()
{
    let todos;
    if(localStorage.getItem('todos') == null)
        todos = [];
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todoo){

        // create todo div
        const todo = document.createElement('div');
        todo.classList.add('todo');

        // create li and append to todo
        const li = document.createElement('li');
        li.innerText = todoo;
        li.classList.add('task-name');
        todo.appendChild(li);

        // create completed button and append to todo
        const compBtn = document.createElement('button');
        compBtn.innerHTML = '<i class="fas fa-check icon"></i>';
        compBtn.classList.add('btn', 'complete-btn');
        todo.appendChild(compBtn);
        
        // create trash button and append to todo
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash icon"></i>';
        trashBtn.classList.add('btn', 'trash-btn');
        todo.appendChild(trashBtn);

        // add todo to ul
        tasks.appendChild(todo);

    });
}

// remove local 
function removeFromLocal(todoo)
{
    let todos;
    if(localStorage.getItem('todos') == null)
        todos = [];
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todoo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


















