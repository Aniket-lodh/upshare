import { feed_data } from "../data/mock.js";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";

import Pins from "../components/Pins";
import { Outlet, useMatch } from "react-router-dom";

const Feed = () => {
  //hooks
  const [renderChildren, setRenderChildren] = useState(false);
  const checkHomeRoute = useMatch("/");

  useEffect(() => {
    if (checkHomeRoute) {
      setRenderChildren(false);
    }
  }, [checkHomeRoute]);

  return (
    <>
      {/* Pin Cards */}
      <div className="grid gap-y-3 px-1 py-2 grid-cols-2 auto-cols-min auto-rows-min sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:overflow-y-auto ">
        {feed_data.length > 0 &&
          feed_data.map((item, index) => (
            <Pins
              key={index}
              pin={item}
              setRenderChildren={setRenderChildren}
            />
          ))}
      </div>

      {/*Loading the PinDetails section*/}
      <section
        className={`${
          renderChildren ? "left-0 lg:top-0" : "left-full  lg:top-full"
        } flex justify-center top-0 lg:left-0 fixed bg-white w-screen h-screen z-30 transition-all overflow-y-auto lg:bg-gray-500/50`}
      >
        <div className="w-auto h-full bg-white lg:w-[calc(100%-50%)]">
          <Outlet context={[renderChildren, setRenderChildren]} />
        </div>
      </section>

      {/*Create a new Pin button*/}
      <div className="fixed bottom-3 right-3">
        <button
          type="button"
          title="Add Pin"
          className="rounded-full bg-color-primary-blue text-white p-4 drop-shadow-2xl"
          onClick={() => alert("This feature is Coming soon! Hold tight🎉")}
        >
          <AiOutlinePlus fontSize={24} />
        </button>
      </div>
    </>
  );
};
export default Feed;
