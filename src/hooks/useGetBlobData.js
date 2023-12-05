import {useState, useEffect} from 'react';
import axios from "axios";

const useGetBlobData = (url) => {

    const [blobData, setBlobData] = useState([]);
    const [blobDataLoading, toggleBlobDataLoading] = useState(false);
    const [blobDataError, setBlobDataError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            const token = localStorage.getItem('token');
            try {
                setBlobDataError("");
                toggleBlobDataLoading(true);
                const response = await axios.get(url, {
                    // signal: controller.signal,
                    baseURL: 'http://localhost:8080',
                    headers: {
                        'responseType': 'blob',
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlobData(response.data);
            } catch (e) {
                console.error(e)
                if (!axios.isCancel && e.message !== 'canceled') {
                    setBlobDataError(e.message);
                }
            } finally {
                toggleBlobDataLoading(false);
            }
        }

        if (url) {
            void getData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {blobData, blobDataError, blobDataLoading}
};

export default useGetBlobData;