// 引入
import React, { useReducer  } from "react";
  
import "./App.css";
import { useCoronaAPI } from "./hooks/useCoronaAPI";
import GlobalStats from "./components/GlobalStats";
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
import HistoryChartGroup from "./components/HistoryChartGroup";
  
// 全局变量
const BASE_URL = "https://corona.lmao.ninja/v2";
const initialState = {
  key: "cases",
  country: null,
  lastDays: {
    cases: 30,
    deaths: 30,
    recovered: 30,
  },
};

// reducer函数，分发action类型并修改state
function reducer(state, action) {
  switch (action.type) {
    case "SET_KEY":
      return { ...state, key: action.key };
    case "SET_COUNTRY":
      return { ...state, country: action.country };
    case "SET_LASTDAYS":
      return {
        ...state,
        lastDays: { ...state.lastDays, [action.key]: action.days },
      };
    default:
      return state;
  }
}

// 用于传递 dispatch 的 React Context
export const AppDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);// 定义useReducer
  const { key, country, lastDays } = state;// 解构赋值

  const globalStats = useCoronaAPI("/all", {// 全部数据
    initialData: {},
    refetchInterval: 5000,
  });

  const countries = useCoronaAPI(`/countries?sort=${key}`, {// 不同国家数据（前10位）
    initialData: [],
    converter: (data) => data.slice(0, 10),
  });

  const history = useCoronaAPI(`/historical/${country}`, {// 国家历史数据
    initialData: {},
    converter: (data) => data.timeline,
  });

  return (
    <AppDispatch.Provider value={dispatch}>
      <div className='App'>
        <h1>COVID-19</h1>
        <GlobalStats stats={globalStats} />
        <SelectDataKey />
        <CountriesChart data={countries} dataKey={key} />
  
        {country ? (
          <>
            <h2>History for {country}</h2>
            <HistoryChartGroup history={history} lastDays={lastDays} />
          </>
        ) : (
          <h2>Click on a country to show its history.</h2>
        )}
      </div>
    </AppDispatch.Provider>
  );
}

export default App;