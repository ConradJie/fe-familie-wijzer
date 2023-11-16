import './RelationEvents.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Images, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import localDateNumeric from "../../helpers/localDateNumeric.js";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetData from "../../hooks/useGetData.js";
import getEventTypeLabel from "../../helpers/getEventTypeLabel.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";

function RelationEvents() {
    const {pid, rid, sid} = useParams();
    const navigate = useNavigate();
    const {person, personError, personLoading} = useGetPerson(`http://localhost:8080/persons/${pid}`);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, `http://localhost:8080/persons/${sid}`);
    const {data, dataError, dataLoading} = useGetData(`http://localhost:8080/relations/${rid}/events`);

    return (
        <main className="main-person-events">
            <Link to="/persons"><ArrowLeft width={24} height={24}/></Link>
            {person?.id && spouse?.id && <h2>Gebeurtenissen
                van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname}</h2>}
            {person?.id && sid === "null" && <h2>Gebeurtenissen van {person.givenNames} {person.surname}</h2>}
            <table>
                <thead>
                <tr>
                    <th>Begindatum</th>
                    <th>Einddatum</th>
                    <th>Type</th>
                    <th>Omschrijving</th>
                    <th onClick={() => navigate(`/relationEventNew/${pid}/${rid}/${sid}`)}><PlusCircle width={24}
                                                                                                height={24}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(data).length > 0 &&
                    data.map((e) => {
                        return (
                            <tr key={e.id}>
                                <td>{localDateNumeric(e.beginDate)}</td>
                                <td>{localDateNumeric(e.endDate)}</td>
                                <td>{getEventTypeLabel(e.eventType)}</td>
                                <td>{e.description}</td>
                                <td onClick={() => navigate(`/eventMultimedias/relation/${pid}/${e.id}/${rid}/${sid}`)}>
                                    <Images width={24} height={24}/>
                                </td>
                                <td onClick={() => navigate(`/relationEventUpdate/${pid}/${rid}/${sid}/${e.id}`)}><Pencil width={24}
                                                                                                          height={24}/>
                                </td>
                                <td onClick={() => navigate(`/relationEventDelete/${pid}/${rid}/${sid}/${e.id}`)}><Trash width={24}
                                                                                                         height={24}/>
                                </td>
                            </tr>)
                    })
                }
                </tbody>
            </table>
            {(personLoading || spouseLoading || dataLoading) && <p>Loading..</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default RelationEvents;