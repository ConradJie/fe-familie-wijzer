import './RelationUpdate.css';
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import Button from "../../components/Button.jsx";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
import ChoosePerson from "../../components/ChoosePerson.jsx";
import useGetSpouse from "../../hooks/useGetSpouse.js";

function RelationUpdate() {
    const {pid, rid, sid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouse = `http://localhost:8080/persons/${sid}`;
    const urlGoBack = `/relations/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [choice, setChoice] = useState(sid);
    const [buttonVariant, setButtonVariant] = useState("disabled");
    const [disabled, toggleDisabled] = useState(true);
    const choose = (choice) => {
        setChoice(choice);
        if (choice === "") {
            toggleDisabled(true);
            setButtonVariant("disabled");
        } else {
            toggleDisabled(false);
            setButtonVariant("primary");
        }
    }

    async function handleSubmit() {
        const controller = new AbortController();
        const token = localStorage.getItem('token');
        try {
            setError("");
            if (choice === "") {
                setChoice(null);
            }
            const response = await axios.put(`http://localhost:8080/relations/${rid}`,
                {
                    id: rid,
                    personId: pid,
                    spouseId: choice
                },
                {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
        } catch
            (e)
            {
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
                {spouse &&
                    <ChoosePerson
                        choose={choose}
                    />
                }
                <Button type="button" disabled={disabled} variant={buttonVariant}
                        onClick={() => (choice !== "" && isNaN(Number(choice))) ?
                            setError("ongeldige keuze") : handleSubmit()}>Opslaan</Button>
                <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
                {(personLoading || spouseLoading) && <p>Loading...</p>}
                {personError && <p>url:{urlPerson}<br/>{personError}</p>}
                {spouseError && <p>{urlSpouse}:{spouseError}</p>}
                {error && <p>{error}</p>}
            </main>
        );
    }

    export default RelationUpdate;