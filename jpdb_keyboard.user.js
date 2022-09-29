// ==UserScript==
// @name         JPDB Review arrow keys support
// @namespace    https://github.com/Dorifor
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jpdb.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jpdb.io
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  addEventListener("keydown", (e) => {
switch (e.code) {
  case "ArrowLeft":
    console.log("Left");
    break;

  case "ArrowRight":
    console.log("Right");
    break;

  case "ArrowDown":
    console.log("Down");
    break;

  case "ArrowUp":
    console.log("Up");
    break;

  default:
    break;
}
});
})();