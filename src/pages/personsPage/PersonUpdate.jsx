import './PersonUpdate.css';
import {useParams} from 'react-router-dom';
import PersonForm from "./PersonForm.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";

function PersonUpdate() {
    const {id} = useParams();
    const {person,personError} = useGetPerson(`http://localhost:8080/persons/${id}`)

    return (
        <main>
            <h2>Persoon wijzigen</h2>
            {person?.id ? <PersonForm
                method="put"
                preloadedValues={person}
                id={id}
                />
                : <p>Loading...</p>}
            {personError && <p>{personError}</p>}
        </main>
    );
}

export default PersonUpdate;