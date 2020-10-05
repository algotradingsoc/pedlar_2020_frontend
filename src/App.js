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
    </div>
  );
}

export default App;
