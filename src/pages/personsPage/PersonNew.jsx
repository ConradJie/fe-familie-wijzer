import './PersonNew.css';
import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
import Button from "../../components/Button.jsx";

function PersonNew() {
    // const preloadedValues = {
    //     givenNames: "Aa",
    //     surname: "Bb",
    //     sex: "M"
    // };
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm(
        // {defaultValues: preloadedValues}
    );
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);

    async function onSubmit(data) {
        toggleSending(false);
        try {
            setError("");
            toggleSending(true);
            const response = await axios.post("http://localhost:8080/persons",
                {
                    givenNames: data.givenNames,
                    surname: data.surname,
                    sex: data.sex
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
        navigate("/persons");
    }

    return (
        <main>
            <h2>Nieuw</h2>
            <form className="new-person-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="Voornamen-field">
                    Voornamen:
                    <input
                        type="text"
                        id="givenNames-field"
                        {...register("givenNames", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.givenNames && <p>{errors.givenNames.message}</p>}
                <label htmlFor="surname-field">
                    Achternaam:
                    <input
                        type="text"
                        id="surname-field"
                        {...register("surname", {
                            required: "Dit veld is verplicht"
                        })}
                    />
                </label>
                {errors.surname && <p>{errors.surname.message}</p>}
                <label htmlFor="sex-field">
                    Geslacht:
                    <select
                        id="sex-field"
                        {...register("sex", {
                            required: "Dit veld is verplicht"

                        })}
                    >
                        <option value="M">Man</option>
                        <option value="F">Vrouw</option>
                        <option value="X">Onbekend</option>
                    </select>
                    {errors.sex && <p>{errors.sex.message}</p>}
                </label>
                <Button type="submit" onClick={handleSubmit}>Opslaan</Button>
                <Button type="button" variant="cancel" onClick={() => {
                    navigate("/persons")
                }}>Annuleren</Button>
            </form>
            {error &&
                <p>Er is iets misgegaan bij het opslaan van de gegevens:{error}</p>}
            {sending && <p>Saving...</p>}
        </main>
    );
}

export default PersonNew;