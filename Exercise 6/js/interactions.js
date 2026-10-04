// Step 1: Manage filter buttons and bar transitions
const populateFilters = data => {

    let activeTech = "all";
    let activeSize = "all";

    const applyFilters = () => {
        let filteredData = data;

        if (activeTech !== "all") {
            filteredData = filteredData.filter(tv => tv.screenTech === activeTech);
        }

        if (activeSize !== "all") {
            filteredData = filteredData.filter(tv => tv.screenSize === activeSize);
        }

        const updatedBins = binGenerator(filteredData);

        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };

    // Screen Technology filter buttons
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
          .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
          .text(d => d.label)
          .on("click", (e, d) => {
              if (!d.isActive) {
                  filters_screen.forEach(f => f.isActive = f.id === d.id);
                  d3.selectAll("#filters_screen .filter")
                    .classed("active", f => f.id === d.id);
                  activeTech = d.id;
                  applyFilters();
              }
          });

    // Screen Size filter buttons
    if (!d3.select("#filters_size").empty()) {
        d3.select("#filters_size")
            .selectAll(".filter")
            .data(filters_size)
            .join("button")
              .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
              .text(d => d.label)
              .on("click", (e, d) => {
                  if (!d.isActive) {
                      filters_size.forEach(f => f.isActive = f.id === d.id);
                      d3.selectAll("#filters_size .filter")
                        .classed("active", f => f.id === d.id);
                      activeSize = d.id;
                      applyFilters();
                  }
              });
    }

    console.log("Filters initialized.");
};

// Step 2: Append tooltip group, rectangle, and initial text element to innerChartS
const createTooltip = () => {
    // Append tooltip group to the scatterplot innerChart (innerChartS)
    const tooltip = innerChartS
        .append("g")
          .attr("class", "tooltip")
          .style("opacity", 0);

    // Append background rounded rectangle
    tooltip
        .append("rect")
          .attr("width", tooltipWidth)
          .attr("height", tooltipHeight)
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("fill", barColor)
          .attr("fill-opacity", 0.75);

    // Append centered text label
    tooltip
        .append("text")
          .text("NA")
          .attr("x", tooltipWidth / 2)
          .attr("y", tooltipHeight / 2 + 2)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("fill", "white")
          .style("font-weight", 900);

    console.log("Tooltip created on scatterplot.");
};

// Step 3: Handle mouseenter and mouseleave on scatterplot circles
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // 1. Update tooltip text with TV screen size
            d3.select(".tooltip text")
                .text(d.screenSize);

            // 2. Read circle coordinates from the event target
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // 3. Position tooltip above the circle and fade in
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // 4. Hide tooltip and move out of view
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`);
        });

    console.log("Mouse events bound to scatterplot circles.");
};