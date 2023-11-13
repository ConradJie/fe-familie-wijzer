import './RelationNew.css';
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import Button from "../../components/Button.jsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
import useGetData from "../../hooks/useGetData.js";

function RelationDelete() {
    const {pid, sid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlGoBack = `/relations/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {data, dataError, dataLoading} = useGetData(`http://localhost:8080/persons/${sid}`);
    const [sending, toggleSending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    async function handleSubmit() {
        try {
            toggleSending(true);
            setError("");
            const response = await axios.delete(`http://localhost:8080/relations/persons/${pid}/${sid}`,
                {});
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
        navigate(`/relations/${pid}`);
    }

    return (
        <main className="main-relation-delete">
            {person && <h2>Relatie van {person.givenNames} {person.surname} verwijderen</h2>}
            {data ? <p>id:{data.id}!personid:{data.personId}!spouseId:{data.spouseId}!</p> : <p>Geen data</p>}
            {data?.id && <input type="text" id="spouse" disabled value="data.spouseId"/>}
            {data?.id && <p>{data.spouseId}</p>}
            <Button type="button" onClick={handleSubmit}>Verwijderen</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && <p>Loading...</p>}
            {dataLoading && <p>Loading...</p>}
            {personError && <p>url:{urlPerson}<br/>{personError}</p>}
            {dataError && <p>{dataError}</p>}
            {sending && <p>Sending...</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default RelationDelete;