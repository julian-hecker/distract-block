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











