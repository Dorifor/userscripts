// ==UserScript==
// @name        JPDB Sounds
// @namespace   https://github.com/Dorifor
// @description Adds cursed sounds to jpdb, don't thank me, shoutout to @Ōkami Amaterasu#1829 for chosing these lovely sounds.
// @include     https://jpdb.io/review*
// @version     1.0.2
// @author      Mao#2071
// @license     MIT; http://opensource.org/licenses/MIT
// @icon        https://www.google.com/s2/favicons?sz=64&domain=jpdb.io
// @require     http://code.jquery.com/jquery-3.4.1.min.js
// @run-at      document-end
// @grant       none
// ==/UserScript==

$(document).ready(function () {
  const links = {
    "#grade-1": new Audio(
      "https://github.com/Dorifor/jpdbsounds/raw/main/Quick_Reverb_Fart_-_Sound_Effect_HD.mp3"
    ),
    "#grade-2": new Audio(
      "https://github.com/Dorifor/jpdbsounds/raw/main/Lego_yoda_death_sound.mp3"
    ),
    "#grade-3": new Audio(
      "https://github.com/Dorifor/jpdbsounds/raw/main/shivering_dog_meme.mp3"
    ),
    "#grade-4": new Audio(
      "https://github.com/Dorifor/jpdbsounds/raw/main/tuting.mp3"
    ),
    "#grade-5": new Audio(
      "https://github.com/Dorifor/jpdbsounds/raw/main/Yeah_baby.mp3"
    ),
  };

  links["#grade-4"].volume = 0.1;

  document.querySelector("#show-answer").addEventListener("click", () => {
    setTimeout(() => {
      Object.keys(links).forEach((key) => {
        console.log(key);
        document.querySelector(key).addEventListener("click", (e) => {
          e.preventDefault();
          links[key].addEventListener("ended", () => {
            e.target.parentElement.submit();
          });
          links[key].play();
        });
      });
    }, 100);
  });
});
