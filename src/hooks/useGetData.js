import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetData = (url) => {

    const [data, setData] = useState([]);
    const [dataError, setDataError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function getData() {
            try {
                setDataError("");
                const response = await axios.get(url,{});
                setData(response.data);
            } catch(e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setDataError(e.message);
                } else {
                    setDataError(e.message);
                }
            }
        }
        void getData();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return { data, dataError }
};

export default useGetData;