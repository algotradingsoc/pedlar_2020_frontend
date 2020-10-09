import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date().toLocaleDateString() };
  }
  state = {};
  tick = () => {
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  };
  render() {
    return (
      <div
        className="w-100 d-flex justify-content-between sticky-top align-items-center"
        id="navbar"
      >
        <a
          href=""
          className="p-3 text-light text-decoration-none"
          style={{ fontSize: "2rem", fontWeight: "700", marginLeft: "5rem" }}
        >
          Pedlar
        </a>
        <div className="d-flex align-items-center">
          <div className="mr-3 text-light d-flex" style={{ width: "178px" }}>
            <div className="mr-2">Current time:</div>
            <div>
              {this.state.time} {this.tick()}
            </div>
          </div>
          <a
            href="https://www.github.com"
            className="pt-3 pb-3 pl-4 pr-4 mr-5 text-decoration-none"
            style={{
              backgroundColor: "rgb(254, 175, 203)",
              color: "rgb(8, 17, 49)",
              borderRadius: "2rem",
            }}
          >
            View Source Code
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
