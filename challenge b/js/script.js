function addGradientOnHover(event) {
  const section = event.target;
  const computedStyle = getComputedStyle(section);

  // Determine the gradient direction based on justify-content
  if (computedStyle.getPropertyValue("justify-content") === "flex-start") {
    section.classList.add("gradient", "gradient-left");
  } else if (computedStyle.getPropertyValue("justify-content") === "flex-end") {
    section.classList.add("gradient", "gradient-right");
  }
}

// Function to remove the gradient class when the mouse leaves the section
function removeGradientOnLeave(event) {
  const section = event.target;
  section.classList.remove("gradient", "gradient-left", "gradient-right");
}

// Add event listeners to each section
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.addEventListener("mouseover", addGradientOnHover);
  section.addEventListener("mouseout", removeGradientOnLeave);
});
