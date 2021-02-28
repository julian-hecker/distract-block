window.addEventListener('load', (e) => {
    todoButton.addEventListener('click', handleChangeTab);
    timerButton.addEventListener('click', handleChangeTab);
    sitesButton.addEventListener('click', () =>
        chrome.runtime.openOptionsPage(),
    );
    loadTodos();
});

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

/* Timer Tab */
const startTimerButton = document.getElementById('start-timer-btn');
const stopTimerButton = document.getElementById('stop-timer-btn');
const workTimeInput = document.getElementById('work-time-input');
const breakTimeInput = document.getElementById('break-time-input');

const handleStartTimer = (e) => {
    TIME_LIMIT = parseInt(workTimeInput.value) /* *60 */;
    startWorkTimer();
    stopTimerButton.style.display = 'block';
    startTimerButton.style.display = 'none';
};

const handleStopTimer = (e) => {
    clearInterval(timerInterval);
    stopTimerButton.style.display = 'none';
    startTimerButton.style.display = 'block';
};

startTimerButton.addEventListener('click', handleStartTimer);
stopTimerButton.addEventListener('click', handleStopTimer);

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: 'green',
    },
    warning: {
        color: 'orange',
        threshold: WARNING_THRESHOLD,
    },
    alert: {
        color: 'red',
        threshold: ALERT_THRESHOLD,
    },
};

let TIME_LIMIT = 25 * 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById('app').innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
      timeLeft,
  )}</span>
</div>
`;

function onTimesUp() {
    clearInterval(timerInterval);
    timeLeft = TIME_LIMIT;
    timePassed = 0;
}

function startWorkTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById(
            'base-timer-label',
        ).innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
            startBreakTimer();
        }
    }, 1000);
}

function startBreakTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = parseInt(breakTimeInput.value) - timePassed;
        document.getElementById(
            'base-timer-label',
        ).innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
        if (timeLeft === 0) {
            onTimesUp();
            startWorkTimer();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById('base-timer-path-remaining')
            .classList.remove(warning.color);
        document
            .getElementById('base-timer-path-remaining')
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById('base-timer-path-remaining')
            .classList.remove(info.color);
        document
            .getElementById('base-timer-path-remaining')
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById('base-timer-path-remaining')
        .setAttribute('stroke-dasharray', circleDasharray);
}
