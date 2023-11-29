import {useEffect, useState} from "react";
import axios from "axios";

const useGetPerson = (url) => {
    const [person, setPerson] = useState([]);
    const [personLoading,togglePersonLoading] = useState(true);
    const [personError, setPersonError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem('token');
        async function getData() {
            try {
                setPersonError("");
                const response = await axios.get(url,{
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