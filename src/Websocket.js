const url = "https://ws-api.iextrading.com/1.0/tops";
const socket = require("socket.io-client")(url);

socket.on("connect", () => {
  socket.emit("subscribe", "snap");
});

console.log(1);
