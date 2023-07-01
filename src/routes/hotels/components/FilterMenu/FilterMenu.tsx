import { useEffect, useState } from "react";
// import Button from "../UI/Button";
import { AnimateInOut, Increment, Input } from "@/components";
import CategorySelect from "../CategorySelect";

import { Button } from "@/components";
import { BiGridHorizontal, BiMenu } from "react-icons/bi";

const priceMax = 10000;
const priceMin = 0;
const areaMax = 1000;
const areaMin = 10;

export default function FilterMenu({
  handleShowNav,
  showNav,
}: {
  handleShowNav: Function;
  showNav: boolean;
}) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceMin,
    priceMax,
  ]);
  const [areaRange, setAreaRange] = useState<[number, number]>([200, 5000]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [type, setType] = useState("");
  // const [type, setType] = useState("");
  // const [type, setType] = useState("");

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 0 },
    areaRange: { min: 0, max: 0 },
    type: "",
  });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      window.innerWidth > 576 && handleShowNav(true);
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  // const { setParams } = useContext(listingContext);

  const getPriceRange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const getAreaRange = (value: [number, number]) => {
    setAreaRange(value);
  };

  const setShowNav = () => {
    handleShowNav(true);
  };

  return (
    // <Media queries={{ small: { maxWidth: 576 } }}>
    //   {(matches) => {
    //     !matches.small && setShowNav();
    //     return (
    <AnimateInOut
      init={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      out={{ x: "-100%", opacity: 0 }}
      show={showNav}
      className={`pl-12 pr-4 ${"sm:translate-x-0 fixed z-20 transition-all duration-200 bg-body sm:static w-64 sm:w-72 overflow-y-auto h-[calc(100vh-3.7rem)] border-r-primary border-2 p-2"}  ${
        !showNav && "-translate-x-[5rem] "
      }`}
    >
      <span
        className={"sm:hidden text-2xl cursor-pointer"}
        onClick={() => handleShowNav(false)}
      >
        <BiMenu />
      </span>

      <h2 className="relative py-2 font-[500] text-[1.1rem] w-full after:bg-gray-200 after:h-[1px] after:absolute after:top-full zero-inset-after">
        Filters
      </h2>
      <div className={"divide-y-[1px]"}>
        <div className={""}>
          <p className="text-[0.8rem] font-[500]">Room Type</p>
          <div className="pb-2">
            <CategorySelect
              type={type}
              setType={
                (type: string) => {
                  setType(type);
                  return setFilters((prev) => ({ ...prev, type }));
                }
                // PropertysetFilters((prev) => {
                //   const newFilters = prev + `propertyType=${type}`;
                //   return newFilters;
                // })
              }
            />
          </div>
        </div>
        <div className={"space-y-2 py-2"}>
          <p className="text-[0.8rem] font-[500]">Price Range</p>
          <Input
            type="range"
            getRangeValue={getPriceRange}
            rangeValue={priceRange}
            min={priceMin}
            max={priceMax}
            step={10}
          />
          <div className={"flex justify-between items-center gap-4"}>
            <input
              className={
                "w-12 text-center flex-1 text-xs focus:outline-primary focus:outline bg-primary/10 rounded-[0.2rem] py-[2px] px-1"
              }
              type="number"
              name=""
              id=""
              value={priceRange[0]}
              min={1}
              onChange={(e) =>
                setPriceRange((prevPrice) => {
                  const min = e.target.valueAsNumber;
                  if (min && min >= priceMin && typeof min === "number")
                    return [min, prevPrice[1]];
                  else return [priceMin, prevPrice[1]];
                })
              }
            />
            <input
              className={
                "w-12 text-center flex-1 text-xs focus:outline-primary focus:outline bg-primary/10 rounded-[0.2rem] py-[2px] px-1"
              }
              type="number"
              name=""
              id=""
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange((prevPrice) => {
                  const max = e.target.valueAsNumber;
                  if (max && max <= priceMax && typeof max === "number")
                    return [prevPrice[0], max];
                  else return [prevPrice[0], priceMax];
                })
              }
            />
            <div className="flex-1 h-7 rounded-[0.2rem] overflow-clip">
              <Button
                full={true}
                onClick={() => {
                  return setFilters((prev) => ({
                    ...prev,
                    priceRange: {
                      min: priceRange[0],
                      max: priceRange[1],
                    },
                  }));
                  // setFilters((prev) => {
                  //   const newFilters =
                  //     prev +
                  //     `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
                  //   return newFilters;
                  // });
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
        <div className={"flex w-full justify-between pr-12 py-2"}>
          <div className={"space-y-1"}>
            <p className="text-[0.8rem] font-[500]">bedroom</p>
            <Increment />
          </div>
          <div className={"space-y-1"}>
            <p className="text-[0.8rem] font-[500]">bathroom</p>
            <Increment />
          </div>
        </div>
        <div className={"space-y-2 py-2"}>
          <p className="text-[0.8rem] font-[500]">Property area Range</p>
          <Input
            type="range"
            getRangeValue={getAreaRange}
            rangeValue={areaRange}
            min={areaMin}
            max={areaMax}
            step={10}
          />
          <div className={"flex justify-between items-center gap-4"}>
            <input
              className={
                "w-12 text-center flex-1 text-xs focus:outline-primary focus:outline bg-primary/10 rounded-[0.2rem] py-[2px] px-2"
              }
              type="number"
              name=""
              id=""
              value={areaRange[0]}
              onChange={(e) =>
                setAreaRange((prevRange) => {
                  const min = e.target.valueAsNumber;
                  if (min && min >= areaMin && typeof min === "number")
                    return [min, prevRange[1]];
                  else return [areaMin, prevRange[1]];
                })
              }
            />
            <input
              className={
                "w-12 text-center flex-1 text-xs focus:outline-primary focus:outline bg-primary/10 rounded-[0.2rem] py-[2px] px-1"
              }
              type="number"
              name=""
              id=""
              value={areaRange[1]}
              onChange={(e) =>
                setAreaRange((prevRange) => {
                  const max = e.target.valueAsNumber;
                  if (max && max <= areaMax && typeof max === "number")
                    return [prevRange[0], max];
                  else return [prevRange[0], areaMax];
                })
              }
            />
            <div className="flex-1 h-7 rounded-[0.2rem] overflow-clip">
              <Button
                full={true}
                onClick={() => {
                  return setFilters((prev) => ({
                    ...prev,
                    areaRange: {
                      min: areaRange[0],
                      max: areaRange[1],
                    },
                  }));

                  // setFilters((prev) => {
                  //   const newFilters =
                  //     prev + `&minArea=${areaRange[0]}&maxArea=${areaRange[1]}`;
                  //   return newFilters;
                  // });
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
        <div className={""}></div>
        <div className={"py-2"}>
          <Button
            full={true}
            onClick={() => {
              // setParams("");
              setType("");
              setPriceRange([priceMin, priceMax]);
              setAreaRange([areaMin, areaMax]);
            }}
          >
            RESET
          </Button>
        </div>
      </div>
    </AnimateInOut>
    //     );
    //   }}
    // </Media>
  );
}
