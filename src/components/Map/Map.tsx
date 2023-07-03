import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import LocationMarker from "./LocationMarker";

export default function Map({ page, hotel, zoom }: MapType) {
  // useEffect(() => {
  //   console.log("HOTEL+++>", hotel);
  // }, [hotel]);
  const imgs = hotel?.images;
  const location = hotel?.address.full;
  const price = hotel?.price;
  const coords: [number, number] =
    hotel && hotel.location
      ? [
          hotel && hotel.location.lat && +hotel.location.lat,
          hotel && hotel.location.lat && +hotel.location.lng,
        ]
      : [51.505, -0.09];

  return hotel ? (
    <MapContainer
      center={hotel && [+hotel?.location?.lat, +hotel?.location?.lng]}
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
