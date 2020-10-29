import React, { Component } from "react";

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      text: this.props.text,
      askPrice: "-",
      bidPrice: "-",
      askSize: "-",
      bidSize: "-",
    };
  }

  componentDidMount() {
    const socket = require("socket.io-client")(
      "https://ws-api.iextrading.com/1.0/tops"
    );

    socket.on("message", (message) => {
      const object = JSON.parse(message);
      this.setState({
        askPrice: object.askPrice,
        bidPrice: object.bidPrice,
        askSize: object.askSize,
        bidSize: object.bidSize,
      });
    });

    // Connect to the channel
    socket.on("connect", () => {
      socket.emit("subscribe", this.state.text);
    });

    socket.on("disconnect", () => console.log("Disconnected."));
  }

  render() {
    return (
      <div
        className="row mx-auto text-light text-center w-100"
      >
        <div className="col-sm-2">IEX</div>
        <div className="col-sm-2">{this.state.text}</div>
        <div className="col-sm-2">{this.state.bidPrice}</div>
        <div className="col-sm-2">{this.state.askPrice}</div>
        <div className="col-sm-2">{this.state.bidSize}</div>
        <div className="col-sm-2">{this.state.askSize}</div>
      </div>
    );
  }
}

export default Ticker;
