import './EventMultimedias.css';
import {useNavigate, useParams} from "react-router-dom";
import {Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import useGetEvent from "../../hooks/useGetEvent.js";
import useGetData from "../../hooks/useGetData.js";

function EventMultimedias() {
    const {t} = useParams();    //person
    const {tid} = useParams();  //personId
    const {eid} = useParams();  //eventId
    const urlEvent = `http://localhost:8080/persons/${tid}/events/${eid}`;
    const urlMultimedias = `http://localhost:8080/events/${eid}/multimedias`;
    const navigate = useNavigate();
    const {event, eventError} = useGetEvent(urlEvent);
    const {data, dataError} = useGetData(urlMultimedias);

    return (
        <>{
            // t && tid && eid &&
            <main className="main-person-events">
                {event && <h2>Multimedia over gebeurtenis {event.description} | eid:{event.id}</h2>}
                <p>{urlEvent}</p>
                <p>{urlMultimedias}</p>
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
        }
        </>
    )
}

export default EventMultimedias;