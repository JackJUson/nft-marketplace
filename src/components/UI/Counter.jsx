import React, { useState } from "react";
import { useEffect } from "react";

export default function Counter({ item }) {
  const [time, setTime] = useState(Date.now());

  const [second, setSecond] = useState();

  function displayCounter() {
    const timeLeftinMs = item.expiryDate - time;
    setSecond(Math.floor(timeLeftinMs / 1000) % 60);
  }

  useEffect(() => {
    displayCounter();
    setTimeout(() => {
      setTime(Date.now());
    }, 1000);
  }, [time]);

  return <div className="de_countdown">{`${second}`}</div>;
}
