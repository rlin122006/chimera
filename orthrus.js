// ==UserScript==
// @name        orthrus
// @namespace   Violentmonkey Scripts
// @version     1.0.0
//
// @match       *://ximera.osu.edu/*
// @grant       none
//
// @author      rlin122006
// ==/UserScript==

(async function () {
    "use strict";
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 4000));

        const scripts = document.querySelectorAll("script");

        for (const script of scripts) {
            if (script.textContent.includes("\\answer")) {
                const raw = script.textContent;
                const answer = extractString(raw);

                const object = script.parentElement;

                const inputs = object.querySelectorAll(
                    'input[aria-label="answer"]'
                );

                for (const input of inputs) {ze
                    if (answer) {
                        input.value = answer;

                        input.dispatchEvent(new Event("input", {
                            bubbles: true
                        }));

                        const button = input.closest(".input-group")
                            .querySelector(".btn-ximera-submit");

                        const form = button.form;

                        form.addEventListener("submit", event => {
                            event.preventDefault();
                        });

                        button.click();
                    }
                }
            }
        }
    }

    // grab answers from raw text
    function extractString(raw) {
        const marker = "\\answer";
        const start = raw.indexOf(marker);

        if (start === -1) {
            return null;
        }

        const openBrace = raw.indexOf("{", start);

        if (openBrace === -1) {
            return null;
        }

        let depth = 0;

        // loop through all characters
        for (let i = openBrace; i < raw.length; i++) {
            // if open brace found add to depth
            if (raw[i] === "{") {
                depth++;
              // if close brace found remove depth
            } else if (raw[i] === "}") {
                depth--;

                if (depth === 0) {
                    return raw.slice(openBrace + 1, i).trim();
                }
            }
        }
        return null;
    }
})();
