import {useState, useEffect} from 'react';
import {axiosAuth} from "../helpers/axiosAuth.js";

const useGetSpouses = (url) => {

    const [spouses, setSpouses] = useState([]);
    const [spousesLoading, toggleSpousesLoading] = useState(false);
    const [spousesError, setSpousesError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                toggleSpousesLoading(true);
                setSpousesError('');
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setSpouses(response.data);
            } catch (e) {
                if (!axiosAuth.isCancel && e.code !== 'ERR_CANCELED') {
                    console.error(e)
                    setSpousesError(e.message);
                }
            } finally {
                toggleSpousesLoading(false);
            }
        }

        if (url) {
            void getData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {spouses, spousesError, spousesLoading}
};

export default useGetSpouses;