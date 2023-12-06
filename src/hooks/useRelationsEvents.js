import {useState, useEffect} from 'react';
import {axiosAuth} from "../helpers/axiosAuth.js";

const useGetRelationsEvents = (url) => {

    const [relationsEvents, setRelationsEvents] = useState([]);
    const [relationsEventsError, setRelationsEventsError] = useState("");
    const [relationsEventsLoading, toggleRelationsEventsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function getEvent() {
            try {
                toggleRelationsEventsLoading(true);
                setRelationsEventsError('');
                const response = await axiosAuth.get(url, {
                    signal: controller.signal
                });
                setRelationsEvents(response.data);
            } catch (e) {
                if (!axiosAuth.isCancel && e.code !== 'ERR_CANCELED') {
                    console.error(e);
                    setRelationsEventsError(e.message);
                }
            } finally {
                toggleRelationsEventsLoading(false);
            }
        }

        if (url) {
            void getEvent();
        }

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {relationsEvents, relationsEventsError, relationsEventsLoading}
};

export default useGetRelationsEvents;