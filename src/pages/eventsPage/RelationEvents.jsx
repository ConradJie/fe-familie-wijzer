import './RelationEvents.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Images, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import localDateNumeric from "../../helpers/localDateNumeric.js";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";
import useGetData from "../../hooks/useGetData.js";
import getEventTypeLabel from "../../helpers/getEventTypeLabel.js";
import Table from "../../components/Table.jsx";

function RelationEvents() {
    const {pid, rid, sid} = useParams();
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const urlGoBack = `/relations/${pid}`;
    const urlPerson = `/persons/${pid}`;
    const urlSpouse = (sid !== 'undefined') ? `/persons/${sid}` : 'null';
    const urlRelationEvents = `/relations/${rid}/events`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const {data, dataError, dataLoading} = useGetData(urlRelationEvents);

    return (
        <main className="main-person-events">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {person?.id && spouse?.id && <h2>Gebeurtenissen
                van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname}</h2>}
            {person?.id && sid === "null" && <h2>Gebeurtenissen van {person.givenNames} {person.surname}</h2>}
            <Table
                header={
                    <tr>
                        <th>Begindatum</th>
                        <th>Einddatum</th>
                        <th>Type</th>
                        <th>Omschrijving</th>
                        {role === 'ADMIN' &&
                            <th className="icon" onClick={() => navigate(`/relationEventNew/${pid}/${rid}/${sid}`)}>
                                <PlusCircle width={24}
                                            height={24}/>
                            </th>
                        }
                    </tr>
                }
                row={Object.keys(data).length > 0 &&
                    data.map((e) => {
                        return (
                            <tr key={e.id}>
                                <td>{localDateNumeric(e.beginDate)}</td>
                                <td>{localDateNumeric(e.endDate)}</td>
                                <td>{getEventTypeLabel(e.eventType)}</td>
                                <td>{e.description}</td>
                                <td className="icon"
                                    onClick={() => navigate(`/eventMultimedias/relation/${pid}/${e.id}/${rid}/${sid}`)}>
                                    <Images width={24} height={24}/>
                                </td>
                                {role === 'ADMIN' &&
                                    <td className="icon"
                                        onClick={() => navigate(`/relationEventUpdate/${pid}/${rid}/${sid}/${e.id}`)}>
                                        <Pencil width={24}
                                                height={24}/>
                                    </td>
                                }
                                {role === 'ADMIN' &&
                                    <td className="icon"
                                        onClick={() => navigate(`/relationEventDelete/${pid}/${rid}/${sid}/${e.id}`)}>
                                        <Trash
                                            width={24}
                                            height={24}/>
                                    </td>
                                }
                            </tr>)
                    })
                }
            />
            {(personLoading || spouseLoading || dataLoading) && <p>Loading..</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default RelationEvents;