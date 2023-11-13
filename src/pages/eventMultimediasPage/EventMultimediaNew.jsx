import './EventMultimediaNew.css';
import {useParams} from "react-router-dom";
import EventMultimediaForm from "./EventMultimediaForm.jsx";

function EventMultimediaNew() {
    const {t, tid, eid} = useParams();
    return (
        <main>
            <h2>Multimedia toevoegen</h2>
            <EventMultimediaForm
                t={t}
                tid={tid}
                eid={eid}
                id={null}
                method="post"
                preloadedValues={{
                    eventId: `${eid}`
                }}
            />
        </main>
    );
}

export default EventMultimediaNew;