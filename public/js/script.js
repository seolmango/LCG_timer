const host = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(host);

ws.onmessage = function (event) {
  const message = JSON.parse(event.data);
  if (message.action === "update") {
    const time = formatTime(message.time);
    document.getElementById("minutes").innerText = time.split(":")[0];
    document.getElementById("seconds").innerText = time.split(":")[1];
  }
};

function setTime() {
  const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
  const seconds = parseInt(document.getElementById("secondsInput").value) || 0;
  const totalSeconds = minutes * 60 + seconds;

  ws.send(JSON.stringify({ action: "set", time: totalSeconds }));

  if (document.getElementById("startImmediately").checked) {
    controlTimer("start");
  }
}

function controlTimer(command) {
  ws.send(JSON.stringify({ action: command }));
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

/*Particles animation*/
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
