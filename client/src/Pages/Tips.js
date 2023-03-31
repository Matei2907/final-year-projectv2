import React from "react";
import Navbar from "../Components/Navbar";
import "./Forms.css";
import Map1 from "./Map";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapReact, Marker } from "google-map-react";
import { useState, useEffect } from "react";

function Tips() {
  // Define the state variables
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dieselPrice, setDieselPrice] = useState("");
  const [postcode, setPostcode] = useState("");

  // Defining an effect using the useEffect hook
  useEffect(() => {
    // Define the FuelPrices function
    const FuelPrices = () => {
      try {
        const url = `https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=34dc293f-0961-4714-a1fe-b7e213940ee3&key_POSTCODE=${postcode}`;
        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        //Call this function when the API responds
        xhr.onload = () => {
          if (xhr.status === 200) {
            // Gets the JSON response from the API
            const data = JSON.parse(xhr.responseText);
            // Check if the response contains the expected data
            if (
              data.Response &&
              data.Response.DataItems &&
              data.Response.DataItems.FuelStationDetails &&
              data.Response.DataItems.FuelStationDetails.FuelStationList
                .length >= 1
            ) {
              // Extract the fuel station data
              const fuelStation =
                data.Response.DataItems.FuelStationDetails.FuelStationList[0];
              // Extract the diesel fuel price
              const dieselFuelPrice = fuelStation.FuelPriceList.find(
                (fuelPrice) => fuelPrice.FuelType === "Diesel"
              );
              //Sets the dieselFuelPrice variable if the data is available
              if (dieselFuelPrice) {
                setDieselPrice(dieselFuelPrice.LatestRecordedPrice.InPence);
              }
            } else {
              //Sends an error message if the response isnt the expected data structure
              console.error("Invalid API response format.");
              console.log(xhr.responseText);
            }
          } else {
            //Sends an error with status code
            console.error(xhr.statusText);
          }
        };
        // Send the API request
        xhr.send();
      } catch (error) {
        //Sens any error that occur
        console.error(error);
      }
    };
    // When the postcode changes, FuelPrices is called again
    FuelPrices();
  }, [postcode]);

  //Updates postcode when the postcode is changed
  const PostcodeChange = (e) => {
    setPostcode(e.target.value);
  };

  //This function is called when the user submits the form
  const Submit = (e) => {
    e.preventDefault();
  };

  //Getting the direction between the location and destination
  const GetDirections = () => {
    const loader = new Loader({
      apiKey: "AIzaSyDfKZISC4k72SrGgmfKIcxRPNpeQWZP1SE",
      version: "weekly",
    });

    //Loading th eapi
    loader.load().then(() => {
      // Using Google Maps Geocoder
      const geocoder = new window.google.maps.Geocoder();

      //Finding the latitude and longitude of the origin using Geocoder
      geocoder.geocode({ address: origin }, (originResults, originStatus) => {
        //If the origin is found, get the latitude and longitude
        if (originStatus === "OK") {
          const originLocation = originResults[0].geometry.location;

          //Finding the latitude and longitude of the destination using Geocoder
          geocoder.geocode(
            { address: destination },
            (destinationResults, destinationStatus) => {
              //If the destination is found, get the latitude and longitude
              if (destinationStatus === "OK") {
                const destinationLocation =
                  destinationResults[0].geometry.location;

                //This URL will open Google Maps with the directions between the origin and destination
                const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLocation.lat()},${originLocation.lng()}&destination=${destinationLocation.lat()},${destinationLocation.lng()}`;

                // Open the URL in a new page
                window.open(directionsUrl, "_blank");
              }
            }
          );
        }
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="tips">
        <h1>Saving Tips</h1>
        <h2>Transportation</h2>
        <h2>
          Here you can check which route would be cheaper to your workplace
        </h2>
        <div className="forms-container">
          <label htmlFor="origin">Origin:</label>
          <input
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <br />
          <label htmlFor="destination">Destination:</label>
          <input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <br />
          <button onClick={GetDirections}>Get Directions </button>
        </div>
        <div className="map-container">
          <Map1 />
        </div>
        <form onSubmit={Submit}>
          <label>
            Postcode:
            <input type="text" value={postcode} onChange={PostcodeChange} />
          </label>
          <input type="submit" value="Search" />
        </form>
        {dieselPrice && <h1>Diesel Price: {dieselPrice}</h1>}
      </div>
    </div>
  );
}

export default Tips;
