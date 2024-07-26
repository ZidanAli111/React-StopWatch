import './stopwatch.css'
import { useRef } from "react";
import { useState } from "react"
import { useEffect } from 'react';

export function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapseTime, setElapseTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapseTime(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapseTime;

    }
    function stop() {
        setIsRunning(false);
    }
    function reset() {
        setElapseTime(0);
        setIsRunning(false);
    }

    function formatTime() {

        let hours = Math.floor(elapseTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapseTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapseTime / (1000) % 60);
        let milliseconds = Math.floor((elapseTime % 1000) / 10);


        hours = String(hours).padStart(2, "0");

        minutes = String(minutes).padStart(2, "0");

        seconds = String(seconds).padStart(2, "0");

        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }


    return (
        <div className="stopwatch-container">
            <div className="display"> {formatTime()}</div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop}>Stop</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </div>)
}