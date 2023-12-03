import './UserNew.css';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Button from "../../components/Button.jsx";
import InputForm from "../../components/InputForm.jsx";
import translate from "../../helpers/translate.js";
import {axiosAuth} from "../../helpers/axiosAuth.js";

function UserForm({method, username, preloadedValues}) {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        defaultValues: preloadedValues
    });
    const urlGoBack = "/users";
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const controller = new AbortController();

    async function onSubmit(data) {
        let processed = true;
        try {
            setError("");
            toggleSending(true);
            const url = (method === 'post') ? `/users` : `/users/${username}`;
            const response = await axiosAuth({
                method: `${method}`,
                url: `${url}`,
                data: (method === 'delete') ? {} :
                    {
                        username: `${data.username}`,
                        password: `${data.password}`,
                        email: `${data.email}`,
                        enabled: false,
                        apikey: null
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
        <section>
            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    type="text"
                    name="username"
                    label="Gebruikersnaam:"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht"
                    }}
                    required
                />
                <InputForm
                    type="text"
                    name="password"
                    label="Wachtwoord:"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht"
                    }}
                    required
                />
                <InputForm
                    type="text"
                    name="email"
                    label="E-mail:"
                    disabled={method === 'delete'}
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Dit veld is verplicht",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Het e-mailadres klopt niet"
                        }
                    }}
                    required
                />
                <Button type="submit" onClick={handleSubmit}>{method === "delete" ? "Verwijderen" : "Opslaan"}</Button>
                <Button type="button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(urlGoBack)
                }}>Annuleren</Button>
            </form>
            {sending && <p>Sending...</p>}
            {error && <p>{error}</p>}
        </section>
    );
}

export default UserForm;