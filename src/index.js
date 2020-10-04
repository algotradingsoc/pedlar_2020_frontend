import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";

const socket = require("socket.io-client")(
  "https://ws-api.iextrading.com/1.0/tops"
);

socket.on("message", (message) => console.log("this is msg", message));

// Connect to the channel
socket.on("connect", () => {
  socket.emit("subscribe", "tlt,qqq,aig+");

  socket.emit("unsubscribe", "aig+");
});

socket.on("disconnect", () => console.log("Disconnected."));

// ReactDOM.render(<NavBar />, document.getElementById("root"));

// ReactDOM.render(<OrderBook />, document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();