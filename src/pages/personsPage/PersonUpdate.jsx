import './PersonUpdate.css';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import PersonForm from "./PersonForm.jsx";

function PersonUpdate() {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                setError("");
                const response = await axios.get(`http://localhost:8080/persons/${id}`,
                    {});
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

        void getData();
    }, [id]);

    return (
        <main>
            <h2>Update</h2>
            {data? <p>{data.givenNames} {data.surname}</p> : <p>leeg</p>}
            {data? <PersonForm id={id} preloadedValues={data}/>
                : <p>Loading...</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default PersonUpdate;