import './RelationNew.css';
import {useParams} from "react-router-dom";
import RelationForm from "./RelationForm.jsx";
import useGetPerson from "../../hooks/useGetPerson.js";

function RelationNew() {
    const {pid} = useParams();
    const urlPerson = `/persons/${pid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);

    return (
        <main>
            {person && <h2>Relatie toevoegen aan {person.givenNames} {person.surname}</h2>}
            <RelationForm
                method='post'
                pid={pid}
                rid={0}
                sid={0}
            />
            {personLoading && <p>Loading...</p>}
            {personError && <p>url:{urlPerson}<br/>{personError}</p>}
        </main>
    );
}

export default RelationNew;