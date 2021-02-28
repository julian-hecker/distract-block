const acc = document.getElementsByClassName('accordion');

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });
}

options = {};

chrome.storage.sync.get(['options'], function (response) {
    if (response.options) {
        options = response.options;

        for (let optionType in options) {
            const optionList = document.createElement('ul');
            for (option in optionType) {
                const optionItem = document.createElement('li');
            }
        }
    }
});
