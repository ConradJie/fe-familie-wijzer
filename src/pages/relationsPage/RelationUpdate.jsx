import './RelationUpdate.css';
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";
import RelationForm from "./RelationForm.jsx";

function RelationUpdate() {
    const {pid, rid, sid} = useParams();
    const urlPerson = `/persons/${pid}`;
    const urlSpouse = `/persons/${sid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);

    return (
        <main>
            {person && spouse &&
                <h2>Relatie {spouse.givenNames} {spouse.surname} van {person.givenNames} {person.surname} wijzigen</h2>}
            {spouse &&
                <RelationForm
                    method='put'
                    pid={pid}
                    rid={rid}
                    sid={sid}
                />
            }
            {(personLoading || spouseLoading) && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && spouseError !== 'canceled' && <p>{spouseError}</p>}
        </main>
    );
}

export default RelationUpdate;