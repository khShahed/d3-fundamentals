const width = 300;
const height = 300;
const padding = 2;

const dataset = [50, 10, 15, 20, 25, 14, 18, 60, 45, 20, 5, 34];

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

function colorPicker(value){
  if (value <= 20) return "#666666";
  else if (value > 20) return "#FF0033";
}

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
    .attr("x", function (data, index) {
      return index * (width / dataset.length);
    })
    .attr("y", function (data) {
      return height - (data * 4);
    })
    .attr("width", width / dataset.length - padding)
    .attr("height", function (data) {
      return data * 4;
    })
    .attr("fill", function (data) {
      return colorPicker(data);
    });

svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (data) {
    return data;
  })
  .attr("text-anchor", "middle")
  .attr("x", function (data, index) {
    return  index * (width / dataset.length) + (width / dataset.length - padding) / 2;
  })
  .attr("y",  function (data) {
    return height - (data * 4) - 10;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", 12)
  .attr("fill", "blue");