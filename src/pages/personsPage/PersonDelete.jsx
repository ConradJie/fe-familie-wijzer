import './PersonDelete.css';
import {useParams} from 'react-router-dom';
import PersonForm from "./PersonForm.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";

function PersonDelete() {
    const {id} = useParams();
    const {person, personError, personLoading} = useGetPerson(`/persons/${id}`);

    return (
        <main>
            <h2>Persoon verwijderen</h2>
            {person?.id &&
                <PersonForm
                    method="delete"
                    preloadedValues={person}
                    pid={id}
                />
            }
            {personLoading && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
        </main>
    );
}

export default PersonDelete;