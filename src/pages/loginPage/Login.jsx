import './Login.css';
import {useForm} from "react-hook-form";
import {useState} from "react";
import Button from "../../components/Button.jsx";
import axios from "axios";
import translate from "../../helpers/translate.js";
import {useNavigate} from "react-router-dom";
import {axiosAuth} from "../../helpers/axiosAuth.js";


function Login() {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

    const navigate = useNavigate();
    const urlHomePage = "/persons";
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const controller = new AbortController();

    async function onSubmit(data) {
        let processed = true;
        let response = "";
        try {
            setError("");
            toggleSending(true);
            response = await axiosAuth.post("/authenticate",
                {
                    signal: controller.signal,
                    username: data['user-name'],
                    password: data.password
                });
            localStorage.setItem('token',response.data.jwt);
            await getAuthorities(data['user-name'], response.data.jwt)
        } catch (e) {
            processed = false;
            setError(translate(e.response.data));
        } finally {
            toggleSending(false);
        }

        if (processed) {
            navigate(urlHomePage);
        }

        return function cleanup() {
            controller.abort();
        }
    }

    async function getAuthorities(username, token) {
        let processed = true;
        let response = "";
        try {
            setError("");
            toggleSending(true);
            axiosAuth.defaults.headers = {'Authorization': `Bearer ${token}`};
            response = await axiosAuth.get(`/users/${username}/authorities`, {
                signal: controller.signal
            });
            localStorage.setItem('role', response.data[0].authority.substring(5));
        } catch (e) {
            processed = false;
            console.error(e);
            console.error(e.config.headers);
            if (e?.message) {
                setError(e.message);
            } else {
                setError(translate(e.response.data));
            }
        } finally {
            toggleSending(false);
        }

        if (processed) {
            navigate(urlHomePage);
        }

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <main className="inner-content-container section-login">
            <h2>Inloggen</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="user-name-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="user-name-field"
                        {...register("user-name", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                    {errors.userName && <p>{errors.userName.message}</p>}
                </label>
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        {...register("password", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                </label>
                <Button type="submit" onClick={handleSubmit}>Inloggen</Button>
                <Button type="button" variant="cancel" onClick={() => navigate("/")}>Annuleren</Button>
            </form>
            {sending && <p>Sending...</p>}
            {error && <p>error</p>}
        </main>
    )
}

export default Login;