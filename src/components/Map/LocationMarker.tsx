import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import Price from "../Price/Price";

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

  useEffect(() => {
    refReady &&
      markerRef.current?.openOn([hotel?.location.lat, hotel?.location.lng]);
    // markerRef.current = markerRef.current.slice(0, hotel?.length);
  }, [hotel, , coords, refReady]);

  return (
    <Marker
      position={
        (hotel && [+hotel?.location?.lat, +hotel?.location?.lng]) ?? [
          51.505, -0.09,
        ]
      }
      ref={markerRef}
    >
      <Popup>
        {/* <div className="flex w-64 h-28 gap-2"> */}
        <div className="flex w-64 h-full gap-2">
          <div className={"w-full h-full rounded-md overflow-clip"}>
            <img src={hotel?.images[0]} alt="" />
          </div>
          <div className={"w-full overflow-scroll pt-[-1rem] -space-y-4"}>
            <Price price={hotel && hotel?.price} />
            <p className={""}>{hotel?.address.full}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
