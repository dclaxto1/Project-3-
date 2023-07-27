import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################


__name__ == '__main__'

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/all_weather_data<br/>"
        f"/api/v1.0/city"
        f"/api/v1.0/<city>/rain_data"
        f"/api/v1.0/<city>/rain_data"
    )


@app.route("/api/v1.0/all_weather_data")
def all_weather_data():
    # Connecting to sqlite
   with sqlite3.connect('city_weather_info.db') as con:
        cur = con.cursor()
        

        query = ""
        query = """
                select * from combined_weather
                """
        cur.execute(query)
        json_data = []
        for row in cur:
            city_id, date, weathercode, max_temp, precip_sum, rain_sum, snow_sum, precip_hours, max_windspeed = row
            json_data.append({ 'city_id': city_id,
                                'date': date,
                                'weathercode': weathercode,
                                'max_temp': max_temp,
                                'precip_sum': precip_sum,
                                'rain_sum': rain_sum,
                                'snow_sum': snow_sum,
                                'precip_hours': precip_hours,
                                'max_windspeed': max_windspeed
                                 })

        return jsonify(json_data)

    


@app.route("/api/v1.0/<city>")
def specific_weather(city):
    # Connecting to sqlite
   with sqlite3.connect('city_weather_info.db') as con:
        cur = con.cursor()
        city = city.lower()

        query = ""
        if city == 'atlanta':
            query = """
                select * from combined_weather
                where city_id = 1
                """
        elif city == 'philadelphia':
            query = """
                select * from combined_weather
                where city_id = 2
                """
        elif city == 'chicago':
            query = """
                select * from combined_weather
                where city_id = 3
                """
        else:
            return(f"{city} information not available")

        cur.execute(query)
        json_data = []
        for row in cur:
            city_id, date, weathercode, max_temp, precip_sum, rain_sum, snow_sum, precip_hours, max_windspeed = row
            json_data.append({ 'city_id': city_id,
                                'date': date,
                                'weathercode': weathercode,
                                'max_temp': max_temp,
                                'precip_sum': precip_sum,
                                'rain_sum': rain_sum,
                                'snow_sum': snow_sum,
                                'precip_hours': precip_hours,
                                'max_windspeed': max_windspeed
                                 })

        return jsonify(json_data)
 
@app.route("/api/v1.0/<city>/rain_data")
def city_rain(city):
    with sqlite3.connect('city_weather_info.db') as con:
        cur = con.cursor()
        city = city.lower()

        query = ""
        if city == 'atlanta':
            query = """
                select * from combined_weather
                where city_id = 1
                """
        elif city == 'philadelphia':
            query = """
                select * from combined_weather
                where city_id = 2
                """
        elif city == 'chicago':
            query = """
                select * from combined_weather
                where city_id = 3
                """
        else:
            return(f"{city} information not available")

        cur.execute(query)
        json_data = []
        for row in cur:
            city_id, date, weathercode, max_temp, precip_sum, rain_sum, snow_sum, precip_hours, max_windspeed = row
            json_data.append({ 'city_id': city_id,
                                'date': date,
                                'weathercode': weathercode,
                                'max_temp': max_temp,
                                'precip_sum': precip_sum,
                                'rain_sum': rain_sum,
                                'snow_sum': snow_sum,
                                'precip_hours': precip_hours,
                                'max_windspeed': max_windspeed
                                 })


        return jsonify(json_data)
    
@app.route("/api/v1.0/<city>/temp_data")
def city_temp(city):
    with sqlite3.connect('city_weather_info.db') as con:
        cur = con.cursor()
        city = city.lower()

        query = ""
        if city == 'atlanta':
            query = """
                select * from combined_weather
                where city_id = 1
                """
        elif city == 'philadelphia':
            query = """
                select * from combined_weather
                where city_id = 2
                """
        elif city == 'chicago':
            query = """
                select * from combined_weather
                where city_id = 3
                """
        else:
            return(f"{city} information not available")

        cur.execute(query)
        json_data = []
        for row in cur:
            city_id, date, weathercode, max_temp, precip_sum, rain_sum, snow_sum, precip_hours, max_windspeed = row
            json_data.append({ 'city_id': city_id,
                                'date': date,
                                'weathercode': weathercode,
                                'max_temp': max_temp,
                                'precip_sum': precip_sum,
                                'rain_sum': rain_sum,
                                'snow_sum': snow_sum,
                                'precip_hours': precip_hours,
                                'max_windspeed': max_windspeed
                                 })

        return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
