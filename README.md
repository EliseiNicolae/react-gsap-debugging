<h1 align="center">React-Gsap-Debugging 🛠</h1>

<p align="center">
  <img src="https://i.imgur.com/q4F1Eku.gif" alt="React-Gsap-Debugging" width="800">
</p>

## Installation
A simple React Gsap debugging component for your `gsap.timeline` debugging.
```bash
npm install react-gsap-debugging
yarn add react-gsap-debugging
```

## Usage

Add `GsapDebugging` component to your app and pass `timeline` as a prop.


Basic Example
```jsx
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { GsapDebugging } from "react-gsap-debugging";

export default function App () {
  const el = useRef();
  const q = gsap.utils.selector(el);
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
```

### API

This a list of props that you can pass down to the component:

| Property   | Description                                   | Required | type |
|------------|-----------------------------------------------|----------| ---- |
| `timeline` | Timeline of gsap - `gsap.timeline()` variable | Yes      | core.Timeline |
