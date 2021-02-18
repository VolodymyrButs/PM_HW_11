import { useEffect, useState } from "react";
import styled from "styled-components";

import { DayComponent } from "./DayComponent";

const AppWrapper = styled.div`
  position: relative;
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  margin-top: 48px;
  @media (min-width: 420px) {
    height: calc(100vh - 72px);
    margin-top: 72px;
  }

  > h1 {
    position: fixed;
    font-size: 20px;
    top: 0px;
    left: 0;
    right: 0;
    text-align: center;
    @media (min-width: 420px) {
      font-size: 2em;
    }
  }
`;

const App = () => {
  const [weather, setWeaather] = useState();
  useEffect(
    () =>
      fetch(
        "http://api.weatherunlocked.com/api/forecast/50.27,30.31?app_id=231e22db&app_key=992c0bfbce0848660ff960fc64beea9c"
      )
        .then((response) => response.json())
        .then((data) => setWeaather(data.Days)),
    []
  );
  console.log(weather);
  return (
    <AppWrapper>
      <h1>Weather in Kyiv for 7 days</h1>
      {weather &&
        weather.map((day) => (
          <DayComponent key={day.date + day.moonrise_time} dayData={day} />
        ))}
    </AppWrapper>
  );
};

export default App;
