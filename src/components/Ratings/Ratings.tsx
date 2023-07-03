import { FaStar } from "react-icons/fa";
export default function Ratings({ rating }: { rating: number }) {
  return (
    <div className="flex w-fit">
      <small className="font-semibold text-sm">{rating}</small>
      <span className="text-xs text-primary">
        <FaStar />
      </span>
    </div>
  );
}
