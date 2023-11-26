import './ChildNew.css';
import {useNavigate, useParams} from "react-router-dom";
import ChoosePerson from "../../components/ChoosePerson.jsx";
import {useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";

function ChildNew() {
    const {pid, rid, sid} = useParams();
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const urlSpouse = `http://localhost:8080/persons/${sid}`;
    const urlGoBack = `/children/${pid}/${rid}/${sid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [choice, setChoice] = useState("");
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
            {person?.id && spouse?.id &&
                <h2>Kind
                    van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname} toevoegen</h2>}
            {person?.id && spouse == null &&
                <h2>Kind van {person.givenNames} {person.surname} toevoegen</h2>}
            <ChoosePerson
                choose={choose}
            />
            <Button type="button" disabled={disabled} variant={buttonVariant}
                    onClick={() => isNaN(Number(choice)) ?
                        setError("ongeldige keuze") : handleSubmit()}>Opslaan</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && spouseLoading && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default ChildNew;