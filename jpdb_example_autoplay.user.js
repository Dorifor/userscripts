// ==UserScript==
// @name         JPDB Example Autoplay
// @namespace    https://github.com/Dorifor
// @version      1.0
// @description  Autoplays example sentence audio
// @author       Mao#2071
// @match        https://jpdb.io/review*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jpdb.io
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const showAnswerButton = document.querySelector("#show-answer")
    
    if (showAnswerButton) {
      showAnswerButton.addEventListener("click", () => document.querySelector(".example-audio")?.click());
    } else (
        document.querySelector(".example-audio")?.click()
    )
})()