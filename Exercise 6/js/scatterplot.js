const drawScatterplot = data => {

    const chartContainer = d3.select("#scatterplot");
    chartContainer.selectAll("*").remove();

    // Responsive SVG
    const svg = chartContainer
        .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`);

    // Create an inner chart group with margins (assigning to global innerChartS)
    innerChartS = svg
        .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 1. Scales Setup using global variables
    const maxStar = d3.max(data, d => d.star) || 8;
    const maxEng = d3.max(data, d => d.energyConsumption) || 2800;

    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    yScaleS
        .domain([0, maxEng])
        .range([innerHeight, 0])
        .nice();

    // Color scale for screenTech
    colorScale
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

    // 2. Axes Setup
    const bottomAxisS = d3.axisBottom(xScaleS)
        .ticks(9);

    const leftAxisS = d3.axisLeft(yScaleS)
        .tickFormat(d3.format(","));

    // Append X axis
    innerChartS
        .append("g")
          .attr("transform", `translate(0, ${innerHeight})`)
          .call(bottomAxisS)
          .selectAll("text")
          .style("font-size", "10px");

    // Append Y axis
    innerChartS
        .append("g")
          .call(leftAxisS)
          .selectAll("text")
          .style("font-size", "10px");

    // Y-Axis Title
    innerChartS
        .append("text")
          .text("Labeled Energy Consumption (kWh/year)")
          .attr("x", -10)
          .attr("y", -15)
          .attr("text-anchor", "start")
          .style("font-size", "11px")
          .style("font-family", "sans-serif");

    // X-Axis Title
    innerChartS
        .append("text")
          .text("Star Rating")
          .attr("x", innerWidth)
          .attr("y", innerHeight + 40)
          .attr("text-anchor", "end")
          .style("font-size", "11px")
          .style("font-family", "sans-serif");

    // 3. Draw circles
    innerChartS
        .selectAll("circle.tv-point")
        .data(data)
        .join("circle")
          .attr("class", "tv-point")
          .attr("cx", d => xScaleS(d.star))
          .attr("cy", d => yScaleS(d.energyConsumption))
          .attr("r", 4)
          .attr("fill", d => colorScale(d.screenTech))
          .attr("opacity", 0.5);

    // 4. Add Legend in top right corner
    const legend = svg
        .append("g")
          .attr("transform", `translate(${width - 100}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend
            .append("g")
              .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .style("font-size", "11px")
            .style("font-family", "sans-serif")
            .text(screenTech);
    });

    console.log("Exercise 6.3: Scatterplot and legend rendered.");
};