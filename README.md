# Earthquake Tracker Website

## Overview

[The Earthquake Tracker website](https://goyal6624.github.io/leaflet-challenge/) is a web application that allows users to visualize and explore earthquake data from the past week.

## Features

- Interactive Map: The website utilizes Leaflet, a popular JavaScript library for interactive maps, to display earthquake data on an interactive map. Users can zoom in, zoom out, and pan the map to explore different regions.

- Earthquake Data Visualization: The website retrieves earthquake data from the USGS GeoJSON feed at [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson). The data is displayed as circles on the map, with each circle's size and color representing the earthquake's magnitude and depth, respectively.

- Tectonic Plate Boundaries: In addition to earthquake data, the website also displays tectonic plate boundaries as lines on the map. This information is obtained from the [fraxen/tectonicplates](https://github.com/fraxen/tectonicplates) GitHub repository.

- Layer Control: Users can toggle between different map layers, such as Street, Satellite, and Grayscale, to customize their viewing experience.

- Information on Click: When users click on an earthquake circle, a popup appears showing details about the earthquake, including its location, magnitude, and depth.

- Legend: The website includes a legend that explains the color-coding of earthquake circles based on their depths.

## Technologies Used

- Leaflet: A JavaScript library for building interactive maps.

- D3.js: A JavaScript library for data visualization, used to create the earthquake circles and legend.

## How to Use

1. Clone the repository to your local machine.

2. Open the index.html file in your web browser.

3. Explore the interactive map to view earthquake data and tectonic plate boundaries.

## API Key

The website uses the Mapbox API for tile layers. The API key is hardcoded in the JavaScript code for simplicity.

## Credits

- Data Source: Earthquake data is sourced from the USGS GeoJSON feed.

- Tectonic Plate Boundaries: Tectonic plate boundary data is sourced from the [fraxen/tectonicplates](https://github.com/fraxen/tectonicplates) GitHub repository.

- Leaflet: [https://leafletjs.com/](https://leafletjs.com/)

- D3.js: [https://d3js.org/](https://d3js.org/)
