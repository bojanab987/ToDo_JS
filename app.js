const inputToDo = document.querySelector('.todo-input');
const buttonToDo = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.to-do-list');
const selectOption = document.querySelector('.filter-list');


//Add event listeners
document.addEventListener('DOMContetLoaded', getToDos)
buttonToDo.addEventListener('click', addToDo);
toDoList.addEventListener('click', checkOrDelete);
selectOption.addEventListener('click', filterList);

//Functions
function addToDo(e) {
    e.preventDefault();
    // add div which will contain li and checked and remove button
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //add to do lis
    const todoItem = document.createElement("li");
    todoItem.innerText = inputToDo.value;    
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);
    //saving to do to local Storage
    saveLocalToDos(inputToDo.value);

    //add checked button
    const checkedBtn = document.createElement("button");
    checkedBtn.innerHTML = '<i class="fas fa-check-square"></i>';
    checkedBtn.classList.add("checked-btn");
    todoDiv.appendChild(checkedBtn)

    //add remove button
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="fas fa-minus-square"></i>';
    removeBtn.classList.add("remove-btn");
    todoDiv.appendChild(removeBtn);

    //add div with lis and buttons into the list
    toDoList.appendChild(todoDiv);
    //clear input field
    inputToDo.value = "";
}

function saveLocalToDos(todo) {
    //check if we have todo in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkOrDelete(e) {
    const item = e.target;

    if (item.classList[0] === "remove-btn") {
        const todo = item.parentElement;
        todo.classList.add("remove");
        removeLocalStorageTodos(todo);
        todo.addEventListener('transitioned', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "checked-btn") {
        const todo = item.parentElement;        
        todo.classList.toggle("completed");
    }
}

function removeLocalStorageTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getToDos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //add to do lis
        const todoItem = document.createElement("li");
        todoItem.innerText = todo;
        todoItem.classList.add("todo-item");
        todoDiv.appendChild(todoItem);

        //add checked button
        const checkedBtn = document.createElement("button");
        checkedBtn.innerHTML = '<i class="fas fa-check-square"></i>';
        checkedBtn.classList.add("checked-btn");
        todoDiv.appendChild(checkedBtn)

        //add remove button
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = '<i class="fas fa-minus-square"></i>';
        removeBtn.classList.add("remove-btn");
        todoDiv.appendChild(removeBtn);

        //add div with lis and buttons into the list
        toDoList.appendChild(todoDiv);

    });
}

function filterList(e) {
    const todos = toDoList.childNodes;
    todos.forEach(function (todo) {
        // console.log(todo);
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('checked')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('checked')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
        });
    }