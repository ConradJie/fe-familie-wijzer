import './ChildDelete.jsx.css';
import {useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";

function ChildDelete() {
    const {pid, rid, sid, id} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouse = `http://localhost:8080/persons/${sid}`;
    const urlGoBack = `/children/${pid}/${rid}/${sid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            setError("");
            const urlDelete = `http://localhost:8080/relations/${rid}/children/${id}`;
            const response = await axios.delete(urlDelete, {});
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
        <main className="main-child-delete">
            {person?.id && spouse?.id &&
                <h2>Kind
                    van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname} verwijderen</h2>}
            {person?.id && spouse == null &&
                <h2>Kind van {person.givenNames} {person.surname} verwijderen</h2>}
            <Button type="button" onClick={handleSubmit}>Verwijderen</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && spouseLoading && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default ChildDelete;