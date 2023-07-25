// Store the URL for the GeoJSON data
const url_atlanta_rain = "http://localhost:5000/api/v1.0/atlanta/rain_data";
const url_philly_rain = "http://localhost:5000/api/v1.0/philadelphia/rain_data";
const url_chicago_rain = "http://localhost:5000/api/v1.0/chicago/rain_data";
const url_atlanta_temp = "http://localhost:5000/api/v1.0/atlanta/temp_data";
const url_philly_temp = "http://localhost:5000/api/v1.0/philadelphia/temp_data";
const url_chicago_temp = "http://localhost:5000/api/v1.0/chicago/temp_data";
const all_data = "http://localhost:5000/api/v1.0/all_weather_data";


// Add a Leaflet tile layer for streets
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Add a Leaflet tile layer for topography
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="http://viewfinderpanoramas.org">SRTM</a> | ' +
        'Map style: &copy; <a href="https://opentopomap.org/">OpenTopoMap</a> ' +
        '(<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a Leaflet map object
var myMap = L.map("map", {
    center: [37.270969, -79.941429],
    zoom: 6,
    layers: [streets] // Start with streets layer as default
});

// Define basemaps as streets and topo
let baseMaps = {
    "Streets": streets,
    "Topography": topo
};

// Define the rain layergroup and temperature plate layergroups for the map
let rain_data = new L.LayerGroup();
let temp_data = new L.LayerGroup();

// Define the overlays and link the layergroups to separate overlays
let overlays = {
    "Rain": rain_data,
    "Temperature": temp_data
};

// Add a control layer and pass in baseMaps and overlays
L.control.layers(baseMaps, overlays).addTo(myMap);

// This styleInfo function will dictate the styling for all of the rain points on the map
function styleInfo(feature) {
    return {
        color: chooseColor(feature.properties.rain_sum),
        radius: chooseRadius(feature.properties.rain_sum),
        fillColor: chooseColor(feature.properties.rain_sum)
    };
}

// Define a function to choose the fillColor of the rainfall based on rain inches
function chooseColorrain(value) {
    if (value <= 9.99) return "red";
    else if (value > 10 && value <= 25) return "orange";
    else if (value > 25 && value <= 40) return "yellow";
    else if (value > 40 && value <= 55) return "Blue";
    else if (value > 55 && value <= 70) return "blue";
    else return "green";
}
function chooseColortemp(value) {
    if (value <= 0) return "blue";
    else if (value > 10 && value <= 25) return "orange";
    else if (value > 25 && value <= 40) return "yellow";
    else if (value > 40 && value <= 55) return "Blue";
    else if (value > 55 && value <= 70) return "blue";
    else if (value > 90 && value <= 95) return "orange";
    else if (value > 95) return "red";
    else return "green";
}

// Define a function to determine the radius of each rain marker
function chooseRadius(value) {
    return value * .5;
}

// Fetch the atlanta rain JSON data with d3
d3.json(url_atlanta_rain).then(function (data) {
    // Calculate the total rain by summing up the rain values from each data point
    let totalRain = 0;
    data.forEach(function (weatherData) {
        // Access the rain_sum value 
        const rainSum = parseFloat(weatherData.rain_sum);

        // Check if rainSum is a valid number before adding it to totalRain
        if (!isNaN(rainSum)) {
            totalRain += rainSum;
        }
    });
    console.log("Total Rain:", totalRain);

    // Extract the necessary values for the marker
    const latitude = 33.753746; 
    const longitude = -84.386330; 
    console.log("Latitude:", latitude, "Longitude:", longitude, "RainSum:", totalRain);

    // Create a Leaflet LatLng object with the coordinates
    const latlng = L.latLng(latitude, longitude);

    // Create a circle marker at the coordinates with the total rain information
    const circleMarker = L.circleMarker(latlng, {
        color: chooseColorrain(totalRain),
        radius: chooseRadius(totalRain),
        fillColor: "black"
    });

    // Bind a popup to the circle marker to display additional information
    circleMarker.bindPopup("Atlanta <br/> Total Rain: " + totalRain.toFixed(2) + " inches");

    // Add the circle marker to the rain_data LayerGroup
    circleMarker.addTo(rain_data);

    // Add the rain_data LayerGroup to the map
    rain_data.addTo(myMap);
});

d3.json(url_philly_rain).then(function (data) {
    // Calculate the total rain by summing up the rain values from each data point
    let totalRain = 0;
    data.forEach(function (weatherData) {
        // Accessing the rain_sum value 
        const rainSum = parseFloat(weatherData.rain_sum);

        // Check if rainSum is a valid number before adding it to totalRain
        if (!isNaN(rainSum)) {
            totalRain += rainSum;
        }
    });
    console.log("Total Rain:", totalRain);

    // Extract the necessary values for the marker
    const latitude = 39.952583; 
    const longitude = -75.165222; 
    console.log("Latitude:", latitude, "Longitude:", longitude, "RainSum:", totalRain);

    // Create a Leaflet LatLng object with the coordinates
    const latlng = L.latLng(latitude, longitude);

    // Create a circle marker at the coordinates with the total rain information
    const circleMarker = L.circleMarker(latlng, {
        color: chooseColorrain(totalRain),
        radius: chooseRadius(totalRain),
        fillColor: "black"
    });

    // Bind a popup to the circle marker to display additional information
    circleMarker.bindPopup("Philadelphia <br/> Total Rain: " + totalRain.toFixed(2) + " inches");

    // Add the circle marker to the rain_data LayerGroup
    circleMarker.addTo(rain_data);

    // Add the rain_data LayerGroup to the map
    rain_data.addTo(myMap);
});

d3.json(url_chicago_rain).then(function (data) {
    // Calculate the total rain by summing up the rain values from each data point
    let totalRain = 0;
    data.forEach(function (weatherData) {
        // Access the rain_sum value
        const rainSum = parseFloat(weatherData.rain_sum);

        // Check if rainSum is a valid number before adding it to totalRain
        if (!isNaN(rainSum)) {
            totalRain += rainSum;
        }
    });
    console.log("Total Rain:", totalRain);

    // Extract the necessary values for the marker
    const latitude = 41.881832; 
    const longitude = -87.623177; 
    console.log("Latitude:", latitude, "Longitude:", longitude, "RainSum:", totalRain);

    // Create a Leaflet LatLng object with the coordinates
    const latlng = L.latLng(latitude, longitude);

    // Create a circle marker at the coordinates with the total rain information
    const circleMarker = L.circleMarker(latlng, {
        color: chooseColorrain(totalRain),
        radius: chooseRadius(totalRain),
        fillColor: "black"
    });

    // Bind a popup to the circle marker to display additional information
    circleMarker.bindPopup("Chicago <br/> Total Rain: " + totalRain.toFixed(2) + " inches");

    // Add the circle marker to the rain_data LayerGroup
    circleMarker.addTo(rain_data);

    // Add the rain_data LayerGroup to the map
    rain_data.addTo(myMap);
});

// Temp info
d3.json(url_atlanta_temp).then(function (data) {

    // Calculate the highest temperature by finding the maximum max_temp value from the data
    let highestTemp = -Infinity; // Initializing low value

    data.forEach(function (weatherData) {
        
        // Access the temperature value from the data (using 'max_temp' property)
        const temperature = parseFloat(weatherData.max_temp);

        // Check if temperature is a valid number and greater than the current highestTemp
        if (!isNaN(temperature) && temperature > highestTemp) {
            highestTemp = temperature;
        }
    });

    console.log("Highest Temperature:", highestTemp);

    // Extract the necessary values for the marker
    const latitude = 33.753746; 
    const longitude = -84.386330; 
    console.log("Latitude:", latitude, "Longitude:", longitude, "Highest Temp:", highestTemp);

    // Create a Leaflet LatLng object with the coordinates
    const latlng = L.latLng(latitude, longitude);

    // Create a circle marker at the coordinates with the highest temperature information
    const circleMarker = L.circleMarker(latlng, {
        color: chooseColortemp(highestTemp),
        radius: chooseRadius(highestTemp),
        fillColor: "black"
    });

    // Bind a popup to the circle marker to display additional information
    circleMarker.bindPopup("Atlanta <br/> Highest Temperature: " + highestTemp.toFixed(2) + " °F");

    // Add the circle marker to the temp_data LayerGroup
    circleMarker.addTo(temp_data);

    // Add the temp_data LayerGroup to the map
    temp_data.addTo(myMap);
});

d3.json(url_philly_temp).then(function (data) {

    // Calculate the highest temperature by finding the maximum max_temp value from the data
    let highestTemp = -Infinity; // Initializing low value

    data.forEach(function (weatherData) {
        
        // Access the temperature value from the data (using 'max_temp' property)
        const temperature = parseFloat(weatherData.max_temp);

        // Check if temperature is a valid number and greater than the current highestTemp
        if (!isNaN(temperature) && temperature > highestTemp) {
            highestTemp = temperature;
        }
    });

    console.log("Highest Temperature:", highestTemp);

    // Extract the necessary values for the marker
    const latitude = 39.952583; 
    const longitude = -75.165222; 
    console.log("Latitude:", latitude, "Longitude:", longitude, "Highest Temp:", highestTemp);

    // Create a Leaflet LatLng object with the coordinates
    const latlng = L.latLng(latitude, longitude);

    // Create a circle marker at the coordinates with the highest temperature information
    const circleMarker = L.circleMarker(latlng, {
        color: chooseColortemp(highestTemp),
        radius: chooseRadius(highestTemp),
        fillColor: "black"
    });

    // Bind a popup to the circle marker to display additional information
    circleMarker.bindPopup("Atlanta <br/> Highest Temperature: " + highestTemp.toFixed(2) + " °F");

    // Add the circle marker to the temp_data LayerGroup
    circleMarker.addTo(temp_data);

    // Add the temp_data LayerGroup to the map
    temp_data.addTo(myMap);
});

d3.json(url_chicago_temp).then(function (data) {

    // Calculate the highest temperature by finding the maximum max_temp value from the data
    let highestTemp = -Infinity; // Initializing low value

    data.forEach(function (weatherData) {
        
        // Access the temperature value from the data (using 'max_temp' property)
        const temperature = parseFloat(weatherData.max_temp);

        // Check if temperature is a valid number and greater than the current highestTemp
        if (!isNaN(temperature) && temperature > highestTemp) {
            highestTemp = temperature;
        }
    });

    console.log("Highest Temperature:", highestTemp);

    // Extract the necessary values for the marker
    const latitude = 41.8781; 
    const longitude = -87.623177; 
    console.log("Latitude:", latitude, "Longitude:", longitude, "Highest Temp:", highestTemp);

    // Create a Leaflet LatLng object with the coordinates
    const latlng = L.latLng(latitude, longitude);

    // Create a circle marker at the coordinates with the highest temperature information
    const circleMarker = L.circleMarker(latlng, {
        color: chooseColortemp(highestTemp),
        radius: chooseRadius(highestTemp),
        fillColor: "black"
    });

    // Bind a popup to the circle marker to display additional information
    circleMarker.bindPopup("Atlanta <br/> Highest Temperature: " + highestTemp.toFixed(2) + " °F");

    // Add the circle marker to the temp_data LayerGroup
    circleMarker.addTo(temp_data);

    // Add the temp_data LayerGroup to the map
    temp_data.addTo(myMap);
});