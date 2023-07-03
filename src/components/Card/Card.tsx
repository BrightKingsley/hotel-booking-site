type CardProps = {
  img: string;
  top: string;
  mid: string;
  bottom: string;
};

const Card = ({ img, top, mid, bottom }: CardProps) => {
  return (
    <div className="w-full h-full p-1 ">
      <div className="h-52">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative p-2">
        <h3 className="text-primary font-bold text-lg">
          {top}
          <span className="text-gray-400 font-normal text-sm">/Month</span>
        </h3>
        <p className="font-bold">{mid}</p>
        <small className="text-gray-500">{bottom}</small>
        <span>{/* <FavoriteRounded /> */}</span>
      </div>
    </div>
  );
};

export default Card;
