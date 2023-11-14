import './RelationUpdate.css';
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import Search from "../../components/Search.jsx";
import Button from "../../components/Button.jsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";

function RelationUpdate() {
    const {pid,rid,sid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlGoBack = `/relations/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [choice, setChoice] = useState("");
    const choose = (choice) => setChoice(choice);

    async function handleSubmit() {
        try {
            setError("");
            if (choice==="") {
                setChoice(null);
            }
            const response = await axios.put(`http://localhost:8080/relations/${rid}`,
                {
                    id: rid,
                    personId: pid,
                    spouseId: choice
                });
        } catch (e) {
            if (axios.isCancel) {
                console.log(e)
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
            {person && <h2>Relatie van {person.givenNames} {person.surname} wijzigen</h2>}
            <Search
                id="spouse"
                label="Partner"
                placeholder={sid}
                className=""
                endpoint="http://localhost:8080/persons/namecontains/"
                choose={choose}
            />
            <Button type="button" onClick={() => (choice !== "" && isNaN(Number(choice))) ?
                setError("ongeldige keuze") : handleSubmit()}>Opslaan</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && <p>Loading...</p>}
            {personError && <p>url:{urlPerson}<br/>{personError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default RelationUpdate;