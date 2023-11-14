import './RelationDelete.css';
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import Button from "../../components/Button.jsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";

function RelationDelete() {
    const {pid, rid, sid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlGoBack = `/relations/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const [sending, toggleSending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    async function handleSubmit() {
        try {
            toggleSending(true);
            setError("");
            const urlDelete = `http://localhost:8080/relations/${rid}`;
            const response = await axios.delete(urlDelete, {});
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
        navigate(urlGoBack);
    }

    return (
        <main className="main-relation-delete">
            {person && <h2>Relatie van {person.givenNames} {person.surname} verwijderen</h2>}
            <input type="text" id="spouse" disabled value={sid === null ? "-" : sid}/>
            <Button type="button" onClick={handleSubmit}>Verwijderen</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {sending && <p>Sending...</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default RelationDelete;