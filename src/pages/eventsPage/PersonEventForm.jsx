import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import Button from "../../components/Button.jsx";

function PersonEventForm({pid, id, method, preloadedValues}) {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm(
        {defaultValues : preloadedValues}
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
            switch (method) {
                case "post":
                    response = await axios.post(`http://localhost:8080/persons/${pid}/events`,
                        {
                            eventType: data.eventType,
                            description: data.description,
                            text: data.text,
                            beginDate: data.beginDate,
                            endDate: data.endDate
                        });
                    break;
                case "put":
                    response = await axios.put(`http://localhost:8080/persons/${pid}/events/${id}`,
                        {
                            eventType: data.eventType,
                            description: data.description,
                            text: data.text,
                            beginDate: data.beginDate,
                            endDate: data.endDate
                        });
                    break;
            }
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
        navigate(`/personEvents/${pid}`);
    }

    return (
        <main>
            <form className="person-event-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="event-type-field">
                    Eventtype:
                    <select
                        id="event-type-field"
                        {...register("eventType", {
                            required: "Dit veld is verplicht"
                        })}
                    >
                        <option value="BIRTH">Geboorte</option>
                        <option value="DEATH">Gestorven</option>
                        <option value="MIGRATION">Migratie</option>
                        <option value="CELEBRATION">Viering</option>
                        <option value="OTHERS">Anders</option>
                    </select>
                    {errors.eventType && <p>{errors.eventType.message}</p>}
                </label>
                <label htmlFor=" description-field">
                    Omschrijving:
                    <input
                        type=" text"
                        id="description-field"
                        {...register("description", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.description && <p>{errors.description.message}</p>}
                <label htmlFor=" text-field">
                    Tekst:
                    <textarea
                        id="text-field"
                        {...register("text")}
                    >
                    </textarea>
                    {errors.text && <p>{errors.text.message}</p>}
                </label>
                <label htmlFor="beginDate-field">
                    Begindatum:
                    <input
                        type="date"
                        id=" beginDate-field"
                        {...register("beginDate", {
                            required: " Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.beginDate && <p>{errors.beginDate.message}</p>}
                <label htmlFor=" endDate-field">
                    Einddatum:
                    <input
                        type="date"
                        id=" endDate-field"
                        {...register("endDate", {
                            required: " Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.endDate && <p>{errors.endDate.message}</p>}
                {sending && <p>Sending...</p>}
                <Button type=" submit" onClick={handleSubmit}>Opslaan</Button>
                <Button type=" button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/personEvents/${pid}`)
                }}>Annuleren</Button>
            </form>
            {error &&
                <p>Er is iets misgegaan bij het opslaan van de gegevens:{error}</p>}
            {error && <p>Er is iets misgegaan bij het versturen van gegevens: {error}</p>}
            {sending && <p>Sending...</p>}
        </main>
    )
}

export default PersonEventForm;