import './PersonEvents.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Images, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import localDateNumeric from "../../helpers/localDateNumeric.js";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetData from "../../hooks/useGetData.js";
import getEventTypeLabel from "../../helpers/getEventTypeLabel.js";
import Table from "../../components/Table.jsx";

function PersonEvents() {
    const {id} = useParams();
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const {person, personError, personLoading} = useGetPerson(`/persons/${id}`);
    const {data, dataError, dataLoading} = useGetData(`/persons/${id}/events`);

    return (
        <main className="main-person-events">
            <Link to="/persons"><ArrowLeft width={24} height={24}/></Link>
            {person && <h2>Gebeurtenissen van {person.givenNames} {person.surname}</h2>}
            <Table
                header={
                    <tr>
                        <th>Begindatum</th>
                        <th>Einddatum</th>
                        <th>Type</th>
                        <th>Omschrijving</th>
                        {role === 'ADMIN' &&
                            <th className="icon" onClick={() => navigate(`/personEventNew/${id}`)}><PlusCircle width={24} height={24}/>
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
                                <td className="icon" onClick={() => navigate(`/eventMultimedias/person/${id}/${e.id}/0/0`)}>
                                    <Images width={24} height={24}/>
                                </td>
                                {role === 'ADMIN' &&
                                    <td className="icon" onClick={() => navigate(`/personEventUpdate/${id}/${e.id}`)}>
                                        <Pencil width={24}
                                                height={24}/>
                                    </td>
                                }
                                {role === 'ADMIN' &&
                                    <td className="icon" onClick={() => navigate(`/personEventDelete/${id}/${e.id}`)}>
                                        <Trash width={24}
                                               height={24}/>
                                    </td>
                                }
                            </tr>)
                    })
                }
            />
            {(dataLoading || personLoading) && <p>Loading..</p>}
            {personError && <p>{personError}</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default PersonEvents;