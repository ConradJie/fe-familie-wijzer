import './PersonEvents.css';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Images, Pencil, PlusCircle, Trash} from "@phosphor-icons/react";
import localDateNumeric from "../../helpers/localDateNumeric.js";

function PersonEvents() {
    const {id} = useParams();
    const [personData, setPersonData] = useState([]);
    const [data, setData] = useState([]);
    const [errorPerson, setErrorPerson] = useState("");
    const [errorData, setErrorData] = useState("");
    const [loadingPerson, toggleLoadingPerson] = useState(false);
    const [loadingData, toggleLoadingData] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        async function getPersonData() {
            try {
                setErrorPerson("");
                toggleLoadingPerson(true);
                const response = await axios.get(`http://localhost:8080/persons/${id}`,
                    {});
                setPersonData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setErrorPerson(e.message);
                } else {
                    setErrorPerson(e.message);
                }
            } finally {
                toggleLoadingPerson(false);
            }
        }

        async function getData() {
            try {
                setErrorData("");
                const response = await axios.get(`http://localhost:8080/persons/${id}/events`);
                setData(response.data);
            } catch (error) {
                setErrorData(error.message);
                console.error(error);
            } finally {
                toggleLoadingData(false);
            }
        }

        void getPersonData();
        void getData();

        return function cleanup() {
            controller.abort();
        }

    }, [id]);

    return (
        <main className="main-person-events">
            {personData && <h2>Gebeurtenissen van {personData.givenNames} {personData.surname}</h2>}
            <table>
                <thead>
                <tr>
                    <th>Begindatum</th>
                    <th>Einddatum</th>
                    <th>Omschrijving</th>
                    <th onClick={() => navigate(`/personEventNew/${id}`)}><PlusCircle width={24} height={24}/></th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map((e) => {
                        return (
                            <tr key={e.id}>
                                <td>{localDateNumeric(e.beginDate)}</td>
                                <td>{localDateNumeric(e.endDate)}</td>
                                <td>{e.description}</td>
                                <td onClick={() => navigate(`/eventMultimedias/person/${id}/${e.id}`)}><Images width={24}
                                                                                                     height={24}/></td>
                                <td onClick={() => navigate(`/events/${e.id}`)}><Pencil width={24}
                                                                                              height={24}/></td>
                                <td onClick={() => navigate(`/events/${e.id}`)}><Trash width={24}
                                                                                             height={24}/></td>
                            </tr>)
                    })}
                </tbody>
            </table>
            {(loadingData || loadingPerson) && <p>Loading..</p>}
            {!personData && errorPerson && <p>{errorPerson}</p>}
            {!data && errorData && <p>{errorData}</p>}
        </main>
    )
}

export default PersonEvents;