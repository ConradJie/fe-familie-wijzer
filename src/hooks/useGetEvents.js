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
                setEventsError("");
                const token=localStorage.getItem('token');
                axiosAuth.defaults.headers = {'Authorization': `Bearer ${token}`};
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setEvents(response.data);
            } catch (e) {
                console.error(e)
                if (!axiosAuth.isCancel && e.message !== 'canceled') {
                    setEventsError(e.message);
                }
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