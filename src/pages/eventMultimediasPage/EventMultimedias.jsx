import './EventMultimedias.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowLeft, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetEvent from "../../hooks/useGetEvent.js";
import useGetData from "../../hooks/useGetData.js";

function EventMultimedias() {
    const {t, tid, eid} = useParams();
    const navigate = useNavigate();
    const urlEvent = (typeof tid === 'string') && (typeof eid === 'string') ?
        `http://localhost:8080/persons/${tid}/events/${eid}` : "";
    const urlMultimedias = (typeof tid === 'string') ?
        `http://localhost:8080/events/${eid}/multimedias` : "";

    // const urlGoBack = `/personEvents/${tid}/${eid}`;

    const urlGoBack = `/personEvents/${tid}`;

    const {event, eventError} = useGetEvent(urlEvent);
    const {data, dataError} = useGetData(urlMultimedias);

    return (
        <main className="main-event-multimedias">
            <Link to={urlGoBack}><ArrowLeft width={24} height={24}/></Link>
            {event && <h2>Multimedia over gebeurtenis {event.description}</h2>}
            <table>
                <thead>
                <tr>
                    <th>Omschrijving</th>
                    <th>Bestandsnaam</th>
                    <th onClick={() => navigate(`/EventMultimediaNew/${t}/${tid}/${eid}`)}><PlusCircle width={24}
                                                                                                       height={24}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map((m) => {
                            return (
                                <tr key={m.id}>
                                    <td>{m.description}</td>
                                    <td>{m.filename}</td>
                                    <td onClick={() => navigate(`/eventMultimediaUpdate/person/${tid}/${eid}/${m.id}`)}>
                                        <Pencil
                                            width={24}
                                            height={24}/>
                                    </td>
                                    <td onClick={() => navigate(`/eventMultimediaDelete/person/${tid}/${eid}/${m.id}`)}>
                                        <Trash
                                            width={24}
                                            height={24}/></td>
                                </tr>)
                        }
                    )
                }
                </tbody>
            </table>
            {eventError && <p>{eventError}</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default EventMultimedias;