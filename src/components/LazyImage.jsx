import { useRef, useEffect, useState } from "react";

const LazyImage = ({
  src,
  alt,
  id,
  className = "",
  placeholderClassName = "",
}) => {
  // hooks
  const imgRef = useRef();
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setInView(true);
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callback);

    // Observer the current image element
    if (imgRef?.current) observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={!inView ? imgRef : undefined}
      id={id}
      className={`relative overflow-hidden ${
        placeholderClassName || "w-full h-full bg-gray-200"
      }`}
    >
      {/* Background Placeholder Layer */}
      <div
        className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Actual Image Layer */}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ease-out will-change-transform ${
            loaded
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-sm scale-102"
          } ${className}`}
          style={{ willChange: "transform, opacity" }}
        />
      )}
    </div>
  );
};

export default LazyImage;
