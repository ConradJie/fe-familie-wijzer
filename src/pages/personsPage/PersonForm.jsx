import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
import Button from "../../components/Button.jsx";

function PersonForm({id, preloadedValues}) {
    const preloadedValuesObject = {
        givenNames: preloadedValues.givenNames,
        surname: preloadedValues.surname,
        sex: preloadedValues.sex
    };

    console.log(preloadedValues);
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        defaultValues: preloadedValuesObject

        // defaultValues: {
        //     givenNames : preloadedValues.givenNames,
        //     surname : preloadedValues.surname,
        //     sex : preloadedValues.sex
        // }
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    async function onSubmit(data) {
        toggleLoading(false);
        try {
            setError("");
            toggleLoading(true);
            const response = await axios.put(`http://localhost:8080/persons/${id}`,
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
        <section>
            <form className="new-person-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="Voornamen-field">
                    Voornamen:
                    <input
                        type="text"
                        id="givenNames-field"
                        name="givenNames"
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
                        name="surname"
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
                        name="sex"
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
            {loading && <p>Loading...</p>}
        </section>
    );
}

export default PersonForm;