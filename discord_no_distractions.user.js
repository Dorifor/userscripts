// ==UserScript==
// @name         Discord Prevent Icon Change & Tab Dot
// @version      1.1
// @description  Prevents tab title and icon from changing (no more distractions !)
// @author       maooowooo
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    //await sleep(10000);

    document.title = "Discord"

    Object.defineProperty(document, 'title', {
        set: function(){}
    });

    const target = document.querySelector('head');
    const config = { attributes: true, childList: true, subtree: true };

    const observer = new MutationObserver((list, obs) => {
        const fav = document.querySelector('link[rel="icon"]')
        const discordIcon = "data:image/png;base64,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"
        if (fav && fav.href != discordIcon) fav.href = discordIcon
    });

    observer.observe(target, config)
})();