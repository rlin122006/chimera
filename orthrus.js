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
    await new Promise(resolve => setTimeout(resolve, 4000));
    while (true) {
        const scripts = document.querySelectorAll("script");

        for (const script of scripts) {
            if (!script.textContent.includes("\\answer")) {
                continue;
            }

            const object = script.parentElement;

            const inputs = object.querySelectorAll(
                'input[aria-label="answer"]'
            );

            const raw = script.textContent;
            const answers = extractStrings(raw);

            for (const input of inputs) {
                if (input.disabled) {
                    continue;
                }

                for (const answer of answers) {
                    if (input.disabled) {
                      break;
                    }

                    if(!answer) {
                        continue;
                    }

                    enterAnswer(input, answer)
                    await submitAnswer(input);
                }
            }
        }
    }

    // extract answers into an array
    function extractStrings(raw) {
        const marker = "\\answer";
        const answers = [];

        let searchStart = 0;

        while (true) {
            const start = raw.indexOf(marker, searchStart);

            if (start === -1) {
                break;
            }

            const openBrace = raw.indexOf("{", start);

            if (openBrace === -1) {
                break;
            }

            let depth = 0;

            // use bracket depth to correctly extract answer
            for (let i = openBrace; i < raw.length; i++) {
                if (raw[i] === "{") {
                    depth++;
                } else if (raw[i] === "}") {
                    depth--;

                    if (depth === 0) {
                        answers.push(
                            raw.slice(openBrace + 1, i).trim()
                        );

                        searchStart = i + 1;
                        break;
                    }
                }
            }
        }
        return answers;
    }

    // put answer into input
    function enterAnswer(element, answer) {
        element.value = answer;
        // tell webpage input was updated
        element.dispatchEvent(new Event("input", {
            bubbles: true
        }));
    }

    // hit answer button and allow webpage to register
    async function submitAnswer(element) {
        const button = element.closest(".input-group")
            .querySelector(".btn-ximera-submit");
        const form = button.form;

        form.addEventListener("submit", event => {
            event.preventDefault();
        });

        button.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
})();
