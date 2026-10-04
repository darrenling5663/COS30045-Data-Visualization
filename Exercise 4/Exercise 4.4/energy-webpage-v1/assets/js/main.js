document.addEventListener("DOMContentLoaded", () => {

    // Keep the SVG canvas and test bar from Exercise 4.3
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
          .attr("viewBox", "0 0 1200 1600")
          .style("border", "1px solid black");

    svg.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 414)
        .attr("height", 16)
        .attr("fill", "blue");

    // Exercise 4.4: Load and process the CSV data
    d3.csv("Data/tvdata.csv", d => {
        return {
            brand: d.brand,
            count: +d.count
        };
    }).then(data => {
        console.log("Loaded TV Data:", data);
        console.log("Dataset Length:", data.length);
        console.log("Max Count:", d3.max(data, d => d.count));
        console.log("Min Count:", d3.min(data, d => d.count));
        console.log("Extent [min, max]:", d3.extent(data, d => d.count));

        data.sort((a, b) => b.count - a.count);
        console.log("Sorted Data (Descending):", data);

        drawBarChart(data);
    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

});

function drawBarChart(data) {
    console.log("drawBarChart called with data:", data);
}