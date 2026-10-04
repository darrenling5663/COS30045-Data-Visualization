document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded triggered - initializing D3...");

    // 1. Create responsive SVG canvas
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
          .attr("viewBox", "0 0 1200 1600")
          .style("border", "1px solid black");

    // 2. Load CSV data
    d3.csv("Data/tvdata.csv", d => {
        return {
            brand: d.brand,
            count: +d.count
        };
    }).then(data => {
        // Sort descending
        data.sort((a, b) => b.count - a.count);

        console.log("Data loaded successfully! Total records:", data.length);
        console.log("Top bar item:", data[0]);

        // Draw bar chart
        drawBarChart(data, svg);

    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

});

const drawBarChart = (data, svg) => {
    const barHeight = 20;
    const spacing = 4;

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + spacing))
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue");

    console.log("Bar chart rendered in DOM.");
};