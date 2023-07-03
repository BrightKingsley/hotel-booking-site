import { Hotel } from "@/models";

export type MapType = {
  hotel: Hotel | null;
  page: string | null;
  zoom: number | null;
};
