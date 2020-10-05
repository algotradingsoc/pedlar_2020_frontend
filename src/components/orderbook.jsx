import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import Ticker from "./ticker";

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
  }

  handleOnChange = (event, data) => {
    // length === 3 is remove, length === 2 is add
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
          className="mx-auto overflow-auto w-75"
          style={{ maxHeight: "340px" }}
        >
          <div>
            {this.state.selectedSymbols.map((sym) => (
              <Ticker key={sym.text} value={sym.value} text={sym.text} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default OrderBook;
