document.addEventListener("DOMContentLoaded", () => {

    // viewBox set to 600 width x 700 height to accommodate labels and numbers
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
          .attr("viewBox", "0 0 600 700")
          .style("border", "1px solid black");

    // Load CSV data
    d3.csv("Data/tvdata.csv", d => {
        return {
            brand: d.brand,
            count: +d.count
        };
    }).then(data => {

        // Sort descending so the largest bars render at the top
        data.sort((a, b) => b.count - a.count);

        drawBarChart(data, svg);

    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

});

const drawBarChart = (data, svg) => {

    // Step 1: Scale definitions
    // Max value fits within 400px width
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 700])
        .paddingInner(0.2);

    // Left offset to leave room for brand labels
    const barStartX = 100;

    // Step 2: Create a group container <g> for each data entry
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Step 3: Add back the rectangles inside each group
    barAndLabel
        .append("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", barStartX)
        .attr("y", 0) // Group already provides y-translation
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue");

    // Step 4: Add the brand category text labels (right-aligned)
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", barStartX - 10) // 90px
        .attr("y", yScale.bandwidth() / 2 + 4) // Centered vertically in bar
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .style("font-family", "sans-serif");

    // Step 5: Add the count value number at the end of each bar
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => barStartX + xScale(d.count) + 5) // Just past the bar end
        .attr("y", yScale.bandwidth() / 2 + 4)
        .style("font-size", "12px")
        .style("font-family", "sans-serif");

    console.log("Exercise 4.7: Bar chart with labels and values loaded!");
};