import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import * as dateFns from "date-fns";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #7c62d4;
  font-family: "Source Sans Pro";

  .Video {
    width: 100%;
    height: 100vh;
  }

  img {
    display: block;
    margin-bottom: 20px;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: 600;
    font-size: 42px;
    white-space: nowrap;
  }
`;

let humanizeFutureToNow = (fDate) => {
  let result = [],
    now = new Date();
  let parts = ["year", "month", "day", "hour", "minute", "second"];

  parts.forEach((p, i) => {
    let uP = p.charAt(0).toUpperCase() + p.slice(1);
    let t = dateFns[`differenceIn${uP}s`](fDate, now);
    if (t) {
      result.push(
        `${i === parts.length - 1 ? "and " : ""}${t} ${uP}${t === 1 ? "" : "s"}`
      );
      if (i < parts.length) fDate = dateFns[`sub${uP}s`](fDate, t);
    }
  });
  return result.join(" ");
};

function App() {
  const [intervalo, setIntervalo] = useState();
  const [time, setTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const updateTime = () => {
    const ferias = new Date(2020, 11, 18, 16, 30, 0, 0);
    // const ferias = new Date(2020, 10, 30, 10, 29, 10, 0);

    if (dateFns.isBefore(ferias, Date.now())) {
      setIsFinished(true);
    }

    setTime(humanizeFutureToNow(ferias));
  };

  useEffect(() => {
    updateTime();

    setIntervalo(
      setInterval(() => {
        updateTime();
      }, 1000)
    );
  }, []);

  useEffect(() => {
    if (isFinished) {
      clearInterval(intervalo);
    }
  }, [isFinished]);

  if (isFinished) {
    return (
      <Wrapper>
        <YouTube
          videoId="KXw8CRapg7k"
          className="Video"
          opts={{
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <span>{time}</span>
    </Wrapper>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
