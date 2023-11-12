import './EventMultimediaNew.css';
import {useParams} from "react-router-dom";
import EventMultimediaForm from "./EventMultimediaForm.jsx";

function EventMultimediaNew() {
    const {t} = useParams();
    const {tid} = useParams();
    const {eid} = useParams();
    return (
        <main>
            <h2>Multimedia toevoegen</h2>
            <p>{t}Id: {tid} eid:{eid}</p>
            {t && tid && eid &&
                <EventMultimediaForm
                    t={t}
                    tid={tid}
                    eid={eid}
                    id={null}
                    method="post"
                    preloadedValues={{
                        description: "desc..",
                        filename: "file..",
                        eventId: {eid}
                    }}
                />
            }
        </main>
    );
}

export default EventMultimediaNew;