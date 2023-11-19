import {useEffect, useState} from "react";
import axios from "axios";

const useGetPersons = (url) => {
    const [persons, setPerson] = useState([]);
    const [personsLoading,togglePersonsLoading] = useState(true);
    const [personsError, setPersonsError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function getData() {
            try {
                setPersonsError("");
                const response = await axios.get(url,{});
                setPerson(response.data);
            } catch(e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setPersonsError(e.message);
                } else {
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
    return { persons, personsError , personsLoading}
};

export default useGetPersons;