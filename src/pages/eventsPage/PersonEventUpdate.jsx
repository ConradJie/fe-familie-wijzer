import './PersonEventUpdate.css';
import {useParams} from 'react-router-dom';
import PersonEventForm from "./PersonEventForm.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetEvent from "../../hooks/useGetEvent.js";

function PersonEventUpdate() {
    const {pid,id} = useParams();
    const {person, personError} = useGetPerson(`http://localhost:8080/persons/${pid}`);
    const {event,eventError} = useGetEvent(`http://localhost:8080/persons/${pid}/events/${id}`);

    return (
        <main>
            {person?.id && <h2>Gebeurtenis van {person.givenNames} {person.surname} wijzigen</h2>}
            {event?.id ? <PersonEventForm
                    method="put"
                    preloadedValues={event}
                    pid={pid}
                    id={id}
                />
                : <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {eventError && <p>{eventError}</p>}
        </main>
    );
}

export default PersonEventUpdate;