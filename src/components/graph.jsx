import React, { Component } from "react";

class Graph extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/data/`)
      .then((res) => res.json())
      .then((data) => console.log(data));

    const ws = new WebSocket("ws://localhost:8080/");
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
    ws.onmessage = (message) => {
      console.log(message);
    };

    ws.onerror = () => {
      console.log("error");
    };
  }
  render() {
    return <h1>Hi i am the graph component</h1>;
  }
}

export default Graph;
