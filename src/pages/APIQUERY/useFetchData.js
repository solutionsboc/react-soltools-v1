import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function useFetchData(fetchData) {
  // const [dataFetch, setData] = useState(null);
  const [dataFetch, setData] = useState([]);
  const [loadingUrl, setLoading] = useState(false);
  const [errorUrl, setError] = useState(null);
  const aUrl = fetchData;

  if (aUrl) {
    console.log("UseFetch aUrl:\n" + aUrl);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(aUrl)
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
  }, [aUrl]);

  const refetchUrl = () => {
    setLoading(true);
    axios
      .get(aUrl)
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

// useFetchData.propTypes = {
//   fetchData: PropTypes.string,
// }

export default useFetchData;
