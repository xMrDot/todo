import style from "./Timer.module.css";
import { useEffect, useState } from "react";
const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [onBreak, setBreak] = useState(false);
  let handleStart = () => {
    setIsRunning(true);
  };
  let handleStop = () => {
    setIsRunning(false);
  };
  let handleReset = () => {
    setTime(0);
    setIsRunning(true);
  };
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);
  useEffect(() => {
    if (!onBreak && time === 15) {
      handleBreak();
    } else if (onBreak && sessions % 2 == 0 && time === 10) {
      setBreak(false);
      setTime(0);
    } else if (onBreak && sessions % 2 == 1 && time === 5) {
      setBreak(false);
      setTime(0);
    }
  }, [onBreak, time]);
  let handleBreak = () => {
    setSessions((prevSessions) => prevSessions + 1);
    setTime(0);
    setBreak(true);
    alert("Break time!");
  };
  return (
    <section className={style.timerContainer}>
      <h2>Timer</h2>
      <span>{time} seconds</span>
      {isRunning ? (
        <button onClick={handleStop}>Stop</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      <button onClick={handleReset}>Reset</button>
      <span>Status: {onBreak ? "On break" : "working"}</span>
    </section>
  );
};
export default Timer;
