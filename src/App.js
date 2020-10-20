import React, { useState } from "react";
  
import "./App.css";
import { useCoronaAPI } from "./hooks/useCoronaAPI";
import GlobalStats from "./components/GlobalStats";
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
  
const BASE_URL = "https://corona.lmao.ninja/v2";

function App() {
  const globalStats = useCoronaAPI("/all", {
    initialData: {},
    refetchInterval: 5000,
  });
  const [key, setKey] = useState("cases");
  const countries = useCoronaAPI(`/countries?sort=${key}`, {
    initialData: [],
    converter: (data) => data.slice(0, 10),
  });

  return (
    <div className='App'>
      <h1>COVID-19</h1>
      <GlobalStats stats={globalStats} />
      <SelectDataKey onChange={(e) => setKey(e.target.value)} />
      <CountriesChart data={countries} dataKey={key} />
    </div>
  );
}

export default App;