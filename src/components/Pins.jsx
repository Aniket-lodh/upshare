import {Link} from "react-router-dom";
import React from "react";

const Pins = ({pin, setRenderChildren}) => {
    return (
        <>
            <div className="max-w-160 h-fit rounded-lg bg-color-bg-accent overflow-hidden">
                <div
                    className="w-full max-h-230 flex flex-col gap-1.5 items-start justify-start bg-gradient-to-tr from-neutral-300/30 via-color-bg-accent py-2 px-2">
                    {/*Pin-creator uploaded image*/}
                    <div className="min-w-full min-h-140 rounded-md overflow-hidden">

                        <Link to={`/pins/${pin?._id}`} onClick={(e) => setRenderChildren(true)}>
                            <img src={pin?.image} className="rounded-md object-contain w-full h-full" alt={`${pin?.pinCreator.name}-picture`}/>
                        </Link>
                    </div>
                    {/*Pin-creator profile*/}
                    <Link to={`/user/profile/${pin?.pinCreator._id}`} className="w-full ml-1 max-h-8 flex gap-1.5 items-center justify-start">
                        <img src={pin?.pinCreator.image} className="w-7 h-7 object-contain rounded-full object-contain transition-all"
                             alt={`${pin?.pinCreator.name} - profile`}/>
                        <div
                            className="w-full max-w-full flex flex-col items-start justify-start font-light text-xs capitalize pr-2 truncate">
                            <h3 className={"truncate max-w-full pr-2 tracking-wide"}>{pin?.pinCreator.name}</h3>
                            <small className="font-fira tracking-wider text-color-font-secondary">{pin?.pinCreator.profession}</small>
                        </div>
                    </Link>
                </div>
            </div>

        </>
    )
}
export default Pins;
