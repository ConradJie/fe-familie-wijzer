import './EventMultimediaNew.css';
import {useParams} from "react-router-dom";
import EventMultimediaForm from "./EventMultimediaForm.jsx";

function EventMultimediaNew() {
    const {t, pid, eid, rid, sid} = useParams();
    return (
        <main>
            <h2>Omschrijving foto / document / audio / film</h2>
            <EventMultimediaForm
                t={t}
                pid={pid}
                eid={eid}
                id={null}
                rid={rid}
                sid={sid}
                method={"post"}
                description={""}
                filename={""}
            />
        </main>
    );
}

export default EventMultimediaNew;