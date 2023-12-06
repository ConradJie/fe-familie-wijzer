import {useState, useEffect} from 'react';
import {axiosAuth} from "../helpers/axiosAuth.js";

const useGetEvents = (url) => {

    const [events, setEvents] = useState([]);
    const [eventsError, setEventsError] = useState("");
    const [eventsLoading, toggleEventsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function getEvent() {
            try {
                toggleEventsLoading(true);
                setEventsError('');
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setEvents(response.data);
            } catch (e) {
                if (!axiosAuth.isCancel && e.code !== 'ERR_CANCELED') {
                    console.error(e)
                    setEventsError(e.message);
                }
            } finally {
                toggleEventsLoading(false);
            }
        }

        if (url) {
            void getEvent();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {events, eventsError, eventsLoading}
};

export default useGetEvents;