import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchApi(url) {
  const [apiResults, setApiResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadData = () => {
    axios.get(url).then((res) => {
      //console.log(res.data.Search);
      setApiResults(res.data.Search);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, [url]);

  return {
    apiResults,
    isLoading,
  };
}
