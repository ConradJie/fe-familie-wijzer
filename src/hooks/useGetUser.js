import {useState, useEffect} from 'react';
import {axiosAuth} from "../helpers/axiosAuth.js";

const useGetUser = (url) => {

    const [userData, setUserData] = useState([]);
    const [userLoading, toggleUserLoading] = useState(false);
    const [userError, setUserError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                toggleUserLoading(true);
                setUserError('');
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setUserData(response.data);
            } catch (e) {
                if (!axiosAuth.isCancel && e.code !== 'ERR_CANCELED') {
                    console.error(e);
                    setUserError(e.message);
                }
            } finally {
                toggleUserLoading(false);
            }
        }

        if (url) {
            void getData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [url]);

    return {userData, userError, userLoading}
};

export default useGetUser;