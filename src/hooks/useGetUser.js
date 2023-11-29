import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetUser = (url) => {

    const [userData, setUserData] = useState([]);
    const [userLoading, toggleUserLoading] = useState(false);
    const [userError, setUserError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            const token = localStorage.getItem('token');
            try {
                setUserError("");
                toggleUserLoading(true);
                const response = await axios.get(url, {
                    // signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (e) {
                console.error(e);
                if (!axios.isCancel) {
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