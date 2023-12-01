import './RelationNew.css';
import {useNavigate, useParams} from "react-router-dom";
import ChoosePerson from "../../components/ChoosePerson.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";
import {useState} from "react";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import Button from "../../components/Button.jsx";
import translate from "../../helpers/translate.js";

function RelationNew() {
    const {pid} = useParams();
    const urlGoBack = `/relations/${pid}`;
    const urlPerson = `http://localhost:8080/persons/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const navigate = useNavigate();
    const controller = new AbortController();

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
        let processed = true;
        try {
            setError("");
            if (choice === "") {
                setChoice(null);
            }
            const response = await axiosAuth.post("/relations",
                {
                    personId: pid,
                    spouseId: choice
                },
                {signal: controller.signal});
        } catch (e) {
            processed = false;
            setError(translate(e.response.data));
        } finally {
            toggleSending(false);
        }
        if (processed) {
            navigate(urlGoBack);
        }

        return function cleanup() {
            controller.abort();
        }

    }


    return (
        <main>
            {person && <h2>Relatie toevoegen aan {person.givenNames} {person.surname}</h2>}
            <ChoosePerson
                choose={choose}
            />
            <Button type="button" disabled={disabled} variant={buttonVariant}
                    onClick={() => (choice !== "" && isNaN(Number(choice))) ?
                        setError("ongeldige keuze") : handleSubmit()}>Opslaan</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {personLoading && <p>Loading...</p>}
            {sending && <p>Sending...</p>}
            {personError && <p>url:{urlPerson}<br/>{personError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default RelationNew;