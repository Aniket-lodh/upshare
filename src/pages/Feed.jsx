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
      {/* Just an empty div */}
      {/* <div className="mt-2"></div> */}

      {/* Pin Cards */}
      <div className="grid auto-cols-auto grid-cols-2 sm:grid-cols-3  auto-rows-auto gap-y-3 px-1">
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
          renderChildren ? "left-0" : "left-full"
        } fixed top-0 bg-white w-screen h-screen z-30 transition-all`}
      >
        <Outlet context={[renderChildren, setRenderChildren]} />
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
