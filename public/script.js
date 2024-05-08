const host = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(host);

ws.onmessage = function (event) {
  const message = JSON.parse(event.data);
  if (message.action === "update") {
    document.getElementById("timerDisplay").innerText = formatTime(
      message.time
    );
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
