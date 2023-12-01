import './PersonDelete.css';
import {axiosAuth} from "../../helpers/axiosAuth.js";
import {useNavigate, useParams} from 'react-router-dom';
import Button from "../../components/Button.jsx";
import {useState} from "react";
import useGetPerson from "../../hooks/useGetPerson.js";

function PersonDelete() {
    const {id} = useParams();
    const urlGoBack = "/persons";
    const [response, setResponse] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const controller = new AbortController();

    const {person, personError} = useGetPerson(`/persons/${id}`);

    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axiosAuth.delete(`/persons/${id}`,
                {signal: controller.signal});
            setResponse(response.data);
        } catch (e) {
            setError(e.message);
        }
        navigate(urlGoBack);

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            {person?.id ?
                <main>
                    <h2>Persoon verwijderen</h2>
                    <form className="person-delete-form">
                        <label htmlFor="givenNames-field">
                            Voornamen:
                            <input
                                type="text"
                                id="givenNames-field"
                                disabled
                                value={person.givenNames}
                            />
                        </label>
                        <label htmlFor="surname-field">
                            Achternaam:
                            <input
                                type="text"
                                id="surname-field"
                                disabled
                                value={person.surname}
                            />
                        </label>
                        <label htmlFor="sex-field">
                            Geslacht:
                            <select
                                id="sex-field"
                                value={person.sex}
                                disabled
                            >
                                <option value="M">Man</option>
                                <option value="F">Vrouw</option>
                                <option value="X">Onbekend</option>
                            </select>
                        </label>
                        <Button type="button" onClick={deleteData}>
                            Verwijderen
                        </Button>
                        <Button type="button" variant="cancel"
                                onClick={() => navigate(urlGoBack)}>Annuleren</Button>
                    </form>
                </main>
                : <p> Loading...</p>
            }
            {personError && <p>{personError}</p>}
            {error && <p>{error}</p>}
            {response && <p>{response}</p>}
        </>
    );
}

export default PersonDelete;