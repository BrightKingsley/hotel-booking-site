import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import Price from "../Price/Price";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { Hotel } from "@/models";
import L from "leaflet";
import { MapMarker } from "@/assets";

const customMarker = new L.Icon({
  iconUrl: MapMarker,
  iconRetinaUrl: MapMarker,

  // iconAnchor: null,
  // popupAnchor: null,
  // shadowUrl: null,
  // shadowSize: null,
  // shadowAnchor: null,
  iconSize: [40, 40],
  className: "leaflet-div-icon",
});

export default function LocationMarker({
  hotel,
  coords,
}: {
  hotel: Hotel;
  coords: [number, number];
}) {
  const map = useMap();
  useEffect(() => {
    map.locate();
    // coords && map.flyTo(coords, map.getZoom(), { animate: true });
    hotel && map.flyTo(coords, map.getZoom(), { animate: true });
    hotel && map.flyTo(coords, map.getZoom(), { animate: true });
  }, [map, coords, hotel, hotel]);

  const [refReady, setRefReady] = useState(false);

  let markerRef = useRef([]);

  // const iconMarker = renderToStaticMarkup(customMarker);

  // const customMarkerIcon = divIcon({ html: iconMarker });

  useEffect(() => {
    refReady &&
      markerRef.current?.openOn([hotel?.location.lat, hotel?.location.lng]);
    // markerRef.current = markerRef.current.slice(0, hotel?.length);
  }, [hotel, , coords, refReady]);

  return hotel && hotel?.location?.lat && hotel?.location?.lng ? (
    <Marker
      icon={customMarker}
      position={[+hotel?.location?.lat, +hotel?.location?.lng]}
      ref={markerRef}
    >
      <Popup>
        {/* <div className="flex w-64 h-28 gap-2"> */}
        <div className="flex w-64 h-full gap-2">
          <div className={"w-full h-full rounded-md overflow-clip"}>
            <img src={hotel?.images && hotel?.images[0]} alt="" />
          </div>
          <div className={"w-full overflow-scroll pt-[-1rem] -space-y-4"}>
            <Price price={hotel?.price ?? 19000} />
            <p className={""}>{hotel?.address?.full}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  ) : (
    <></>
  );
}
