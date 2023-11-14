import {useEffect, useState} from "react";
import axios from "axios";

const useGetPerson = (url) => {
    const [person, setPerson] = useState([]);
    const [personLoading,togglePersonLoading] = useState(true);
    const [personError, setPersonError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function getData() {
            try {
                setPersonError("");
                const response = await axios.get(url,{});
                setPerson(response.data);
            } catch(e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setPersonError(e.message);
                } else {
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
    return { person, personError , personLoading}
};

export default useGetPerson;