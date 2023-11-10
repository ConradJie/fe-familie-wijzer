import './EventMultimedias.css';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Pencil, PlusCircle, Trash} from "@phosphor-icons/react";

function EventMultimedias() {
    const {t} = useParams();
    const {tid} = useParams();
    const {id} = useParams();
    const [eventData, setEventData] = useState([]);
    const [data, setData] = useState([]);
    const [errorEvent, setErrorEvent] = useState("");
    const [errorData, setErrorData] = useState("");
    const [loadingEvent, toggleLoadingEvent] = useState(false);
    const [loadingData, toggleLoadingData] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        async function getEventData() {
            try {
                setErrorEvent("");
                toggleLoadingEvent(true);
                const url = (t === "person") ? `http://localhost:8080/persons/${tid}/events/${id}`
                    : `http://localhost:8080/relations/${tid}/events/${id}`;
                const response = await axios.get(url, {});
                setEventData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setErrorEvent(e.message);
                } else {
                    setErrorEvent(e.message);
                }
            } finally {
                toggleLoadingEvent(false);
            }
        }

        async function getData() {
            try {
                setErrorData("");
                const response = await axios.get(`http://localhost:8080/events/${id}/multimedias`);
                setData(response.data);
            } catch (error) {
                setErrorData(error.message);
                console.error(error);
            } finally {
                toggleLoadingData(false);
            }
        }

        void getEventData();
        void getData();

        return function cleanup() {
            controller.abort();
        }

    }, [t, tid, id]);

    return (
        <main className="main-person-events">
            {eventData && <h2>Multimedia over gebeurtenis {eventData.description}</h2>}
            <table>
                <thead>
                <tr>
                    <th>Omschrijving</th>
                    <th>Bestandsnaam</th>
                    <th onClick={() => navigate(`/EventMultimediaNew/${t}/${tid}/${id}`)}><PlusCircle width={24} height={24}/></th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map((m) => {
                        return (
                            <tr key={m.id}>
                                <td>{m.description}</td>
                                <td>{m.filename}</td>
                                <td onClick={() => navigate(`/eventMultimediaUpdate/${m.id}`)}><Pencil width={24}
                                                                                                       height={24}/>
                                </td>
                                <td onClick={() => navigate(`/eventMultimediaDelet/${m.id}`)}><Trash width={24}
                                                                                                     height={24}/></td>
                            </tr>)
                    })}
                </tbody>
            </table>
            {(loadingData || loadingEvent) && <p>Loading..</p>}
            {!eventData && errorEvent && <p>{errorEvent}</p>}
            {!data && errorData && <p>{errorData}</p>}
        </main>
    )
}

export default EventMultimedias;