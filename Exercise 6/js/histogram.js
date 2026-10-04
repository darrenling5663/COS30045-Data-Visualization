const drawHistogram = data => {

    const chartContainer = d3.select("#histogram");
    chartContainer.selectAll("*").remove();

    // SVG container
    const svg = chartContainer
        .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`);

    // Inner chart group translated by margins
    const innerChart = svg
        .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Generate bins
    const bins = binGenerator(data);
    console.log("Initial bins:", bins);

    // Calculate bounds
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    // Set scale domains and ranges
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // Draw the bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
          .attr("x", d => xScale(d.x0))
          .attr("y", d => yScale(d.length))
          .attr("width", d => xScale(d.x1) - xScale(d.x0))
          .attr("height", d => innerHeight - yScale(d.length))
          .attr("fill", barColor)
          .attr("stroke", bodyBackgroundColor)
          .attr("stroke-width", 2);

    // Axes setup
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format(","));

    const leftAxis = d3.axisLeft(yScale)
        .tickFormat(d3.format(","));

    // Bottom Axis
    innerChart
        .append("g")
          .attr("transform", `translate(0, ${innerHeight})`)
          .call(bottomAxis)
          .selectAll("text")
          .style("font-size", "10px");

    // Left Axis
    innerChart
        .append("g")
          .call(leftAxis)
          .selectAll("text")
          .style("font-size", "10px");

    // Y Axis Label
    innerChart
        .append("text")
          .text("Frequency")
          .attr("x", -10)
          .attr("y", -15)
          .attr("text-anchor", "start")
          .style("font-size", "11px")
          .style("font-family", "sans-serif");

    // X Axis Label
    innerChart
        .append("text")
          .text("Labeled Energy Consumption (kWh/year)")
          .attr("x", innerWidth)
          .attr("y", innerHeight + 40)
          .attr("text-anchor", "end")
          .style("font-size", "11px")
          .style("font-family", "sans-serif");

    console.log("Histogram initialized.");
};