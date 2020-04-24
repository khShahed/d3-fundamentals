const width = 300;
const height = 300;
const padding = 2;

const dataset = [50, 10, 15, 20, 25, 14];

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
    .attr("x", function (data, index) {
      return index * (width / dataset.length);
    })
    .attr("y", function (data) {
      return height - data;
    })
    .attr("width", width / dataset.length - padding)
    .attr("height", function (data) {
      return data;
    });
