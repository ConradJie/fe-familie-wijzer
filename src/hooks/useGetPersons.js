import {useEffect, useState} from "react";
import axios from "axios";

const useGetPersons = (url) => {
    const [persons, setPerson] = useState([]);
    const [personsLoading, togglePersonsLoading] = useState(true);
    const [personsError, setPersonsError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            const token = localStorage.getItem('token');

            try {
                setPersonsError("");
                const response = await axios.get(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setPerson(response.data);
            } catch (e) {
                console.error(e)
                if (!axios.isCancel) {
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