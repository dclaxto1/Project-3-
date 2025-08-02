# Project-3-         
## Table of Contents    
- [Requirements](#requirements)     
- [Process](#process)  
    - [ETL](#etl)
    - [Python Flask Powered API](#python-flask-powered-api) 
    - [Creating a dashboard page with interactive graphs](#creating-a-dashboard-page-with-interactive-graphs)
- [Running-instructions](#running-instructions)
- [File-notes](#file-notes) 
## Requirements 
​
For Project 3, I had to work with my group to tell a story using data visualizations. Here are the specific requirements we had to fulfill:
​
1. Your visualization must include a Python Flask-powered API, HTML/CSS, JavaScript, and at least one database (SQL, MongoDB, **SQLite**, etc.).
​
2. Your project should fall into one of the following three tracks:
​
    * A combination of web scraping and Leaflet or Plotly
​
    * A dashboard page with multiple charts that update from the same data
​
    * A server that performs multiple manipulations on data in a database prior to visualization (**must be approved**)
​
3. Your project should include at least one JS library that we did not cover.
​
4. Your project must be powered by a dataset with at least 100 records.
​
5. Your project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).
​
6. Your final visualization should ideally include at least three views.
​
## Process:
### ETL:
<strong> My team and I used Pthon and several libraries (pandas, numpi, sqlite3, etc) to call the historical weather data API at open-meteo.com. <strong /> <br />

![image](https://github.com/dclaxto1/Project-3-/assets/128431134/58e613a7-4683-4203-9a73-fab7ab70c327)

<strong> Once we obtained the data we cleaned it up and placed it in dataframes for preperation of loading into a sqlite database.<strong /><br />

![image](https://github.com/dclaxto1/Project-3-/assets/128431134/0c04d24f-2cd2-4e96-8f34-05a5c94213c8)

<strong> We then created an ERD of our star schema for our database and
loaded the data into out sqlite database -> where we would later query from. <strong /> <br />
![image](https://github.com/dclaxto1/Project-3-/assets/128431134/533933d9-3258-4e62-a229-3c63e9e3f262)

### Python Flask Powered API
<strong>We created a flask API that would pull the desired information from our sqlite database.<strong /><br />
![image](https://github.com/dclaxto1/Project-3-/assets/128431134/5b0f6ffe-5b13-496b-831a-fba4b93a55b7)

### Creating a dashboard page with interactive graphs
<strong>We used Javascript, HTML, and CSS to create an interactive website that displays graphs with data populated from our sqlite database.<strong /> <br />
![image](https://github.com/dclaxto1/Project-3-/assets/128431134/855c0c5d-bfb6-4069-b6ad-115a1f958487)
<br />
![image](https://github.com/dclaxto1/Project-3-/assets/128431134/ed66bc7a-4383-49c2-882e-8318f7159d10)

<strong> We then created a 2nd page that contained a map view of the cities<strong /><br />
<strong> The circle size and color are dependent on the amount of rainfall or temperature (depending on which tile you select)<strong /><br />
![image](https://github.com/dclaxto1/Project-3-/assets/128431134/30251d3d-6db1-48fe-b1f0-d36ced5bde8c)

## Running-instructions:
1. Run app_server.py by running the command python .\app_server.py (make sure you are in the correct directory)
2. Open index1.html by viewing in live server with VSS or right click and "open with" your favorite broswer.
3. Interact with the elements! Test out the interactive charts, drop-downs, pages, tiles, and views.

## File-notes:
1. index1.html contains the main html code for the first web page (the interactive graphs and dropdowns).
2. index2.html contains the main html code for the 2nd web page containing the map view.
3. page_1_logic.js contains the main javescript code for the first web page.
4. page_2_logic.js contains the main javescript code for the second web page (map).
5. app_server.py contains the python flask powered API. This creates the API and it's directories.
6. etl.ipynb contains the python code that extracts, transforms, and loads the original https://open-meteo.com/ API data into our sqlite database.
7. style.css contains the styling code for both web pages.
8. city_weather_info.db is our sqlite database containing all our of cities' weather information.
9. background_image.jpg is the background image used for our first web page and is referenced in out style.css file.
10. SQL_Queries.ipynb contains the code used to query our database to answer weather questions.





