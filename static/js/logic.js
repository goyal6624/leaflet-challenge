// API key
import { API_KEY } from './config.js';

// Create two overlay groups
var earthquakeLayer = new L.layerGroup();
var tectonicLayer = new L.layerGroup();

// Define overlays
var overlays = {
    Earthquakes: earthquakeLayer,
    "Tectonic Plates": tectonicLayer
};

// Adding the tile layers
var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors'
});

var satelliteLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

var grayscaleLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

// Base layers
var baseLayers = {
    Street: streetLayer,
    Satellite: satelliteLayer,
    "Grayscale": grayscaleLayer
};

// Create the map object
var myMap = L.map("map", {
    center: [37.6000, -95.6650],
    zoom: 2.5,
    // Display on load
    layers: [satelliteLayer, earthquakeLayer]
});

// Layer control
L.control.layers(baseLayers, overlays, {
    collapsed: false
}).addTo(myMap);

// Get the colors for the circles and legend based on depth
function getDepthColor(depth) {
    return depth >= 90 ? "#FF0D0D" :
        depth < 90 && depth >= 70 ? "#FF4E11" :
        depth < 70 && depth >= 50 ? "#FF8E15" :
        depth < 50 && depth >= 30 ? "#FFB92E" :
        depth < 30 && depth >= 10 ? "#ACB334" :
        "#69B34C";
}

// Draw the circles
function drawEarthquakeCircle(point, latlng) {
    let magnitude = point.properties.mag;
    let depth = point.geometry.coordinates[2];
    return L.circle(latlng, {
        fillOpacity: 0.5,
        color: getDepthColor(depth),
        fillColor: getDepthColor(depth),
        // The size of the circle is based on the magnitude of the earthquake
        radius: magnitude * 20000
    });
}

// Display info when the feature is clicked
function bindPopupInfo(feature, layer) {
    layer.bindPopup(`Location: ${feature.properties.place} <br> Magnitude: ${feature.properties.mag} <br> Depth: ${feature.geometry.coordinates[2]}`);
}

// The link to get the Earthquake GeoJSON data
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get the GeoJSON data for earthquakes
d3.json(earthquakeURL).then((data) => {
    var earthquakeFeatures = data.features;

    // Create a GeoJSON layer with the retrieved data
    L.geoJSON(earthquakeFeatures, {
        pointToLayer: drawEarthquakeCircle,
        onEachFeature: bindPopupInfo
    }).addTo(earthquakeLayer);

    // Set up the legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [-10, 10, 30, 50, 70, 90];

        // Loop through intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getDepthColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
});

// The link to get the tectonic plate boundaries data
var tectonicURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Get the GeoJSON data for tectonic plates
d3.json(tectonicURL).then((tectonicData) => {
    L.geoJSON(tectonicData, {
        color: "rgb(255, 94, 0)",
        weight: 2
    }).addTo(tectonicLayer);

    tectonicLayer.addTo(myMap);
});
