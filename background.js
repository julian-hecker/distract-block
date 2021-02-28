// https://dev.to/penge/learn-the-most-useful-chrome-apis-by-creating-block-site-chrome-extension-2de8

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith('http')) {
        return;
    }

    const hostname = new URL(url).hostname;

    chrome.storage.sync.get(['options'], function (response) {
        if (response.options) {
            const {
                blacklist,
                whitelist,
                preferences,
            } = response.options;

            // if (!preferences.enabled) return; // Not Implemented Yet
            // Allow Page
            if (
                whitelist.find((domain) => hostname.includes(domain))
            ) {
                return;
            }
            // Block Page
            else if (
                blacklist.find((domain) => hostname.includes(domain))
            ) {
                chrome.tabs.executeScript(tabId, {
                    file: 'blockSite.js',
                    runAt: 'document_idle',
                });
            }
            // Check Page
            else if (preferences.alwaysCheck) {
                chrome.tabs.executeScript(tabId, {
                    file: 'checkSite.js',
                    runAt: 'document_idle',
                });
            }
        } else {
            // Open options page if options not yet set
            chrome.runtime.openOptionsPage();
        }
    });
});
