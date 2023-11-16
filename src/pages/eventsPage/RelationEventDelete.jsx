import './RelationEventDelete.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import Button from "../../components/Button.jsx";
import {useState} from "react";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetEvent from "../../hooks/useGetEvent.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";

function RelationEventDelete() {
    const {pid, rid, sid, id} = useParams();
    const urlGoBack = `/relationEvents/${pid}/${rid}/${sid}`;
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouse = `http://localhost:8080/persons/${sid}`;
    const urlEvent = `http://localhost:8080/relations/${rid}/events/${id}`;
    console.log("urlPerson", urlPerson)
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    console.log("urlSpouse", urlSpouse)
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    console.log("urlEvent", urlEvent)
    const {event, eventError, eventLoading} = useGetEvent(urlEvent);
    const navigate = useNavigate();
    const controller = new AbortController();
    const [response, setResponse] = useState([]);
    const [error, setError] = useState("");

    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axios.delete(urlEvent, {});
            setResponse(response.data);
        } catch (e) {
            setError(e.message);
        }
        navigate(urlGoBack)

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            <main>
                {person?.id && spouse?.id && <h2>Gebeurtenis
                    van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname} verwijderen</h2>}
                {person && sid === "null" &&
                    <h2>Gebeurtenis van {person.givenNames} {person.surname} verwijderen</h2>}
                {event?.id &&
                    <form className="person-event-delete-form">
                        <label htmlFor="event-type-field">
                            Eventtype:
                            <select
                                id="event-type-field"
                                disabled
                                value={event.eventType}
                            >
                                <option value="MARRIAGE">Huwelijk</option>
                                <option value="DIVORCE">Scheiding</option>
                                <option value="MIGRATION">Migratie</option>
                                <option value="CELEBRATION">Viering</option>
                                <option value="OTHERS">Anders</option>
                            </select>
                        </label>
                        <label htmlFor=" description-field">
                            Omschrijving:
                            <input
                                type=" text"
                                id="description-field"
                                disabled
                                placeholder={event.description}
                            />
                        </label>
                        <label htmlFor=" text-field">
                            Tekst:
                            <textarea
                                id="text-field"
                                disabled
                                value={event.text}
                            >
                    </textarea>
                        </label>
                        <label htmlFor="beginDate-field">
                            Begindatum:
                            <input
                                type="date"
                                id=" beginDate-field"
                                disabled
                                value={event.beginDate.substring(0, 10)}
                            />
                        </label>
                        <label htmlFor=" endDate-field">
                            Einddatum:
                            <input
                                type="date"
                                id=" endDate-field"
                                disabled
                                value={event.endDate.substring(0, 10)}
                            />
                        </label>
                        <Button type="button" onClick={deleteData}>
                            Verwijderen
                        </Button>
                        <Button type="button" variant="cancel"
                                onClick={() => navigate(urlGoBack)}>Annuleren</Button>
                    </form>
                }
            </main>
            {(personLoading || spouseLoading || eventLoading) && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
            {eventError && <p>{eventError}</p>}
            {error && <p>{error}</p>}
            {response && <p>{response}</p>}
        </>
    );
}

export default RelationEventDelete;