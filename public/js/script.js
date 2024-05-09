const host = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(host);

let displayTitle = true;

// ws.onmessage = function (event) {
//   const message = JSON.parse(event.data);
//   console.log("message", message);
//   switch (message.action) {
//     case "update":
//       console.log("hii");
//       // const time = formatTime(message.time);
//       // console.log("hi2");

//       // let minutes = document.getElementById("minutes");
//       // let seconds = document.getElementById("seconds");

//       // if (minutes != null) {
//       //   minutes.innerText = time.split(":")[0];
//       //   console.log("hi3");
//       // }
//       // if (seconds != null) {
//       //   seconds.innerText = time.split(":")[1];
//       //   console.log("hi4");
//       // }
//       //   break;
//       // case "updateTeams":
//       console.log("hi5");
//       updateTeamDisplay(message.team1, message.team2);
//       break;
//   }
// };

try {
  function updateTeamDisplay(team1, team2) {
    // if (team1 && team2)
    document.getElementById("team1Name").innerText = team1.name || "N/A";
    document.getElementById("team1ScoreDisplay").innerText =
      team1.score.toString() || "0";
    document.getElementById("team2Name").innerText = team2.name || "N/A";
    document.getElementById("team2ScoreDisplay").innerText =
      team2.score.toString() || "0";
    // }
  }
} catch (e) {
  console.log(e);
}

function applyTeams() {
  const team1 = {
    name: document.getElementById("team1Input").value,
    score: parseInt(document.getElementById("team1Score").value) || 0,
  };
  const team2 = {
    name: document.getElementById("team2Input").value,
    score: parseInt(document.getElementById("team2Score").value) || 0,
  };
  console.log(team1, team2);
  ws.send(JSON.stringify({ action: "updateTeams", team1, team2 }));
}

function toggleDisplay() {
  displayTitle = !displayTitle;
  document.getElementById("title-container").style.display = displayTitle
    ? "block"
    : "none";
  document.getElementById("team-info-container").style.display = displayTitle
    ? "none"
    : "block";
}

setInterval(toggleDisplay, 5000);

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

/*##############Particles animation##############*/
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

  for (let i = 0; i < 50; i++) {
    createParticle();
  }

  // Optionally, create a new particle periodically
  setInterval(createParticle, 2500);
});
