document.addEventListener("DOMContentLoaded", () => {

    d3.csv("data/Ex6_TVdata_withStar.csv", d => {
        return {
            brand: d.brand,
            model: d.model,
            screenSize: +d.screenSize,
            screenTech: d.screenTech,
            energyConsumption: +d.energyConsumption,
            star: +d.star
        };
    }).then(data => {
        console.log("Processed TV data loaded:", data);

        // 1. Draw charts
        drawHistogram(data);
        drawScatterplot(data);

        // 2. Initialize filter controls
        populateFilters(data);

        // 3. Initialize tooltip and bind mouse listeners
        createTooltip();
        handleMouseEvents();

    }).catch(error => {
        console.error("Error loading CSV file:", error);
    });

});