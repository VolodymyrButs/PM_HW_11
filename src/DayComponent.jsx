import { useState } from "react";
import styled from "styled-components";

const DayWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  width: 98%;
  max-width: 1200px;
  padding: 2px;
  margin: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid black;
  background-color: rgba(0.3, 0.3, 0.3, 0.5);
`;

const LineWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  p {
    color: #fff;
    font-weight: 900;
    text-shadow: #000 0 0 5px;
  }
`;

const Hourly = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Frame = styled.div`
  width: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #333333af;
  margin: 2px;
  border-radius: 10px;
  p {
    color: #fff;
    text-align: center;
    margin: 5px;
  }
  img {
    width: 120px;
  }
`;

const Button = styled.button`
  width: 80%;
  font-size: 16px;
  padding: 3px 10px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :hover {
    box-shadow: 0px 0px 8px black;
    opacity: 0.6;
  }
`;

export const DayComponent = ({ dayData }) => {
  const [showMore, setShowMore] = useState(false);
  let date = new Date(
    dayData.date.slice(-4),
    (Number(dayData.date.slice(-7, -5)) - 1).toString(),
    dayData.date.slice(-10, -8)
  );
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <DayWrapper>
      <LineWrapper>
        <p>Date: </p>
        <p>{date.toLocaleDateString("en-EN", options)}</p>
      </LineWrapper>
      <LineWrapper>
        <p>Max.temperature: </p>
        <p>{dayData.temp_max_c} °C</p>
      </LineWrapper>
      <LineWrapper>
        <p>Min.temperature: </p>
        <p>{dayData.temp_min_c} °C</p>
      </LineWrapper>
      <LineWrapper>
        <p>Humidity: </p>
        <p>{dayData.humid_min_pct} %</p>
      </LineWrapper>
      <LineWrapper>
        <p>Pressure: </p>
        <p>{Math.floor((dayData.slp_min_mb / 1013.25) * 760)} mmHg</p>
      </LineWrapper>
      <LineWrapper>
        <p>Wind speed: </p>
        <p>{dayData.windspd_max_ms} m/s</p>
      </LineWrapper>
      <Button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Less" : "More"}
      </Button>
      {showMore && (
        <Hourly>
          {dayData.Timeframes.map((timeFrame, i) => {
            return (
              <Frame key={timeFrame.date + i}>
                <div>
                  <p>
                    {i * 3}:00 - {(i + 1) * 3}:00
                  </p>
                  <p>Feels like: {timeFrame.feelslike_c}</p>
                  <p>
                    <b>{timeFrame.wx_desc}</b>
                  </p>
                </div>
                <img
                  src={`./img/${timeFrame.wx_icon.slice(0, -3)}png`}
                  alt="Weather ilustrate"
                />
              </Frame>
            );
          })}
        </Hourly>
      )}
    </DayWrapper>
  );
};
