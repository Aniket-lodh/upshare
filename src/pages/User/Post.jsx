import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { feed_data } from "../../data/mock";
import LazyImage from "../../components/LazyImage";

const Post = () => {
  const [userId] = useOutletContext();
  const [userPins, setUserPins] = useState([]);

  useEffect(() => {
    setUserPins(feed_data.filter((item) => item.pinCreator._id === userId));
  }, []);

  return (
    <section className="overflow-hidden py-0.5 px-0.5 gap-0.5 grid grid-cols-3 auto-rows-auto">
      {/* cards */}
      {userPins &&
        userPins.map((items) => (
          <div key={items._id} className="max-w-120 max-h-230">
            {/* Card image/thumbnail */}
            <Link
              to={`/user/pin/${items._id}`}
              className="w-full h-full overflow-hidden block"
            >
              <div id={items._id} className="w-full h-full object-cover min-w-120 min-h-140">
                <LazyImage src={items.image} />
              </div>
            </Link>
          </div>
        ))}
    </section>
  );
};

export default Post;
