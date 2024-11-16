// ==UserScript==
// @name         Nonograms.org inner navigation - (by Size)
// @namespace    https://github.com/Dorifor
// @version      2024-11-11
// @description  I just wanted to easily go to the next puzzle when finished
// @author       mao
// @match        https://www.nonograms.org/nonograms/i/*
// @match        https://www.nonograms.org/nonograms2/i/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nonograms.org
// @grant        none
// ==/UserScript==

function createButton(label, link) {
    const a = document.createElement("a");
    a.href = link;
    a.style.paddingRight = '5px';

    const button = document.createElement("button");
    button.innerHTML = label;

    a.appendChild(button);

    return a;
}

function redirectIf404() {
    if (document.querySelector('#nonogram_page_announcement'))
    {
        return;
    }

    const url = window.location.href;

    const isColored = window.location.pathname.split('/')[1] == 'nonograms2'

    const redirectUrl = isColored ? url.replace('nonograms2/', 'nonograms/') : url.replace('nonograms/', 'nonograms2/')

    window.location.replace(redirectUrl);
}

(function() {
    'use strict';
    redirectIf404();
    const linksContainer = document.querySelector('#nonogram_page_announcement');

    // document.querySelectorAll('.nonogram_title')[1].href

    fetch('https://www.nonograms.org/search?name=&colors=1&sort=3&skip_solved=1').then(res => res.text()).then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        let link = doc.querySelectorAll('.nonogram_title')[1].href;

        const nextButton = createButton('Next', link);
        linksContainer.appendChild(nextButton);
    })
})();