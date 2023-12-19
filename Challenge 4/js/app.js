document.addEventListener("DOMContentLoaded", function () {
  let containers = document.querySelectorAll(".title");

  if (containers.length) {
    containers.forEach(function (container) {
      let scrollingText = container.querySelector("h1");

      // Support small text - copy to fill screen width
      if (scrollingText.offsetWidth < window.innerWidth) {
        let windowToScrolltextRatio = Math.round(window.innerWidth / scrollingText.offsetWidth);
        let scrollTextContent = scrollingText.querySelector(".scrolling-text-content").textContent;
        let newScrollText = "";
        for (let i = 0; i < windowToScrolltextRatio; i++) {
          newScrollText += " " + scrollTextContent;
        }
        scrollingText.querySelector(".scrolling-text-content").textContent = newScrollText;
      }

      // Init variables and config
      let scrollingTextWidth = scrollingText.offsetWidth;
      let scrollingTextHeight = scrollingText.offsetHeight;
      let startLetterIndent =
        parseInt(window.getComputedStyle(scrollingText.querySelector(".scrolling-text-content")).fontSize, 10) / 4.8;
      startLetterIndent = Math.round(startLetterIndent);
      let scrollAmountBoundary = Math.abs(window.innerWidth - scrollingTextWidth);
      let transformAmount = 0;
      let leftBound = 0;
      let rightBound = scrollAmountBoundary;
      let transformDirection = container.classList.contains("left-to-right") ? -1 : 1;
      let transformSpeed = 200;

      // Read transform speed
      if (container.getAttribute("speed")) {
        transformSpeed = parseInt(container.getAttribute("speed"));
      }

      // Make scrolling text copy for scrolling infinity
      let clonedScrollingText = scrollingText.cloneNode(true);
      clonedScrollingText.classList.add("scrolling-text-copy");
      container.appendChild(clonedScrollingText);
      scrollingText.style.position = "absolute";
      scrollingText.style.left = 0;
      container.style.height = scrollingTextHeight + "px";

      function getActiveScrollingText(direction) {
        const firstScrollingText = container.querySelector(".scrolling-text:nth-child(1)");
        const secondScrollingText = container.querySelector(".scrolling-text:nth-child(2)");

        const firstScrollingTextLeft = parseInt(window.getComputedStyle(firstScrollingText).left, 10);
        const secondScrollingTextLeft = parseInt(window.getComputedStyle(secondScrollingText).left, 10);

        if (direction === "left") {
          return firstScrollingTextLeft < secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
        } else if (direction === "right") {
          return firstScrollingTextLeft > secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
        }
      }

      window.addEventListener("wheel", function (e) {
        let delta = e.deltaY;

        if (delta > 0) {
          // going down
          transformAmount += transformSpeed * transformDirection;
          scrollingText.querySelector(".scrolling-text-content").style.transform = "skewX(10deg)";
        } else {
          transformAmount -= transformSpeed * transformDirection;
          scrollingText.querySelector(".scrolling-text-content").style.transform = "skewX(-10deg)";
        }
        setTimeout(function () {
          scrollingText.style.transform = "translate3d(" + transformAmount * -1 + "px, 0, 0)";
        }, 10);
        setTimeout(function () {
          scrollingText.querySelector(".scrolling-text-content").style.transform = "skewX(0)";
        }, 500);

        // Boundaries
        if (transformAmount < leftBound) {
          let activeText = getActiveScrollingText("left");
          activeText.style.left = Math.round(leftBound - scrollingTextWidth - startLetterIndent) + "px";
          leftBound = parseInt(window.getComputedStyle(activeText).left, 10);
          rightBound = leftBound + scrollingTextWidth + scrollAmountBoundary + startLetterIndent;
        } else if (transformAmount > rightBound) {
          let activeText = getActiveScrollingText("right");
          activeText.style.left =
            Math.round(rightBound + scrollingTextWidth - scrollAmountBoundary + startLetterIndent) + "px";
          rightBound += scrollingTextWidth + startLetterIndent;
          leftBound = rightBound - scrollingTextWidth - scrollAmountBoundary - startLetterIndent;
        }
      });
    });
  }
});
