import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { feed_data } from "../../data/mock";

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
              className="w-full h-full overflow-hidden"
            >
              <img
                src={items.image}
                alt="user-created-pic"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        ))}
    </section>
  );
};

export default Post;
