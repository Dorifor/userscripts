// ==UserScript==
// @name         Nonograms.org inner navigation (by ID)
// @namespace    https://github.com/Dorifor
// @version      2024-11-11
// @description  Easily go to previous or next puzzle from page
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
    const baseUrl = "https://www.nonograms.org/nonograms/i/"

    const linksContainer = document.querySelector('#nonogram_page_announcement');

    const id = parseInt(window.location.pathname.split('/').at(-1));

    console.log(`ID: ${id}`)

    const previousButton = createButton('Previous', baseUrl + (id - 1));
    const nextButton = createButton('Next', baseUrl + (id + 1));

    linksContainer.appendChild(previousButton);
    linksContainer.appendChild(nextButton);
})();