import {useState, useEffect} from 'react';
import {axiosAuth} from "../helpers/axiosAuth.js";

const useGetData = (url) => {

    const [data, setData] = useState([]);
    const [dataLoading, toggleDataLoading] = useState(false);
    const [dataError, setDataError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                setDataError("");
                toggleDataLoading(true);
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setData(response.data);
            } catch (e) {
                console.error(e)
                if (!axiosAuth.isCancel) {
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