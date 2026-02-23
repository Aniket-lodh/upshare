import React from "react";
import { Link } from "react-router-dom";

const All = () => {
  return (
    <section className="px-5 flex flex-wrap ga p-2 items-start justify-start py-2">
      <div className="max-w-160 h-fit rounded-lg bg-color-bg-accent overflow-hidden">
        <div className="w-full max-h-230 flex flex-col gap-1.5 items-start justify-start bg-gradient-to-tr from-neutral-300/30 via-color-bg-accent py-2 px-2">
          {/*Pin-creator uploaded image*/}
          <div className="min-w-full min-h-140 rounded-md overflow-hidden">
            <Link to={`/pins/1`} className="w-full h-full">
              <img
                src={"https://source.unsplash.com/featured"}
                className="rounded-md object-cover w-full h-full"
                alt={`picture`}
              />
            </Link>
          </div>
          {/*Pin-creator profile*/}
          <Link
            to={`/user/profile/1`}
            className="w-full ml-1 max-h-8 flex gap-1.5 items-center justify-start"
          >
            <img
              src={"https://source.unsplash.com/featured"}
              className="w-7 h-7 object-contain rounded-full object-contain transition-all"
              alt={` profile`}
            />
            <div className="w-full max-w-full flex flex-col items-start justify-start font-light text-xs capitalize pr-2 truncate">
              <h3 className={"truncate max-w-full pr-2 tracking-wide"}>
                Judy Doe
              </h3>
              <small className="font-fira tracking-wider text-color-font-secondary">
                Writer
              </small>
            </div>
          </Link>
        </div>
      </div>
      <div className="max-w-160 h-fit rounded-lg bg-color-bg-accent overflow-hidden">
        <div className="w-full max-h-230 flex flex-col gap-1.5 items-start justify-start bg-gradient-to-tr from-neutral-300/30 via-color-bg-accent py-2 px-2">
          {/*Pin-creator uploaded image*/}
          <div className="min-w-full min-h-140 rounded-md overflow-hidden">
            <Link to={`/pins/1`} className="w-full h-full">
              <img
                src={"https://source.unsplash.com/featured"}
                className="rounded-md object-cover w-full h-full"
                alt={`picture`}
              />
            </Link>
          </div>
          {/*Pin-creator profile*/}
          <Link
            to={`/user/profile/1`}
            className="w-full ml-1 max-h-8 flex gap-1.5 items-center justify-start"
          >
            <img
              src={"https://source.unsplash.com/featured"}
              className="w-7 h-7 object-contain rounded-full object-contain transition-all"
              alt={` profile`}
            />
            <div className="w-full max-w-full flex flex-col items-start justify-start font-light text-xs capitalize pr-2 truncate">
              <h3 className={"truncate max-w-full pr-2 tracking-wide"}>
                Judy Doe
              </h3>
              <small className="font-fira tracking-wider text-color-font-secondary">
                Writer
              </small>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default All;
