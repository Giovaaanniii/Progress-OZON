const progressRing = document.getElementById("progressRing");
const valueInput = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");
const progressContainer = document.getElementById("progressContainer");

function updateProgress(value) {
    const numValue = value
   if (value === "" || value === "-" || isNaN(numValue) || numValue < 0 || numValue > 100) {
    alert("число должно быть от 0 до 100");
    valueInput.value = 0;
    progressRing.style.background = `
      conic-gradient(
        rgb(0, 76, 255) 0deg 0deg,
        #e0e0e0 0deg 360deg
      )
    `;
    return;
  }
  const progressValue = Math.min(100, Math.max(0, numValue));
  const degrees = (progressValue / 100) * 360;
  progressRing.style.background = `
    conic-gradient(
      rgb(0, 76, 255) 0deg ${degrees}deg,
      #e0e0e0 ${degrees}deg 360deg
    )
  `;
}
function toggleAnimation(isAnimated) {
  if (isAnimated) {
    progressRing.classList.add("animated");
  } else {
    progressRing.classList.remove("animated");
  }
}

function toggleVisibility(isHidden) {
  if (isHidden) {
    progressContainer.classList.add("hidden");
  } else {
    progressContainer.classList.remove("hidden");
  }
}

valueInput.addEventListener("input", function () {
  const value = parseInt(this.value) || 0;
  updateProgress(value);
});

animateToggle.addEventListener("change", function () {
  toggleAnimation(this.checked);
});

hideToggle.addEventListener("change", function () {
  toggleVisibility(this.checked);
});

updateProgress(0);

window.ProgressAPI = {
  setValue: updateProgress,
  setAnimation: toggleAnimation,
  setVisibility: toggleVisibility,
};
