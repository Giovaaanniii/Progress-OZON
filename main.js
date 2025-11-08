const progressRing = document.getElementById('progressRing');
const valueInput = document.getElementById('valueInput');
const animateToggle = document.getElementById('animateToggle');
const hideToggle = document.getElementById('hideToggle');
const progressContainer = document.getElementById('progressContainer');

function updateProgress(value) {
  const progressValue = Math.min(100, Math.max(0, value));
  const degrees = (progressValue / 100) * 360;
  progressRing.style.transform = `rotate(${-90 + degrees}deg)`;
}

function toggleAnimation(isAnimated) {
  if (isAnimated) {
    progressRing.classList.add('animated');
  } else {
    progressRing.classList.remove('animated');
  }
}

function toggleVisibility(isHidden) {
  if (isHidden) {
    progressContainer.classList.add('hidden');
  } else {
    progressContainer.classList.remove('hidden');
  }
}

valueInput.addEventListener('input', function() {
  const value = parseInt(this.value) || 0;
  updateProgress(value);
});

animateToggle.addEventListener('change', function() {
  toggleAnimation(this.checked);
});

hideToggle.addEventListener('change', function() {
  toggleVisibility(this.checked);
});

updateProgress(0);

window.ProgressAPI = {
  setValue: updateProgress,
  setAnimation: toggleAnimation,
  setVisibility: toggleVisibility
};