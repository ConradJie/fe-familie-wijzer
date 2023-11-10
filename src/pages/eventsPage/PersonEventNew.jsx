import './PersonEventNew.css';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import Button from "../../components/Button.jsx";

function PersonEventNew() {
    const {id} = useParams();
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm(
        // {defaultValues: preloadedValues}
    );
    const [personData, setPersonData] = useState([]);
    const [errorPerson, setErrorPerson] = useState("");
    const [loadingPerson, toggleLoadingPerson] = useState(false);
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        async function getPersonData() {
            try {
                setErrorPerson("");
                toggleLoadingPerson(true);
                const response = await axios.get(`http://localhost:8080/persons/${id}`,
                    {});
                setPersonData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setErrorPerson(e.message);
                } else {
                    setErrorPerson(e.message);
                }
            } finally {
                toggleLoadingPerson(false);
            }
        }

        void getPersonData();

        return function cleanup() {
            controller.abort();
        }

    }, [id]);

    async function onSubmit(data) {
        data.preventDefault();

        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            const response = await axios.post(`http://localhost:8080/persons/${id}/events`,
                {
                    eventType: data.eventType,
                    description: data.description,
                    text: data.text,
                    beginDate: data.beginDate,
                    endDate: data.endDate
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
        navigate(`/personEvents/${id}`);
    }

    return (
        <main>
            {personData && <h2>Gebeurtenis van {personData.givenNames} {personData.surname} toevoegen</h2>}
            <form className="new-person-form" onSubmit={handleSubmit(onSubmit)}>
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
                {loadingPerson && <p>Loading...</p>}
                <Button type=" submit" onClick={handleSubmit}>Opslaan</Button>
                <Button type=" button" variant="cancel" onClick={() => {
                    navigate(`/personEvents/${id}`)
                }}>Annuleren</Button>
            </form>
            {error &&
                <p>Er is iets misgegaan bij het opslaan van de gegevens:{error}</p>}
            {errorPerson && <p>Er is iets misgegaan bij het ophalen van persoonsgegevens: {errorPerson}</p>}
            {loadingPerson && <p>Loading...</p>}
        </main>
    )
}

export default PersonEventNew;