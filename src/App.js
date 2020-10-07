import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/navbar";
import OrderBook from "./components/orderbook";

function App() {
  return (
    <div>
    <div>
      <NavBar />
      <OrderBook />
    </div>
    <div>
      IEX Real-Time Price provided for free by <a href="https://iextrading.com/developers">IEX</a>.
      View <a href="https://iextrading.com/apiexhibita/">IEX&rsquo;s Terms of Use</a>
    </div>
    </div>
  );
}

export default App;
