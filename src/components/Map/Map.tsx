import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { MapType } from "./types";

export default function Map({ page, hotel, zoom }: MapType) {
  // useEffect(() => {
  //   console.log("HOTEL+++>", hotel);
  // }, [hotel]);
  const coords: [number, number] =
    hotel && hotel?.location?.lat && +hotel?.location?.lng
      ? [parseInt(hotel.location.lat), parseInt(hotel.location.lng)]
      : [0, 0];

  return coords ? (
    <MapContainer
      center={coords}
      zoom={zoom ? zoom : 13}
      scrollWheelZoom={false}
      className="bg-grey w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker coords={coords && coords} hotel={hotel && hotel} />
    </MapContainer>
  ) : (
    <></>
  );
}
