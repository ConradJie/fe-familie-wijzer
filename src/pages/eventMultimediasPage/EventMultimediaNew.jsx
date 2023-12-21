import './EventMultimediaNew.css';
import {useParams} from "react-router-dom";
import EventMultimediaForm from "./EventMultimediaForm.jsx";

function EventMultimediaNew() {
    const {t, tid, eid} = useParams();
    return (
        <main>
            <h2>Omschrijving foto / document / audio / film</h2>
            <EventMultimediaForm
                t={t}
                tid={tid}
                eid={eid}
                id={null}
                method={"post"}
                description={""}
                filename={""}
            />
        </main>
    );
}

export default EventMultimediaNew;