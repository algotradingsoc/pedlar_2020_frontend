import React, { Component } from "react";
import CanvasJSReact from "../canvasJs/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [
  { x: 1, y: 10 },
  { x: 2, y: 13 },
  { x: 3, y: 18 },
  { x: 4, y: 20 },
  { x: 5, y: 17 },
  { x: 6, y: 10 },
  { x: 7, y: 13 },
  { x: 8, y: 18 },
  { x: 9, y: 20 },
  { x: 10, y: 17 },
];
var xVal = dps.length + 1;
var yVal = 15;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      options: {
        animationEnabled: true,
        theme: "dark2",
        backgroundColor: "rgb(8, 17, 49)", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        title: {
          text: `Stock Prices ${
            this.props.chartTicker ? `for ${this.props.chartTicker}` : ""
          }`,
        },
        subtitles: [
          {
            text: "All Prices are in USD",
          },
        ],
        axisX: {
          // valueFormatString: "MMM"
          color: "black",
        },
        axisY: {
          prefix: "$",
          title: "Price",
        },
        axisY2: {
          prefix: "$",
          suffix: "bn",
          title: "Revenue & Income",
          tickLength: 0,
        },
        toolTip: {
          shared: true,
        },
        legend: {
          reversed: true,
          cursor: "pointer",
        },
        data: [
          // {
          //   type: "ohlc",
          //   showInLegend: true,
          //   name: "Stock Price",
          //   yValueFormatString: "$#,##0.00",
          //   xValueFormatString: "MMMM",
          //   dataPoints: [   // Y: [Open, High ,Low, Close]
          //     { x: new Date(2016, 0), y: [101.949997, 112.839996, 89.370003, 112.209999] },
          //     { x: new Date(2016, 1), y: [112.269997, 117.589996, 96.820000, 106.919998] },
          //     { x: new Date(2016, 2), y: [107.830002, 116.989998, 104.400002, 114.099998] },
          //     { x: new Date(2016, 3), y: [113.750000, 120.790001, 106.309998, 117.580002] },
          //     { x: new Date(2016, 4), y: [117.830002, 121.080002, 115.879997, 118.809998] },
          //     { x: new Date(2016, 5), y: [118.500000, 119.440002, 108.230003, 114.279999] },
          //     { x: new Date(2016, 6), y: [114.199997, 128.330002, 112.970001, 123.940002] },
          //     { x: new Date(2016, 7), y: [123.849998, 126.730003, 122.070000, 126.120003] },
          //     { x: new Date(2016, 8), y: [126.379997, 131.979996, 125.599998, 128.270004] },
          //     { x: new Date(2016, 9), y: [128.380005, 133.500000, 126.750000, 130.990005] },
          //     { x: new Date(2016, 10), y: [131.410004, 131.940002, 113.550003, 118.419998] },
          //     { x: new Date(2016, 11), y: [118.379997, 122.500000, 114.000000, 115.050003] }
          //   ]
          // },
          {
            type: "line",
            showInLegend: true,
            name: "Net Income",
            axisYType: "secondary",
            yValueFormatString: "$#,##0.00bn",
            xValueFormatString: "MMMM",
            dataPoints: dps,
          },
        ],
      },
    };
  }

  updateChart() {
    yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
    dps.push({ x: xVal, y: yVal });
    xVal++;
    if (dps.length > 150) {
      dps.shift();
    }
    this.chart.render();
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.updateChart();
  }

  render() {
    console.log("child............", this.state.options.data[0].dataPoints);
    return (
      <div
        style={
          this.props.chartTicker
            ? { position: "relative" }
            : { filter: "blur(5px)", position: "relative" }
        }
      >
        <CanvasJSChart
          style={{ backgroundColor: "black!important" }}
          onRef={(ref) => (this.chart = ref)}
          options={this.state.options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        <div
          style={{
            width: "10%",
            height: "40px",
            background: "black",
            position: "absolute",
            bottom: "0",
            backgroundColor: "rgb(8, 17, 49)",
          }}
        ></div>
      </div>
    );
  }
}

export default Chart;
