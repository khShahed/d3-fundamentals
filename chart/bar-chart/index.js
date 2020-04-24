const width = 300;
const height = 300;
const padding = 2;

const dataset = [50, 10, 15, 20, 25, 14, 18, 60, 45, 20, 5, 34];

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

function colorPicker(value){
  if (value <= 20) return "#30E7D2";
  else if (value > 20) return "#F2845C";
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
    })
    .on("mouseover", function(data){
      d3.select(this).style("fill", function() {
        return d3.rgb(d3.select(this).style("fill")).darker(0.2);
      });
    })
    .on("mouseout", function(data){
      d3.select(this).style("fill", function() {
        return colorPicker(data);
      });
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