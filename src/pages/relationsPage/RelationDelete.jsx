import './RelationDelete.css';
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import Button from "../../components/Button.jsx";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import useGetSpouse from "../../hooks/useGetSpouse.js";
import getSexLabel from "../../helpers/getSexLabel.js";
import Table from "../../components/Table.jsx";
import {axiosAuth} from "../../helpers/axiosAuth.js";

function RelationDelete() {
    const {pid, rid, sid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouse = `http://localhost:8080/persons/${sid}`;
    const urlGoBack = `/relations/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const [sending, toggleSending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const controller = new AbortController();

    async function handleSubmit() {
        try {
            toggleSending(true);
            setError("");
            const urlDelete = `/relations/${rid}`;
            const response = await axiosAuth.delete(urlDelete,
                {
                    signal: controller.signal
                });
        } catch
            (e) {
            if (axiosAuth.isCancel) {
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
            <Table
                className=""
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslacht</th>
                    </tr>
                }
                row={spouse &&
                    <tr key={spouse.id}>
                        <td>{spouse.givenNames}</td>
                        <td>{spouse.surname}</td>
                        <td>{getSexLabel(spouse.sex)}</td>
                    </tr>
                }
            />
            <Button type="button" onClick={handleSubmit}>Verwijderen</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {(personLoading || spouseLoading) && <p>Loading...</p>}
            {sending && <p>Sending...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{urlSpouse}:{spouseError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default RelationDelete;