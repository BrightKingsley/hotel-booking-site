import { Carousel } from "@/components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function DetailsGallery({ hotel }: DetailsGallery) {
  const hotelImgs = [];
  for (let i = 0; i <= 6; i++) {
    if (hotel) {
      hotelImgs.push(hotel.images[i]);
    }
  }

  return (
    <>
      <div
        className={
          "hidden sm:flex sm:flex-col sm:gap-2 sm:col-start-1 sm:col-end-10 sm:row-start-1 sm:row-end-[10] sm:relative lg:flex-row rounded-2xl lg:overflow-clip"
        }
      >
        <div
          className={
            "inline-block flex-1 shrink-0 bg-grey h-[calc(100%-7rem)] rounded-lg overflow-clip lg:inline-block lg:shrink-0 lg:h-full lg:flex-1 rounded-l-xl rounded-r-sm "
          }
        >
          {hotelImgs && <img src={hotel?.images[0]} alt="" />}
        </div>
        <div className="flex shrink-0 flex-nowrap gap-2 rounded-lg overflow-x-auto pb-2 lg:pb-0 lg:flex-col lg:rounded-l-sm lg:rounded-r-lg">
          {hotelImgs && hotelImgs.length > 0 ? (
            hotelImgs.slice(1).map((img: string) => (
              <div
                className="shrink-0 h-24 w-24 rounded-lg bg-grey flex items-center overflow-clip justify-center lg:mr-2 lg:rounded-l-sm lg:rounded-r-lg "
                key={Math.random()}
              >
                <img src={img} alt="" />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={"sm:hidden fixed mt-16 bg-grey"}>
        <div className={"fixed block"}>
          <Carousel images={hotelImgs} height="h-64" />
        </div>
      </div>
    </>
  );
}
