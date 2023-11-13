import './PersonEvents.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Images, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import localDateNumeric from "../../helpers/localDateNumeric.js";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetData from "../../hooks/useGetData.js";
import getEventTypeLabel from "../../helpers/getEventTypeLabel.js";

function PersonEvents() {
    const {id} = useParams();

    const navigate = useNavigate();
    const {person, personError, personLoading} = useGetPerson(`http://localhost:8080/persons/${id}`);
    const {data, dataError, dataLoading} = useGetData(`http://localhost:8080/persons/${id}/events`);

    return (
        <main className="main-person-events">
            <Link to="/persons"><ArrowLeft width={24} height={24}/></Link>
            {person && <h2>Gebeurtenissen van {person.givenNames} {person.surname}</h2>}
            <table>
                <thead>
                <tr>
                    <th>Begindatum</th>
                    <th>Einddatum</th>
                    <th>Type</th>
                    <th>Omschrijving</th>
                    <th onClick={() => navigate(`/personEventNew/${id}`)}><PlusCircle width={24} height={24}/></th>
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
                                <td onClick={() => navigate(`/eventMultimedias/person/${id}/${e.id}`)}>
                                    <Images width={24} height={24}/>
                                </td>
                                <td onClick={() => navigate(`/personEventUpdate/${id}/${e.id}`)}><Pencil width={24}
                                                                                                         height={24}/>
                                </td>
                                <td onClick={() => navigate(`/personEventDelete/${id}/${e.id}`)}><Trash width={24}
                                                                                                        height={24}/>
                                </td>
                            </tr>)
                    })
                }
                </tbody>
            </table>
            {(dataLoading || personLoading) && <p>Loading..</p>}
            {personError && <p>{personError}</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default PersonEvents;