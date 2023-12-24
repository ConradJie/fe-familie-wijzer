import './EventMultimediaUpdate.css';
import {useParams} from "react-router-dom";
import EventMultimediaForm from "./EventMultimediaForm.jsx";
import useGetData from "../../hooks/useGetData.js";

function EventMultimediaUpdate() {
    const {t, pid, eid, id,rid,sid} = useParams();
    const {data, dataError} = useGetData(`/events/${eid}/multimedias/${id}`)

    return (
        <main>
            <h2>Foto / document / audio / film koppelen aan gebeurtenis</h2>
            {data?.id &&
                <EventMultimediaForm
                    t={t}
                    pid={pid}
                    eid={eid}
                    id={id}
                    rid={rid}
                    sid={sid}
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