import Button from "../../components/Button.jsx";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import ChoosePerson from "../../components/ChoosePerson.jsx";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import translate from "../../helpers/translate.js";

function RelationForm({pid, rid, sid, method}) {
    const urlGoBack = `/relations/${pid}`;
    const [error, setError] = useState("");
    const [sending, toggleSending] = useState(false);
    const navigate = useNavigate();

    const [choice, setChoice] = useState(sid);
    const [buttonVariant, setButtonVariant] = useState("disabled");
    const [disabled, toggleDisabled] = useState(true);
    console.log('choice', choice)
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
        const controller = new AbortController();
        try {
            setError("");
            if (choice === "") {
                setChoice(null);
            }
            const url = (method === 'post') ? `/relations` : `/relations/${rid}`;
            const response = await axiosAuth({
                method: `${method}`,
                url: `${url}`,
                data: (method === 'delete') ? {} :
                    {
                        id: rid,
                        personId: pid,
                        spouseId: choice
                    },
                signal: controller.signal
            });
        } catch (e) {
            processed = false;
            console.error(e)
            if (!axiosAuth.isCancel && e.message !== 'canceled') {
                if (e.response?.data) {
                    setError(translate(e.response.data));
                } else {
                    setError(translate(e.message));
                }
            }
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
        <section>
            <ChoosePerson
                choose={choose}
            />
            <Button type="button" disabled={disabled} variant={buttonVariant}
                    onClick={() => (choice !== "" && isNaN(Number(choice))) ?
                        setError("ongeldige keuze") : handleSubmit()}>Opslaan</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {sending && <p>Sending...</p>}
            {error && <p>{error}</p>}
        </section>
    );
}

export default RelationForm;