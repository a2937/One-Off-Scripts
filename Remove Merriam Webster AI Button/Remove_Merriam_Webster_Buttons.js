// ==UserScript==
// @name         Remove Merriam Webster Buttons
// @namespace    http://tampermonkey.net/
// @version      2026-01-01
// @description  Deletes the Chatbot button on Merriam Webster
// @author       nerdychara
// @match        https://**.merriam-webster.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
}
else 
{
    main(); 
}



function main() {
    'use strict';
    const buttons = document.querySelectorAll(`a[href^="/chatbot"]`);
    for(let i = 0 ;i < buttons.length;i++)
    {
        buttons[i].remove();
    }
};

