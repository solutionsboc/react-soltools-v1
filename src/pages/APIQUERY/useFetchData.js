import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function useFetchData(url) {
  const [dataFetch, setData] = useState([]);
  const [loadingUrl, setLoading] = useState(false);
  const [errorUrl, setError] = useState(null);

  if (url) {
    console.log("UseFetch url:\n" + url);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log("useFetchData: \n" + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const refetchUrl = () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // return dataFetch;
  return { dataFetch, loadingUrl, errorUrl, refetchUrl };
  // return (
  //   <div>
  //     <ul>
  //       {dataFetch.map(result => (
  //         <li key={result.id}>{result.title}</li>
  //       ))}
  //     </ul>
  //   </div>)
}

useFetchData.propTypes = {
  url: PropTypes.string,
}

export default useFetchData;
