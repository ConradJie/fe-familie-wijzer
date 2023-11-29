import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetEvents = (url) => {

    const [events, setEvents] = useState([]);
    const [eventsError, setEventsError] = useState("");
    const [eventsLoading, toggleEventsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function getEvent() {
            const token = localStorage.getItem('token');
            try {
                setEventsError("");
                const response = await axios.get(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvents(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                }
                setEventsError(e.response.message);
            } finally {
                toggleEventsLoading(false);
            }
        }

        void getEvent();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {events, eventsError, eventsLoading}
};

export default useGetEvents;