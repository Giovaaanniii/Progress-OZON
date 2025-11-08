class ProgressRing {
  constructor(ringElement) {
    this.progressRing = ringElement;
    this.updateProgress(0);
  }

  updateProgress(value) {
    const numValue = parseFloat(value);

    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      console.error("Progress value must be between 0 and 100");
      return false;
    }

    const progressValue = Math.min(100, Math.max(0, numValue));
    const degrees = (progressValue / 100) * 360;

    this.progressRing.style.background = `
      conic-gradient(
        rgb(0, 76, 255) 0deg ${degrees}deg,
        #e0e0e0 ${degrees}deg 360deg
      )
    `;

    return true;
  }

  toggleAnimation(isAnimated) {
    if (isAnimated) {
      this.progressRing.classList.add("animated");
    } else {
      this.progressRing.classList.remove("animated");
    }
  }

  toggleVisibility(isHidden) {
    const container = this.progressRing.closest(".block-progress");
    if (container) {
      if (isHidden) {
        container.classList.add("hidden");
      } else {
        container.classList.remove("hidden");
      }
    }
  }
}

const progressRing = new ProgressRing(document.getElementById("progressRing"));

document.getElementById("valueInput").addEventListener("input", (e) => {
  const value = parseFloat(e.target.value) || 0;
  if (!progressRing.updateProgress(value)) {
    e.target.value = 0;
    alert("число должно быть от 0 до 100");
  }
});

document.getElementById("animateToggle").addEventListener("change", (e) => {
  progressRing.toggleAnimation(e.target.checked);
});

document.getElementById("hideToggle").addEventListener("change", (e) => {
  progressRing.toggleVisibility(e.target.checked);
});

window.ProgressAPI = {
  setValue: (value) => progressRing.updateProgress(value),
  setAnimation: (isAnimated) => progressRing.toggleAnimation(isAnimated),
  setVisibility: (isHidden) => progressRing.toggleVisibility(isHidden),
};
