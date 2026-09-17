document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================
    // Step 2: Apply a style to an HTML element using D3
    // ==========================================================
    d3.select("h1")
      .style("color", "green");

    // ==========================================================
    // Step 3: Append a paragraph element to the container using D3
    // Targets #d3-text-target directly inside the content card
    // ==========================================================
    d3.select("#d3-text-target")
      .append("p")
      .text("Purchasing a low energy consumption TV will help with your energy bills!")
      .style("font-weight", "bold")
      .style("color", "#0056b3")
      .style("margin-top", "15px");

    // ==========================================================
    // Step 4: Append and style an SVG rectangle using D3
    // ==========================================================
    d3.select("#d3-canvas")
      .append("rect")
      .attr("x", 50)
      .attr("y", 45)
      .attr("width", 100)
      .attr("height", 30)
      .style("fill", "green");

});