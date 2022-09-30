// ==UserScript==
// @name         JPDB Arrow Keys Support
// @namespace    https://github.com/Dorifor
// @version      1.5
// @description  Add arrow keys support to JPDB reviews & lessons, plus the "M" key to remove example blur.
// @author       Mao#2071
// @match        https://jpdb.io/review*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jpdb.io
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Neighbors of each grade, ordered by : [left, top, bottom, right]
  const gradesNeighbors = {
    "grade-1": ["#grade-1", "#grade-1", "#grade-3", "#grade-2"],
    "grade-2": ["#grade-1", "#grade-2", "#grade-5", "#grade-2"],
    "grade-3": ["#grade-3", "#grade-1", "#grade-3", "#grade-4"],
    "grade-4": ["#grade-3", "#grade-2", "#grade-4", "#grade-5"],
    "grade-5": ["#grade-4", "#grade-2", "#grade-5", "#grade-5"],
    "grade-p": ["#grade-p", "#grade-permaknown", "#grade-f", "#grade-p"],
    "grade-f": ["#grade-f", "#grade-p", "#grade-f", "#grade-f"],
    "grade-permaknown": [
      "#grade-permaknown",
      "#grade-permaknown",
      "#grade-p",
      "#grade-permaknown",
    ],
  };

  addEventListener("keydown", (e) => {
    let currentActiveElement = document.activeElement;

    // If no answer is currently selected, focus on "Okay" answer by default
    if (!currentActiveElement || currentActiveElement.nodeName === "BODY") {
      let defaultChoice = document.querySelector("#grade-4")
        ? document.querySelector("#grade-4")
        : document.querySelector("#grade-f");
      defaultChoice?.focus();
      currentActiveElement = document.activeElement;
    }

    switch (e.code) {
      case "ArrowLeft":
        document
          .querySelector(`${gradesNeighbors[currentActiveElement?.id]?.[0]}`)
          ?.focus();
        break;

      case "ArrowUp":
        document
          .querySelector(`${gradesNeighbors[currentActiveElement?.id]?.[1]}`)
          ?.focus();
        break;

      case "ArrowDown":
        document
          .querySelector(`${gradesNeighbors[currentActiveElement?.id]?.[2]}`)
          ?.focus();
        break;

      case "ArrowRight":
        document
          .querySelector(`${gradesNeighbors[currentActiveElement?.id]?.[3]}`)
          ?.focus();
        break;

      case "KeyM":
        document.querySelector(".blur")?.classList.remove("blur");

      default:
        break;
    }
  });
})();
