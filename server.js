const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

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
    const { action, time } = JSON.parse(message);
    switch (action) {
      case "set":
        clearInterval(timer.interval);
        timer.time = parseInt(time);
        broadcast({ action: "update", time: timer.time });
        break;
      case "start":
        clearInterval(timer.interval);
        timer.interval = setInterval(() => {
          timer.time--;
          if (timer.time <= 0) {
            clearInterval(timer.interval);
            timer.time = 0;
          }
          broadcast({ action: "update", time: timer.time });
        }, 1000);
        break;
      case "stop":
        clearInterval(timer.interval);
        break;
      case "resume":
        clearInterval(timer.interval);
        timer.interval = setInterval(() => {
          timer.time--;
          if (timer.time <= 0) {
            clearInterval(timer.interval);
            timer.time = 0;
          }
          broadcast({ action: "update", time: timer.time });
        }, 1000);
        break;
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
