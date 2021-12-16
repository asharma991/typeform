import { useState, useEffect } from "react";
export function useMouse() {
  let count = 0;
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler(e) {
    count++;
    if (count % 2 === 0) {
      setKeyPressed(e.deltaY > 0 ? `up/${count}` : `down/${count}`);
      if (count === 100) count = 0;
    }
  }
  // If released key is our target key then set to false
  function upHandler() {
    setKeyPressed("");
  }
  // Add event listeners
  useEffect(() => {
    window.addEventListener("wheel", downHandler);
    return () => {
      window.removeEventListener("wheel", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
