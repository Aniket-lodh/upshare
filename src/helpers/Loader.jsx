// BASE LOADER
export const Loader = () => {
  return (
    <div className="loader">
      <svg>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export const Spinner = () => {
  return (
    <div>
      <svg
        className="animate-spin m-auto h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          stroke="currentColor"
          strokeWidth="4"
          cx="12"
          cy="12"
          r="10"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="container">
      <div className="list pre">
        <div className="items">
          <div className="item rect"></div>
          <div className="item line"></div>
          <div className="item line"></div>
          <div className="item line"></div>
          <div className="item line"></div>
          <div className="item line"></div>
          <div className="item line"></div>
        </div>
      </div>
    </div>
  );
};
