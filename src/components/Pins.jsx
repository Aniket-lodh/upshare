import { Link } from "react-router-dom";
import React from "react";
import LazyImage from "./LazyImage";

const Pins = React.memo(({ pin, setRenderChildren }) => {
  return (
    <>
      {/* Step 1 — Card depth hierarchy with hover lift */}
      <div className="grid self-center justify-self-center flex-auto min-w-150 max-w-160 h-fit rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-[2px]">
        <div className="w-full flex flex-col items-start justify-start">
          {/* Step 2 — Consistent aspect ratio image */}
          <div className="w-full overflow-hidden">
            <Link
              to={`/pins/${pin?._id}`}
              onClick={() => setRenderChildren(true)}
              className="block w-full"
            >
              <LazyImage
                id={pin?._id}
                src={pin?.image}
                className="w-full aspect-[4/5] object-cover rounded-t-xl"
                placeholderClassName="w-full aspect-[4/5] bg-gray-200 rounded-t-xl"
              />
            </Link>
          </div>
          {/* Step 3 — Author row refinement */}
          {pin?.pinCreator && typeof pin.pinCreator === "object" && (
            <Link
              to={`/user/profile/${pin.pinCreator._id}`}
              className="w-full px-4 py-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                <LazyImage
                  id={pin.pinCreator._id}
                  src={pin.pinCreator.image}
                  className="w-full h-full object-cover"
                  placeholderClassName="w-full h-full bg-gray-200"
                />
              </div>
              <div className="flex-auto min-w-0 flex flex-col">
                <h3 className="truncate text-sm font-medium text-gray-900 capitalize">
                  {pin.pinCreator.name}
                </h3>
                <small className="truncate text-gray-500 font-fira">
                  {pin.pinCreator.profession}
                </small>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
});

Pins.displayName = "Pins";

export default Pins;
