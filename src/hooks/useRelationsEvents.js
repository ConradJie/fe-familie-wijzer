import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetRelationsEvents = (url) => {

    const [relationsEvents, setRelationsEvents] = useState([]);
    const [relationsEventsError, setRelationsEventsError] = useState("");
    const [relationsEventsLoading, toggleRelationsEventsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function getEvent() {
            const token = localStorage.getItem('token');

            try {
                setRelationsEventsError("");
                const response = await axios.get(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setRelationsEvents(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                }
                setRelationsEventsError(e.response.message);
            } finally {
                toggleRelationsEventsLoading(false);
            }
        }

        void getEvent();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {relationsEvents, relationsEventsError, relationsEventsLoading}
};

export default useGetRelationsEvents;