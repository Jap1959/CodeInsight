import React, { useState, useEffect } from "react";


const FullScreenExample = () => {
   
 
  const [fullscreen, setFullscreen] = useState(false);
  const handleFullScreenChange = () => {
    setFullscreen(!!document.fullscreenElement);
  };
  const handleKeyDown = (event) => {
    console.log(event.key);
    if (fullscreen && event.key === "Escape") {
      event.preventDefault(); // Prevent default action of the Escape key
    }
  };

  document.addEventListener("fullscreenchange", handleFullScreenChange);
  document.addEventListener("keydown", handleKeyDown);

  const handleFullScreen = () => {
 
    const element = document.documentElement;
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        element.requestFullscreen().catch((err) => {
          console.error(
            "Error attempting to enable full-screen mode:",
            err.message
          );
        });
        setFullscreen(true);
      }
    } else {
      console.error("Fullscreen mode is not supported in this browser.");
    }
  };

  return (
    <div>
      {!fullscreen && (
        <button onClick={handleFullScreen}>Enter Fullscreen</button>
      )}
      {fullscreen && (
        <button onClick={() => document.exitFullscreen()}>
          Exit Fullscreen
        </button>
      )}
      <button onClick={() => console.log("Submit")}>Submit</button>
    </div>
  );
};

export default FullScreenExample;
