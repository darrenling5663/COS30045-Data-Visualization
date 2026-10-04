document.addEventListener("DOMContentLoaded", () => {

    // viewBox set to 500 width by 700 height for balanced proportions
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
          .attr("viewBox", "0 0 500 700")
          .style("border", "1px solid black");

    // Load CSV data
    d3.csv("Data/tvdata.csv", d => {
        return {
            brand: d.brand,
            count: +d.count
        };
    }).then(data => {

        // Sort descending so the most frequent brands appear at the top
        data.sort((a, b) => b.count - a.count);

        // Draw bar chart with scales
        drawBarChart(data, svg);

    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

});

const drawBarChart = (data, svg) => {

    // Step 1: Linear scale for horizontal bar width (count)
    const xScale = d3.scaleLinear()
        .domain([0, 1200])   // Covers the max value (1096) with room on the right
        .range([0, 400]);    // Fits within the 500px viewBox width

    // Step 2: Band scale for vertical bar placement and thickness (brand categories)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 700])     // Matches the viewBox height
        .paddingInner(0.2);  // Adds neat gaps between bars (replaces manual spacing)

    // Data-binding and rendering
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        // Position each bar using the band scale
        .attr("y", d => yScale(d.brand))
        // Calculate width using the linear scale
        .attr("width", d => xScale(d.count))
        // Dynamic bar thickness via bandwidth
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue");

    console.log("Exercise 4.6: Chart drawn with linear and band scales!");
};