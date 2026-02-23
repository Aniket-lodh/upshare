import React from "react";

const Users = () => {
  return (
    <section className="w-full h-fit px-5 py-4 flex flex-col items-start justify-start gap-3">
      <div className="flex flex-nowrap items-start justify-start gap-2  w-full h-fit">
        <div className="flex-0 w-12 h-12 overflow-hidden rounded-full">
          <img
            src="https://source.unsplash.com/featured"
            className="h-full w-full object-cover"
            alt="random"
          />
        </div>
        <div className="flex-1">
          <h4 className="capitalize font-medium text-base">Judy doe</h4>
          <p className="capitalize font-fira font-normal text-xs text-color-font-secondary">artist</p>
        </div>
      </div>
      <div className="flex flex-nowrap items-start justify-start gap-2  w-full h-fit">
        <div className="flex-0 w-12 h-12 overflow-hidden rounded-full">
          <img
            src="https://source.unsplash.com/featured"
            className="h-full w-full object-cover"
            alt="random"
          />
        </div>
        <div className="flex-1">
          <h4 className="capitalize font-medium text-base">Judy doe</h4>
          <p className="capitalize font-fira font-normal text-xs text-color-font-secondary">artist</p>
        </div>
      </div>
      <div className="flex flex-nowrap items-start justify-start gap-2  w-full h-fit">
        <div className="flex-0 w-12 h-12 overflow-hidden rounded-full">
          <img
            src="https://source.unsplash.com/featured"
            className="h-full w-full object-cover"
            alt="random"
          />
        </div>
        <div className="flex-1">
          <h4 className="capitalize font-medium text-base">Judy doe</h4>
          <p className="capitalize font-fira font-normal text-xs text-color-font-secondary">artist</p>
        </div>
      </div>
    </section>
  );
};

export default Users;
