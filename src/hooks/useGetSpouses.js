import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetSpouses = (url) => {

    const [spouses, setSpouses] = useState([]);
    const [spousesLoading, toggleSpousesLoading] = useState(false);
    const [spousesError, setSpousesError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                toggleSpousesLoading(true);
                setSpousesError("");
                const response = await axios.get(url, {});
                setSpouses(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setSpousesError(e.message);
                } else {
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