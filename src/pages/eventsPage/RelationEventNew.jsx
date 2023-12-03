import './RelationEventNew.css';
import RelationEventForm from "./RelationEventForm.jsx";
import {useParams} from "react-router-dom";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";

function RelationEventNew() {
    const {pid, rid, sid} = useParams();
    const urlPerson = `/persons/${pid}`;
    const urlSpouse = `/persons/${sid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);

    return (
        <main>
            {person?.id && spouse?.id && <h2>Gebeurtenis
                van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname} toevoegen</h2>}
            {person && sid === "null" && <h2>Gebeurtenis van {person.givenNames} {person.surname} toevoegen</h2>}
            {person?.id && <RelationEventForm
                method="post"
                preloadedValues={{
                    eventType: "",
                    description: "",
                    text: "",
                    beginDate: null,
                    endDate: null
                }}
                pid={pid}
                rid={rid}
                sid={sid}
            />
            }
            {(personLoading || spouseLoading) && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
        </main>
    )
}

export default RelationEventNew;