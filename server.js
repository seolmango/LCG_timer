const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

let timer = { time: 0, interval: null };

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    const data = JSON.parse(message);
    switch (data.action) {
      case "set":
        clearInterval(timer.interval);
        timer.time = parseInt(data.time);
        broadcast({ action: "update", time: timer.time });
        break;
      case "start":
      case "resume":
        startOrResumeTimer();
        break;
      case "stop":
        clearInterval(timer.interval);
        break;
      // case "updateTeams":
      //   broadcast({
      //     action: "updateTeams",
      //     team1: data.team1,
      //     team2: data.team2,
      //   });
      //   break;
    }
  });
});

function startOrResumeTimer() {
  clearInterval(timer.interval);
  timer.interval = setInterval(() => {
    timer.time--;
    if (timer.time <= 0) {
      clearInterval(timer.interval);
      timer.time = 0;
    }
    broadcast({ action: "update", time: timer.time });
  }, 1000);
}

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
