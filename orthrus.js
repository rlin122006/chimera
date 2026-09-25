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

(function () {
    "use strict";

    // watches for when the document changes
    const observer = new MutationObserver(() => {
      const scripts = document.querySelectorAll("script");

      // for each script element find the ones that contain answer
      for (const script of scripts) {
          if (script.textContent.includes("\\answer")) {
              const raw = script.textContent;
              const answer = extractString(raw);

              // sets parent object that must also own input that corresponds to the answer
              const object = script.parentElement;

              // find input of the object
              const input = object.querySelector(
                'input[aria-label="answer"]'
              );

              if (answer) {
                input.value = answer;
              }
          }
      }
    });

    // grab answer string
    function extractString(raw) {
        // looks for starting answer in text
        const marker = "\\answer";
        const start = raw.indexOf(marker);

        // exit if not found
        if (start === -1) {
            return null;
        }

        // finds starting open brace
        const openBrace = raw.indexOf("{", start);

        // exit if not found
        if (openBrace === -1) {
            return null;
        }

        // set depth
        let depth = 0;

        // loop through all characters
        for (let i = openBrace; i < raw.length; i++) {
            // if open brace found add to depth
            if (raw[i] === "{") {
                depth++;
              // if close brace found remove depth
            } else if (raw[i] === "}") {
                depth--;

                // when depth reaches 0 extract the text
                if (depth === 0) {
                    return raw.slice(openBrace + 1, i).trim();
                }
            }
        }

        return null;
    }

    // observe everything
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
})();
