import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import Button from "../../components/Button.jsx";
import translate from "../../helpers/translate.js";

function PersonEventForm({pid, id, method, preloadedValues}) {
    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues
    } = useForm(
        {defaultValues: preloadedValues}
    );
    const urlGoBack = `/personEvents/${pid}`;
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const navigate = useNavigate();
    const controller = new AbortController();
    let processed = true;

    function isValidBeginDate(date) {
        return date <= getValues("endDate")
    }

    function isValidEndDate(date) {
        return getValues("beginDate") <= date
    }

    async function onSubmit(data) {
        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            let response = null;
            processed = true;
            switch (method) {
                case "post":
                    response = await axiosAuth.post(`/persons/${pid}/events`,
                        {
                            eventType: data.eventType,
                            description: data.description,
                            text: data.text,
                            beginDate: data.beginDate,
                            endDate: data.endDate
                        },
                        {signal: controller.signal});
                    break;
                case "put":
                    response = await axiosAuth.put(`/persons/${pid}/events/${id}`,
                        {
                            eventType: data.eventType,
                            description: data.description,
                            text: data.text,
                            beginDate: data.beginDate,
                            endDate: data.endDate
                        },
                        {signal: controller.signal});
                    break;
            }
        } catch (e) {
            processed = false;
            setError(translate(e.response.data));
        } finally {
            toggleSending(false);
        }
        if (processed) {
            navigate(urlGoBack);
        }
    }

    return (
        <main>
            <form className="person-event-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="event-type-field">
                    Type gebeurtenis:
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
                            required: "Dit veld is verplicht",
                            pattern: {
                                value: /[a-zA-Z0-9]+/,
                                message: "De omschrijving moet letters of cijfers bevatten",
                            },
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
                            required: {
                                value: true,
                                message: " Dit veld is verplicht",
                            },
                            validate: (value) => isValidBeginDate(value) || 'Begindatum komt na einddatum',
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
                            required: {
                                value: true,
                                message: " Dit veld is verplicht",
                            },
                            validate: (value) => isValidEndDate(value) || 'Einddatum komt voor einddatum',
                        })}
                    />
                </label>
                {errors.endDate && <p>{errors.endDate.message}</p>}
                {sending && <p>Sending...</p>}
                <Button type=" submit" onClick={handleSubmit}>Opslaan</Button>
                <Button type=" button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(urlGoBack)
                }}>Annuleren</Button>
            </form>
            {error && <p>{error}</p>}
            {sending && <p>Sending...</p>}
        </main>
    )
}

export default PersonEventForm;