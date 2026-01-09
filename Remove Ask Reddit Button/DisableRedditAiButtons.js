// ==UserScript==
// @name         Remove Ask Reddit Buttons
// @namespace    http://tampermonkey.net/
// @version      2026-01-01
// @description  Deletes all Ask Reddit buttons on the Reddit website
// @author       nerdychara
// @match        https://**.reddit.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

addEventListener("load", setTimeout(main, 2000))

function main() {
    'use strict';
    const buttons = document.querySelectorAll(`a[href^="/answers"]`);
    
    for(let i = 0 ;i < buttons.length;i++)
    {
        buttons[i].remove();
    }
};
