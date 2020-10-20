import { useState, useEffect,useCallback } from "react";

const BASE_URL = "https://corona.lmao.ninja/v2";

export function useCoronaAPI(
  path,
  { initialData = null, converter = (data) => data, refetchInterval = null }
) {
  const [data, setData] = useState(initialData);
  const convertData = useCallback(converter, []);// 记忆化处理converter函数；传入的 deps 参数为[] ，确保每次渲染都相同

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}${path}`);
      const data = await response.json();
      setData(convertData(data));
    };
    fetchData();

    if (refetchInterval) {
      const intervalId = setInterval(fetchData, refetchInterval);
      return () => clearInterval(intervalId);
    }
  }, [convertData, path, refetchInterval]);

  return data;
}