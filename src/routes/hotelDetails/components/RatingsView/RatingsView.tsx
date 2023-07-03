import { Zzz } from "@/assets";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import DetailsModal from "../DetailsModal";
import { RatingsViewType } from "./types";
import { useEffect } from "react";
import { Close } from "@/components";

export default function RatingsView({
  hotel,
  show,
  handleShowReviews,
}: RatingsViewType) {
  return hotel ? (
    <DetailsModal show={show} handleShowModal={handleShowReviews}>
      <div className="fixed right-4 z-20 overflow-clip">
        <Close close={handleShowReviews} />
      </div>

      <Accordion allowZeroExpanded allowMultipleExpanded className="space-y-4">
        {hotel.userReviews?.map((review) => (
          <AccordionItem key={Math.random()}>
            <AccordionItemHeading>
              <AccordionItemButton className=" p-2 border-b-2 border-primary  bg-gray-300 hover:rounded-t-md text-gray-600 hover:bg-primary hover:text-white transition-all duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="space-x-2">
                      <span className="font-bold">{review.title}</span>
                      <small>({review.score}/10)</small>
                    </div>
                    <p>
                      <small>{review.date}</small>
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="font-semibold">
                      <small>{review.room}</small>
                    </p>
                    <p>
                      <small>{review.travellerType}</small>
                    </p>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="bg-primary/20 rounded-b-md p-2 space-y-2">
              <div className="flex gap-2">
                <div className="w-[4.5rem] relative after:absolute after:h-[2px] after:bg-primary after:w-full after:left-0 after:bottom-0">
                  positive:
                </div>
                <div className="flex-1">
                  {review.positive ? review.positive : "nil"}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-[4.5rem] h-fit relative after:absolute after:h-[2px] after:bg-primary after:w-full after:left-0 after:bottom-0">
                  negative:
                </div>
                <div className="flex-1">
                  {review.negative ? review.negative : "everyting perfect"}
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </DetailsModal>
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-600">
      <div className="space-y-6">
        <div className="w-40 mx-auto">
          <img src={Zzz} />
        </div>
        <p className="text-xl">Reviews unavailable</p>
      </div>
    </div>
  );
}
