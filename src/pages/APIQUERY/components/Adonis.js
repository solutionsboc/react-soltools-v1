import useAxios from "../hooks/useAxios";
import axios from '../apis/adonisRepos';
import Button from '../../../components/shared/Button';

const Adonis = () => {

    const [data, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/',
        requestConfig: {
            headers: {
                'Content-Language': 'en-GB',
                //'Accept': 'text/html'
            }
        }
    });

    return (
        <article>

            <h2>ADOweb rest return</h2>
            <Button type="submit" isDisabled={loading} onClick={() => refetch()}>
              {loading ? "Loading…" : "Refetch"}
            </Button>

            {loading && <p>Loading...</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {/* {!loading && !error && data && <p>{data?.data}</p>} */}
            {console.log('Adonis log:')}
            {data && console.log(data)}
            {/* {!loading && !error && data && data.message && <p>{data.message.header.execute_time}</p>} */}

            {!loading && !error && !data && <p>No data to display</p>}

            {/* <button onClick={() => refetch()}>Get Data</button> */}
        </article>
    );
}

export default Adonis;