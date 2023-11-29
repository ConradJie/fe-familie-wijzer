import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetData = (url) => {

    const [data, setData] = useState([]);
    const [dataLoading, toggleDataLoading] = useState(false);
    const [dataError, setDataError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            const token = localStorage.getItem('token');
            try {
                setDataError("");
                toggleDataLoading(true);
                const response = await axios.get(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (e) {
                console.error(e)
                if (!axios.isCancel) {
                    setDataError(e.message);
                }
            } finally {
                toggleDataLoading(false);
            }
        }

        if (url) {
            void getData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {data, dataError, dataLoading}
};

export default useGetData;