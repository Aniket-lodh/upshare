import { useRef, useEffect, useState } from "react";

const LazyImage = (props) => {
  // hooks
  const imgRef = useRef();
  const [inView, setInView] = useState(false);

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
    <img src={props.src} alt={props?.alt} className="w-full h-full object-cover" />
  ) : (
    <div
      ref={imgRef}
      id={props.id}
      className="object-contain w-full h-full bg-gray-200"
    />
  );
};

export default LazyImage;
