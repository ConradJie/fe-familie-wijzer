import './UserNew.css';
import Button from "../../components/Button.jsx";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import translate from "../../helpers/translate.js";
import {axiosAuth} from "../../helpers/axiosAuth.js";

function UserNew() {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});
    const urlGoBack = "/users";
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
            const response = await axiosAuth.post("/users",
                {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    enabled: false,
                    apikey: null
                },
                {signal: controller.signal}
            )
        } catch (e) {
            processed = false;
            setError(translate(e.response.data));
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
        <main>
            <h2>Gebruiker toevoegen</h2>
            <form className="person-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </label>
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="text"
                        id="password-field"
                        {...register("password", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </label>
                <label htmlFor="email-field">
                    E-mail:
                    <input
                        type="text"
                        id="email-field"
                        {...register("email", {
                            required: "Dit veld is verplicht",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Het e-mailadres klopt niet",
                            },
                        })}
                    />
                </label>
                {errors.email && <p>{errors.email.message}</p>}
                <Button type="submit" onClick={handleSubmit}> Opslaan </Button>
                <Button type="button" variant="cancel" onClick={(e) => {
                    e.preventDefault();
                    navigate(urlGoBack)
                }}>Annuleren</Button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default UserNew;