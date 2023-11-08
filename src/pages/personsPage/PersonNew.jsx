import './PersonNew.css';
import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";

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
    const [loading, toggleLoading] = useState(false);

    async function onSubmit(data) {
        toggleLoading(false);
        try {
            setError("");
            toggleLoading(true);
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
            toggleLoading(false);
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
                    {errors.givenNames && <p>{errors.givenNames.message}</p>}
                </label>
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
                <button type="submit" onClick={handleSubmit}>Opslaan</button>
            </form>
            {error &&
                <p>Er is iets misgegaan bij het opslaan van de gegevens:{error}</p>}
            {loading && <p>Loading...</p>}
        </main>
    );
}

export default PersonNew;