import './PersonEventUpdate.css';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import PersonEventForm from "./PersonEventForm.jsx";

function PersonEventUpdate() {
    const {pid} = useParams();
    const {id} = useParams();
    const [personData, setPersonData] = useState([]);
    const [data, setData] = useState([]);
    const [personError, setPersonError] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function getPersonData() {
            try {
                setPersonError("");
                const response = await axios.get(`http://localhost:8080/persons/${pid}`,
                    {});
                setPersonData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setPersonError(e.message);
                } else {
                    setPersonError(e.message);
                }
            }
        }

        async function getData() {
            try {
                setError("");
                const response = await axios.get(`http://localhost:8080/persons/${pid}/events/${id}`,
                    {});
                //For dates, useForm.defaultValues only accepts the YYYY-MM-DD format!!
                response.data.beginDate = response.data.beginDate.substring(0,10);
                response.data.endDate = response.data.endDate.substring(0,10);
                setData(response.data);
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setError(e.message);
                } else {
                    setError(e.message);
                }
            }

        }

        void getPersonData();
        void getData();
    }, [pid, id]);

    return (
        <main>
            {personData?.id && <h2>Gebeurtenis van {personData.givenNames} {personData.surname} wijzigen</h2>}
            {data?.id ? <PersonEventForm
                    method="put"
                    preloadedValues={data}
                    pid={pid}
                    id={id}
                />
                : <p>Loading...from update</p>}
            {personError && <p>{personError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default PersonEventUpdate;