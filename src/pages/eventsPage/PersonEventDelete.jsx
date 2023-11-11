import './PersonEventDelete.css';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";

function PersonEventDelete() {
    let {pid} = useParams();
    let {id} = useParams();
    const [personData, setPersonData] = useState([]);
    const [data, setData] = useState([]);
    const [personError, setPersonError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const controller = new AbortController();

    useEffect(() => {
        async function getPersonData() {
            try {
                setPersonError("");
                const response = await axios.get(`http://localhost:8080/persons/${pid}`,
                    {});
                setPersonData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setPersonError(e.message);
                } else {
                    setPersonError(e.message);
                }
            }
        }

        async function getData() {
            try {
                setError("");
                const response = await axios.get(`http://localhost:8080/persons/${pid}/events/${id}`,
                    {});
                setData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setError(e.message);
                } else {
                    setError(e.message);
                }
            }
        }

        void getPersonData();
        void getData();

    }, [pid, id]);

    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axios.delete(`http://localhost:8080/persons/${pid}/events/${id}`,
                {});
            setData(response.data);
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
            {data?.id ?
                <main>
                    {personData && <h2>Gebeurtenis van {personData.givenNames} {personData.surname} verwijderen</h2>}
                    <form className="person-event-delete-form">
                        <label htmlFor="event-type-field">
                            Eventtype:
                            <select
                                id="event-type-field"
                                disabled
                                value={data.eventType}
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
                                placeholder={data.description}
                            />
                        </label>
                        <label htmlFor=" text-field">
                            Tekst:
                            <textarea
                                id="text-field"
                                disabled
                                value={data.text}
                            >
                    </textarea>
                        </label>
                        <label htmlFor="beginDate-field">
                            Begindatum:
                            <input
                                type="date"
                                id=" beginDate-field"
                                disabled
                                value={data.beginDate.substring(0,10)}
                            />
                        </label>
                        <label htmlFor=" endDate-field">
                            Einddatum:
                            <input
                                type="date"
                                id=" endDate-field"
                                disabled
                                value={data.endDate.substring(0,10)}
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
            {error && <p>{error}</p>}
        </>
    );
}

export default PersonEventDelete;