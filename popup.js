const todoButton = document.getElementById('todo-button');
const timerButton = document.getElementById('timer-button');
const sitesButton = document.getElementById('sites-button');
const todoTab = document.getElementById('todo-tab');
const timerTab = document.getElementById('timer-tab');
const sitesTab = document.getElementById('sites-tab');

const handleChangeTab = (e) => {
    const clickedButton = e.target;
    const activatedTab = document.getElementById(
        clickedButton.dataset.activates,
    );
    for (let button of [todoButton, timerButton, sitesButton]) {
        button.classList.remove('active');
    }
    for (let tab of [todoTab, timerTab, sitesTab]) {
        tab.classList.remove('active');
    }
    clickedButton.classList.add('active');
    activatedTab.classList.add('active');
};

window.addEventListener('load', (e) => {
    for (let button of [todoButton, timerButton, sitesButton]) {
        button.addEventListener('click', handleChangeTab);
    }
    loadTodos();
});

/* Todo Tab */
const enterButton = document.getElementById('enter-button');
const inputBar = document.getElementById('input-bar');
const ul = document.getElementById('todo-list-ul');
let todos = [];

const loadTodos = () => {
    chrome.storage.sync.get(['todos'], (res) => {
        if (res.todos) {
            todos = res.todos;
            for (todo of todos) {
                CreateNewListItem(todo);
            }
        }
    });
};

const handleSubmitTodo = (e) => {
    const todoText = inputBar.value;
    todos.push(todoText);
    chrome.storage.sync.set({ todos: todos }, function (response) {
        console.log(response);
    });
    CreateNewListItem();
};

const handleRemoveTodo = (e) => {
    const itemToRemove = e.target.parentNode;
    itemToRemove.remove();
    todos = Array.from(ul.querySelectorAll('li')).map(
        (listItem) => listItem.innerText,
    );
    chrome.storage.sync.set({ todos: todos }, function (response) {
        console.log(response);
    });
};

const CreateNewListItem = (value = null) => {
    const listItem = document.createElement('li');
    const listItemContent = document.createTextNode(
        inputBar.value ? inputBar.value : value,
    );
    listItem.appendChild(listItemContent);
    ul.appendChild(listItem);
    inputBar.value = '';
    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });
    const delButton = document.createElement('button');
    delButton.appendChild(document.createTextNode('X'));
    listItem.appendChild(delButton);
    delButton.addEventListener('click', handleRemoveTodo);
};

enterButton.addEventListener('click', () => {
    // Execute only if user's input is not blank
    if (inputBar.value.length > 0) {
        handleSubmitTodo();
    }
});

inputBar.addEventListener('keypress', (e) => {
    // Execute only if user's input is not blank and if the key code is 13:
    if (inputBar.value.length > 0 && e.keyCode === 13) {
        handleSubmitTodo();
    }
});
