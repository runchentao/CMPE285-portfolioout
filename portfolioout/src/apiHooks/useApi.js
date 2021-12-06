import { useEffect, useState } from "react";
import axios from "axios";

const useApi = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchApi = async () => {
    try {
      await axios.get(url).then((res) => {
        const { data } = res.data;
        setData(data);
        setLoading(false);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data };
};

export default useApi;
