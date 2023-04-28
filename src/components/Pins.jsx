import { Link } from "react-router-dom";
import React from "react";
import LazyImage from "./LazyImage";

const Pins = ({ pin, setRenderChildren }) => {
  return (
    <>
      <div className="grid self-center justify-self-center flex-auto min-w-150 max-w-160 h-fit rounded-lg bg-color-bg-accent overflow-hidden">
        <div className="w-full max-h-230 flex flex-col gap-1.5 items-start justify-start bg-gradient-to-tr from-neutral-300/30 via-color-bg-accent py-2 px-2">
          {/*Pin-creator uploaded image*/}
          <div className="flex min-w-full min-h-140 rounded-md overflow-hidden">
            <Link
              to={`/pins/${pin?._id}`}
              onClick={(e) => setRenderChildren(true)}
              className="block w-full flex-auto"
            >
              <div className="rounded-md w-full h-full">
                <LazyImage id={pin?._id} src={pin?.image} />
              </div>
            </Link>
          </div>
          {/*Pin-creator profile*/}
          <Link
            to={`/user/profile/${pin?.pinCreator._id}`}
            className="w-full ml-1 max-h-8 flex gap-1.5 items-center justify-start"
          >
            <div className="w-7 h-7 object-contain rounded-full overflow-hidden">
              <LazyImage id={pin?.pinCreator._id} src={pin?.pinCreator.image} />
            </div>
            <div className="flex-auto max-w-full flex flex-col items-start justify-start font-light text-xs capitalize pr-2 truncate">
              <h3 className={"truncate max-w-full pr-2 tracking-wide"}>
                {pin?.pinCreator.name}
              </h3>
              <small className="font-fira tracking-wider text-color-font-secondary">
                {pin?.pinCreator.profession}
              </small>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Pins;
