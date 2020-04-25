const width = 1000;
const height = 600;

const backgroundColor = "#AAAFFF";
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
  .attr("height", height)
  .attr("fill", backgroundColor);

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