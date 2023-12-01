import './PersonEventDelete.css';
import {useNavigate, useParams} from 'react-router-dom';
import Button from "../../components/Button.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";
import {useState} from "react";
import useGetEvent from "../../hooks/useGetEvent.js";
import {axiosAuth} from "../../helpers/axiosAuth.js";

function PersonEventDelete() {
    const {pid, id} = useParams();
    const urlGoBack = `/personEvents/${pid}`;
    const navigate = useNavigate();
    const controller = new AbortController();
    const [response, setResponse] = useState([]);
    const [error, setError] = useState("");
    const {person, personError} = useGetPerson(`/persons/${pid}`);
    const {event, eventError} = useGetEvent(`/persons/${pid}/events/${id}`);

    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axiosAuth.delete(`/persons/${pid}/events/${id}`,
                {signal: controller.signal});
            setResponse(response.data);
        } catch (e) {
            setError(e.message);
        }
        navigate(urlGoBack);

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
                            Type gebeurtenis:
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
                                onClick={() => navigate(urlGoBack)}>Annuleren</Button>
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