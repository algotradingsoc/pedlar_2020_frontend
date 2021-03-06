import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import Ticker from "./ticker";
import Chart from "./chart";

class OrderBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: ["2041", "2891", "3347", "5765", "6343", "6472", "6829"],
      selectedSymbols: [
        { text: "EEM", value: "2041" },
        { text: "GLD", value: "2891" },
        { text: "HYG", value: "3347" },
        { text: "QQQ", value: "5765" },
        { text: "SLV", value: "6343" },
        { text: "SPY", value: "6472" },
        { text: "TLT", value: "6829" },
      ],
      socket: require("socket.io-client")(
        "https://ws-api.iextrading.com/1.0/tops"
      ),
      chartTicker: "",
      // corresponding tops symbols: EEM, GLD, HYG, QQQ, SLV, SPY, TLT
    };
  }

  componentDidMount() {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
      .then((res) => res.json())
      .then((data) => {
        let options = [];
        data.forEach((x) => {
          const obj = { value: x.iexId, text: x.symbol };
          options.push(obj);
        });
        this.setState({
          options: options,
        });
      });

    // Connect to the channel
    this.state.socket.on("connect", () => {
      if (this.state.chartTicker != null)
        this.state.socket.emit("subscribe", this.state.chartTicker);
      console.log("inital connection established");
    });

    this.state.socket.on("disconnect", () => console.log("Disconnected."));
  }

  handleOnChange = (event, data) => {
    const values = data.value;
    if (event["_dispatchListeners"].length === 3) {
      const selectedSymbols = this.state.selectedSymbols;
      for (let i = 0; i < selectedSymbols.length; i++) {
        if (!values.includes(selectedSymbols[i].value)) {
          selectedSymbols.splice(i, 1);
          this.setState({ selectedSymbols: selectedSymbols });
          break;
        }
      }
    } else {
      const value = values[values.length - 1];
      let selectedSymbols = this.state.selectedSymbols;
      const obj = this.state.options.filter((x) => x.value === value)[0];
      selectedSymbols.push(obj);
      selectedSymbols.sort((a, b) => a.text.localeCompare(b.text));
      this.setState({ selectedSymbols: selectedSymbols });
    }
  };

  changeChart = (event) => {
    const ticker = event.currentTarget
      .querySelector("div")
      .querySelectorAll("div")[1].innerText;
    this.setState({ chartTicker: ticker });

    this.state.socket.disconnect();
    this.state.socket.connect();

    this.state.socket.on("message", (message) => {
      const object = JSON.parse(message);
      this.setState({ trace: object.bidPrice - object.askPrice / 2 });
    });

    this.state.socket.on("connect", () => {
      if (this.state.chartTicker != null)
        this.state.socket.emit("subscribe", this.state.chartTicker);
    });

    this.state.socket.on("disconnect", () => console.log("Disconnected."));
  };

  render() {
    return (
      <div>
        <h2 className="p-3 text-light text-center">
          Real Time TOPS Viewer - IEX OrderBook
        </h2>
        <div className="row w-75 mx-auto" style={{ position: "relative" }}>
          <div className="col-md-12 h-100">
            <Dropdown
              placeholder="Select IEX"
              fluid
              multiple
              search
              selection
              options={this.state.options}
              className="text-light"
              defaultValue={this.state.selected}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
        <div className="row w-75 mx-auto mt-1">
          <div
            className="row d-flex mx-auto text-light text-center mt-4 pt-2 pb-2 border-bottom "
            style={{ width: "95%" }}
          >
            <div className="col-sm-2">Exchange</div>
            <div className="col-sm-2">Ticker</div>
            <div className="col-sm-2">Bid</div>
            <div className="col-sm-2">Ask</div>
            <div className="col-sm-2">Bid Size</div>
            <div className="col-sm-2">Ask Size</div>
          </div>
        </div>
        <div
          className="mx-auto overflow-auto w-75 mb-5"
          style={{ maxHeight: "340px", minHeight: "340px" }}
        >
          <div id="tickers-div">
            {this.state.selectedSymbols.length > 0 &&
              this.state.selectedSymbols.map((sym) => (
                <button
                  onClick={this.changeChart}
                  className="mx-auto row pt-2 pb-2 d-flex align-items-center border-0"
                  style={{
                    width: "95%",
                    backgroundColor: "transparent",
                    height: "50px",
                  }}
                >
                  <Ticker key={sym.text} value={sym.value} text={sym.text} />
                </button>
              ))}
            {this.state.selectedSymbols.length <= 0 && (
              <div className="row w-75 mx-auto">
                <div
                  className="row d-flex mx-auto text-light text-center pt-2 pb-2 mt-3 justify-content-center align-items-center"
                  style={{ width: "95%" }}
                >
                  <div style={{ fontSize: "15px" }}>
                    Please Select a Ticker.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="mx-auto w-75"
          style={{ position: "relative", marginTop: "5rem" }}
        >
          {!this.state.chartTicker && (
            <div
              className="w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "transparent",
                position: "absolute",
                top: "0",
                zIndex: "100",
              }}
            >
              <div
                class="text-light"
                style={{ fontSize: "22px", fontWeight: "bold" }}
              >
                Select a Ticker above to view chart.
              </div>
            </div>
          )}
          <Chart
            className="p-5"
            chartTicker={this.state.chartTicker}
            trace={this.state.trace}
          />
        </div>
        <div className="text-light mx-auto w-75 text-right mt-3">
          IEX Real-Time Price provided for free by{" "}
          <a href="https://iextrading.com/developers">IEX</a>. View{" "}
          <a href="https://iextrading.com/apiexhibita/">
            IEX&rsquo;s Terms of Use
          </a>
        </div>
      </div>
    );
  }
}

export default OrderBook;
