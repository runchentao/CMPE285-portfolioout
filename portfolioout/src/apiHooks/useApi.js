import { useState } from "react";
import axios from "axios";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchApi = async (url) => {
    setLoading(true);
    try {
      await axios.get(url).then((res) => {
        const { data } = res.data;
        setData(data);
        setLoading(false);
      });
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return { loading, data, fetchApi };
};

export default useApi;
