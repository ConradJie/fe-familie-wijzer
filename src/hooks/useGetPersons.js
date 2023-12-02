import {useEffect, useState} from "react";
import {axiosAuth} from "../helpers/axiosAuth.js";

const useGetPersons = (url) => {
    const [persons, setPerson] = useState([]);
    const [personsLoading, togglePersonsLoading] = useState(true);
    const [personsError, setPersonsError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                setPersonsError("");
                const response = await axiosAuth.get(url, {                    signal: controller.signal
                });
                setPerson(response.data);
            } catch (e) {
                console.error(e)
                if (!axiosAuth.isCancel && e.message !== 'canceled') {
                    setPersonsError(e.message);
                }
            } finally {
                togglePersonsLoading(false);
            }
        }

        void getData();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {persons, personsError, personsLoading}
};

export default useGetPersons;