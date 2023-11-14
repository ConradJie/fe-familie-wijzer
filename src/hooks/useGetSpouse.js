import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetSpouse = (url) => {

    const [spouse, setSpouse] = useState([]);
    const [spouseLoading,toggleSpouseLoading] = useState(true);
    const [spouseError, setSpouseError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function getData() {
            try {
                setSpouseError("");
                const response = await axios.get(url,{});
                setSpouse(response.data);
            } catch(e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setSpouseError(e.message);
                } else {
                    setSpouseError(e.message);
                }
            } finally {
                toggleSpouseLoading(false);
            }
        }
        void getData();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return { spouse, spouseError , spouseLoading}
};

export default useGetSpouse;