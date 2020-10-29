import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/navbar";
import OrderBook from "./components/orderbook";

function App() {
  return (
    <div>
      <NavBar />
      <OrderBook />
      <div className="w-100" style={{height: "2rem"}}></div>
    </div>
  );
}

export default App;
