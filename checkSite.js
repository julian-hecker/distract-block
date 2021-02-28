const overlay = document.createElement('div');
overlay.innerHTML = `
<style>
    #distract-overlay {
        position: fixed;
        display: grid;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #333d;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        z-index: 999999;
    }
    #distract-overlay-modal {
        position: relative;
        max-width: 900px;
        width: 100%;
        padding: 1rem;
        margin: auto;
        background-color: #333;
        color: white;
    }
    #distract-overlay h2 {
        font-size: 2em;
        color: inherit;
        margin: 0;
    }

    #distract-overlay button {
        margin: 0 1rem 1rem 0;
        padding: 0.5rem 2rem;
        border-style: none;
        background: none;
        color: inherit;
        font: inherit;
        font-size: 1.5em;
        font-weight: bolder;
    }

    #distract-overlay button:hover {
        opacity: 0.7;
    }

    #distract-overlay p {
        color: inherit;
        margin-top: 0;
    }

    #distract-overlay .button-primary {
        background-color: #1565dd;
    }

    #distract-overlay .button-secondary {
        border: 4px solid #1565dd;
        background-color: transparent;
    }
    #distract-overlay .button-blacklist {
        background-color: white;
        color: black;
    }
</style>
<div id="distract-overlay">
    <div id="distract-overlay-modal">
        <h2>Hey, Watch Out!</h2>
        <p>
            This site is not on your whitelist. What do you want to
            do?
        </p>
        <button
            class="button-primary"
            id="button-whitelist"
            autofocus
        >
            Add to Whitelist and Continue
        </button>
        <button class="button-primary" id="button-back">
            Go Back
        </button>
        <button class="button-secondary" id="button-continue">
            Continue Once
        </button>
        <button class="button-blacklist" id="button-blacklist">
            Add to <strong>Blacklist</strong> and Go Back
        </button>
    </div>
</div>
`;

document.body.appendChild(overlay);

const distractOverlay = document.getElementById('distract-overlay');
const whitelistButton = document.getElementById('button-whitelist');
const blacklistButton = document.getElementById('button-blacklist');
const continueButton = document.getElementById('button-continue');
const backButton = document.getElementById('button-back');
const settingsButton = document.getElementById('button-settings');

whitelistButton.addEventListener('click', (e) => {
    chrome.storage.sync.get(['options'], function (response) {
        if (response.options) {
            const options = response.options;
            options.whitelist.push(
                new URL(window.location.href).hostname,
            );
            chrome.storage.sync.set(
                { options: options },
                function (response) {
                    console.log(response);
                    distractOverlay.remove();
                },
            );
        }
    });
});

blacklistButton.addEventListener('click', (e) => {
    chrome.storage.sync.get(['options'], function (response) {
        if (response.options) {
            const options = response.options;
            options.blacklist.push(
                new URL(window.location.href).hostname,
            );
            chrome.storage.sync.set(
                { options: options },
                function (response) {
                    console.log(response);
                    window.history.back();
                },
            );
        }
    });
});

continueButton.addEventListener('click', (e) => {
    distractOverlay.remove();
});

backButton.addEventListener('click', (e) => {
    window.history.back();
});

settingsButton.addEventListener('click', (e) => {
    chrome.runtime.openOptionsPage();
});
