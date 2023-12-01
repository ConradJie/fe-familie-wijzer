import {useEffect, useState} from "react";
import {axiosAuth} from "../helpers/axiosAuth.js";

const useGetPerson = (url) => {
    const [person, setPerson] = useState([]);
    const [personLoading, togglePersonLoading] = useState(true);
    const [personError, setPersonError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                setPersonError("");
                const token = localStorage.getItem('token');
                axiosAuth.defaults.headers = {'Authorization': `Bearer ${token}`};
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setPerson(response.data);
            } catch (e) {
                console.error(e)
                if (!axiosAuth.isCancel && e.message !== 'canceled') {
                    setPersonError(e.message);
                }
            } finally {
                togglePersonLoading(false);
            }
        }

        void getData();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {person, personError, personLoading}
};

export default useGetPerson;