import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [bLength, setbLength] = useState(5);
  const [Length, setLength] = useState(25);
  const [timeLeft, seTtimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");
  const [play, setPlay] = useState(false);

  const increaseBreak = () => {
    if (bLength < 60) {
      setbLength(bLength + 1);
    }
  };

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      seTtimeLeft(timeLeft - 1);
    }
  }, 1000);

  const decreaseBreak = () => {
    if (bLength > 1) {
      setbLength(bLength - 1);
    }
  };

  const Reset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setbLength(5);
    setLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const decreaseSession = () => {
    if (Length > 1) {
      setLength(Length - 1);
      seTtimeLeft(timeLeft - 60);
    }
  };

  const increaseSession = () => {
    if (Length < 60) {
      setLength(Length + 1);
      seTtimeLeft(timeLeft + 60);
    }
  };

  const Play = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const myClock = () => {
    if (play) {
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      seTtimeLeft(bLength * 60);
      setTimingtype("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      seTtimeLeft(Length * 60);
      setTimingtype("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    myClock();
  }, [play, timeLeft, timeout]);

  const Formatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;
    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
    return `${minutesFormatted}:${secondsFormatted}`;
  };

  const myTitle = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="wrapper">
        <h2 id="myHeader">Pomodoro Clock</h2>
        <div className="break-session-length">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div>
              <button
                disabled={play}
                onClick={increaseBreak}
                id="break-increment"
              >
                Increase
              </button>
              <strong id="break-length">{bLength}</strong>
              <button
                disabled={play}
                onClick={decreaseBreak}
                id="break-decrement"
              >
                Decrease
              </button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div>
              <button
                disabled={play}
                onClick={increaseSession}
                id="session-increment"
              >
                Increase
              </button>
              <strong id="session-length">{Length}</strong>
              <button
                disabled={play}
                onClick={decreaseSession}
                id="session-decrement"
              >
                Decrease
              </button>
            </div>
          </div>
        </div>
        <div className="timer-wrapper">
          <div className="timer">
            <h2 id="timer-label">{myTitle}</h2>
            <h3 id="time-left">{Formatter()}</h3>
          </div>
          <button onClick={Play} id="start_stop">
            Start/Stop
          </button>
          <button onClick={Reset} id="reset">
            Reset
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
