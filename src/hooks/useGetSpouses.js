import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetSpouses = (url) => {

    const [spouses, setSpouses] = useState([]);
    const [spousesLoading, toggleSpousesLoading] = useState(false);
    const [spousesError, setSpousesError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            const token = localStorage.getItem('token');
            try {
                toggleSpousesLoading(true);
                setSpousesError("");
                const response = await axios.get(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setSpouses(response.data);
            } catch (e) {
                console.error(e)
                if (!axios.isCancel) {
                    setSpousesError(e.message);
                }
            } finally {
                toggleSpousesLoading(false);
            }
        }

        void getData();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {spouses, spousesError, spousesLoading}
};

export default useGetSpouses;