import {
  Link,
  Outlet,
  useOutletContext,
  useParams,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  RiCloseCircleLine,
  RiHeart2Line,
  RiThumbUpLine,
  RiChat3Line,
  RiShareLine,
} from "react-icons/ri";

import { post_details } from "../data/mock.js";
import moment from "moment";

const PinDetails = ({ user }) => {
  //Hooks
  const [renderPostDetails, setRenderPostDetails] = useOutletContext();
  const [pin, setPin] = useState(null);
  const navigate = useNavigate();
  const pinsMatch = useMatch("/pins/*");

  //Variables
  let date;
  const { pinId } = useParams();

  useEffect(() => {
    setPin(post_details.find((value) => pinId === value._id));
    setRenderPostDetails(true);
  }, [pinId, pinsMatch]);

  if (pin) {
    date = moment.unix(pin._createdAt); // in seconds
  }

  // Share post
  async function sharePost() {
    try {
      await navigator.share({
        title: pin?.pinCreator.name,
        text: pin?.desc,
        url: window.location.href,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {
        <div className="px-2 pt-3.5">
          <div className="border border-color-border-primary rounded-lg pb-4 overflow-hidden">
            {/*Post creator headings*/}
            <div className="relative w-full flex items-center justify-between px-4 py-2 bg-color-bg-tertiary">
              {/*user headings*/}
              <Link
                to={`/user/profile/${pin?.pinCreator._id}`}
                className="flex gap-1.5 items-end justify-center"
              >
                {/*user profile image*/}
                <img
                  src={`${pin?.pinCreator.image}`}
                  className="w-9 h-9 rounded-full object-contain"
                  alt={`${pin?.pinCreator.username}-profile-picture`}
                />
                {/*user headings*/}
                <div className="flex flex-col items-start justify-start ">
                  <h2 className="capitalize text-color-font-primary">
                    {pin?.pinCreator.name}
                  </h2>
                  <small className="font-fira font-light text-color-font-tertiary tracking-wide text-xs">
                    @{pin?.pinCreator.username}
                  </small>
                </div>
              </Link>
              {/*Close icon*/}
              <button
                title={"close-pin-details"}
                type={"button"}
                onClick={() => {
                  navigate("/");
                  setRenderPostDetails(false);
                }}
                className="p-1 rounded-full bg-white"
              >
                <RiCloseCircleLine
                  className={"select-none pointer-events-none"}
                  fontSize={17}
                />
              </button>
            </div>

            {/*Post Details & others*/}
            <div className="px-4 h-full">
              <p className="mt-3 break-words text-color-font-secondary font-normal text-base">
                {pin?.desc}
              </p>
              {/*post image*/}
              <div className="w-full h-fit mt-3 overflow-hidden ">
                <img
                  src={`${pin?.image}`}
                  className="w-full h-fit object-contain rounded-lg"
                  alt={`${pin?.pinCreator.username}-uploaded-picture`}
                />
              </div>
              {/*post view,comments & upload-times*/}
              <div className=" mt-3 font-normal flex flex-col w-full gap-2 items-start justify-start  text-color-font-secondary font-fira text-sm">
                <p>
                  {pin && (
                    <>
                      {`${moment.unix(pin._createdAt).fromNow()} •`}
                      <span className="font-semibold"> {pin?.views} </span>views
                    </>
                  )}
                </p>
                <p>
                  {pin && (
                    <>
                      <span className="font-semibold"> {pin?.likes} </span>
                      likes •
                      <span className="font-semibold"> {pin?.comments} </span>
                      comments
                    </>
                  )}
                </p>
              </div>
              {/*post interactions*/}
              <div className="pt-2 mt-3 flex items-center justify-between text-color-font-secondary border-t">
                <div className="flex items-center justify-start gap-4 pl-3">
                  <RiThumbUpLine fontSize={24} />
                  <RiChat3Line fontSize={24} />
                </div>
                <div className="flex items-center justify-start gap-4 pl-3">
                  <RiHeart2Line fontSize={24} />
                  <RiShareLine fontSize={24} onClick={sharePost} />
                </div>
              </div>
            </div>
          </div>
          {/*Temp comments section*/}
          <div className="w-full my-4 flex flex-col items-center justify-center">
            <h2 className="font-bold text-base text-color-font-primary">
              No comments
            </h2>
            <p className="text-color-font-tertiary tracking-wide text-sm">
              Add one to start the converstaion
            </p>
          </div>
        </div>
      }
    </>
  );
};
export default PinDetails;
