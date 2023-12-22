import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import InputForm from "../../components/InputForm.jsx";
import Button from "../../components/Button.jsx";
import translate from "../../helpers/translate.js";
import {axiosAuth} from "../../helpers/axiosAuth.js";

function PersonForm({pid, method, preloadedValues}) {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        defaultValues: preloadedValues
    });
    const urlGoBack = "/persons";
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const controller = new AbortController();

    async function onSubmit(data) {
        let processed = true;
        toggleLoading(false);
        try {
            setError("");
            toggleLoading(true);
            const url = (method === 'post') ? `/persons` : `/persons/${pid}`;
            const response = await axiosAuth({
                method: `${method}`,
                url: `${url}`,
                data: (method === 'delete') ? {} :
                    {
                        givenNames: `${data.givenNames}`,
                        surname: `${data.surname}`,
                        sex: `${data.sex}`
                    },
                signal: controller.signal
            });
        } catch (e) {
            processed = false;
            if (e.response?.data) {
                setError(translate(e.response.data));
            } else {
                setError(translate(e.message));
            }
        } finally {
            toggleLoading(false);
        }
        if (processed) {
            navigate(urlGoBack);
        }

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <section>
            <form className="person-form" onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    type="text"
                    name="givenNames"
                    label="Voornamen:"
                    maxLength="120"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht",
                        pattern: {
                            value: /(.|\s)*\S(.|\s)*/,
                            message: "Het veld moet leesbare karakters bevatten"
                        }
                    }}
                    required
                />
                <InputForm
                    type="text"
                    name="surname"
                    label="Achternaam:"
                    maxLength="120"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht",
                        pattern: {
                            value: /(.|\s)*\S(.|\s)*/,
                            message: "Het veld moet leesbare karakters bevatten"
                        }
                    }}
                    required
                />
                <InputForm
                    type="select"
                    name="sex"
                    label="Geslacht:"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht"
                    }}
                    required
                >
                    <option value="M">Man</option>
                    <option value="F">Vrouw</option>
                    <option value="X">Onbekend</option>
                </InputForm>

                <Button type="submit" onClick={handleSubmit}>
                    {method === "delete" ? "Verwijderen" : "Opslaan"}
                </Button>
                <Button type="button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(urlGoBack)
                }}>Annuleren</Button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </section>
    );
}

export default PersonForm;