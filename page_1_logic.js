// Select the dropdown with id "selDataset"
let selDataset = d3.select("#selDataset");

function init() {
  // Update the dropdown options to show city names
  let html = "<option value='all_weather_data'>All Weather Data</option>";
  let cities = ["Atlanta", "Philadelphia", "Chicago"];
  cities.forEach((city) => {
    html += `<option value='${city.toLowerCase()}'>${city}</option>`;
  });

  selDataset.html(html);

  // Call the function to plot the data for the selected option
  all_weather_plot('all_weather_data');
}

function all_weather_plot(city) {
  d3.json(`http://localhost:5000/api/v1.0/${city}`)
    .then(function(apiData) {
      console.log(apiData);
      let trace = {
        x: apiData.map(data => data.date),
        y: apiData.map(data => data.rain_sum),
        type: 'scatter',
        mode: 'lines',
        name: 'Rain',
      };

      let trace2 = {
        x: apiData.map(data => data.date),
        y: apiData.map(data => data.max_temp),
        type: 'scatter',
        mode: 'lines',
        name: 'Temperature',
      };

      let trace3 = {
        x: apiData.map(data => data.date),
        y: apiData.map(data => data.max_windspeed),
        type: 'scatter',
        mode: 'lines',
        name: 'Max Windspeed',
      };

      let layout = {
        title: `Weather Trends for ${city} 2022`,
        xaxis: {
          title: 'Date',
        },
        yaxis: {
          title: 'Value',
        },
      };

      let data = [trace, trace2, trace3];
      Plotly.newPlot('bar', data, layout);

      // Call the function to calculate averages and populate the averages table
      calculateAndDisplayAverages(apiData);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function calculateAndDisplayAverages(apiData) {
  // Calculate the averages
  let rainAvg = d3.mean(apiData, data => data.rain_sum);
  let tempAvg = d3.mean(apiData, data => data.max_temp);
  let windAvg = d3.mean(apiData, data => data.max_windspeed);

  // Format the averages to two decimal places
  rainAvg = rainAvg.toFixed(2);
  tempAvg = tempAvg.toFixed(2);
  windAvg = windAvg.toFixed(2);

  // Create the HTML table and display the averages
  let html = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Category</th>
          <th>Average Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rain (inches)</td>
          <td>${rainAvg}</td>
        </tr>
        <tr>
          <td>Temperature (&deg;F)</td>
          <td>${tempAvg}</td>
        </tr>
        <tr>
          <td>Max Windspeed (mph)</td>
          <td>${windAvg}</td>
        </tr>
      </tbody>
    </table>
  `;

  // Set the HTML of the averagesTable div to the calculated table
  let averagesTable = document.getElementById('averagesTable');
  averagesTable.innerHTML = html;
}

init();