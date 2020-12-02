// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`); 

//Import data from data.csv and format data to numerical values
d3.csv("assets/data/data.csv").then(function(data){
    //console.log(data);
data.forEach(function(d){
    d.age = +d.age;
    d.smokes = +d.smokes;
    // data.healthcare = +data.healthcare;
    // data.poverty = +data.poverty;
    // data.abbr = data.abbr;
    // data.income = +data.income;
})

//Create Scales
var xScale = d3.scaleLinear()
  .domain([30, d3.max(data, d => d.age) + 2])
  .range([0, chartWidth]);

var yScale = d3.scaleLinear()
  .domain([5, d3.max(data, d => d.smokes)])
  .range([chartHeight, 0]);

  //Create Axes

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  //Append Axes to chartGroup
  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

  chartGroup.append("g")
  .call(yAxis);

  //Make Circles
  let circlesGroup = chartGroup.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.age))
  .attr("cy", d => yScale(d.smokes))
  .attr("r", 10)
  .attr("fill", "lightblue")
  .attr("opacity", ".6")
  .attr("stroke-width", "1")
  .attr("stroke", "black");

  chartGroup.select("g")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("text")
  .text(d => d.abbr)
  .attr("x", d => xScale(d.age))
  .attr("y", d => yScale(d.smokes))
  .attr("dy",-395)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("fill", "black");

  console.log(data);
  
//Make labels for the healthrisk graph

chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - 50)
.attr("x", 0 -250)
.attr("dy", "1em")
.attr("class", "axisText")
.text("Percentage of People who Smoke (%)");

chartGroup.append("text")
.attr("transform", `translate(${chartWidth / 2.5}, ${chartHeight + chartMargin.top + 25})`)
.attr("class", "axisText")
.text("Average Age");

});
