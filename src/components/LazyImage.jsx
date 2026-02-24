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

  return inView ? (
    <img
      src={src}
      alt={alt}
      className={`image-fade ${loaded ? "loaded" : ""} ${
        className || "w-full h-full object-cover"
      }`}
      onLoad={() => setLoaded(true)}
    />
  ) : (
    <div
      ref={imgRef}
      id={id}
      className={
        placeholderClassName || `object-contain w-full h-full bg-gray-200`
      }
    />
  );
};

export default LazyImage;
