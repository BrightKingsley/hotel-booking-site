import { useContext, useEffect, useState } from "react";
// import Button from "../UI/Button";
import { AnimateInOut, Input as Checkbox, Increment } from "@/components";
import CategorySelect from "../CategorySelect";

import { Button } from "@/components";
import { BiGridHorizontal } from "react-icons/bi";
import { motion } from "framer-motion";

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
  const [priceRange, setPriceRange] = useState([priceMin, priceMax]);
  const [areaRange, setAreaRange] = useState([200, 5000]);
  const [type, setType] = useState("");
  // const [type, setType] = useState("");
  // const [type, setType] = useState("");

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 0 },
    areaRange: { min: 0, max: 0 },
    type: "",
  });

  // const { setParams } = useContext(listingContext);

  const getPriceRange = (value: []) => {
    setPriceRange(value);
  };

  const getAreaRange = (value: number[]) => {
    setAreaRange(value);
  };

  return (
    <AnimateInOut
      init={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      out={{ x: "-100%", opacity: 0 }}
      show={showNav}
      className={`${"sm:translate-x-0 fixed z-20 transition-all duration-200 bg-body sm:static w-64 overflow-y-auto h-[calc(100vh-3.7rem)] border-r-primary border-2 p-2"}  ${
        !showNav && "-translate-x-[5rem] "
      }`}
    >
      <span className={"sm:hidden"} onClick={() => handleShowNav(false)}>
        <BiGridHorizontal />
      </span>

      <h2>Filters</h2>
      <div className={""}>
        <div className={""}>
          <p>Property Type</p>
          <CategorySelect
            type={type}
            setType={
              (type: string) => {
                setType(type);
                return setFilters((prev) => ({ ...prev, type }));
              }
              // setFilters((prev) => {
              //   const newFilters = prev + `propertyType=${type}`;
              //   return newFilters;
              // })
            }
          />
        </div>
        <div className={""}>
          <p>Rental Period</p>
          <label htmlFor=""></label>
          <Checkbox label="All" value="all" />
          <Checkbox label="Programming" value="programming" />
          <Checkbox label="Hardware" value="hardware" />
        </div>
        <div className={""}>
          <p>Price Range</p>
          {/* <RangeInput
            getRangeValue={getPriceRange}
            setRangeValue={priceRange}
            min={priceMin}
            max={priceMax}
            step={10}
          /> */}
          <div className={""}>
            <input
              className={"w-full"}
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
              className={"w-full"}
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
            <Button
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
        <div className={""}>
          <div className={""}>
            <p>Bedroom</p>
            <Increment />
          </div>
          <div className={""}>
            <p>bathroom</p>
            <Increment />
          </div>
        </div>
        <div className={""}>
          <p>Property area Range</p>
          {/* <RangeInput
            getRangeValue={getAreaRange}
            setRangeValue={areaRange}
            min={areaMin}
            max={areaMax}
            step={10}
          /> */}
          <div className={""}>
            <input
              className={"w-full"}
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
              className={"w-full"}
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
            <Button
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
        <div className={""}>
          <p>Additional Conveniences</p>
          <Checkbox label="Pets allowed" />
          <Checkbox label="Parking slot" />
          <Checkbox label="Furnished" />
        </div>
        <div className={""}>
          <Button
            full={true}
            onClick={() => {
              // setParams("");
              setType("");
              setPriceRange([priceMin, priceMax]);
              setAreaRange([areaMin, areaMax]);
            }}
          >
            reset
          </Button>
        </div>
      </div>
    </AnimateInOut>
  );
}
