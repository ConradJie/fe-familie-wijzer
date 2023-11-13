import './EventMultimediaForm.css';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";

function EventMultimediaForm({t, tid, eid, id, method, preloadedValues}) {
    const urlGoBack = `/eventMultimedias/${t}/${tid}/${eid}`;
    const urlPost = `http://localhost:8080/events/${eid}/multimedias`;
    const urlPut = `http://localhost:8080/events/${eid}/multimedias/${id}`;
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm(
        {defaultValues: preloadedValues}
    );
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(data) {
        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            let response = null;
            console.log("method", method, urlPost);
            switch (method) {
                case "post":
                    response = await axios.post(urlPost,
                        {
                            eventId: data.eventId,
                            description: data.description,
                            filename: data.filename
                        });
                    break;
                case "put":
                    response = await axios.put(urlPut,
                        {
                            id: data.id,
                            eventId: data.eventId,
                            description: data.description,
                            filename: data.filename
                        });
                    break;
            }
        } catch (e) {
            console.log(e);
            if (axios.isCancel) {
                console.error("Request is canceled");
                setError(e.message);
                console.log(e.message);
            } else {
                setError(e.message);
                console.error(e);
            }
        } finally {
            toggleSending(false);
        }
        navigate(urlGoBack);
    }

    return (
        <main>
            <form className="event-multimedia-form" onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="button" variant="cancel" onClick={(e) => {
                    console.log("Van Update/delete terug naar Multimedia1:", urlGoBack);
                    e.preventDefault();
                    navigate(urlGoBack)
                }}>Annuleren</Button>
            </form>
            {error &&
                <p>Er is iets misgegaan bij het opslaan van de gegevens:{error}</p>}
            {error && <p>Er is iets misgegaan bij het ophalen van persoonsgegevens: {error}</p>}
        </main>
    )
}

export default EventMultimediaForm;
