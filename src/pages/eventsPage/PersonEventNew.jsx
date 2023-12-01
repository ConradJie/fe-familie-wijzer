import './PersonEventNew.css';
import {useParams} from "react-router-dom";
import PersonEventForm from "./PersonEventForm.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";

function PersonEventNew() {
    const {pid} = useParams();
    const {person,personError}=useGetPerson(`/persons/${pid}`);

    return (
        <main>
            {person && <h2>Gebeurtenis van {person.givenNames} {person.surname} toevoegen</h2>}
            {person?.id ? <PersonEventForm
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
            {personError && <p>{personError}</p>}
        </main>
    )
}

export default PersonEventNew;