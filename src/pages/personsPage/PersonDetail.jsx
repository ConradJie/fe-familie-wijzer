import './PersonDetail.css';
import {useNavigate, useParams} from 'react-router-dom';
import useGetPerson from "../../hooks/useGetPerson.js";
import localDateNumeric from "../../helpers/localDateNumeric.js";
import getEventTypeLabel from "../../helpers/getEventTypeLabel.js";

function PersonDetail() {
    const {id} = useParams();
    const urlPerson = `http://localhost:8080/persons/${id}`;
    const navigate = useNavigate();
    const {person, personError, personLoading} = useGetPerson(urlPerson);

    return (
        <main className="main-person-detail">
            <h2>Detail</h2>
            {person?.id &&
                <form className="detail-person-form">
                    <label htmlFor="Voornamen-field">
                        Voornamen:
                        <input
                            type="text"
                            id="givenNames-field"
                            value={person.givenNames}
                            disabled={true}
                        />
                    </label>
                    <label htmlFor="surname-field">
                        Achternaam:
                        <input
                            type="text"
                            id="surname-field"
                            value={person.surname}
                            disabled={true}
                        />
                    </label>
                    <label htmlFor="sex-field">
                        Geslacht:
                        <select
                            id="sex-field"
                            value={person.sex}
                            disabled={true}
                        >
                            <option value="M">Man</option>
                            <option value="F">Vrouw</option>
                            <option value="X">Onbekend</option>
                        </select>
                    </label>
                    <button type="button" onClick={() => navigate("/persons")}>Sluiten</button>
                </form>
            }
            {(personLoading) && <p>Loading...</p>}
            {personError && <p>personError</p>}
        </main>
    );
}

export default PersonDetail;