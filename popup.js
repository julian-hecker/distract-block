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
});




/* Todo Tab */
const enterButton = document.getElementById('enter-button');
const inputBar = document.getElementById('input-bar');
const ul = document.getElementById('todo-list-ul');

const CreateNewListItem = () => {
    const listItem = document.createElement('li');
    const listItemContent = document.createTextNode(inputBar.value);
    listItem.appendChild(listItemContent);
    ul.appendChild(listItem);
    inputBar.value = '';
    listItem.addEventListener('click', () => {
        listItem.style.textDecoration = 'line-through';
    });
    const delButton = document.createElement('button');
    delButton.appendChild(document.createTextNode('X'));
    listItem.appendChild(delButton);
    delButton.addEventListener('click', () => {
        listItem.removeChild(delButton);
        ul.removeChild(listItem);
    });
};

enterButton.addEventListener('click', () => {
    // Execute only if user's input is not blank
    if (inputBar.value.length > 0) {
        CreateNewListItem();
    }
});

inputBar.addEventListener('keypress', (Event) => {
    // Execute only if user's input is not blank and if the key code is 13:
    if (inputBar.value.length > 0 && Event.keyCode === 13) {
        CreateNewListItem();
    }
});
