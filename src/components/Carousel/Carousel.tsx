import React from "react";
import { Carousel as Slider } from "react-responsive-carousel";

export default function Carousel({
  images,
  height,
}: {
  images: string[];
  height: string;
}) {
  return (
    <div className={"relative block w-full"}>
      <Slider
        infiniteLoop={true}
        autoPlay={true}
        dynamicHeight={false}
        showThumbs={false}
        showIndicators={false}
      >
        {images &&
          images.map((img: string, i: number) => (
            <div key={Math.random()} className={height}>
              <img src={img} alt="" />
            </div>
          ))}
      </Slider>
    </div>
  );
}
