document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".particle-container");

  function createParticle() {
    const size = Math.random() * 5 + 3; // Size between 3 and 8 pixels
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`; // Random position across the width of the viewport
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // Duration between 10 and 20 seconds

    container.appendChild(particle);
  }

  // Create 50 particles. Increase or decrease this number based on performance and visual preference.
  for (let i = 0; i < 50; i++) {
    createParticle();
  }

  // Optionally, create a new particle periodically
  setInterval(createParticle, 1500);
});
