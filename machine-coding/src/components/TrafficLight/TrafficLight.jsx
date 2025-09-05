import React, { useState, useEffect, useRef } from "react";
import "./TrafficLight.css";
const TrafficLight = () => {
  const [isActiveColor, setIsActiveColor] = useState("red");
  const [trafficLight, setTrafficLight] = useState({
    red: { time: 10, next: "yellow" },
    yellow: { time: 5, next: "green" },
    green: { time: 15, next: "red" },
  });

  const [timer, setTimer] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const remainingRef = useRef(0);

  // Run when color changes
  useEffect(() => {
    const baseTime = trafficLight[isActiveColor].time * 1000;
    remainingRef.current = baseTime;
    // setting the new time after light changes color
    setTimer(baseTime / 1000);
    // schedule transition
    timeoutRef.current = setTimeout(() => {
      setIsActiveColor(trafficLight[isActiveColor].next);
    }, baseTime);

    // update UI every second
    intervalRef.current = setInterval(() => {
      remainingRef.current -= 1000;
      setTimer(Math.max(remainingRef.current / 1000, 0));
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [isActiveColor]);

  function handleTimeUpdate(e) {
    if (e.key === "Enter") {
      const seconds = e.target.value;
      remainingRef.current += parseInt(seconds) * 1000; // apply just once
      setTimer(Math.ceil(remainingRef.current / 1000));

      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsActiveColor(trafficLight[isActiveColor].next);
      }, remainingRef.current);

      // reschedule interval
      intervalRef.current = setInterval(() => {
        remainingRef.current -= 1000;
        setTimer(Math.max(remainingRef.current / 1000, 0));
      }, 1000);

      e.target.value = "";
    }
  }
  // useEffect(() => {
  //   timerRef.current = setTimeout(() => {
  //     setIsActiveColor(trafficLight[isActiveColor].next);
  //   }, (trafficLight[isActiveColor].time + extraTime.current) * 1000);

  //   return () => {
  //     clearTimeout(timerRef);
  //   };
  // }, [isActiveColor]);

  // useEffect(() => {
  //   // start fresh when color changes

  //   setTimer(trafficLight[isActiveColor].time);

  //   timeIntervalRef.current = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev <= 1) {
  //         // if it was going to hit 0 → reset immediately
  //         return trafficLight[isActiveColor].time;
  //       }
  //       return prev - 1; // normal countdown
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timeIntervalRef);
  //   };
  // }, [isActiveColor]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Traffic Light</h1>
      <div className="container">
        <div className="traffic_light__container">
          <div
            className="traffic-light"
            style={{
              backgroundColor: "red",
              opacity: `${isActiveColor === "red" ? 1 : 0.2}`,
            }}
          ></div>
          <div
            style={{
              backgroundColor: "yellow",
              opacity: `${isActiveColor === "yellow" ? 1 : 0.2}`,
            }}
            className="traffic-light"
          ></div>
          <div
            style={{
              backgroundColor: "green",
              opacity: `${isActiveColor === "green" ? 1 : 0.2}`,
            }}
            className="traffic-light"
          ></div>
        </div>
        <div className="">
          <h1>{timer}</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <label>IncreaseTime</label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Add Extra seconds"
              onKeyDown={(e) => handleTimeUpdate(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficLight;
