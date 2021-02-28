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
        <h2>It's a Trap!</h2>
        <p>
            This site is on your blacklist because it poses a major
            risk to your productivity. If you want to visit anyway, go
            to extension settings and remove it from your blacklist.
        </p>
        <button class="button-primary" id="button-back" autofocus>
            Go Back
        </button>
    </div>
</div>
`;

document.documentElement.appendChild(overlay);

const backButton = document.getElementById('button-back');

backButton.addEventListener('click', (e) => {
    window.history.back();
});
