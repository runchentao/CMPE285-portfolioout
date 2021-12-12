import { useState } from "react";
import axios from "axios";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [pieData, setPieData] = useState(null);

  const fetchApi = async (url) => {
    setLoading(true);
    try {
      await axios.get(url).then((res) => {
        const { data, chartData, portfolio, pieData } = res.data;
        setData(data);
        setChartData(chartData);
        setPortfolioData(portfolio);
        setPieData(pieData);
        setLoading(false);
      });
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return { loading, data, chartData, portfolioData, pieData, fetchApi };
};

export default useApi;
