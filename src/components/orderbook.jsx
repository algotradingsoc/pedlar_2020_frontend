import React, { Component, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

class OrderBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      subjects: [
        { text: "1", value: "kannada" },
        { text: "2", value: "english" },
        { text: "3", value: "hindhi" },
      ],
    };
  }

  componentDidMount() {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
      .then((res) => res.json())
      .then((data) => {
        let options = [];
        data.forEach((x) => {
          const obj = { text: x.symbol, value: x.iexId };
          options.push(obj);
        });
        this.setState({ options: options });
        console.log("options", this.state.options);
      });
  }

  state = {};

  render() {
    const subjects = [
      { text: "1", value: "kannada" },
      { text: "2", value: "english" },
      { text: "3", value: "hindhi" },
    ];
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
          className="mx-auto w-75 overflow-auto"
          style={{ maxHeight: "340px" }}
        >
          <div
            className="row d-flex mx-auto text-light text-center mt-4 pt-2 pb-2"
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
      </div>
    );
  }
}

export default OrderBook;
