import { Hotel } from "@/models";

export type RatingsViewType = {
  hotel: Hotel;
  show: boolean;
  handleShowReviews: Function;
};
