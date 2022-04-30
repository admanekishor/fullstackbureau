import React, { Component } from "react";
import BarChart from "react-bar-chart";
import { Card } from "react-bootstrap";
import RenderWithCard from "./RenderWithCard";

// class Metrics extends Component {
  // render() {
    function Custom_BarChart(){
    const data = [
      { text: "DOB", value: 500 },
      { text: "Address", value: 300 },
      { text: "Email", value: 900 },
      { text: "Phone", value: 100 },
      { text: "Name", value: 700 }
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    return (
      <>
        <div>
        <Card border="secondary">
          <BarChart
            ylabel="Quantity"
            width={400}
            height={300}
            margin={margin}
            data={data}
            
          />
        </Card>
        </div>
      </>
    );
  // }
}

export default Custom_BarChart;
