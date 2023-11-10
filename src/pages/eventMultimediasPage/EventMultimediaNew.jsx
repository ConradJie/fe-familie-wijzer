import './EventMultimediaNew.css';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Button from "../../components/Button.jsx";

function EventMultimediaNew() {
    const {t} = useParams();
    const {tid} = useParams();
    const {id} = useParams();
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm(
        // {defaultValues: preloadedValues}
    );
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(data) {
        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            const response = await axios.post(`http://localhost:8080/events/${id}/multimedias`,
                {
                    eventId: id,
                    description: data.description,
                    filename: data.filename
                });
        } catch (e) {
            if (axios.isCancel) {
                console.error("Request is canceled");
                setError(e.message);
            } else {
                setError(e.message);
                console.error(e);
            }
        } finally {
            toggleSending(false);
        }
        navigate(`/eventMultimedias/${t}/${tid}/${id}`);
    }

    return (
        <main>
            <h2>Multimedia toevoegen</h2>
            <form className="new-multimedia-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="description-field">
                    Omschrijving:
                    <input
                        type=" text"
                        id="description-field"
                        {...register("description", {
                            required: " Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.description && <p>{errors.description.message}</p>}
                <label htmlFor="filename-field">
                    Bestandsnaam:
                    <input
                        type=" text"
                        id="filename-field"
                        {...register("filename", {
                            required: " Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.filename && <p>{errors.filename.message}</p>}

                {sending && <p>sending...</p>}
                <Button type="submit" onClick={handleSubmit}>Opslaan</Button>
                <Button type="button" variant="cancel" onClick={() => {
                    navigate(`/eventMultimedias/${t}/${tid}/${id}`)
                }}>Annuleren</Button>
            </form>
            {error &&
                <p>Er is iets misgegaan bij het opslaan van de gegevens:{error}</p>}
            {error && <p>Er is iets misgegaan bij het ophalen van persoonsgegevens: {error}</p>}
        </main>
    )
}

export default EventMultimediaNew;