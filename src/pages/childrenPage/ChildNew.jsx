import './ChildNew.css';
import {useNavigate, useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import {useState} from "react";
import axios from "axios";
import Search from "../../components/Search.jsx";
import Button from "../../components/Button.jsx";

function ChildNew() {
    const {pid, rid, sid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlGoBack = `/children/${pid}/${rid}/${sid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [choice, setChoice] = useState("");
    const choose = (choice) => setChoice(choice);

    async function handleSubmit() {
        try {
            setError("");
            const response = await axios.post(`http://localhost:8080/relations/${rid}/children`,
                {
                    relationId: rid,
                    personId: choice
                });
        } catch (e) {
            if (axios.isCancel) {
                console.error("Request is canceled");
                setError(e.message);
            } else {
                setError(e.message);
                console.error(e);
            }
        }
        navigate(urlGoBack);
    }

    return (
        <main>
            {person && <h2>Kind van {person.givenNames} {person.surname} toevoegen</h2>}
            <Search
                id="child"
                label="Kind"
                className=""
                endpoint="http://localhost:8080/persons/namecontains/"
                choose={choose}
            />
            <Button type="button" onClick={() => isNaN(Number(choice)) ?
                setError("ongeldige keuze") : handleSubmit()}>Opslaan</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && <p>Loading...</p>}
            {personError && <p>url:{urlPerson}<br/>{personError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default ChildNew;