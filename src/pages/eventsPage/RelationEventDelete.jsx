import './RelationEventDelete.css';
import {useParams} from 'react-router-dom';
import RelationEventForm from "./RelationEventForm.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetEvent from "../../hooks/useGetEvent.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";

function RelationEventDelete() {
    const {pid, rid, sid, id} = useParams();
    const urlPerson = `/persons/${pid}`;
    const urlSpouse = `/persons/${sid}`;
    const urlEvent = `/relations/${rid}/events/${id}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const {event, eventError, eventLoading} = useGetEvent(urlEvent);

    return (
        <main>
            {person?.id && spouse?.id && <h2>Gebeurtenis
                van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname} verwijderen</h2>}
            {person && sid === "null" &&
                <h2>Gebeurtenis van {person.givenNames} {person.surname} verwijderen</h2>}
            {event?.id && spouse?.id &&
                <RelationEventForm
                    method="delete"
                    preloadedValues={event}
                    pid={pid}
                    rid={rid}
                    sid={sid}
                    id={id}
                />
            }
            {(personLoading || spouseLoading || eventLoading) && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
            {eventError && <p>{eventError}</p>}
        </main>
    );
}

export default RelationEventDelete;