import {useState, useEffect} from 'react';
import {axiosAuth} from "../helpers/axiosAuth.js";

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
                const token=localStorage.getItem('token');
                axiosAuth.defaults.headers = {'Authorization': `Bearer ${token}`};
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setSpouse(response.data);
            } catch (e) {
                console.error(e)
                if (!axiosAuth.isCancel) {
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