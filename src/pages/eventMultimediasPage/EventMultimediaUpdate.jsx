import './EventMultimediaUpdate.css';
import {useParams} from "react-router-dom";
import EventMultimediaForm from "./EventMultimediaForm.jsx";
import useGetData from "../../hooks/useGetData.js";

function EventMultimediaUpdate() {
    const {t} = useParams();
    const {tid} = useParams();
    const {eid} = useParams();
    const {id} = useParams();
    const {data, dataError} = useGetData(`http://localhost:8080/events/${eid}/multimedias/${id}`)
    // const {data, dataError} = useGetData(`http://localhost:8080/multimedias/${id}`)

    return (
        <main>
            {data?.id && <p>{data.description} | {data.filename} | {data.eventId}</p>}
            <h2>Multimedia wijzigen</h2>
            {t && tid && eid && id && data?.id &&
                <EventMultimediaForm
                    preloadedValues={data}
                    t={t}
                    tid={tid}
                    eid={eid}
                    id={id}
                />
            }
            {
                dataError && <p>{dataError}</p>
            }
        </main>
    )
        ;
}

export default EventMultimediaUpdate;