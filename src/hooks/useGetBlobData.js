import {useState, useEffect} from 'react';
import axios from "axios";
import {axiosAuth} from "../helpers/axiosAuth.js";

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
                    signal: controller.signal,
                    baseURL: 'http://localhost:8080',
                    headers: {
                        'responseType': 'blob',
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlobData(response.data);
            } catch (e) {
                if (!axiosAuth.isCancel && e.code !== 'ERR_CANCELED') {
                    console.error(e)
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