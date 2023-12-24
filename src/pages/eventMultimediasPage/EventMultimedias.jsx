import './EventMultimedias.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Image, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetEvent from "../../hooks/useGetEvent.js";
import useGetData from "../../hooks/useGetData.js";
import Table from "../../components/Table.jsx";

function EventMultimedias() {
    const {t, pid, eid, rid, sid} = useParams();
    const role = localStorage.getItem('role');
    const urlGoBack = (t === 'person')
        ? `/personEvents/${pid}`
        : `/relationEvents/${pid}/${rid}/${sid}`;
    const navigate = useNavigate();
    const urlEvent = (t === 'person')
        ? `/persons/${pid}/events/${eid}`
        : `/relations/${rid}/events/${eid}`;
    const urlMultimedias = `/events/${eid}/multimedias`;
    const {event, eventError, eventLoading} = useGetEvent(urlEvent);
    const {data, dataError, dataLoading} = useGetData(urlMultimedias);

    return (
        <main className="main-event-multimedias">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {event && <h2>Multimedia over gebeurtenis {event.description}</h2>}
            <Table
                header={
                    <tr>
                        <th>Omschrijving</th>
                        <th>Bestandsnaam</th>
                        <th className="icon" onClick={() => navigate(`/EventMultimediaNew/${t}/${pid}/${eid}/${rid}/${sid}`)}>
                            <PlusCircle width={24}
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
                                    {(role === 'ADMIN' || (role === 'USER' && `${m.filename}` === '')) && (t === 'person') &&
                                        <td className="icon"
                                            onClick={() => navigate(`/eventMultimediaUpdate/person/${pid}/${eid}/${m.id}/0/0`)}>
                                            <Image
                                                width={24}
                                                height={24}/>
                                        </td>
                                    }
                                    {(role === 'ADMIN' || (role === 'USER' && `${m.filename}` === '')) && (t === 'relation') &&
                                        <td className="icon"
                                            onClick={() => navigate(`/eventMultimediaUpdate/relation/${pid}/${eid}/${m.id}/${rid}/${sid}`)}>
                                            <Image
                                                width={24}
                                                height={24}/>
                                        </td>
                                    }
                                    {role === 'ADMIN' && (t === 'person') &&
                                        <td className="icon"
                                            onClick={() => navigate(`/eventMultimediaDelete/person/${pid}/${eid}/${m.id}/${rid}/${sid}`)}>
                                            <Trash
                                                width={24}
                                                height={24}/></td>
                                    }
                                    {role === 'ADMIN' && (t === 'relation') &&
                                        <td className="icon"
                                            onClick={() => navigate(`/eventMultimediaDelete/relation/${pid}/${eid}/${m.id}/${rid}/${sid}`)}>
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