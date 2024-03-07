import { useEffect, useState } from "react";
import styles from "./LoadingAnimation.module.css";
import { signOut } from "next-auth/react";

const loadingTextMessages = [
  "Loading adorableness",
  "Loading... one moment",
  "Fetching cuteness...",
  "Loading joy...",
  "Hold on to your leash...",
  "Preparing a pack of joy...",
  "Unleashing puppies...",
  "Harmonizing bits and barks...",
];

export default function LoadingAnimation({ animated = true, loadText = true }) {
  const [loadingText, setLoadingText] = useState("");
  
  useEffect(() => {
    if (loadText) {
      const element = Math.floor(Math.random() * loadingTextMessages.length);
      setLoadingText(loadingTextMessages[element]);
    }
  }, [loadText])

  return (
    <>
      <div className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
        {loadingText}
      </div>

      <div className="fixed left-0 bottom-0 w-screen">
        <svg
          className={`${styles.waves} fixed left-0 bottom-0 w-screen`}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="primary-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={`${animated ? styles.waveContainer : ""} fixed left-0 bottom-0 w-screen`}>
            <use
              xlinkHref="#primary-wave"
              x="48"
              y="0"
              fill="rgba(32,113,91,0.7)"
            />
            <use
              xlinkHref="#primary-wave"
              x="48"
              y="3"
              fill="rgba(32,113,91,0.5)"
            />
            <use
              xlinkHref="#primary-wave"
              x="48"
              y="5"
              fill="rgba(32,113,91,0.3)"
            />
            <use xlinkHref="#primary-wave" x="48" y="6" fill="rgb(32,113,91)" />
          </g>
        </svg>
      </div>
    </>
  );
}
