document.addEventListener("DOMContentLoaded", () => {
    console.log("Initializing Exercise 5.3 Donut Chart...");

    const csvPath = "data/Data_exercise 5.3.csv";

    d3.csv(csvPath, d => {
        const catKey = Object.keys(d).find(k => k.toLowerCase().includes("category")) || "Screensize_Category";
        const countKey = Object.keys(d).find(k => k.toLowerCase().includes("count")) || "Count";

        return {
            Screensize_Category: d[catKey],
            Count: +d[countKey]
        };
    }).then(data => {
        const cleanData = data.filter(d => d.Screensize_Category && !isNaN(d.Count));
        console.log("Loaded Donut Chart Data:", cleanData);

        drawDonutChart(cleanData);
    }).catch(error => {
        console.error("Error loading CSV file for Donut Chart:", error);
    });
});

const drawDonutChart = data => {
    const chartContainer = d3.select("#donut-chart");
    if (chartContainer.empty()) {
        console.error("Error: <div id='donut-chart'> not found in index.html!");
        return;
    }

    chartContainer.selectAll("*").remove();

    // Chart dimensions
    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // Shortest side / 2 with padding

    // Responsive SVG canvas
    const svg = chartContainer
        .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`);

    // Center the inner chart group at (width / 2, height / 2)
    const innerChart = svg
        .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Categorical color scale using d3.schemeSet2
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2);

    // Pie layout generator (disabling auto-sort to preserve CSV order)
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null);

    // Arc generator: innerRadius 60% and outerRadius 100% of radius
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1.0);

    // Bind data to slice paths
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
          .attr("d", arcGenerator)
          .attr("fill", d => color(d.data.Screensize_Category))
          .attr("stroke", "white")
          .attr("stroke-width", 2);

    // Add category labels centered in each arc using centroid
    innerChart
        .selectAll("text")
        .data(pie(data))
        .join("text")
          .text(d => d.data.Screensize_Category)
          .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .style("font-size", "12px")
          .style("font-family", "sans-serif")
          .style("fill", "#1e293b");

    console.log("Exercise 5.3: Donut chart rendered successfully.");
};