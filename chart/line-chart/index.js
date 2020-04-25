const width = 1000;
const height = 600;

const lineColor = "#F2845C";
const textColor = "#30E7D2";
const dotColor = "#E7188F";

const dataset = [
  {"month": 100, "earning": 440},
  {"month": 150, "earning": 110},
  {"month": 200, "earning": 270},
  {"month": 250, "earning": 350},
  {"month": 300, "earning": 90},
  {"month": 350, "earning": 170},
  {"month": 400, "earning": 320},
  {"month": 450, "earning": 210},
  {"month": 500, "earning": 380},
  {"month": 550, "earning": 340},
];

const lineFunc = d3.line()
  .x(function (data) {
    return data.month;
  })
  .y(function (data) {
    return height - data.earning;
  })
  .curve(d3.curveBasis);

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const lineChart = svg.append("path")
  .attr("d", lineFunc(dataset))
  .attr("stroke", lineColor)
  .attr("stroke-width", 4)
  .attr("fill", "none");

const labels = svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (data) {
    return data.earning;
  })
  .attr("x", function (data) {
    return data.month - 10;
  })
  .attr("y", function (data) {
    return height - data.earning - 10;
  })
  .attr("fill", textColor)
  .style("z-index", 2);

// Add dot
const dots = svg.selectAll("dot")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("r", 4)
  .attr("cx", function (data) {
    return data.month;
  })
  .attr("cy", function (data) {
    return height - data.earning;
  })
  .attr("fill", dotColor);

// All curve types from http://using-d3js.com/05_04_curves.html
const curveArray = [
  {"d3Curve":d3.curveLinear,"curveTitle":"curveLinear"},
  {"d3Curve":d3.curveLinearClosed,"curveTitle":"curveLinearClosed"},
  
  {"d3Curve":d3.curveStep,"curveTitle":"curveStep"},
  {"d3Curve":d3.curveStepBefore,"curveTitle":"curveStepBefore"},
  {"d3Curve":d3.curveStepAfter,"curveTitle":"curveStepAfter"},
  
  {"d3Curve":d3.curveBundle,"curveTitle":"curveBundle"},
  {"d3Curve":d3.curveBundle.beta(0),"curveTitle":"curveBundle beta 0"},
  {"d3Curve":d3.curveBundle.beta(0.5),"curveTitle":"curveBundle beta 0.5"},
  {"d3Curve":d3.curveBundle.beta(1),"curveTitle":"curveBundle beta 1"},
  
  {"d3Curve":d3.curveNatural,"curveTitle":"curveNatural"},
  
  {"d3Curve":d3.curveBasis,"curveTitle":"curveBasis"},
  {"d3Curve":d3.curveBasisOpen,"curveTitle":"curveBasisOpen"},
  {"d3Curve":d3.curveBasisClosed,"curveTitle":"curveBasisClosed"},
  
  {"d3Curve":d3.curveCardinal,"curveTitle":"curveCardinal"},
  {"d3Curve":d3.curveCardinalOpen,"curveTitle":"curveCardinalOpen"},
  {"d3Curve":d3.curveCardinalClosed,"curveTitle":"curveCardinalClosed"},
  {"d3Curve":d3.curveCatmullRom,"curveTitle":"curveCatmullRom"},
  {"d3Curve":d3.curveCatmullRomOpen,"curveTitle":"curveCatmullRomOpen"},
  {"d3Curve":d3.curveCatmullRomClosed,"curveTitle":"curveCatmullRomClosed"},
  
  {"d3Curve":d3.curveMonotoneX,"curveTitle":"curveMonotoneX"},
  {"d3Curve":d3.curveMonotoneY,"curveTitle":"curveMonotoneY"},
];
const numberOfCurve = curveArray.length;
const intervalTime = 1000;
const curveTitleId = "line-chart-name";
let index = 0;

setInterval(() => {
  // Change curve type
  lineFunc.curve(curveArray[index].d3Curve);
  
  // Remove existing chart path
  svg.selectAll("path").remove();
  
  // Add data again to render new path
  svg.append("path")
    .attr("d", lineFunc(dataset))
    .attr("stroke", lineColor)
    .attr("stroke-width", 4)
    .attr("fill", "none");
  
  // Remove existing curve title
  svg.select('#'+curveTitleId).remove();
  
  // Add new curve title
  svg.append("text")
    .text(curveArray[index].curveTitle)
    .attr("y", 30)
    .attr("x", 200)
    .style("fill", "blue")
    .style("font-weight", "bold")
    .style("word-spacing", "15px")
    .style("letter-spacing", "3px")
    .style("font-size", "25px")
    .attr("id", curveTitleId);
  
  index++;
  // if we're on the end of array then restart
  if (index === numberOfCurve) index = 0;
}, intervalTime);