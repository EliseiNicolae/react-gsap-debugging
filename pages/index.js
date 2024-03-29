import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { GsapDebugging } from "../src/gsap-debugging";

export default function App () {
  const el = useRef();
  const q = gsap.utils.selector(el);
  // Use 'as' for type assertions in TypeScript with JSX
  const [tl, setTl] = useState();

  useEffect(() => {
    const timeline = gsap.timeline()
        .to(q(".box"), {
          rotate: 360
        })
        .to(q(".circle"), {
          x: 100
        });

    setTl(timeline);
  }, []);

  return (
      <div className="app" ref={el}>
        <div className={'box'}>Box</div>
        <div className={'circle'}>Circle</div>
        <GsapDebugging timeline={tl} />
      </div>
  );
}
