import './EventMultimedias.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Image, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetEvent from "../../hooks/useGetEvent.js";
import useGetData from "../../hooks/useGetData.js";
import Table from "../../components/Table.jsx";

function EventMultimedias() {
    const {t, tid, eid} = useParams();
    const role = localStorage.getItem('role');
    const urlGoBack = `/personEvents/${tid}`;
    const navigate = useNavigate();
    const urlEvent = (typeof tid === 'string') && (typeof eid === 'string') ?
        `http://localhost:8080/persons/${tid}/events/${eid}` : "";
    const urlMultimedias = (typeof tid === 'string') ?
        `http://localhost:8080/events/${eid}/multimedias` : "";

    const {event, eventError,eventLoading} = useGetEvent(urlEvent);
    const {data, dataError,dataLoading} = useGetData(urlMultimedias);

    return (
        <main className="main-event-multimedias">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {event && <h2>Multimedia over gebeurtenis {event.description}</h2>}
            <Table
                header={
                    <tr>
                        <th>Omschrijving</th>
                        <th>Bestandsnaam</th>
                        <th className="icon" onClick={() => navigate(`/EventMultimediaNew/${t}/${tid}/${eid}`)}><PlusCircle width={24}
                                                                                                           height={24}/>
                        </th>
                    </tr>
                }
                row={data &&
                    data.map((m) => {
                            return (
                                <tr key={m.id}>
                                    <td>{m.description}</td>
                                    <td>{m.filename}</td>
                                    <td className="icon" onClick={() => navigate(`/eventMultimediaUpdate/person/${tid}/${eid}/${m.id}`)}>
                                        <Image
                                            width={24}
                                            height={24}/>
                                    </td>
                                    {role === 'ADMIN' &&
                                    <td className="icon" onClick={() => navigate(`/eventMultimediaDelete/person/${tid}/${eid}/${m.id}`)}>
                                        <Trash
                                            width={24}
                                            height={24}/></td>
                                    }
                                </tr>)
                        }
                    )
                }
            />
            {(eventLoading || dataLoading) && <p></p>}
            {eventError && <p>{eventError}</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default EventMultimedias;