import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Forms.css";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfKZISC4k72SrGgmfKIcxRPNpeQWZP1SE",
  });

  if (!isLoaded) return <div>Loading..</div>;
  return <Map1 />;
}

function Map1() {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 51.5, lng: 0 }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}
