import React, { useContext  } from "react";
import { AppDispatch } from "../App";
import HistoryChart from "./HistoryChart";
import { transformHistory } from "../utils";

function HistoryChartGroup({ history = {}, lastDays = {} }) {
  const dispatch = useContext(AppDispatch);

  function handleLastDaysChange(e, key) {
    dispatch({ type: "SET_LASTDAYS", key, days: e.target.value });
  }

  return (
    <div className='history-group'>
      <HistoryChart
        title='Cases'
        data={transformHistory(history.cases)}
        lastDays={lastDays.cases}
        onLastDaysChange={(e) => handleLastDaysChange(e, "cases")}
      />
      <HistoryChart
        title='Deaths'
        data={transformHistory(history.deaths)}
        lastDays={lastDays.deaths}
        onLastDaysChange={(e) => handleLastDaysChange(e, "deaths")}
      />
      <HistoryChart
        title='Recovered'
        data={transformHistory(history.recovered)}
        lastDays={lastDays.recovered}
        onLastDaysChange={(e) => handleLastDaysChange(e, "recovered")}
      />
    </div>
  );
}

export default HistoryChartGroup;