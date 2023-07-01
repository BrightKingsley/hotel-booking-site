import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <div className="flex items-center justify-center w-full h-screen text-center">
      <div className="max-w-[40rem] space-y-4">
        <h1 className="text-red-400">Oops!</h1>
        <p className="font-bold">Sorry, an Unexpected Error occured</p>
        {/* @ts-ignore */}
        <i className="text-xl">{error?.statusText || error?.message}</i>
      </div>
    </div>
  );
}
