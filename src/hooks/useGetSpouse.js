import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetSpouse = (sid, url) => {

    const [spouse, setSpouse] = useState([]);
    const [spouseLoading, toggleSpouseLoading] = useState(false);
    const [spouseError, setSpouseError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                toggleSpouseLoading(true);
                setSpouseError("");
                const response = await axios.get(url, {});
                setSpouse(response.data);
            } catch (e) {
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

        //Spouse can be "null" (person is a single parent, relationship unknown)
        if (sid !== "null") {
            void getData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [sid, url]);
    return {spouse, spouseError, spouseLoading}
};

export default useGetSpouse;