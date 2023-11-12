import './EventMultimediaDelete.css';
import Button from "../../components/Button.jsx";
import useGetData from "../../hooks/useGetData.js";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

function EventMultimediaDelete() {
    const {t} = useParams();
    const {tid} = useParams();
    const {eid} = useParams();
    const {id} = useParams();
    const url = (t === 'person') ? `http://localhost:8080/events/${eid}/multimedias/${id}`
        : `http://localhost:8080/multimedias/${id}`;
    const {data, dataError} = useGetData(url);
    const {error, setError} = useState("");
    const navigate = useNavigate();
    const controller = new AbortController();
    const goBack = "`/eventMultimedias/${tid}/${tid}/${e.id}`";

    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axios.delete(`http://localhost:8080//events/${eid}/multimedias/${id}`,
                {});
            console.log(response.data);
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
            {t && tid && eid && id && data?.id ?
                <main>
                    <form className="event-multimedia-delete-form">
                        <label htmlFor="description-field">
                            Omschrijving:
                            <input
                                type=" text"
                                id="description-field"
                                value={data.description}
                            />
                        </label>
                        <label htmlFor="filename-field">
                            Bestandsnaam:
                            <input
                                type=" text"
                                id="filename-field"
                                value={data.filename}
                            />
                        </label>
                        <Button type="button" onClick={deleteData}>
                            Verwijderen
                        </Button>
                        <Button type="button" variant="cancel"
                                onClick={() => navigate(goBack)}> Annuleren
                        < /Button>
                    </form>
                </main>
                : <p>Loading...</p>
            }
            {dataError && <p>Er is iets misgegaan bij het opslaan van de gegevens:{dataError}</p>}
            {error && <p>{error}</p>}
        </>
    );
}

export default EventMultimediaDelete;