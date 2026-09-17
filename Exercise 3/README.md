# Exercise 3 – Data Story: TV Energy Consumption

## Overview

In this exercise, you will develop a **data story** based on the **TV Energy Consumption dataset**. Using the website created in **Exercise 0.2**, you will extend your work to present a meaningful narrative supported by data visualisations.

Your goal is to communicate insights from the dataset in a clear and engaging way through your **website and written explanation**.

You must use the **Exercise 3 folder in your existing forked repository** and reuse the files created in **Exercise 0.2**.

---

## Data Story

### Audience

The target audience for this visualisation includes:

* **Everyday Consumers:** Household owners and renters looking to balance screen size with long-term operating costs.
* **Policy Makers & Regulators:** Officials monitoring appliance energy efficiency trends and compliance with Minimum Energy Performance Standards (MEPS).
* **Researchers & Advocates:** Analysts studying household energy consumption patterns and consumer electronics efficiency.

These audiences need transparent data on how television power draw varies across screen dimensions, panel technologies, and Energy Star ratings to make informed economic and regulatory decisions.

### Story Overview

This visualisation explores patterns in **TV energy consumption** across different television models and specifications.

The goal is to help viewers understand:

- How energy consumption varies between television models
- The relationship between **screen size and power consumption**
- How **energy efficiency ratings** impact energy usage
- Trends that may help consumers choose more **energy-efficient televisions**

The website presents these insights through visualisations and explanatory text that guide the viewer through the data.

---

## About the Data

### Data Source

The dataset used in this project contains information about **television models and their energy consumption characteristics**, including power usage, screen size, technology type, and efficiency ratings.

The dataset was provided as part of the course materials.

### Data Processing

Before creating visualisations, the dataset was processed to ensure it was suitable for analysis. This included:

* **Attribute Selection:** Filtered the dataset to focus on diagonal screen size (centimetres) and labelled comparative annual energy consumption (kWh/year).
* **Cleaning:** Pruned empty rows, non-standard screen entries, and discontinued legacy models to focus on current consumer display technologies (LED, OLED, and QLED).
* **Cost Derivation:** Applied an average benchmark Australian electricity price of 30 cents per kWh over a standard usage profile (10 hours daily active operation, 14 hours standby) to translate raw kWh metrics into estimated annual operational costs.

### Privacy

The dataset does not contain any **personal or sensitive information**. It focuses solely on product specifications and energy consumption data related to television devices.

### Accuracy and Limitations

While the dataset provides useful information about TV energy consumption, there are some limitations:

* **Standard Test Conditions:** Test ratings are benchmarked under controlled laboratory presets. Real-world power consumption may vary significantly based on user display brightness, HDR streaming, gaming mode usage, and ambient temperature.
* **Tariff Variations:** Electricity prices fluctuate across countries, states and retail plans; 30¢/kWh serves as an indicative national average.

These factors should be considered when interpreting the visualisations.

### Ethics

When presenting data visualisations, it is important to ensure that the information is represented **accurately and responsibly**.

This project follows ethical data visualisation practices by avoiding misleading scale distortions by plotting raw, unmanipulated regulatory test data directly on standard axes. The story maintains neutrality across brands to prevent greenwashing and ensure consumers receive an objective representation of energy demands.

## AI Declaration

Generative AI was used to assist me in structuring the documentation, organizing narrative sections according to data storytelling principles, and scaffolding the HTML/CSS markup. All calculations, data interpretations, and final text were reviewed, tested, and validated against the course requirements.

## Website Storytelling

The website has been updated to communicate a **data-driven story** based on the TV energy consumption dataset.

The website includes:

- Visualisations that present key insights from the dataset
- Text explanations that help readers understand the meaning of the visualisations
- Context that connects the data to real-world implications

The aim is to guide the viewer through the data in a way that is **informative, engaging, and easy to understand**.
