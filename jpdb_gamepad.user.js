// ==UserScript==
// @name         JPDB Gamepad Support
// @namespace    https://github.com/Dorifor
// @version      1.5
// @description  Add gamepad support to JPDB reviews & lessons
// @author       Mao#2071
// @match        https://jpdb.io/review*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jpdb.io
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const stickTreshold = 0.8;

  // Neighbors of each grade, ordered by : [left, top, bottom, right]
  const gradesNeighbors = {
    "grade-1": ["#grade-1", "#grade-1", "#grade-3", "#grade-2"],
    "grade-2": ["#grade-1", "#grade-2", "#grade-5", "#grade-2"],
    "grade-3": ["#grade-3", "#grade-1", "#grade-3", "#grade-4"],
    "grade-4": ["#grade-3", "#grade-2", "#grade-4", "#grade-5"],
    "grade-5": ["#grade-4", "#grade-2", "#grade-5", "#grade-5"],
    "grade-p": ["#grade-p", "#grade-permaknown", "#grade-f", "#grade-p"],
    "grade-f": ["#grade-f", "#grade-p", "#grade-f", "#grade-f"],
    "grade-permaknown": ["#grade-permaknown", "#grade-permaknown", "#grade-p", "#grade-permaknown"],
    "Yes, use the new grade": [
      "input[value='Yes, use the new grade']",
      "input[value='Yes, use the new grade']",
      "input[value='Yes, use the new grade']",
      "input[value='No, keep the old grade']",
    ],
    "Yes, keep going!": [
      "input[value='Yes, use the new grade']",
      "input[value='Yes, use the new grade']",
      "input[value='Yes, use the new grade']",
      "input[value='No, I'm done for now.']",
    ],
  };

  // The whole gamepadAPI thingy is shamelessly stolen from https://developer.mozilla.org/en-US/docs/Games/Techniques/Controls_Gamepad_API

  const gamepadAPI = {
    controller: {},
    turbo: false,
    connect(evt) {
      gamepadAPI.controller = evt.gamepad;
      gamepadAPI.turbo = true;
      console.log("Gamepad connected.");
    },
    disconnect(evt) {
      gamepadAPI.turbo = false;
      delete gamepadAPI.controller;
      console.log("Gamepad disconnected.");
    },
    update() {
      // Clear the buttons cache
      gamepadAPI.buttonsCache = [];

      // Move the buttons status from the previous frame to the cache
      for (let k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
        gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
      }

      // Clear the buttons status
      gamepadAPI.buttonsStatus = [];

      // Get the gamepad object
      const c = gamepadAPI.controller || {};

      // Loop through buttons and push the pressed ones to the array
      const pressed = [];
      if (c.buttons) {
        for (let b = 0; b < c.buttons.length; b++) {
          if (c.buttons[b].pressed) {
            pressed.push(gamepadAPI.buttons[b]);
          }
        }
      }

      // Loop through axes and push their values to the array
      const axes = [];
      if (c.axes) {
        for (let a = 0; a < c.axes.length; a++) {
          axes.push(c.axes[a].toFixed(2));
        }
      }

      // Assign received values
      gamepadAPI.axesStatus = axes;
      gamepadAPI.buttonsStatus = pressed;

      // Return buttons for debugging purposes
      return pressed;
    },
    buttonPressed(button, hold) {
      let newPress = false;

      // Loop through pressed buttons
      for (let i = 0; i < gamepadAPI.buttonsStatus.length; i++) {
        // If we found the button we're looking for
        if (gamepadAPI.buttonsStatus[i] === button) {
          // Set the boolean variable to true
          newPress = true;

          // If we want to check the single press
          if (!hold) {
            // Loop through the cached states from the previous frame
            for (let j = 0; j < gamepadAPI.buttonsCache.length; j++) {
              // If the button was already pressed, ignore new press
              newPress = gamepadAPI.buttonsCache[j] !== button;
            }
          }
        }
      }
      return newPress;
    },
    buttons: [
      "A",
      "B",
      "X",
      "Y",
      "LB",
      "RB",
      "LT",
      "RT",
      "Select",
      "Start",
      "L-Stick",
      "R-Stick",
      "Up",
      "Down",
      "Left",
      "Right",
    ],
    buttonsCache: [],
    buttonsStatus: [],
    axesStatus: [],
    axesEnabled: false,
  };

  window.addEventListener("gamepadconnected", gamepadAPI.connect);
  window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);

  setInterval(() => {
    gamepadAPI.update();

    if (gamepadAPI.turbo) {
      const sticksTriggered =
        !(-stickTreshold < gamepadAPI.axesStatus[0] && gamepadAPI.axesStatus[0] < stickTreshold) ||
        !(-stickTreshold < gamepadAPI.axesStatus[1] && gamepadAPI.axesStatus[1] < stickTreshold);

      if (!sticksTriggered) {
        gamepadAPI.axesEnabled = true;
      }

      if (gamepadAPI.buttonsStatus.length > 0 || (sticksTriggered && gamepadAPI.axesEnabled)) {
        gamepadAPI.axesEnabled = false;
        let currentActiveElement = document.activeElement;

        // If no answer is currently selected, focus on "Okay" answer by default
        if (!currentActiveElement || currentActiveElement.nodeName === "BODY") {
          let defaultChoice =
            document.querySelector("#grade-4") ||
            document.querySelector("#grade-f") ||
            document.querySelector("input[value='Yes, use the new grade']") ||
            document.querySelector("input[value='Yes, keep going!']");

          defaultChoice?.focus();
          currentActiveElement = document.activeElement;
        }

        if (gamepadAPI.buttonPressed("A")) {
          currentActiveElement.click();
        }

        if (gamepadAPI.buttonPressed("Left") || gamepadAPI.axesStatus[0] < -stickTreshold) {
          document
            .querySelector(`${gradesNeighbors[currentActiveElement?.id ?? currentActiveElement.value]?.[0]}`)
            ?.focus();
        }

        if (gamepadAPI.buttonPressed("Up") || gamepadAPI.axesStatus[1] < -stickTreshold) {
          document
            .querySelector(`${gradesNeighbors[currentActiveElement?.id ?? currentActiveElement.value]?.[1]}`)
            ?.focus();
        }

        if (gamepadAPI.buttonPressed("Down") || gamepadAPI.axesStatus[1] > stickTreshold) {
          document
            .querySelector(`${gradesNeighbors[currentActiveElement?.id ?? currentActiveElement.value]?.[2]}`)
            ?.focus();
        }

        if (gamepadAPI.buttonPressed("Right") || gamepadAPI.axesStatus[0] > stickTreshold) {
          document
            .querySelector(`${gradesNeighbors[currentActiveElement?.id ?? currentActiveElement.value]?.[3]}`)
            ?.focus();
        }

        if (gamepadAPI.buttonPressed("X")) {
          document.querySelector(".blur")?.classList.remove("blur");
        }

        if (gamepadAPI.buttonPressed("LB")) {
          history.back();
        }
      }
    }
  }, 35);
})();
