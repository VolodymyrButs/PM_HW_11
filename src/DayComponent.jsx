import React from "react";
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
  }
  p:first-of-type {
    font-style: italic;
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
  -webkit-appearance: none;
  :focus {
    outline: none;
  }
  :hover {
    box-shadow: 0px 0px 8px black;
    opacity: 0.6;
  }
`;

class DayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { togle: false }
  }

  date = new Date(
    this.props.dayData.date.slice(-4),
    (Number(this.props.dayData.date.slice(-7, -5)) - 1).toString(),
    this.props.dayData.date.slice(-10, -8)
  );
  options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  render() {
    return (
      <DayWrapper>
        <LineWrapper>
          <p>Date: </p>
          <p>{this.date.toLocaleDateString("en-EN", this.options)}</p>
        </LineWrapper>
        <LineWrapper>
          <p>Max.temperature: </p>
          <p>{this.props.dayData.temp_max_c} °C</p>
        </LineWrapper>
        <LineWrapper>
          <p>Min.temperature: </p>
          <p>{this.props.dayData.temp_min_c} °C</p>
        </LineWrapper>
        <LineWrapper>
          <p>Humidity: </p>
          <p>{this.props.dayData.humid_min_pct} %</p>
        </LineWrapper>
        <LineWrapper>
          <p>Pressure: </p>
          <p>{Math.floor((this.props.dayData.slp_min_mb / 1013.25) * 760)} mmHg</p>
        </LineWrapper>
        <LineWrapper>
          <p>Wind speed: </p>
          <p>{this.props.dayData.windspd_max_ms} m/s</p>
        </LineWrapper>
        <Button onClick={() => this.setState({ togle: !this.state.togle })}>
          {this.state.togle ? "Less" : "More"}
        </Button>
        {this.state.togle && (
          <Hourly>
            {this.props.dayData.Timeframes.map((timeFrame, i) => {
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
  }
};

export default DayComponent