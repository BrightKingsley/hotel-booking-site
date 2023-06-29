export default function Price({ price }: { price: number }) {
  return (
    <p className="font-bold">
      ${price}
      {/* <small>/{duration}</small> */}
      <small className="font-thin">/night</small>
    </p>
  );
}
