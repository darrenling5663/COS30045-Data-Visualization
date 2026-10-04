document.addEventListener("DOMContentLoaded", () => {

    // Load CSV dataset
    d3.csv("data/Data_exercise 5.1-1.csv", d => {
        return {
            Screen_Tech: d.Screen_Tech ? d.Screen_Tech.toUpperCase() : "",
            Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"] || +d.Energy_Consumption
        };
    }).then(data => {

        // Sort descending by consumption (LED -> OLED -> LCD)
        data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

        console.log("Loaded & Sorted Data:", data);

        drawBarChart(data);

    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

});

const drawBarChart = data => {

    // Set up inner chart margins and dimensions
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const width = 800;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // SVG container targeting #bar-chart
    const svg = d3.select("#bar-chart")
        .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`);

    // Create inner chart group with margin offset
    const innerChart = svg
        .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set up scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, 400])
        .range([innerHeight, 0]);

    // Calculate axes
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    // Add X axis
    innerChart
        .append("g")
          .attr("transform", `translate(0, ${innerHeight})`)
          .call(bottomAxis)
          .selectAll("text")
          .style("font-size", "12px");

    // Add Y axis
    innerChart
        .append("g")
          .call(leftAxis)
          .selectAll("text")
          .style("font-size", "11px");

    // Add Y axis title label
    innerChart
        .append("text")
          .text("Energy Consumption (kWh)")
          .attr("x", 0)
          .attr("y", -15)
          .attr("text-anchor", "start")
          .style("font-size", "13px")
          .style("font-family", "sans-serif");

    // Draw vertical bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
          .attr("class", "bar")
          .attr("x", d => xScale(d.Screen_Tech))
          .attr("y", d => yScale(d.Energy_Consumption))
          .attr("width", xScale.bandwidth())
          .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
          .attr("fill", "green");

    // Add value labels on top of each bar
    innerChart
        .selectAll(".bar-label")
        .data(data)
        .join("text")
          .attr("class", "bar-label")
          .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
          .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
          .attr("y", d => yScale(d.Energy_Consumption) - 6)
          .attr("text-anchor", "middle")
          .style("font-size", "11px")
          .style("font-family", "sans-serif");

    console.log("Exercise 5.1: Vertical bar chart rendered successfully.");
};