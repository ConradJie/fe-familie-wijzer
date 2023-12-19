import './EventMultimediaUpdate.css';
import {useParams} from "react-router-dom";
import EventMultimediaForm from "./EventMultimediaForm.jsx";
import useGetData from "../../hooks/useGetData.js";

function EventMultimediaUpdate() {
    const {t, tid, eid, id} = useParams();

    const {data, dataError} = useGetData(`/events/${eid}/multimedias/${id}`)

    return (
        <main>
            <h2>Foto / document / audio koppelen aan gebeurtenis</h2>
            {data?.id &&
                <EventMultimediaForm
                    t={t}
                    tid={tid}
                    eid={eid}
                    id={id}
                    method="put"
                    description={data.description}
                    filename={data.filename}
                />
            }
            {dataError && <p>{dataError}</p>}
        </main>
    );
}

export default EventMultimediaUpdate;