import React, { useState, useEffect } from "react";
  
import "./App.css";
import GlobalStats from "./components/GlobalStats";
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
  
const BASE_URL = "https://corona.lmao.ninja/v2";

function App() {
  // 通过 useState 钩子引入了 globalStats 状态变量，以及修改该状态的函数。
  const [globalStats, setGlobalStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [key, setKey] = useState("cases");
  
  // 通过 useEffect 钩子获取 API 数据
  useEffect(() => {
    const fetchGlobalStats = async () => {
      const response = await fetch(`${BASE_URL}/all`);
      const data = await response.json();
      setGlobalStats(data);
    };
  
    fetchGlobalStats();
    const intervalId = setInterval(fetchGlobalStats, 5000);
  
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(`${BASE_URL}/countries?sort=${key}`);
      const data = await response.json();
      setCountries(data.slice(0, 10));
    };
  
    fetchCountries();
  }, [key]);

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