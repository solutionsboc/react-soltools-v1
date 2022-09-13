import { useEffect, useState } from "react";
import axios from "axios";

function UseFetch(url,  auth, header) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (url) {
    console.log("UseFetch url:\n" + url);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const refetch = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { data, loading, error, refetch};
}

export default UseFetch;
