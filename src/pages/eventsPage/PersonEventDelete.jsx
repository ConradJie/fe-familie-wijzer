import './PersonEventDelete.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import Button from "../../components/Button.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";
import {useState} from "react";
import useGetEvent from "../../hooks/useGetEvent.js";

function PersonEventDelete() {
    const {pid} = useParams();
    const {id} = useParams();
    const navigate = useNavigate();
    const controller = new AbortController();
    const [response, setResponse] = useState([]);
    const [error, setError] = useState("");
    const {person, personError} = useGetPerson(`http://localhost:8080/persons/${pid}`);
    const {event, eventError} = useGetEvent(`http://localhost:8080/persons/${pid}/events/${id}`);

    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axios.delete(`http://localhost:8080/persons/${pid}/events/${id}`,
                {});
            setResponse(response.data);
        } catch (e) {
            setError(e.message);
        }
        navigate("/persons")

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            {event?.id ?
                <main>
                    {person && <h2>Gebeurtenis van {person.givenNames} {person.surname} verwijderen</h2>}
                    <form className="person-event-delete-form">
                        <label htmlFor="event-type-field">
                            Eventtype:
                            <select
                                id="event-type-field"
                                disabled
                                value={event.eventType}
                            >
                                <option value="BIRTH">Geboorte</option>
                                <option value="DEATH">Gestorven</option>
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
                                onClick={() => navigate(`/personEvents/${id}`)}>Annuleren</Button>
                    </form>
                </main>
                :
                <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {eventError && <p>{eventError}</p>}
            {error && <p>{error}</p>}
            {response && <p>{response}</p>}
        </>
    );
}

export default PersonEventDelete;