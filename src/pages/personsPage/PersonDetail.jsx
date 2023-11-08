import './PersonDetail.css';
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";

function PersonDetail() {
    const {id} = useParams();

    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);


    useEffect(() => {
        async function getData() {
            toggleLoading(false);
            try {
                setError("");
                toggleLoading(true);
                console.log("before");
                const response = await axios.get(`http://localhost:8080/persons/${id}`,
                    {});
                console.log("after call axios");
                setData(response.data);
                console.log("after set data");
            } catch (e) {
                if (axios.isCancel) {
                    console.error("Request is canceled");
                    setError(e.message);
                } else {
                    setError(e.message);
                    console.error(e);
                    console.error(e.message);
                }
            } finally {
                toggleLoading(false);
            }
        }

        getData();
    }, []);


    return (
        <main className="main-person">
            <h2>Detail</h2>
            <form className="detail-person-form" >
                <label htmlFor="Voornamen-field">
                    Voornamen:
                    <input
                        type="text"
                        id="givenNames-field"
                        value={data.givenNames}
                    />
                    {/*{errors.givenNames && <p>{errors.givenNames.message}</p>}*/}
                </label>
                <label htmlFor="surname-field">
                    Achternaam:
                    <input
                        type="text"
                        id="surname-field"
                        value={data.surname}
                    />
                </label>
                {/*{errors.surname && <p>{errors.surname.message}</p>}*/}
                <label htmlFor="sex-field">
                    Geslachtss:
                    <select
                        id="sex-field"
                        value={data.sex}
                    >
                        <option value="M">Man</option>
                        <option value="F">Vrouw</option>
                        <option value="X">Onbekend</option>
                    </select>
                    {/*{errors.sex && <p>{errors.sex.message}</p>}*/}
                </label>
                <button type="button" onClick={()=>navigate("/persons")}>Sluiten</button>
            </form>
            {error &&
                <p>Er is iets misgegaan bij het opslaan van de gegevens:{error}</p>}
            {loading && <p>Loading...</p>}
        </main>
    );
}

export default PersonDetail;