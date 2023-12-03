import './PersonEventDelete.css';
import {useParams} from "react-router-dom";
import PersonEventForm from "./PersonEventForm.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetEvent from "../../hooks/useGetEvent.js";

function PersonEventDelete() {
    const {pid, id} = useParams();
    const {person, personError, personLoading} = useGetPerson(`/persons/${pid}`);
    const {event, eventError, eventLoading} = useGetEvent(`/persons/${pid}/events/${id}`);

    return (
        <main>
            {person?.id && <h2>Gebeurtenis van {person.givenNames} {person.surname} verwijderen</h2>}
            {event?.id &&
                <PersonEventForm
                    method="delete"
                    preloadedValues={event}
                    pid={pid}
                    id={id}
                />
            }
            {(personLoading || eventLoading) && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {eventError && <p>{eventError}</p>}
        </main>
    );
}

export default PersonEventDelete;