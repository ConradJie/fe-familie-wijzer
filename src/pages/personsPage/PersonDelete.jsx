import './PersonDelete.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import Button from "../../components/Button.jsx";
import {useEffect, useState} from "react";

function PersonDelete() {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const controller = new AbortController();

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

            return function cleanup() {
                controller.abort();
            }
        }

        void getData();
    } );


    async function deleteData(e) {
        e.preventDefault();

        try {
            setError("");
            const response = await axios.delete(`http://localhost:8080/persons/${id}`,
                {});
            setData(response.data);
        } catch (e) {
            setError(e.message);
        }
        navigate("/persons")

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            {data?.id ?
                <main>
                    <h2>Persoon verwijderen</h2>
                    <form className="person-delete-form">
                        <label htmlFor="givenNames-field">
                            Voornamen:
                            <input
                                type="text"
                                id="givenNames-field"
                                disabled
                                value={data.givenNames}
                            />
                        </label>
                        <label htmlFor="surname-field">
                            Achternaam:
                            <input
                                type="text"
                                id="surname-field"
                                disabled
                                value={data.surname}
                            />
                        </label>
                        <label htmlFor="sex-field">
                            Geslacht:
                            <select
                                id="sex-field"
                                value={data.sex}
                                disabled
                            >
                                <option value="M">Man</option>
                                <option value="F">Vrouw</option>
                                <option value="X">Onbekend</option>
                            </select>
                        </label>
                        <Button type="button" onClick={deleteData}>
                            Verwijderen
                        </Button>
                        <Button type="button" variant="cancel"
                                onClick={() => navigate("/persons")}>Annuleren</Button>
                    </form>
                </main>
                : <p> Loading...</p>
            }
            {error && <p>{error}</p>}
        </>
    );
}

export default PersonDelete;