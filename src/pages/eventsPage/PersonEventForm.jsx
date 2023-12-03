import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import Button from "../../components/Button.jsx";
import translate from "../../helpers/translate.js";
import InputForm from "../../components/InputForm.jsx";

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
            const url = (method === 'post') ? `/persons/${pid}/events` : `/persons/${pid}/events/${id}`;
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
                    }
            });
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
                    <option value="BIRTH">Geboorte</option>
                    <option value="DEATH">Gestorven</option>
                    <option value="MIGRATION">Migratie</option>
                    <option value="CELEBRATION">Viering</option>
                    <option value="OTHERS">Anders</option>
                </InputForm>
                    <InputForm
                        type="text"
                        name="description"
                        label="Omschrijving:"
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
                    type="area"
                    name="text"
                    label="Tekst:"
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