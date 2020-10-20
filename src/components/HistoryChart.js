import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

const TITLE2COLOR = {
  Cases: "#D0021B",
  Deaths: "#4A4A4A",
  Recovered: "#09C79C",
};

/*
title 是图表标题
data 就是绘制图表需要的历史数据
lastDays 是显示过去 N 天的数据，可以通过 data.slice(-lastDays) 进行选择
onLastDaysChange 是用户通过 input 修改处理过去 N 天时的事件处理函数
*/

function HistoryChart({ title, data, lastDays, onLastDaysChange }) {
  const colorKey = `color${title}`;// 颜色标识
  const color = TITLE2COLOR[title];// 根据图表标题计算颜色

  return (
    <div>
      <AreaChart
        width={400}
        height={150}
        data={data.slice(-lastDays)}
        margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id={colorKey} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor={color} stopOpacity={0.8} />
            <stop offset='95%' stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='time' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />   
        <Tooltip />
        <Area
          type='monotone'
          dataKey='number'
          stroke={color}
          fillOpacity={1}
          fill={`url(#${colorKey})`}
        />
      </AreaChart>
      <h3>{title}</h3>
      <input
        type='range'
        min='1'
        max='30'
        value={lastDays}
        onChange={onLastDaysChange}
      />
      Last {lastDays} days
    </div>
  );
}

export default HistoryChart;