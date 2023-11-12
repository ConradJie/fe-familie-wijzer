import './RelationNew.css';
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import Search from "../../components/Search.jsx";
import Button from "../../components/Button.jsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";

function RelationNew() {
    const {pid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlGoBack = `/relations/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    // const [sending, toggleSending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const chooseMessage = (message) => setMessage(message);

    async function handleSubmit() {
        try {
            setError("");
            // toggleSending(true);
            let response = null;
            let spouseId = message;
            console.log("post:", pid, spouseId, message)
            response = await axios.post(`http://localhost:8080/relations/persons/${pid}`,
                {
                    personId: pid,
                    spouseId: spouseId
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
            // toggleSending(false);
        }
        navigate(`/relations/${pid}`);
    }

    return (
        <main>
            {person && <h2>Relatie toevoegen aan {person.givenNames} {person.surname}</h2>}
            <Search
                id="spouseId"
                label="Partner"
                className=""
                endpoint="http://localhost:8080/persons/namecontains/"
                chooseMessage={chooseMessage}
            />
            <Button type="button" onClick={handleSubmit}>Opslaan </Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && <p>Loading...</p>}
            {personError && <p>url:{urlPerson}<br/>{personError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default RelationNew;