import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Map({ page, hotel, zoom }: MapType) {
  console.log(hotel?.location.lat, hotel?.location.lng);
  return (
    <MapContainer
      center={
        (hotel && [+hotel?.location?.lat, +hotel?.location?.lng]) ?? [
          51.505, -0.09,
        ]
      }
      zoom={zoom ? zoom : 13}
      scrollWheelZoom={false}
      className="bg-primary w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={
          (hotel && [+hotel?.location?.lat, +hotel?.location?.lng]) ?? [
            51.505, -0.09,
          ]
        }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
