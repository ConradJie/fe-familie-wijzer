import './PersonEventNew.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PersonEventForm from "./PersonEventForm.jsx";

function PersonEventNew() {
    const {pid} = useParams();
    const [personData, setPersonData] = useState([]);
    const [personError, setPersonError] = useState("");
    const [personLoading, togglePersonLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function getPersonData() {
            try {
                setPersonError("");
                togglePersonLoading(true);
                const response = await axios.get(`http://localhost:8080/persons/${pid}`,
                    {});
                setPersonData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setPersonError(e.message);
                } else {
                    setPersonError(e.message);
                }
            } finally {
                togglePersonLoading(false);
            }
        }

        void getPersonData();

        return function cleanup() {
            controller.abort();
        }

    }, [pid]);

    return (
        <main>
            {personData && <h2>Gebeurtenis van {personData.givenNames} {personData.surname} toevoegen</h2>}
            {personData?.id ? <PersonEventForm
                    method="post"
                    preloadedValues={{
                        eventType: "",
                        description: "",
                        text: "",
                        beginDate: null,
                        endDate: null
                    }}
                    pid={pid}
                />
                : <p>Loading...</p>}
            {personLoading && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
        </main>
    )
}

export default PersonEventNew;