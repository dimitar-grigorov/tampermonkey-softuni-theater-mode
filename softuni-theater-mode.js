// ==UserScript==
// @name         Softuni Theater Mode Button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Customizes Softuni.bg layout with a floating button for toggling theater mode on the video stream pages.
// @author       Dimitar Grigorov
// @match        https://softuni.bg/trainings/resources/video/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";
  const streamContainer = document.querySelector("div.stream-container");
  if (streamContainer) {
    createFloatingButton(streamContainer);
    // Quick and dirty way to set custom playback speeds
    setCustomPlayBackSpeeds();
  } else {
    console.error("Stream container not found");
    return;
  }

  function updateSpanGlyphIcon(spanGlyph) {
    const sectionElement = streamContainer.querySelector("#stream-section");
    // if the section element has the class col-lg-12, the theater mode is active
    if (sectionElement.classList.contains("col-lg-12")) {
      spanGlyph.className = "glyphicon glyphicon-chevron-left";
    } else {
      spanGlyph.className = "glyphicon glyphicon-chevron-right";
    }
  }

  function toggleTheaterMode(spanGlyph) {
    // Toggle Aside visibility
    const asideElement = streamContainer.querySelector("aside");
    if (asideElement) {
      asideElement.classList.toggle("hidden");
    }
    // Toggle Stream width
    const sectionElement = streamContainer.querySelector("#stream-section");
    if (sectionElement) {
      sectionElement.classList.toggle("col-lg-12");
      sectionElement.classList.toggle("col-lg-9");
    }
    // Toggle Glyph icon
    updateSpanGlyphIcon(spanGlyph);
  }

  function createFloatingButton() {
    // Create the span element for the glyph icon
    const spanGlyph = document.createElement("span");
    updateSpanGlyphIcon(spanGlyph);
    // Create the toggle theater mode button
    const btnTheaterMode = document.createElement("button");
    btnTheaterMode.type = "button";
    btnTheaterMode.className = "btn btn-danger btn-floating btn-lg";
    btnTheaterMode.id = "btn-toggle-theater-mode";
    btnTheaterMode.appendChild(spanGlyph);
    // Append the button to the stream container element
    streamContainer.appendChild(btnTheaterMode);

    const btnDefaultRightPosition = "-25px";
    const btnDefaultOpacity = "0.2";
    // Apply styles to the button
    Object.assign(btnTheaterMode.style, {
      position: "fixed",
      bottom: "50%",
      right: btnDefaultRightPosition,
      opacity: btnDefaultOpacity,
      transform: "translate(0, 50%)",
      transition: "right 0.3s ease-in-out, opacity 0.3s ease-in-out", // Add transition for right and opacity
      zIndex: "100",
    });

    // Add an event listener for mouseenter and mouseleave on the button
    btnTheaterMode.addEventListener("mouseenter", handleMouseEnter);
    btnTheaterMode.addEventListener("mouseleave", handleMouseLeave);

    function handleMouseEnter() {
      btnTheaterMode.style.right = "0"; // Move to the left when hovered
      btnTheaterMode.style.opacity = "1"; // More visible when hovered
    }

    function handleMouseLeave() {
      btnTheaterMode.style.right = btnDefaultRightPosition; // Move more to the right when not hovered
      btnTheaterMode.style.opacity = btnDefaultOpacity; // Less visible when not hovered
    }

    // Define the hover zone width (10% of the screen)
    const hoverZoneWidth = window.innerWidth * 0.1;

    // Add an event listener for mousemove on the stream container
    streamContainer.addEventListener("mousemove", handleMousemove);

    function handleMousemove(event) {
      // Check if the mouse is within the hover zone on the right side of the stream container
      if (event.clientX > streamContainer.clientWidth - hoverZoneWidth) {
        btnTheaterMode.style.opacity = "1";
      } else {
        btnTheaterMode.style.opacity = btnDefaultOpacity;
      }
    }

    // Add an event listener for click on the button
    btnTheaterMode.addEventListener("click", () =>
      toggleTheaterMode(spanGlyph)
    );
  }

  function setCustomPlayBackSpeeds() {
    let players = videojs.getPlayers();
    if (!players) {
      console.error("No video players found");
      return;
    }
    // Define the custom playback speeds
    let newPlaybackRates = [
      0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
      2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3,
    ];
    // Set the custom playback speeds, by replacing the default ones
    players.video.options_.playbackRates.splice(
      0,
      newPlaybackRates.length,
      ...newPlaybackRates
    );
  }
})();
