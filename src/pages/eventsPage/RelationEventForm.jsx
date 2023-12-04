import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import Button from "../../components/Button.jsx";
import translate from "../../helpers/translate.js";
import InputForm from "../../components/InputForm.jsx";

function RelationEventForm({pid, rid, sid, id, method, preloadedValues}) {
    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues
    } = useForm(
        {defaultValues: preloadedValues}
    );
    const urlGoBack = `/relationEvents/${pid}/${rid}/${sid}`;
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const navigate = useNavigate();
    const controller = new AbortController();

    function isValidBeginDate(date) {
        return date <= getValues("endDate")
    }

    function isValidEndDate(date) {
        return getValues("beginDate") <= date
    }

    async function onSubmit(data) {
        let processed = true;
        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            const url = (method === 'post') ? `/relations/${rid}/events` : `/relations/${rid}/events/${id}`;
            const response = await axiosAuth({
                method: `${method}`,
                url: `${url}`,
                data: (method === 'delete') ? {} :
                    {
                        eventType: data.eventType,
                        description: data.description,
                        text: data.text,
                        beginDate: data.beginDate,
                        endDate: data.endDate
                    },
                signal: controller.signal
            });
            console.log(response)
        } catch (e) {
            processed = false;
            if (e.response?.data) {
                setError(translate(e.response.data));
            } else {
                setError(translate(e.message));
            }
        } finally {
            toggleSending(false);
        }
        if (processed) {
            navigate(urlGoBack);
        }

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <main>
            <form className="person-event-form" onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    type="select"
                    name="eventType"
                    label="Type gebeurtenis:"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht"
                    }}
                    required
                >
                    <option value="MARRIAGE">Huwelijk</option>
                    <option value="DIVORCE">Scheiding</option>
                    <option value="MIGRATION">Migratie</option>
                    <option value="CELEBRATION">Viering</option>
                    <option value="OTHERS">Anders</option>
                </InputForm>
                <InputForm
                    type="text"
                    name="description"
                    label="Omschrijving:"
                    maxLength="1024"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht",
                        pattern: {
                            value: /[a-zA-Z0-9]+/,
                            message: "De omschrijving moet letters of cijfers bevatten",
                        },
                    }}
                    required
                />
                <InputForm
                    type="textarea"
                    name="text"
                    label="Tekst:"
                    rows="5"
                    maxLength="10240"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                />
                <InputForm
                    type="date"
                    name="beginDate"
                    label="Begindatum:"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: {
                            value: true,
                            message: "Dit veld is verplicht"
                        },
                        validate: (value) => isValidBeginDate(value) || 'Begindatum komt na einddatum',
                    }}
                    required
                />
                <InputForm
                    type="date"
                    name="endDate"
                    label="Einddatum:"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: {
                            value: true,
                            message: "Dit veld is verplicht"
                        },
                        validate: (value) => isValidEndDate(value) || 'Einddatum komt voor einddatum',
                    }}
                    required
                />
                <Button type=" submit" onClick={handleSubmit}>
                    {method === "delete" ? "Verwijderen" : "Opslaan"}
                </Button>
                <Button type=" button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(urlGoBack);
                }}>Annuleren</Button>
            </form>
            {sending && <p>Sending...</p>}
            {error && <p>{error}</p>}
        </main>
    )
}

export default RelationEventForm;