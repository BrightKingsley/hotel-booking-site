export default function Price({ price }: { price: number | null }) {
  return (
    <p className="font-bold text-gray-600">
      ${price || 1900}
      {/* <small>/{duration}</small> */}
      <small className="font-normal">/night</small>
    </p>
  );
}
