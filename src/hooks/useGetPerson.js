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
                togglePersonLoading(true);
                setPersonError('');
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setPerson(response.data);
            } catch (e) {
                if (!axiosAuth.isCancel && e.code !== 'ERR_CANCELED') {
                    console.error(e)
                    setPersonError(e.message);
                }
            } finally {
                togglePersonLoading(false);
            }
        }

        if (url) {
            void getData();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {person, personError, personLoading}
};

export default useGetPerson;