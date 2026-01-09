// ==UserScript==
// @name         Remove Copilot Buttons
// @namespace    http://tampermonkey.net/
// @version      2026-01-01
// @description  Deletes all Copilot buttons on the Github website
// @author       nerdychara
// @match        https://**.github.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const buttons = document.querySelectorAll(`a[href$="/copilot"]`);
    for(let i = 0 ;i < buttons.length;i++)
    {
        buttons[i].remove();
    }
    // Your code here...
})();
