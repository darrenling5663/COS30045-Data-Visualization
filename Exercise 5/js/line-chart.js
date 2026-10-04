document.addEventListener("DOMContentLoaded", () => {

    // Load ARE Spot Prices CSV dataset
    d3.csv("data/ARE_Spot_Prices.csv", d => {
        // Detect exact column names from the CSV
        const avgPrice = d["Average Price (notTas-Snowy)"] || d.averagePrice || d["Average Price"];
        
        return {
            year: +d.Year || +d.year,
            averagePrice: +avgPrice
        };
    }).then(data => {

        // Filter out any empty rows and sort chronologically by year
        const cleanData = data.filter(d => !isNaN(d.year) && !isNaN(d.averagePrice));
        cleanData.sort((a, b) => a.year - b.year);

        console.log("Spot Price Data loaded:", cleanData);

        drawLineChart(cleanData);

    }).catch(error => {
        console.error("Error loading ARE_Spot_Prices.csv:", error);
    });

});

const drawLineChart = data => {

    // Step 1: Margins and dimensions matching Exercise 5.1
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const width = 800;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // SVG container targeting #line-chart
    const svg = d3.select("#line-chart")
        .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`);

    // Inner chart group translated by margins
    const innerChart = svg
        .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Step 2: Continuous Linear Scales for x (year) and y (averagePrice)
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year)) // [1998, 2024]
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)]) // 0 to max price (~144.5)
        .range([innerHeight, 0])
        .nice(); // Rounds up domain to a clean tick boundary

    // Step 3: Axes setup with integer formatting for years
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d")); // Format year ticks without commas (e.g. 2000, not 2,000)

    const leftAxis = d3.axisLeft(yScale);

    // Append X axis
    innerChart
        .append("g")
          .attr("transform", `translate(0, ${innerHeight})`)
          .call(bottomAxis)
          .selectAll("text")
          .style("font-size", "11px");

    // Append Y axis
    innerChart
        .append("g")
          .call(leftAxis)
          .selectAll("text")
          .style("font-size", "11px");

    // Y-Axis title label
    innerChart
        .append("text")
          .text("Average Price ($/MWh)")
          .attr("x", 0)
          .attr("y", -15)
          .attr("text-anchor", "start")
          .style("font-size", "13px")
          .style("font-family", "sans-serif");

    // Step 4: Line generator and path
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    innerChart
        .append("path")
          .attr("d", lineGenerator(data))
          .attr("fill", "none")
          .attr("stroke", "green")
          .attr("stroke-width", 1.5);

    // Step 5: Scatter plot circles at each data point
    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
          .attr("cx", d => xScale(d.year))
          .attr("cy", d => yScale(d.averagePrice))
          .attr("r", 3)
          .attr("fill", "green");

    console.log("Exercise 5.2: Line chart and scatter plot rendered!");
};