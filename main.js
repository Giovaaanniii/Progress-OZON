class ProgressRing {
  constructor(ringElement, inputElement, animateToggleElement, hideToggleElement, containerElement) {
    this.progressRing = ringElement;
    this.valueInput = inputElement;
    this.animateToggle = animateToggleElement;
    this.hideToggle = hideToggleElement;
    this.progressContainer = containerElement;

    this.valueInput.addEventListener("input", () => {
      const value = parseFloat(this.valueInput.value) || 0;
      this.updateProgress(value);
    });

    this.animateToggle.addEventListener("change", () => {
      this.toggleAnimation(this.animateToggle.checked);
    });

    this.hideToggle.addEventListener("change", () => {
      this.toggleVisibility(this.hideToggle.checked);
    });

    this.updateProgress(0);
  }

  updateProgress(value) {
    const numValue = value;
    if (value === "" || value === "-" || isNaN(numValue) || numValue < 0 || numValue > 100) {
      alert("число должно быть от 0 до 100");
      this.valueInput.value = 0;
      this.progressRing.style.background = `
        conic-gradient(
          rgb(0, 76, 255) 0deg 0deg,
          #e0e0e0 0deg 360deg
        )
      `;
      return;
    }
    const progressValue = Math.min(100, Math.max(0, numValue));
    const degrees = (progressValue / 100) * 360;
    this.progressRing.style.background = `
      conic-gradient(
        rgb(0, 76, 255) 0deg ${degrees}deg,
        #e0e0e0 ${degrees}deg 360deg
      )
    `;
  }

  toggleAnimation(isAnimated) {
    if (isAnimated) {
      this.progressRing.classList.add("animated");
    } else {
      this.progressRing.classList.remove("animated");
    }
  }

  toggleVisibility(isHidden) {
    if (isHidden) {
      this.progressContainer.classList.add("hidden");
    } else {
      this.progressContainer.classList.remove("hidden");
    }
  }
}

const progressRing = new ProgressRing(
  document.getElementById("progressRing"),
  document.getElementById("valueInput"),
  document.getElementById("animateToggle"),
  document.getElementById("hideToggle"),
  document.getElementById("progressContainer")
);

window.ProgressAPI = {
  setValue: (value) => progressRing.updateProgress(value),
  setAnimation: (isAnimated) => progressRing.toggleAnimation(isAnimated),
  setVisibility: (isHidden) => progressRing.toggleVisibility(isHidden),
};