// ==UserScript==
// @name         WingDings translator
// @namespace    http://tampermonkey.net/
// @version      2025-11-09
// @description  Translates WingDings to English
// @author       a2937
// @match        https://**.tumblr.com/**
// @match        https://**.archiveofourown.org/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @sandbox      DOM
// ==/UserScript==
(function() {
    'use strict';
     const wingDingAlphabet = {
        '\u270C': 'A',
         '\u1F44C': 'B',
         '\u1F44D': 'C',
         '\u1F44E': 'D',
         '\u261C': 'E',
         '\u261E': 'F',
         '\u261D': 'G',
         '\u261F': 'H',
         '\u270B': 'I',
         '\u263A': 'J',
         '\u1F610': 'K',
         '\u2639': 'L',
         '\u1F4A3': 'M',
         '\u2620' : 'N',
         '\u2690': 'O',
         '\u1F3F1': 'P',
         '\u2708': 'Q',
         '\u263C': 'R',
         '\u1F4A7': 'S',
         '\u2744': 'T',
         '\u1F546': 'U',
         '\u271E': 'V',
         '\u1F548': 'W',
         '\u2720': 'X',
         '\u2721': 'Y',
        '\u262A': 'Z',
         '\u1F4EC': '.',
        '\u270D': '?',
         '\u1F4EA': '.',


         // Symbol only because for some reason they're not always matching
         '👌︎': 'B',
         '👍︎': 'C',
         '👎︎': 'D',
         '😐︎': 'K',
         '💣︎': 'M',
         '🏱︎': 'P',
         '🕆︎': 'U',
         '💧︎': 'S',
         '🕈︎': 'W',
         '📬︎': ".",
         '📪︎': ',',
     }


     document.querySelectorAll('*').forEach((el) => {
         Object.entries(wingDingAlphabet).forEach(([oldValue, newValue]) => {
         if (el.innerText && el.innerText.indexOf(`${oldValue}`) >= 0 && el.children.length == 0) {
                 el.innerText = el.innerText.replaceAll(`${oldValue}`,`${newValue}`);
             }
    })
  });
    // Your code here...
})();