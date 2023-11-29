import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetEvent = (url) => {

    const [event, setEvent] = useState([]);
    const [eventError, setEventError] = useState("");
    const [eventLoading, toggleEventLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function getEvent() {
            const token = localStorage.getItem('token');
            try {
                setEventError("");
                const response = await axios.get(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                //For dates, useForm.defaultValues only accepts the YYYY-MM-DD format!!
                response.data.beginDate = response.data.beginDate.substring(0, 10);
                response.data.endDate = response.data.endDate.substring(0, 10);
                setEvent(response.data);
            } catch (e) {
                console.error(e)
                if (!axios.isCancel) {
                    setEventError(e.message);
                }
            } finally {
                toggleEventLoading(false);
            }
        }

        void getEvent();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return {event, eventError, eventLoading}
};

export default useGetEvent;