import React from "react";
import { useScrollSequence } from "react-scroll-hooks";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

const TypeForm = () => {
  const containerRef = React.useRef();

  const { createScrollRef, next, previous, goToPosition, active } =
    useScrollSequence({
      initialActive: 0,
      verticalOffset: 100,
      scrollSpeed: 50,
      containerRef,
    });

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", overflow: "scroll", height: "100vh" }}
    >
      <button onClick={() => next()}>next</button>
      <button onClick={() => previous()}>previous</button>
      <button onClick={() => goToPosition(2)}>Go To Position 2</button>
      ...
      <Form1 {...createScrollRef()} />
      <Form2 {...createScrollRef()} />
      <Form3 {...createScrollRef()} />
    </div>
  );
};

export default TypeForm;
