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

options = {
    whitelist: [
        'google.com',
    ],
    blacklist: ['facebook.com'],
    preferences: {
        alwaysCheck: true,
    },
};

chrome.storage.sync.get(['options'], function (response) {
    if (response.options) {
        options = response.options;
    } else {
        chrome.storage.sync.set({
            options: options,
        });
    }

    const whitelistUl = document.getElementById('whitelist-ul');
    const blacklistUl = document.getElementById('blacklist-ul');
    const preferencesUl = document.getElementById('preferences-ul');

    for (let site of options.whitelist) {
        const siteListing = document.createElement('li');
        siteListing.textContent = site;
        whitelistUl.appendChild(siteListing);
    }
    for (let site of options.blacklist) {
        const siteListing = document.createElement('li');
        siteListing.textContent = site;
        blacklistUl.appendChild(siteListing);
    }

    for (let preference in options.preferences) {
        const preferenceListing = document.createElement('li');
        preferenceListing.textContent = `${preference}: ${options.preferences[preference]}`;
        preferencesUl.appendChild(preferenceListing);
    }
});
