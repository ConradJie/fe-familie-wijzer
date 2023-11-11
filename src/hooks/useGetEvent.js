import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetEvent = (url) => {

    const [event, setEvent] = useState([]);
    const [eventError, setEventError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function getEvent() {
            try {
                setEventError("");
                const response = await axios.get(url,{});
                //For dates, useForm.defaultValues only accepts the YYYY-MM-DD format!!
                response.data.beginDate = response.data.beginDate.substring(0,10);
                response.data.endDate = response.data.endDate.substring(0,10);
                setEvent(response.data);
            } catch(e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setEventError(e.message);
                } else {
                    setEventError(e.message);
                }
            }
        }
        void getEvent();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);
    return { event, eventError }
};

export default useGetEvent;