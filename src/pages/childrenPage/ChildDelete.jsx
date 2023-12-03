import './ChildDelete.css';
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../components/Button.jsx";
import Table from "../../components/Table.jsx";
import {axiosAuth} from "../../helpers/axiosAuth.js";
import getSexLabel from "../../helpers/getSexLabel.js";
import useGetPerson from "../../hooks/useGetPerson.js";
import useGetSpouse from "../../hooks/useGetSpouse.js";
import useGetData from "../../hooks/useGetData.js";

function ChildDelete() {
    const {pid, rid, sid, cpid, id} = useParams();
    const urlPerson = `/persons/${pid}`;
    const urlSpouse = `/persons/${sid}`;
    const urlChildPerson = `/persons/${cpid}`;
    const urlGoBack = `/children/${pid}/${rid}/${sid}`;
    const {person, personError, personLoading} = useGetPerson(urlPerson);
    const {spouse, spouseError, spouseLoading} = useGetSpouse(sid, urlSpouse);
    const {data, dataError, dataLoading} = useGetData(urlChildPerson);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            setError("");
            const urlDelete = `/relations/${rid}/children/${id}`;
            const response = await axiosAuth.delete(urlDelete, {});
        } catch (e) {
            if (axiosAuth.isCancel) {
                console.error("Request is canceled");
                setError(e.message);
            } else {
                setError(e.message);
                console.error(e);
            }
        }
        navigate(urlGoBack);
    }

    return (
        <main className="main-child-delete">
            {person?.id && spouse?.id &&
                <h2>Kind
                    van {person.givenNames} {person.surname} en {spouse.givenNames} {spouse.surname} verwijderen</h2>}
            {person?.id && spouse == null &&
                <h2>Kind van {person.givenNames} {person.surname} verwijderen</h2>}
            <Table
                className=""
                header={
                    <tr>
                        <th>Voornamen</th>
                        <th>Achternaam</th>
                        <th>Geslacht</th>
                    </tr>
                }
                row={data &&
                    <tr key={data.id}>
                        <td>{data.givenNames}</td>
                        <td>{data.surname}</td>
                        <td>{getSexLabel(data.sex)}</td>
                    </tr>
                }
            />
            <Button type="button" onClick={handleSubmit}>Verwijderen</Button>
            <Button type="button" variant="cancel" onClick={() => navigate(urlGoBack)}>Annuleren</Button>
            {(personLoading || spouseLoading || dataLoading) && <p>Loading...</p>}
            {personError && <p>{personError}</p>}
            {spouseError && <p>{spouseError}</p>}
            {dataError && <p>{dataError}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default ChildDelete;